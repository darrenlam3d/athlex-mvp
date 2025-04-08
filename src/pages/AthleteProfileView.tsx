
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, FileText, MessageSquare, TrendingUp, Calendar, Activity, Brain, Apple, Clipboard } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useProfile } from '@/contexts/ProfileContext';
import { Badge } from '@/components/ui/badge';

// Mock performance data
const performanceData = [
  { month: 'Jan', xG: 0.8, passes: 85, tackles: 60, sprints: 70 },
  { month: 'Feb', xG: 1.2, passes: 87, tackles: 65, sprints: 75 },
  { month: 'Mar', xG: 0.9, passes: 82, tackles: 70, sprints: 72 },
  { month: 'Apr', xG: 1.5, passes: 90, tackles: 75, sprints: 80 },
  { month: 'May', xG: 1.3, passes: 92, tackles: 72, sprints: 85 },
  { month: 'Jun', xG: 1.7, passes: 94, tackles: 80, sprints: 88 },
];

// Mock projection data
const projectionData = [
  { month: 'Jul', current: 85, projected: 87 },
  { month: 'Aug', current: 87, projected: 89 },
  { month: 'Sep', current: 89, projected: 91 },
  { month: 'Oct', current: 91, projected: 93 },
  { month: 'Nov', current: 93, projected: 94 },
  { month: 'Dec', current: 94, projected: 96 },
];

