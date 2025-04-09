
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  ArrowUpRight, 
  Calendar, 
  Eye, 
  FileText, 
  HeartPulse, 
  MessageCircle, 
  ScrollText, 
  Target, 
  TrendingUp, 
  Utensils, 
  Video 
} from 'lucide-react';

// Mock data for managed athletes
const managedAthletes = [
  {
    id: 1,
    name: 'James Rodriguez',
    position: 'Midfielder',
    age: 22,
    fitnessLevel: 'Excellent',
    trend: 'up',
    lastActivity: '2 days ago',
    profileImage: null,
  },
  {
    id: 2,
    name: 'Sara Martinez',
    position: 'Forward',
    age: 19,
    fitnessLevel: 'Good',
    trend: 'neutral',
    lastActivity: '5 hours ago',
    profileImage: null,
  },
  {
    id: 3,
    name: 'David Chen',
    position: 'Defender',
    age: 24,
    fitnessLevel: 'Needs Attention',
    trend: 'down',
    lastActivity: 'yesterday',
    profileImage: null,
  },
  {
    id: 4,
    name: 'Leila Johnson',
    position: 'Goalkeeper',
    age: 21,
    fitnessLevel: 'Good',
    trend: 'up',
    lastActivity: '3 days ago',
    profileImage: null,
  },
];

// Upcoming sessions
const upcomingSessions = [
  {
    id: 1,
    title: 'Team Training',
    time: 'Today, 15:00',
    location: 'Main Field',
    attendees: 18,
  },
  {
    id: 2,
    title: '1-on-1 with James',
    time: 'Tomorrow, 10:30',
    location: 'Training Room B',
    attendees: 1,
  },
  {
    id: 3,
    title: 'Recovery Session',
    time: 'Wednesday, 14:00',
    location: 'Gym',
    attendees: 12,
  },
];

// Training recommendations
const trainingRecommendations = [
  {
    id: 1,
    athleteName: 'James Rodriguez',
    area: 'Technical',
    recommendation: 'Focus on first-touch control drills',
    aiGenerated: true,
  },
  {
    id: 2,
    athleteName: 'Sara Martinez',
    area: 'Physical',
    recommendation: 'Increase sprint intervals in training',
    aiGenerated: true,
  },
  {
    id: 3,
    athleteName: 'David Chen',
    area: 'Mental',
    recommendation: 'Decision-making exercises under pressure',
    aiGenerated: false,
  },
];

