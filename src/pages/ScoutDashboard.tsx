
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Activity, ArrowUpRight, Eye, Star, TrendingUp } from 'lucide-react';

// Mock data for saved athletes
const savedAthletes = [
  {
    id: 1,
    name: 'James Rodriguez',
    position: 'Midfielder',
    age: 22,
    playerRating: 8.7,
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
    trend: 'up',
    lastActivity: '3 days ago',
    profileImage: null,
  },
];

// Recent performance updates for dashboard
const recentUpdates = [
  {
    id: 1,
    athleteName: 'James Rodriguez',
    update: 'Completed high-intensity training session',
    time: '2 hours ago',
  },
  {
    id: 2,
    athleteName: 'Sara Martinez',
    update: 'Scored 2 goals in practice match',
    time: '5 hours ago',
  },
  {
    id: 3,
    athleteName: 'David Chen',
    update: 'Updated tactical analysis video',
    time: '1 day ago',
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
              
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                    <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">James Rodriguez</div>
                    <p className="text-xs text-muted-foreground mt-1">Rating increased by 0.3</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card text-card-foreground border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground mt-1">Next: Tactical Analysis (2d)</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Saved Athletes Table */}
              <Card className="bg-card text-card-foreground border-gray-700 mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Saved Athletes</CardTitle>
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
                        <TableHead>Last Activity</TableHead>
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
                          <TableCell>{athlete.lastActivity}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link to="/athlete-profile">
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Star className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="bg-card text-card-foreground border-gray-700 h-full">
                    <CardHeader>
                      <CardTitle>Recent Performance Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentUpdates.map((update) => (
                          <div key={update.id} className="flex items-start gap-3 pb-3 border-b border-gray-700/50 last:border-0">
                            <div className="bg-blue-900/30 p-2 rounded-full">
                              <Activity className="h-4 w-4 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{update.athleteName}</p>
                              <p className="text-sm text-gray-400">{update.update}</p>
                              <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                            </div>
                            <Button variant="ghost" size="icon" asChild>
                              <Link to="/athlete-profile">
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="bg-card text-card-foreground border-gray-700 h-full">
                    <CardHeader>
                      <CardTitle>Recommended Athletes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Link to="/athlete-profile" className="block">
                          <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 cursor-pointer">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>MK</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Michael Kim</p>
                              <p className="text-xs text-gray-400">Midfielder • Age 18</p>
                            </div>
                          </div>
                        </Link>
                        
                        <Link to="/athlete-profile" className="block">
                          <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 cursor-pointer">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>AT</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Anna Thompson</p>
                              <p className="text-xs text-gray-400">Forward • Age 20</p>
                            </div>
                          </div>
                        </Link>
                        
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          View More Recommendations
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ScoutDashboard;
