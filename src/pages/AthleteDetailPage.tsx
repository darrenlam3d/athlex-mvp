
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';
import { useUserRole } from '@/contexts/UserRoleContext';
import { getAthleteById } from '@/utils/athleteDetailUtils';

// Import all the components we created
import AthleteHeader from '@/components/athlete/AthleteHeader';
import AthletePassport from '@/components/athlete/AthletePassport';
import RecentTraining from '@/components/athlete/RecentTraining';
import PerformanceMetrics from '@/components/athlete/PerformanceMetrics';
import GoalOverview from '@/components/athlete/GoalOverview';
import ScoutingActions from '@/components/athlete/ScoutingActions';

const AthleteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userRole } = useUserRole();
  
  // Redirect non-scouts away from this page
  if (userRole !== 'scout') {
    return <Navigate to="/athlete-dashboard" />;
  }

  // Query for athlete data
  const { data: athlete, isLoading } = useQuery({
    queryKey: ['athlete', id],
    queryFn: async () => {
      return await getAthleteById(id || '', isSupabaseConfigured(), supabase);
    }
  });

  const handleAddToShortlist = () => {
    toast.success(`${athlete?.name} added to shortlist`);
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
              <AthleteHeader 
                athlete={athlete} 
                onAddToShortlist={handleAddToShortlist} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Athlete Passport Summary and Recent Training */}
                <div className="md:col-span-1">
                  <AthletePassport athlete={athlete} />
                  <RecentTraining sessions={athlete?.training_sessions} />
                </div>
                
                {/* Right Column - Performance Data and Goals */}
                <div className="md:col-span-2">
                  <PerformanceMetrics performanceData={athlete?.performance_metrics} />
                  <GoalOverview goals={athlete?.goals} />
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
