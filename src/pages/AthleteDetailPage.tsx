
import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Star, MessageSquare, FileText, Share, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { useUserRole } from '@/contexts/UserRoleContext';

// Mock data for athlete details
const mockAthleteData = {
  id: '1',
  name: 'James Wilson',
  sport: 'Football',
  position: 'Midfielder',
  tacticalRole: 'Box-to-Box',
  school: 'Manchester Academy',
  club: 'Manchester City Youth',
  image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076',
  height: '183 cm',
  weight: '76 kg',
  dominant_foot: 'Right',
  date_of_birth: '2001-05-15',
  nationality: 'England',
  bio: 'Highly technical midfielder with exceptional field vision and passing abilities. Works hard in both attack and defense phases.',
  connection_status: 'not_connected',
  performance_metrics: {
    speed: [
      { date: '2025-01', value: 31.2 },
      { date: '2025-02', value: 31.5 },
      { date: '2025-03', value: 32.1 },
      { date: '2025-04', value: 32.4 }
    ],
    endurance: [
      { date: '2025-01', value: 42.5 },
      { date: '2025-02', value: 43.8 },
      { date: '2025-03', value: 44.2 },
      { date: '2025-04', value: 45.9 }
    ],
    agility: [
      { date: '2025-01', value: 8.7 },
      { date: '2025-02', value: 8.5 },
      { date: '2025-03', value: 8.3 },
      { date: '2025-04', value: 8.2 }
    ]
  },
  training_sessions: [
    {
      id: 'session1',
      date: '2025-04-08',
      type: 'Sprint Training',
      duration: '90 min',
      coach: 'Coach Thompson',
      highlights: 'Achieved new personal best in 40m sprint'
    },
    {
      id: 'session2',
      date: '2025-04-03',
      type: 'Tactical Session',
      duration: '120 min',
      coach: 'Coach Williams',
      highlights: 'Focused on positioning and space creation'
    },
    {
      id: 'session3',
      date: '2025-03-28',
      type: 'Match Simulation',
      duration: '100 min',
      coach: 'Coach Thompson',
      highlights: 'Led team in assists and distance covered'
    }
  ],
  goals: [
    {
      id: 'goal1',
      metric: 'Top Speed',
      current: 32.4,
      target: 34.0,
      unit: 'km/h',
      end_date: '2025-06-30',
      progress: 80
    },
    {
      id: 'goal2',
      metric: 'Pass Completion',
      current: 85,
      target: 90,
      unit: '%',
      end_date: '2025-05-15',
      progress: 70
    },
    {
      id: 'goal3',
      metric: 'Defensive Duels Won',
      current: 65,
      target: 75,
      unit: '%',
      end_date: '2025-07-01',
      progress: 50
    }
  ]
};

const AthleteDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userRole } = useUserRole();
  
  // Redirect non-scouts away from this page
  if (userRole !== 'scout') {
    return navigate('/athlete-dashboard');
  }

  // Query for athlete data
  const { data: athlete, isLoading } = useQuery({
    queryKey: ['athlete', id],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        // Return mock data in demo mode
        return mockAthleteData;
      }
      
      // In a real app, we would fetch the actual athlete data from Supabase
      const { data, error } = await supabase
        .from('athletes')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data || mockAthleteData;
    }
  });

  const handleAddToShortlist = () => {
    toast.success(`${athlete?.name} added to shortlist`);
  };

  const handleSendMessage = () => {
    navigate(`/messages?athlete=${id}`);
  };

  const handleCreateScoutingNote = () => {
    toast.success('Scouting note created successfully');
  };

  const handleGenerateReport = () => {
    toast.success('Report generated successfully');
  };

  const handleShareReport = () => {
    toast.success('Report shared successfully');
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-athlex-background text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-athlex-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {/* Athlete Header */}
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                        <Avatar className="h-24 w-24 rounded-xl">
                          <AvatarImage src={athlete?.image} alt={athlete?.name} />
                          <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent text-xl">
                            {getInitials(athlete?.name || '')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 text-center sm:text-left">
                          <h1 className="text-2xl md:text-3xl font-bold">{athlete?.name}</h1>
                          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                            <Badge className="bg-athlex-accent/20 text-athlex-accent">{athlete?.sport}</Badge>
                            <Badge className="bg-gray-800">{athlete?.position}</Badge>
                            {athlete?.tacticalRole && (
                              <Badge variant="outline">{athlete?.tacticalRole}</Badge>
                            )}
                          </div>
                          <div className="mt-3 text-gray-400">
                            <p>{athlete?.school} • {athlete?.club}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-full md:w-64 space-y-3">
                  <Button className="w-full" onClick={handleAddToShortlist}>
                    <Star className="mr-2 h-4 w-4" />
                    Add to Shortlist
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleSendMessage}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Athlete
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleCreateScoutingNote}>
                    <FileText className="mr-2 h-4 w-4" />
                    Create Scouting Note
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleGenerateReport}>
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleShareReport}>
                    <Share className="mr-2 h-4 w-4" />
                    Share Report
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Athlete Passport Summary */}
                <div className="md:col-span-1">
                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl">Athlete Passport</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Height</p>
                          <p className="font-medium">{athlete?.height}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Weight</p>
                          <p className="font-medium">{athlete?.weight}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Dominant Foot</p>
                          <p className="font-medium">{athlete?.dominant_foot}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Date of Birth</p>
                          <p className="font-medium">{new Date(athlete?.date_of_birth || '').toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Nationality</p>
                          <p className="font-medium">{athlete?.nationality}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Bio</p>
                        <p className="text-sm">{athlete?.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Recent Training Sessions */}
                  <Card className="bg-gray-900/60 border-gray-800 mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Recent Training</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {athlete?.training_sessions.map(session => (
                        <div key={session.id} className="border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{session.type}</h4>
                            <span className="text-sm text-gray-400">{new Date(session.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-400">Duration: {session.duration} • Coach: {session.coach}</p>
                          <p className="text-sm text-athlex-accent mt-1">{session.highlights}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Right Column - Performance Data */}
                <div className="md:col-span-2">
                  {/* Performance Charts */}
                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="speed">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="speed">Speed</TabsTrigger>
                          <TabsTrigger value="endurance">Endurance</TabsTrigger>
                          <TabsTrigger value="agility">Agility</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="speed" className="pt-4">
                          <ChartContainer className="h-64" config={{ speed: { color: "#9b87f5" } }}>
                            <AreaChart data={athlete?.performance_metrics.speed}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                              <XAxis dataKey="date" stroke="#666" />
                              <YAxis stroke="#666" />
                              <Tooltip />
                              <Area type="monotone" dataKey="value" name="Speed (km/h)" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.3} />
                            </AreaChart>
                          </ChartContainer>
                        </TabsContent>
                        
                        <TabsContent value="endurance" className="pt-4">
                          <ChartContainer className="h-64" config={{ endurance: { color: "#0EA5E9" } }}>
                            <AreaChart data={athlete?.performance_metrics.endurance}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                              <XAxis dataKey="date" stroke="#666" />
                              <YAxis stroke="#666" />
                              <Tooltip />
                              <Area type="monotone" dataKey="value" name="VO2 Max" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.3} />
                            </AreaChart>
                          </ChartContainer>
                        </TabsContent>
                        
                        <TabsContent value="agility" className="pt-4">
                          <ChartContainer className="h-64" config={{ agility: { color: "#F97316" } }}>
                            <AreaChart data={athlete?.performance_metrics.agility}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                              <XAxis dataKey="date" stroke="#666" />
                              <YAxis stroke="#666" />
                              <Tooltip />
                              <Area type="monotone" dataKey="value" name="Agility (seconds)" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
                            </AreaChart>
                          </ChartContainer>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                  
                  {/* Goal Overview */}
                  <Card className="bg-gray-900/60 border-gray-800 mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Goal Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {athlete?.goals.map(goal => (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{goal.metric}</h4>
                              <span className="text-sm text-gray-400">Target: {goal.target} {goal.unit}</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2.5">
                              <div 
                                className="bg-athlex-accent h-2.5 rounded-full" 
                                style={{ width: `${goal.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>{goal.current} {goal.unit}</span>
                              <span>Due: {new Date(goal.end_date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
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

export default AthleteDetailPage;
