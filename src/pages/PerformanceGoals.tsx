import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useQuery } from '@tanstack/react-query';
import { supabase, isDemoMode } from '@/lib/supabase';
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

// Mock data for goals
const mockActiveGoals: Goal[] = [
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
];

const mockCompletedGoals: Goal[] = [
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
];

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
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  
  // Redirect scouts to their dashboard
  if (userRole === 'scout') {
    return <Navigate to="/scout-dashboard" replace />;
  }
  
  // Rest of the component remains unchanged
  const isConfigured = !isDemoMode();

  // Use React Query to fetch goals
  const { data: goalsData, isLoading, error, refetch } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      if (!isDemoMode()) {
        try {
          console.log('Would fetch goals from Supabase');
        } catch (error) {
          console.error('Error fetching goals:', error);
        }
      }
      
      // Return mock data in demo mode
      return {
        activeGoals: mockActiveGoals,
        goalHistory: mockCompletedGoals
      };
    }
  });

  // Handle refetch
  const handleGoalAdded = () => {
    refetch();
    setShowNewGoalForm(false);
  };
  
  const handleCreateGoal = () => {
    // Function to handle "Create Goal" button click
    setShowNewGoalForm(true);
  };
  
  const handleCancelGoalCreation = () => {
    // Function to handle cancel button click
    setShowNewGoalForm(false);
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
              {showNewGoalForm && (
                <div className="mt-8">
                  <NewGoalForm 
                    formFields={formFields}
                    onSuccess={handleGoalAdded}
                    onCancel={handleCancelGoalCreation}
                  />
                </div>
              )}
              
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
