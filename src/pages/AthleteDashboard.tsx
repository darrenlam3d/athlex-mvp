
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast"; // <-- Fixed import
import AthleteSidebar from '@/components/dashboard/AthleteSidebar';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import TodaysTraining from '@/components/dashboard/TodaysTraining';
import PerformanceInsights from '@/components/dashboard/PerformanceInsights';
import GoalProgressPreview from '@/components/dashboard/GoalProgressPreview';
import QuickNavigation from '@/components/dashboard/QuickNavigation';
import { Loader2 } from 'lucide-react';

const AthleteDashboard = () => {
  const { toast } = useToast();

  // Fix the user data fetch to properly await the Promise
  const { data: userRole, isLoading: roleLoading, error: roleError } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: userResponse } = await supabase.auth.getUser();
      
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userResponse.user?.id)
        .single();
      
      if (error) throw error;
      return userData.role;
    },
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

  // If role is loading, show loading state
  if (roleLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading dashboard...</span>
      </div>
    );
  }

  // If user is not an athlete, redirect to appropriate dashboard
  if (userRole && userRole !== 'athlete') {
    return <Navigate to={`/${userRole}-dashboard`} replace />;
  }

  return (
    <div className="flex min-h-screen bg-athlex-background">
      <AthleteSidebar />
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold gradient-text mb-8">Athlete Dashboard</h1>
          
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
      </main>
    </div>
  );
};

export default AthleteDashboard;
