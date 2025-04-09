
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
  Check, 
  Eye, 
  FileText, 
  GitCompare, 
  Share2, 
  Star, 
  ThumbsUp, 
  TrendingUp, 
  Trophy, 
  UserPlus
} from 'lucide-react';

// Mock data for saved athletes
const savedAthletes = [
  {
    id: 1,
    name: 'James Rodriguez',
    position: 'Midfielder',
    age: 22,
    playerRating: 8.7,
    discoverabilityScore: 94,
    roleFit: 'Excellent',
    trend: 'up',
    lastActivity: '2 days ago',
    profileImage: null,
  },
  {
    id: 2,
    name: 'Sara Martinez',
    position: 'Forward',
    age: 19,
    playerRating: 8.2,
    discoverabilityScore: 88,
    roleFit: 'Good',
    trend: 'up',
    lastActivity: '5 hours ago',
    profileImage: null,
  },
  {
    id: 3,
    name: 'David Chen',
    position: 'Defender',
    age: 24,
    playerRating: 7.9,
    discoverabilityScore: 76,
    roleFit: 'Average',
    trend: 'neutral',
    lastActivity: 'yesterday',
    profileImage: null,
  },
  {
    id: 4,
    name: 'Leila Johnson',
    position: 'Goalkeeper',
    age: 21,
    playerRating: 8.5,
    discoverabilityScore: 91,
    roleFit: 'Excellent',
    trend: 'up',
    lastActivity: '3 days ago',
    profileImage: null,
  },
];

// Match performance data
const matchPerformance = [
  {
    id: 1,
    athlete: 'James Rodriguez',
    match: 'Central FC vs East United',
    date: 'Yesterday',
    rating: 8.9,
    goals: 2,
    assists: 1,
    minutes: 90,
    hasVideo: true,
  },
  {
    id: 2,
    athlete: 'Sara Martinez',
    match: 'North Tigers vs South Rovers',
    date: '2 days ago',
    rating: 8.6,
    goals: 1,
    assists: 2,
    minutes: 85,
    hasVideo: true,
  },
  {
    id: 3,
    athlete: 'David Chen',
    match: 'West Lions vs Central FC',
    date: '5 days ago',
    rating: 7.8,
    goals: 0,
    assists: 0,
    minutes: 90,
    hasVideo: false,
  },
];

// Scouting recommendations
const scoutingRecommendations = [
  {
    id: 1,
    name: 'Michael Kim',
    age: 18,
    position: 'Midfielder',
    highlight: 'Rising talent with exceptional passing accuracy (92%)',
    match: 'High potential fit for your system',
    profileImage: null,
  },
  {
    id: 2,
    name: 'Anna Thompson',
    age: 20,
    position: 'Forward',
    highlight: 'Pace merchant with 12 goals in last 15 matches',
    match: 'Strong fit for counter-attacking style',
    profileImage: null,
  },
  {
    id: 3,
    name: 'Luis García',
    age: 17,
    position: 'Defender',
    highlight: 'Youth international with leadership qualities',
    match: 'Developing talent with high ceiling',
    profileImage: null,
  },
];