const CoachDashboard = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Coach Dashboard</h1>
              
              {/* Tabs for different sections */}
              <Tabs defaultValue="overview" className="mb-6">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="athletes">My Athletes</TabsTrigger>
                  <TabsTrigger value="sessions">Training Sessions</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Quick Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Managed Athletes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{managedAthletes.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">2 need attention</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground mt-1">Next: Today, 15:00</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Fitness Alerts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground mt-1">David Chen: Fatigue</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending Feedback</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground mt-1">From last session</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Managed Athletes Table */}
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Managed Athletes</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/talent-discovery">View All</Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Athlete</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Fitness Level</TableHead>
                            <TableHead>Last Activity</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {managedAthletes.map((athlete) => (
                            <TableRow key={athlete.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={athlete.profileImage || ''} />
                                    <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{athlete.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{athlete.position}</TableCell>
                              <TableCell>{athlete.age}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span 
                                    className={`${
                                      athlete.fitnessLevel === 'Excellent' 
                                        ? 'text-green-500' 
                                        : athlete.fitnessLevel === 'Good' 
                                          ? 'text-blue-400' 
                                          : 'text-red-400'
                                    }`}
                                  >
                                    {athlete.fitnessLevel}
                                  </span>
                                  {athlete.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                                  {athlete.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                                </div>
                              </TableCell>
                              <TableCell>{athlete.lastActivity}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link to="/athlete-profile">
                                      <Eye className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <MessageCircle className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  {/* Two-column layout for extra sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upcoming Sessions */}
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader>
                        <CardTitle>Upcoming Sessions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {upcomingSessions.map((session) => (
                            <div key={session.id} className="flex items-start gap-3 pb-3 border-b border-gray-700/50 last:border-0 last:pb-0">
                              <div className="bg-blue-900/30 p-2 rounded-full">
                                <Calendar className="h-4 w-4 text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{session.title}</p>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-gray-400">{session.time} • {session.location}</p>
                                  <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                                    {session.attendees} {session.attendees === 1 ? 'athlete' : 'athletes'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <div className="flex justify-between pt-2">
                            <Button variant="outline" size="sm">View Calendar</Button>
                            <Button size="sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Session
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* AI Training Recommendations */}
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          Training Recommendations
                          <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">AI-powered</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {trainingRecommendations.map((rec) => (
                            <div key={rec.id} className="flex items-start gap-3 pb-3 border-b border-gray-700/50 last:border-0 last:pb-0">
                              <div className={`${
                                rec.area === 'Technical' 
                                  ? 'bg-purple-900/30' 
                                  : rec.area === 'Physical' 
                                    ? 'bg-green-900/30' 
                                    : 'bg-orange-900/30'
                              } p-2 rounded-full`}>
                                {rec.area === 'Technical' && <Target className="h-4 w-4 text-purple-400" />}
                                {rec.area === 'Physical' && <Activity className="h-4 w-4 text-green-400" />}
                                {rec.area === 'Mental' && <ScrollText className="h-4 w-4 text-orange-400" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-sm">{rec.athleteName}</p>
                                  <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                                    {rec.area}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">{rec.recommendation}</p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="flex justify-between pt-2">
                            <Button variant="outline" size="sm">View All</Button>
                            <Button size="sm">
                              <ArrowUpRight className="mr-2 h-4 w-4" />
                              Assign Drill
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* My Athletes Tab */}
                <TabsContent value="athletes">
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardHeader>
                      <CardTitle>My Athletes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {managedAthletes.map((athlete) => (
                          <Card key={athlete.id} className="bg-gray-800 border-gray-700">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={athlete.profileImage || ''} />
                                  <AvatarFallback className="text-xl">{athlete.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="font-semibold">{athlete.name}</h3>
                                  <p className="text-sm text-gray-400">{athlete.position} • {athlete.age} years</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <span 
                                      className={`text-xs px-2 py-0.5 rounded-full ${
                                        athlete.fitnessLevel === 'Excellent' 
                                          ? 'bg-green-900/30 text-green-400' 
                                          : athlete.fitnessLevel === 'Good' 
                                            ? 'bg-blue-900/30 text-blue-400' 
                                            : 'bg-red-900/30 text-red-400'
                                      }`}
                                    >
                                      {athlete.fitnessLevel}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-3 mt-4">
                                <Button variant="outline" size="sm" className="w-full">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="w-full">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="w-full">
                                  <Video className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Training Sessions Tab */}
                <TabsContent value="sessions">
                  <div className="space-y-6">
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Upcoming Training Sessions</CardTitle>
                          <Button size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            New Session
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Calendar or list of sessions would go here */}
                        <p className="text-gray-400 text-center py-6">Calendar view coming soon</p>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-card text-card-foreground border-gray-700">
                        <CardHeader>
                          <CardTitle>Training Resources</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                              <div className="bg-blue-900/30 p-2 rounded-full">
                                <Video className="h-5 w-5 text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">Drill Library</p>
                                <p className="text-xs text-gray-400">48 technical exercises</p>
                              </div>
                              <Button variant="ghost" size="sm">Access</Button>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                              <div className="bg-green-900/30 p-2 rounded-full">
                                <HeartPulse className="h-5 w-5 text-green-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">Fitness Templates</p>
                                <p className="text-xs text-gray-400">12 workout plans</p>
                              </div>
                              <Button variant="ghost" size="sm">Access</Button>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                              <div className="bg-orange-900/30 p-2 rounded-full">
                                <Utensils className="h-5 w-5 text-orange-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">Nutrition Guides</p>
                                <p className="text-xs text-gray-400">8 meal plan templates</p>
                              </div>
                              <Button variant="ghost" size="sm">Access</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card text-card-foreground border-gray-700">
                        <CardHeader>
                          <CardTitle>Recent Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                              <div>
                                <p className="font-medium">Team Training</p>
                                <p className="text-xs text-gray-400">Yesterday, 15:00</p>
                              </div>
                              <span className="text-sm text-green-400">87% attendance</span>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                              <div>
                                <p className="font-medium">Tactical Session</p>
                                <p className="text-xs text-gray-400">Mon, 10:30</p>
                              </div>
                              <span className="text-sm text-green-400">92% attendance</span>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                              <div>
                                <p className="font-medium">Recovery Session</p>
                                <p className="text-xs text-gray-400">Sun, 14:00</p>
                              </div>
                              <span className="text-sm text-amber-400">65% attendance</span>
                            </div>
                            
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              View All Records
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Analytics Tab */}
                <TabsContent value="analytics">
                  <div className="space-y-6">
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader>
                        <CardTitle>Team Performance Trends</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        {/* Graph would go here */}
                        <div className="flex items-center justify-center h-full">
                          <p className="text-gray-400">Performance trends visualization coming soon</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="bg-card text-card-foreground border-gray-700">
                        <CardHeader>
                          <CardTitle>Skill Development</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Technical</span>
                                <span className="text-green-400">+8% improvement</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: '75%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Physical</span>
                                <span className="text-green-400">+12% improvement</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '82%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Tactical</span>
                                <span className="text-amber-400">+3% improvement</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full rounded-full" style={{ width: '60%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Mental</span>
                                <span className="text-green-400">+6% improvement</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full" style={{ width: '68%' }}></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card text-card-foreground border-gray-700 md:col-span-2">
                        <CardHeader>
                          <CardTitle>Injury & Fatigue Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-red-900/10 border border-red-900/20 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback>DC</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">David Chen</p>
                                  <p className="text-xs text-red-400">High fatigue detected</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">Review</Button>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-amber-900/10 border border-amber-900/20 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">Sara Martinez</p>
                                  <p className="text-xs text-amber-400">Minor ankle discomfort</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">Review</Button>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback>JR</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">James Rodriguez</p>
                                  <p className="text-xs text-green-400">Optimal recovery status</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">Review</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CoachDashboard;
