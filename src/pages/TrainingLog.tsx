
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useQuery } from '@tanstack/react-query';
import { isDemoMode } from '@/lib/supabase';
import TrainingLogList from '@/components/training/TrainingLogList';
import TrainingLogForm from '@/components/training/TrainingLogForm';
import TrainingCalendar from '@/components/training/TrainingCalendar';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar as CalendarIcon, List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTrainingLogs, mockTrainingSchedule } from '@/lib/mockData';
import { adaptTrainingSessions, adaptAssignedTrainings } from '@/utils/trainingAdapterUtils';

const TrainingLog = () => {
  const [isAddingTraining, setIsAddingTraining] = useState(false);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  
  // Fetch training logs
  const { data: trainingSessions, isLoading: isLoadingLogs, refetch: refetchLogs } = useQuery({
    queryKey: ['trainingLogs'],
    queryFn: async () => {
      if (!isDemoMode()) {
        // This would use Supabase in a real implementation
        console.log('Would fetch training logs from Supabase');
      }
      
      // In demo mode, return mock data
      return mockTrainingLogs;
    }
  });
  
  // Fetch training schedule
  const { data: trainingScheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ['trainingSchedule'],
    queryFn: async () => {
      if (!isDemoMode()) {
        // This would use Supabase in a real implementation
        console.log('Would fetch training schedule from Supabase');
      }
      
      // In demo mode, return mock data
      return mockTrainingSchedule;
    }
  });
  
  // Adapt data to the required formats
  const trainingLogs = trainingSessions ? adaptTrainingSessions(trainingSessions) : [];
  const trainingSchedule = trainingScheduleData ? adaptAssignedTrainings(trainingScheduleData) : [];
  
  const handleTrainingAdded = () => {
    setIsAddingTraining(false);
    refetchLogs();
  };
  
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold">Training Log</h1>
                
                <div className="flex space-x-2">
                  <Tabs defaultValue={view} onValueChange={(v) => setView(v as 'list' | 'calendar')} className="w-[200px]">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="list">
                        <List className="h-4 w-4 mr-2" />
                        List
                      </TabsTrigger>
                      <TabsTrigger value="calendar">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Calendar
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Button onClick={() => setIsAddingTraining(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Log Training
                  </Button>
                </div>
              </div>
              
              {/* Training Log Form */}
              {isAddingTraining && (
                <div className="mb-8">
                  <TrainingLogForm 
                    onSuccess={handleTrainingAdded} 
                    onCancel={() => setIsAddingTraining(false)} 
                  />
                </div>
              )}
              
              {/* Training Logs View */}
              {view === 'list' ? (
                <TrainingLogList 
                  trainingLogs={trainingLogs} 
                  isLoading={isLoadingLogs} 
                />
              ) : (
                <TrainingCalendar 
                  trainingLogs={trainingLogs} 
                  trainingSchedule={trainingSchedule} 
                  isLoading={isLoadingLogs || isLoadingSchedule} 
                />
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default TrainingLog;
