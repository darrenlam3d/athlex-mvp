
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import ActiveGoalsList from '@/components/goals/ActiveGoalsList';
import NewGoalForm from '@/components/goals/NewGoalForm';
import GoalHistorySection from '@/components/goals/GoalHistorySection';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Navigate } from 'react-router-dom';

// Define types to match the components
interface Goal {
  id: string;
  goal_id: string;
  title: string;
  description: string;
  current_value: number;
  target_value: number;
  unit: string;
  start_date: string;
  end_date: string;
  category: string;
  status: string;
  metric: string;
  progress_percent: number;
}

// Ensure these match the component interfaces
const formFields = [
  {
    label: "Performance Metric",
    type: "select",
    options: [
      "Sprint Speed",
      "Vertical Jump",
      "Agility Test",
      "Distance Run",
      "Passing Accuracy",
      "Shot Power",
      "1RM Squat",
      "Reaction Time"
    ]
  }
];

const PerformanceGoals = () => {
  const { userRole } = useUserRole();
  
  // Redirect scouts to their dashboard
  if (userRole === 'scout') {
    return <Navigate to="/scout-dashboard" replace />;
  }
  
  // Rest of the component remains unchanged
  const isConfigured = isSupabaseConfigured();

  // Use React Query to fetch goals
  const { data: goalsData, isLoading, error, refetch } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      if (!isConfigured) {
        // Return mock data in demo mode
        return {
          activeGoals: [
            {
              id: 'goal1',
              goal_id: 'goal1',
              title: 'Improve sprint speed',
              description: 'Increase top sprint speed by 5%',
              current_value: 28,
              target_value: 32,
              unit: 'km/h',
              start_date: '2025-03-15',
              end_date: '2025-05-15',
              category: 'speed',
              status: 'In Progress',
              metric: 'Sprint Speed',
              progress_percent: 70
            },
            {
              id: 'goal2',
              goal_id: 'goal2',
              title: 'Increase vertical jump',
              description: 'Reach 30 inch vertical jump',
              current_value: 26,
              target_value: 30,
              unit: 'inches',
              start_date: '2025-03-01',
              end_date: '2025-06-01',
              category: 'strength',
              status: 'Not Started',
              metric: 'Vertical Jump',
              progress_percent: 40
            }
          ],
          goalHistory: [
            {
              id: 'goal3',
              goal_id: 'goal3',
              title: 'Improve passing accuracy',
              description: 'Increase passing accuracy to 85%',
              current_value: 85,
              target_value: 85,
              unit: '%',
              start_date: '2025-01-15',
              end_date: '2025-03-15',
              category: 'technique',
              status: 'Completed',
              metric: 'Passing Accuracy',
              progress_percent: 100
            }
          ]
        };
      }

      // Actual data fetching logic would be here
      // Fetch active goals
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error('User not authenticated');
      }
      
      const { data: activeGoals, error: activeGoalsError } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('status', 'active');
      
      if (activeGoalsError) throw activeGoalsError;
      
      // Fetch goal history
      const { data: goalHistory, error: historyError } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('status', 'completed')
        .order('target_date', { ascending: false });
      
      if (historyError) throw historyError;
      
      return {
        activeGoals: activeGoals || [],
        goalHistory: goalHistory || []
      };
    }
  });

  // Handle refetch
  const handleGoalAdded = () => {
    refetch();
  };
  
  const handleCreateGoal = () => {
    // Function to handle "Create Goal" button click
    console.log("Create new goal clicked");
  };
  
  const handleCancelGoalCreation = () => {
    // Function to handle cancel button click
    console.log("Goal creation cancelled");
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Performance Goals</h1>
              
              {/* Active Goals - Fixed props */}
              <ActiveGoalsList 
                goals={goalsData?.activeGoals || []}
                onCreateGoal={handleCreateGoal}
              />
              
              {/* New Goal Form - Fixed props */}
              <div className="mt-8">
                <NewGoalForm 
                  formFields={formFields}
                  onSuccess={handleGoalAdded}
                  onCancel={handleCancelGoalCreation}
                />
              </div>
              
              {/* Goal History - Fixed props */}
              <div className="mt-12">
                <GoalHistorySection 
                  goals={goalsData?.goalHistory || []}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default PerformanceGoals;
