import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import ActiveGoalsList from '@/components/goals/ActiveGoalsList';
import NewGoalForm from '@/components/goals/NewGoalForm';
import GoalHistorySection from '@/components/goals/GoalHistorySection';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Loader2 } from 'lucide-react';

// Mock data for performance goals
const mockGoals = [
  {
    goal_id: "goal_001",
    metric: "Speed (km/h)",
    target_value: 25.0,
    current_value: 23.5,
    start_date: "2025-03-25",
    end_date: "2025-04-20",
    progress_percent: 94,
    status: "In Progress"
  },
  {
    goal_id: "goal_002",
    metric: "Endurance Score",
    target_value: 90,
    current_value: 88,
    start_date: "2025-03-28",
    end_date: "2025-04-18",
    progress_percent: 98,
    status: "In Progress"
  },
  {
    goal_id: "goal_003",
    metric: "Agility Test (seconds)",
    target_value: 9.5,
    current_value: 10.2,
    start_date: "2025-04-01",
    end_date: "2025-04-30",
    progress_percent: 79,
    status: "In Progress"
  }
];

// Mock form fields for creating a new goal
const mockFormFields = {
  fields: [
    { label: "Performance Metric", type: "select", options: ["Speed", "Endurance Score", "Agility", "Distance", "Stamina"] },
    { label: "Target Value", type: "number" },
    { label: "Start Date", type: "date" },
    { label: "End Date", type: "date" }
  ]
};

const PerformanceGoals = () => {
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  
  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();

  // Fetch performance goals
  const { data: goals, isLoading, error, refetch } = useQuery({
    queryKey: ['performanceGoals'],
    queryFn: async () => {
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log('Using mock goals data');
        return mockGoals;
      }
      
      // Otherwise, fetch from Supabase
      const { data: user } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('performance_goals')
        .select('*')
        .eq('user_id', user.user?.id);
      
      if (error) throw error;
      return data;
    },
  });

  const handleGoalCreated = () => {
    setIsCreatingGoal(false);
    refetch();
    toast.success('New goal created successfully!');
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Performance Goals</h1>
                
                {!isConfigured && (
                  <div className="flex items-center px-4 py-2 bg-yellow-900/30 border border-yellow-600/30 rounded-md text-yellow-200 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span>Demo Mode: Using mock data</span>
                  </div>
                )}
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
                </div>
              ) : error ? (
                <Card className="border-red-800 bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="text-red-400">Error Loading Goals</CardTitle>
                    <CardDescription className="text-red-300">
                      {error.message || "There was an error loading your performance goals."}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <>
                  {/* Active Goals List */}
                  <div className="mb-8">
                    <ActiveGoalsList goals={goals || []} onCreateGoal={() => setIsCreatingGoal(true)} />
                  </div>
                  
                  {/* New Goal Form */}
                  {isCreatingGoal && (
                    <div className="mb-8">
                      <NewGoalForm 
                        formFields={mockFormFields.fields} 
                        onSuccess={handleGoalCreated} 
                        onCancel={() => setIsCreatingGoal(false)} 
                      />
                    </div>
                  )}
                  
                  {/* Goal History */}
                  <div className="mb-8">
                    <GoalHistorySection />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default PerformanceGoals;