const ScoutDashboard = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Scout Dashboard</h1>
              
              {/* Tabs for different sections */}
              <Tabs defaultValue="overview" className="mb-6">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
                  <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Saved Athletes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{savedAthletes.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">4 new this week</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Recent Matches</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1">3 with video highlights</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground mt-1">2 shared with head scout</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Trial List</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground mt-1">Next trial: Aug 15</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Saved Athletes Table */}
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Talent Watchlist</CardTitle>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Athlete</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>D-Score</TableHead>
                            <TableHead>Role Fit</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {savedAthletes.map((athlete) => (
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
                                  <span>{athlete.playerRating}</span>
                                  {athlete.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                                  <span className="text-xs font-bold">{athlete.discoverabilityScore}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    athlete.roleFit === 'Excellent' 
                                      ? 'bg-green-900/30 text-green-400' 
                                      : athlete.roleFit === 'Good' 
                                        ? 'bg-blue-900/30 text-blue-400' 
                                        : 'bg-gray-800 text-gray-300'
                                  }`}
                                >
                                  {athlete.roleFit}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link to="/athlete-profile">
                                      <Eye className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <UserPlus className="h-4 w-4" />
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
                    {/* Recent Match Performances */}
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader>
                        <CardTitle>Recent Match Performances</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {matchPerformance.map((match) => (
                            <div key={match.id} className="flex items-start gap-3 pb-3 border-b border-gray-700/50 last:border-0 last:pb-0">
                              <div className="bg-blue-900/30 p-2 rounded-full">
                                <Activity className="h-4 w-4 text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-sm">{match.athlete}</p>
                                  <span className="text-sm font-bold text-blue-400">{match.rating}</span>
                                </div>
                                <p className="text-xs text-gray-400">{match.match}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                                    {match.goals}G
                                  </span>
                                  <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                                    {match.assists}A
                                  </span>
                                  <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                                    {match.minutes}min
                                  </span>
                                  {match.hasVideo && (
                                    <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">
                                      Video
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" asChild>
                                <Link to="/athlete-profile">
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          ))}
                          
                          <Button variant="outline" size="sm" className="w-full">
                            View All Match Data
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* AI Scouting Recommendations */}
                    <Card className="bg-card text-card-foreground border-gray-700">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          Scouting Recommendations
                          <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">AI-powered</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {scoutingRecommendations.map((rec) => (
                            <div key={rec.id} className="flex items-start gap-3 pb-3 border-b border-gray-700/50 last:border-0 last:pb-0">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={rec.profileImage || ''} />
                                <AvatarFallback>{rec.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">{rec.name}</p>
                                  <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                                    {rec.age} • {rec.position}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{rec.highlight}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <ThumbsUp className="h-3 w-3 text-green-400" />
                                  <span className="text-xs text-green-400">{rec.match}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <Button variant="outline" size="sm" className="w-full">
                            Discover More Talent
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Quick Actions */}
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardHeader>
                      <CardTitle>Scout Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button className="flex-col h-auto py-4 w-full">
                          <UserPlus className="h-5 w-5 mb-2" />
                          <span>Add to Trial List</span>
                        </Button>
                        
                        <Button className="flex-col h-auto py-4 w-full">
                          <FileText className="h-5 w-5 mb-2" />
                          <span>Generate Report</span>
                        </Button>
                        
                        <Button className="flex-col h-auto py-4 w-full">
                          <GitCompare className="h-5 w-5 mb-2" />
                          <span>Compare Athletes</span>
                        </Button>
                        
                        <Button className="flex-col h-auto py-4 w-full">
                          <Share2 className="h-5 w-5 mb-2" />
                          <span>Share with Head Scout</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Watchlist Tab */}
                <TabsContent value="watchlist">
                  <Card className="bg-card text-card-foreground border-gray-700 mb-6">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>My Watchlist</CardTitle>
                        <Button size="sm">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add Athlete
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedAthletes.map((athlete) => (
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
                                  <div className="flex mt-1 gap-2">
                                    <span className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 px-2 py-0.5 rounded-full flex items-center">
                                      <Star className="h-3 w-3 mr-1" /> {athlete.discoverabilityScore}
                                    </span>
                                    <span 
                                      className={`text-xs px-2 py-0.5 rounded-full ${
                                        athlete.roleFit === 'Excellent' 
                                          ? 'bg-green-900/30 text-green-400' 
                                          : athlete.roleFit === 'Good' 
                                            ? 'bg-blue-900/30 text-blue-400' 
                                            : 'bg-gray-700 text-gray-300'
                                      }`}
                                    >
                                      {athlete.roleFit} Fit
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 grid grid-cols-3 gap-1">
                                <div className="text-center p-2 bg-gray-900/50 rounded">
                                  <p className="text-xs text-gray-400">Rating</p>
                                  <p className="font-bold">{athlete.playerRating}</p>
                                </div>
                                <div className="text-center p-2 bg-gray-900/50 rounded">
                                  <p className="text-xs text-gray-400">Last Match</p>
                                  <p className="font-bold">8.1</p>
                                </div>
                                <div className="text-center p-2 bg-gray-900/50 rounded">
                                  <p className="text-xs text-gray-400">Trend</p>
                                  <p className="font-bold flex justify-center items-center">
                                    {athlete.trend === 'up' ? (
                                      <TrendingUp className="h-4 w-4 text-green-500" />
                                    ) : athlete.trend === 'neutral' ? (
                                      <span>—</span>
                                    ) : (
                                      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                                    )}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 mt-4">
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                  <Link to="/athlete-profile">
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="w-full">
                                  <UserPlus className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardHeader>
                      <CardTitle>Verified Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                          <div className="bg-green-900/30 p-2 rounded-full">
                            <Check className="h-5 w-5 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">James Rodriguez</p>
                            <p className="text-xs text-gray-400">Stats verified by Central FC Academy</p>
                          </div>
                          <Button variant="ghost" size="sm">View Stats</Button>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                          <div className="bg-green-900/30 p-2 rounded-full">
                            <Check className="h-5 w-5 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Sara Martinez</p>
                            <p className="text-xs text-gray-400">Stats verified by National Youth League</p>
                          </div>
                          <Button variant="ghost" size="sm">View Stats</Button>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                          <div className="bg-green-900/30 p-2 rounded-full">
                            <Check className="h-5 w-5 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">David Chen</p>
                            <p className="text-xs text-gray-400">Stats verified by West Lions FC</p>
                          </div>
                          <Button variant="ghost" size="sm">View Stats</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Comparisons Tab */}
                <TabsContent value="comparisons">
                  <Card className="bg-card text-card-foreground border-gray-700 mb-6">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Athlete Comparisons</CardTitle>
                        <Button size="sm">
                          <GitCompare className="mr-2 h-4 w-4" />
                          New Comparison
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col lg:flex-row gap-6 bg-gray-800 p-6 rounded-lg">
                        <div className="flex-1 flex flex-col items-center">
                          <Avatar className="h-20 w-20 mb-3">
                            <AvatarFallback>JR</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">James Rodriguez</h3>
                          <p className="text-sm text-gray-400">Midfielder • 22 years</p>
                          
                          <div className="w-full mt-6 space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Passing</span>
                                <span className="font-medium">92%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '92%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Ball Control</span>
                                <span className="font-medium">88%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '88%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Vision</span>
                                <span className="font-medium">94%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '94%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Shooting</span>
                                <span className="font-medium">79%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '79%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Stamina</span>
                                <span className="font-medium">85%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                          </div>
                          
                          <Button className="mt-6">View Full Profile</Button>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center py-6">
                          <div className="bg-gray-700 w-px h-full hidden lg:block"></div>
                          <div className="bg-gray-700 h-px w-full block lg:hidden"></div>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center">
                          <Avatar className="h-20 w-20 mb-3">
                            <AvatarFallback>MK</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">Michael Kim</h3>
                          <p className="text-sm text-gray-400">Midfielder • 18 years</p>
                          
                          <div className="w-full mt-6 space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Passing</span>
                                <span className="font-medium">86%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full" style={{ width: '86%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Ball Control</span>
                                <span className="font-medium">92%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full" style={{ width: '92%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Vision</span>
                                <span className="font-medium">82%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full" style={{ width: '82%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Shooting</span>
                                <span className="font-medium">73%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full" style={{ width: '73%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Stamina</span>
                                <span className="font-medium">89%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full" style={{ width: '89%' }}></div>
                              </div>
                            </div>
                          </div>
                          
                          <Button className="mt-6" variant="outline">View Full Profile</Button>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                        <h3 className="font-medium mb-2">Scouting Insights</h3>
                        <p className="text-sm text-gray-400">
                          Michael Kim shows exceptional potential with superior ball control but lacks experience compared to James. 
                          Consider his development trajectory and lower acquisition cost against James's proven performance in competitive matches.
                        </p>
                        <div className="mt-4 flex gap-2">
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                            <Trophy className="h-3 w-3 inline mr-1" /> Higher potential
                          </span>
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                            <Check className="h-3 w-3 inline mr-1" /> Cost-effective option
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reports Tab */}
                <TabsContent value="reports">
                  <Card className="bg-card text-card-foreground border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Scouting Reports</CardTitle>
                        <Button size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Create New Report
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-900/30 p-2 rounded-full">
                              <FileText className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">James Rodriguez - Comprehensive Evaluation</h3>
                              <p className="text-sm text-gray-400">Created: 3 days ago</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400">
                                  Technical Analysis
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/30 text-purple-400">
                                  Match Footage
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-900/30 p-2 rounded-full">
                              <FileText className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">Sara Martinez - Performance Analysis</h3>
                              <p className="text-sm text-gray-400">Created: 1 week ago</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/30 text-green-400">
                                  Physical Data
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-400">
                                  Growth Potential
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="bg-green-900/30 p-2 rounded-full">
                              <Share2 className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">Quarterly Scouting Report - East Region</h3>
                              <p className="text-sm text-gray-400">Created: 2 weeks ago</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/30 text-green-400">
                                  Shared with Head Scout
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
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

export default ScoutDashboard;
