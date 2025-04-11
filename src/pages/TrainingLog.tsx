
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { AlertTriangle, Calendar, ClipboardList, Plus, Clock, Activity } from 'lucide-react';
import TrainingLogList from '@/components/training/TrainingLogList';
import TrainingLogForm from '@/components/training/TrainingLogForm';
import { mockTrainingLogs, mockTrainingSchedule } from '@/lib/mockData';

const TrainingLog = () => {
  const [activeTab, setActiveTab] = useState('list');
  
  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();
  
  // Fetch training logs using React Query
  const { data: trainingLogs, isLoading } = useQuery({
    queryKey: ['trainingLogs'],
    queryFn: async () => {
      if (!isConfigured) {
        console.log('Using mock training logs data');
        return mockTrainingLogs;
      }
      
      const { data: user } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('training_logs')
        .select('*')
        .eq('user_id', user.user?.id)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
  
  // Fetch training schedule using React Query
  const { data: trainingSchedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ['trainingSchedule'],
    queryFn: async () => {
      if (!isConfigured) {
        console.log('Using mock training schedule data');
        return mockTrainingSchedule;
      }
      
      const { data: user } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('training_sessions')
        .select('date, title as session_title, type, assigned_by')
        .eq('user_id', user.user?.id)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Training Log</h1>
                
                {!isConfigured && (
                  <div className="flex items-center px-4 py-2 bg-yellow-900/30 border border-yellow-600/30 rounded-md text-yellow-200 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span>Demo Mode: Using mock data</span>
                  </div>
                )}
              </div>
              
              <Tabs defaultValue="list" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    <span>Training Logs</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span>Statistics</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="list" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">Training History</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Plus className="h-4 w-4" />
                          <span>Add Training Log</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Log New Training Session</DialogTitle>
                        </DialogHeader>
                        <TrainingLogForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <TrainingLogList logs={trainingLogs || []} isLoading={isLoading} />
                </TabsContent>
                
                <TabsContent value="calendar">
                  <Card>
                    <CardHeader>
                      <CardTitle>Training Schedule</CardTitle>
                      <CardDescription>View your past and upcoming training sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {scheduleLoading ? (
                        <div className="h-64 flex items-center justify-center">
                          <p>Loading calendar...</p>
                        </div>
                      ) : (
                        <div className="grid gap-3">
                          {(trainingSchedule || []).map((session, index) => (
                            <div key={index} className="p-4 border border-gray-700 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{session.session_title}</h3>
                                  <p className="text-sm text-gray-400">{session.type}</p>
                                </div>
                                <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                                  {new Date(session.date).toLocaleDateString()}
                                </span>
                              </div>
                              {session.assigned_by && (
                                <p className="text-xs text-gray-400 mt-2">
                                  Assigned by: {session.assigned_by}
                                </p>
                              )}
                            </div>
                          ))}
                          
                          {trainingSchedule?.length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                              <Calendar className="h-12 w-12 mx-auto opacity-20 mb-3" />
                              <p>No training sessions scheduled</p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="stats">
                  <Card>
                    <CardHeader>
                      <CardTitle>Training Statistics</CardTitle>
                      <CardDescription>Analysis of your training data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Total Sessions</p>
                          <p className="text-2xl font-bold">{trainingLogs?.length || 0}</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Total Distance</p>
                          <p className="text-2xl font-bold">
                            {trainingLogs?.reduce((sum, log) => sum + (log.distance_km || 0), 0).toFixed(1)} km
                          </p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Total Duration</p>
                          <p className="text-2xl font-bold">
                            {trainingLogs?.reduce((sum, log) => sum + (log.duration_minutes || 0), 0)} min
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-8 text-center text-gray-400">
                        <p>More detailed statistics will be available soon</p>
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

export default TrainingLog;