const AthleteProfileView = () => {
  const { profileData } = useProfile();
  const [activeTab, setActiveTab] = useState('performance');

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              {/* Athlete Identity Block */}
              <Card className="bg-card text-card-foreground border-gray-700 mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                    <Avatar className="h-24 w-24 border-2 border-blue-500">
                      <AvatarImage src={profileData.profileImage} alt={`${profileData.firstName} ${profileData.lastName}`} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h1>
                        <Badge variant="secondary" className="text-xs">{profileData.age} years</Badge>
                        <Badge variant="outline" className="text-xs">{profileData.position}</Badge>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">
                        FC Barcelona Academy • #<span>{profileData.jerseyNumber}</span> • {profileData.preferredFoot} Foot • {profileData.tacticalRole}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className="bg-gray-800 px-3 py-1 rounded-md text-sm">
                          <span className="text-gray-400">Rating:</span> <span className="font-bold">{profileData.playerRating}</span>
                        </div>
                        <div className="bg-gray-800 px-3 py-1 rounded-md text-sm">
                          <span className="text-gray-400">Contract:</span> <span className="font-bold">2026</span>
                        </div>
                        <div className="bg-gray-800 px-3 py-1 rounded-md text-sm">
                          <span className="text-gray-400">Status:</span> <span className="font-bold text-green-400">Available</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-end">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Star className="h-4 w-4 mr-1" />
                        Add to Trial List
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Generate Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Send Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tabs Navigation */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
                <TabsList className="w-full bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger value="performance" className="flex items-center gap-1 flex-1">
                    <Activity className="h-4 w-4" /> Performance
                  </TabsTrigger>
                  <TabsTrigger value="projections" className="flex items-center gap-1 flex-1">
                    <TrendingUp className="h-4 w-4" /> Projections
                  </TabsTrigger>
                  <TabsTrigger value="training" className="flex items-center gap-1 flex-1">
                    <Calendar className="h-4 w-4" /> Training Plan
                  </TabsTrigger>
                  <TabsTrigger value="nutrition" className="flex items-center gap-1 flex-1">
                    <Apple className="h-4 w-4" /> Nutrition
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center gap-1 flex-1">
                    <Clipboard className="h-4 w-4" /> Scouting Notes
                  </TabsTrigger>
                </TabsList>
                
                {/* Performance Tab */}
                <TabsContent value="performance" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Offensive Stats</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Expected Goals (xG)</span>
                            <span className="font-bold">1.7</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Shot Accuracy</span>
                            <span className="font-bold">68%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Pass Completion</span>
                            <span className="font-bold">94%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Key Passes/Game</span>
                            <span className="font-bold">3.2</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Defensive Stats</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Tackle Success</span>
                            <span className="font-bold">80%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Interceptions/Game</span>
                            <span className="font-bold">2.4</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Aerial Duels Won</span>
                            <span className="font-bold">65%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Blocks/Game</span>
                            <span className="font-bold">1.1</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Physical Stats</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Sprint Distance</span>
                            <span className="font-bold">88m</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Top Speed</span>
                            <span className="font-bold">32.4 km/h</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Distance Covered</span>
                            <span className="font-bold">11.2 km</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Intensity</span>
                            <span className="font-bold">High</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Performance Chart */}
                  <Card className="bg-card text-card-foreground border-gray-700 mb-6">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Performance Metrics (Last 6 Months)</h3>
                      <div className="h-72">
                        <ChartContainer
                          config={{
                            xG: { theme: { light: '#4f46e5', dark: '#4f46e5' } },
                            passes: { theme: { light: '#10b981', dark: '#10b981' } },
                            tackles: { theme: { light: '#f59e0b', dark: '#f59e0b' } },
                            sprints: { theme: { light: '#ec4899', dark: '#ec4899' } },
                          }}
                        >
                          <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="xG" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} name="xG" />
                            <Line type="monotone" dataKey="passes" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Pass %" />
                            <Line type="monotone" dataKey="tackles" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Tackle %" />
                            <Line type="monotone" dataKey="sprints" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} name="Sprint Dist" />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Comparison to Position Average */}
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Comparison to Position Average</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2 text-gray-400">Technical Abilities</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Passing</span>
                                <span className="text-sm">+15%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full">
                                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Ball Control</span>
                                <span className="text-sm">+12%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full">
                                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Vision</span>
                                <span className="text-sm">+20%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full">
                                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '95%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2 text-gray-400">Physical Abilities</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Speed</span>
                                <span className="text-sm">+8%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full">
                                <div className="h-2 bg-green-500 rounded-full" style={{ width: '82%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Stamina</span>
                                <span className="text-sm">+5%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full">
                                <div className="h-2 bg-green-500 rounded-full" style={{ width: '78%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Strength</span>
                                <span className="text-sm">-3%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full">
                                <div className="h-2 bg-red-500 rounded-full" style={{ width: '65%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Projections Tab */}
                <TabsContent value="projections" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Performance Projections</h3>
                        <div className="h-72">
                          <ChartContainer
                            config={{
                              current: { theme: { light: '#4f46e5', dark: '#4f46e5' } },
                              projected: { theme: { light: '#10b981', dark: '#10b981' } },
                            }}
                          >
                            <AreaChart data={projectionData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis dataKey="month" stroke="#9ca3af" />
                              <YAxis stroke="#9ca3af" />
                              <Tooltip />
                              <Legend />
                              <Area type="monotone" dataKey="current" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} name="Current Level" />
                              <Area type="monotone" dataKey="projected" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Projected Level" />
                            </AreaChart>
                          </ChartContainer>
                        </div>
                        <p className="text-sm text-gray-400 mt-3">
                          Based on current progression rate and training intensity, player is expected to improve by 11% in the next 6 months.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Development Potential</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Technical Ceiling</span>
                              <span className="font-bold text-blue-400">Very High</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Physical Ceiling</span>
                              <span className="font-bold text-green-400">High</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Tactical Understanding</span>
                              <span className="font-bold text-blue-400">Very High</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Mental Resilience</span>
                              <span className="font-bold text-yellow-400">Medium</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="text-sm font-medium mb-2 text-gray-400">Scouts Assessment</h4>
                          <p className="text-sm">
                            Player shows exceptional technical ability and vision for their age. With proper development, they have potential to reach elite levels within 2-3 seasons. Focus areas should be physical conditioning and mental resilience.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Training Plan Tab */}
                <TabsContent value="training" className="mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Activity className="h-5 w-5 text-blue-400" />
                          <h3 className="text-lg font-semibold">Technical Training</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Passing Precision</h4>
                            <p className="text-sm text-gray-400">Focused drills on long-range passing accuracy and weight of pass.</p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">First Touch Control</h4>
                            <p className="text-sm text-gray-400">High-intensity drills to improve control under pressure.</p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Offensive Positioning</h4>
                            <p className="text-sm text-gray-400">Work on finding space between defensive lines.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-5 w-5 text-green-400" />
                          <h3 className="text-lg font-semibold">Physical Development</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Lower Body Strength</h4>
                            <p className="text-sm text-gray-400">Targeted gym sessions to improve core and leg power.</p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Acceleration Training</h4>
                            <p className="text-sm text-gray-400">Sprint workouts focused on first 5-10 meters.</p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Endurance Building</h4>
                            <p className="text-sm text-gray-400">Interval training to maintain high intensity throughout matches.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="h-5 w-5 text-purple-400" />
                          <h3 className="text-lg font-semibold">Mental Training</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Decision Making</h4>
                            <p className="text-sm text-gray-400">Game situation analysis and video review sessions.</p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Pressure Management</h4>
                            <p className="text-sm text-gray-400">Mindfulness and focus techniques for high-pressure situations.</p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Game Intelligence</h4>
                            <p className="text-sm text-gray-400">Tactical sessions to improve spatial awareness and anticipation.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="bg-card text-card-foreground border-gray-700 mt-6">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-3">AI-Generated Development Path</h3>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-700"></div>
                        <div className="space-y-6 relative">
                          <div className="relative pl-10">
                            <div className="absolute left-0 top-1 w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold">1</span>
                            </div>
                            <h4 className="font-medium mb-1">Short-term (1-3 months)</h4>
                            <p className="text-sm text-gray-400">
                              Focus on lower body strength and defensive positioning. Technical work on first touch under pressure.
                            </p>
                          </div>
                          <div className="relative pl-10">
                            <div className="absolute left-0 top-1 w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold">2</span>
                            </div>
                            <h4 className="font-medium mb-1">Mid-term (3-6 months)</h4>
                            <p className="text-sm text-gray-400">
                              Increase tactical understanding with video analysis. Development of advanced passing techniques and aerial ability.
                            </p>
                          </div>
                          <div className="relative pl-10">
                            <div className="absolute left-0 top-1 w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold">3</span>
                            </div>
                            <h4 className="font-medium mb-1">Long-term (6-12 months)</h4>
                            <p className="text-sm text-gray-400">
                              Leadership development and decision making in high-pressure situations. Specialized role training as a deep-lying playmaker.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Nutrition Tab */}
                <TabsContent value="nutrition" className="mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Nutritional Assessment</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Protein Intake</span>
                              <span className="font-bold text-green-400">Optimal</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Carbohydrate Balance</span>
                              <span className="font-bold text-yellow-400">Adequate</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Hydration Status</span>
                              <span className="font-bold text-red-400">Needs Improvement</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-red-500 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Micronutrient Profile</span>
                              <span className="font-bold text-yellow-400">Adequate</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-md">
                          <h4 className="font-medium mb-2 flex items-center">
                            <Activity className="h-4 w-4 mr-1 text-blue-400" />
                            Metabolic Assessment
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Resting Metabolic Rate:</p>
                              <p className="font-medium">1,950 calories</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Daily Expenditure:</p>
                              <p className="font-medium">3,400 calories</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Training Days Need:</p>
                              <p className="font-medium">3,800 calories</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Recovery Days Need:</p>
                              <p className="font-medium">3,000 calories</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Personalized Nutrition Plan</h3>
                        <div className="space-y-4">
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Pre-Training</h4>
                            <p className="text-sm text-gray-400">
                              Balanced meal with complex carbs 2-3 hours before training. Light snack (banana, energy bar) 30 minutes before.
                            </p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Post-Training</h4>
                            <p className="text-sm text-gray-400">
                              20-25g protein within 30 minutes. Carbohydrate replenishment with 3:1 carb-to-protein ratio meal within 2 hours.
                            </p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Match Day</h4>
                            <p className="text-sm text-gray-400">
                              Pre-match meal 3-4 hours before: lean protein, complex carbs, low fat. Post-match focus on rapid glycogen replenishment and hydration.
                            </p>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded-md">
                            <h4 className="font-medium mb-1">Recovery Days</h4>
                            <p className="text-sm text-gray-400">
                              Emphasis on anti-inflammatory foods, omega-3 rich sources, and antioxidants. Slightly lower calorie intake with maintained protein levels.
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-medium mb-2 text-gray-400">Supplementation Recommendations</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Vitamin D3 (2000 IU daily)</li>
                            <li>Magnesium (300mg daily for muscle recovery)</li>
                            <li>Omega-3 (2g daily for recovery and inflammation)</li>
                            <li>Electrolyte solution during training sessions</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Scouting Notes Tab */}
                <TabsContent value="notes" className="mt-4">
                  <Card className="bg-card text-card-foreground border-gray-700 mb-6">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Scouting Notes & Observations</h3>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Add New Note
                        </Button>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="border-b border-gray-700 pb-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Technical Assessment - Training Session</h4>
                            <span className="text-sm text-gray-400">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            Player demonstrates exceptional awareness in tight spaces. Consistently finds progressive passing options and executes with precision. First touch is excellent, always taking the ball into space with a plan. Vision and decision-making under pressure stand out compared to peers.
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Scout: James Wilson</span>
                            <span>•</span>
                            <span>Location: Training Complex</span>
                          </div>
                        </div>
                        
                        <div className="border-b border-gray-700 pb-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Match Observation - vs Atletico Madrid U21</h4>
                            <span className="text-sm text-gray-400">1 week ago</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            Controlled the midfield against a physically strong opposition. Created 4 key chances and maintained 92% pass completion despite high press. Defensive positioning needs improvement - caught too high twice leading to dangerous counter-attacks. Recovery runs and defensive awareness are areas for development.
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Scout: Maria Rodriguez</span>
                            <span>•</span>
                            <span>Location: Ciudad Deportiva</span>
                          </div>
                        </div>
                        
                        <div className="border-b border-gray-700 pb-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Physical Development Assessment</h4>
                            <span className="text-sm text-gray-400">3 weeks ago</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            Player has improved lower body strength significantly over past 3 months. Speed tests show 7% improvement in 10m sprint time. Still needs to develop upper body strength to compete in aerial duels and shielding situations. Recommending specialized strength program to address these areas.
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Fitness Coach: David Chen</span>
                            <span>•</span>
                            <span>Location: Performance Center</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Development Recommendations</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-900/20 border border-blue-800/30 p-3 rounded-md">
                          <h4 className="font-medium mb-1">Technical Development</h4>
                          <p className="text-sm text-gray-300">
                            Focus on defensive positioning and awareness when team loses possession. Recommend 1-on-1 sessions with defensive coach to improve reading of the game from deeper positions.
                          </p>
                        </div>
                        <div className="bg-green-900/20 border border-green-800/30 p-3 rounded-md">
                          <h4 className="font-medium mb-1">Physical Development</h4>
                          <p className="text-sm text-gray-300">
                            Continue upper body strength program with emphasis on core stability and shoulder strength. Add focused plyometric training to improve explosive power in aerial situations.
                          </p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-800/30 p-3 rounded-md">
                          <h4 className="font-medium mb-1">Mental/Tactical Development</h4>
                          <p className="text-sm text-gray-300">
                            Regular video analysis sessions focusing on off-ball positioning during defensive phases. Work with player on composure in high-pressure moments, particularly in final third decision making.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-gray-800/50 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Scouting Department Conclusion</h4>
                        <p className="text-sm text-gray-300">
                          Player shows exceptional promise with elite-level technical ability and game intelligence. Current development track suggests potential to break into first team within 12-18 months if physical development continues at current rate. Recommend increased exposure to senior training sessions while maintaining current development plan.
                        </p>
                        <div className="mt-3">
                          <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs font-medium">
                            <Star className="h-3 w-3" /> First Team Potential
                          </div>
                          <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-medium ml-2">
                            <Star className="h-3 w-3" /> Priority Development
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AthleteProfileView;
