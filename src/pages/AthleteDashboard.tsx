
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import TodaysTraining from '@/components/dashboard/TodaysTraining';
import PerformanceInsights from '@/components/dashboard/PerformanceInsights';
import GoalProgressPreview from '@/components/dashboard/GoalProgressPreview';
import QuickNavigation from '@/components/dashboard/QuickNavigation';
import { Loader2, AlertTriangle } from 'lucide-react';
import { mockAthlete } from '@/lib/mockData';
import AthleteLayout from '@/layouts/AthleteLayout';
import { useUserRole } from '@/contexts/UserRoleContext';

const AthleteDashboard = () => {
  const { toast } = useToast();
  const { userRole } = useUserRole();

  // If user is not an athlete, redirect to the appropriate dashboard
  if (userRole && userRole !== 'athlete') {
    return <Navigate to={`/${userRole}-dashboard`} replace />;
  }

  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();

  // Only fetch user role if Supabase is configured
  const { data: userData, isLoading: roleLoading, error: roleError } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      if (!isConfigured) {
        console.log('Using mock user role: athlete');
        return { role: 'athlete' };
      }
      
      const { data: userResponse } = await supabase.auth.getUser();
      
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userResponse.user?.id)
        .single();
      
      if (error) throw error;
      return userData;
    },
    enabled: true, // Always run the query since we now handle non-configured Supabase
  });

  useEffect(() => {
    if (roleError) {
      toast({
        title: "Error",
        description: "Failed to load user role. Please try again.",
        variant: "destructive",
      });
    }
  }, [roleError, toast]);

  // If Supabase is not configured, show demo mode notice
  if (!isConfigured) {
    console.log('Running Athlete Dashboard in demo mode with mock data');
  }

  // If role is loading, show loading state
  if (roleLoading && isConfigured) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <AthleteLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Athlete Dashboard</h1>
          
          {!isConfigured && (
            <div className="flex items-center px-4 py-2 bg-yellow-900/30 border border-yellow-600/30 rounded-md text-yellow-200 text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Demo Mode: Using mock data</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PerformanceChart />
          <div className="grid grid-cols-1 gap-6">
            <TodaysTraining />
            <PerformanceInsights />
          </div>
        </div>
        
        <div className="mb-8">
          <GoalProgressPreview />
        </div>
        
        <QuickNavigation />
      </div>
    </AthleteLayout>
  );
};

export default AthleteDashboard;
