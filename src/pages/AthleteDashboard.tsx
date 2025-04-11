
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast"; // <-- Fixed import
import AthleteSidebar from '@/components/dashboard/AthleteSidebar';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import TodaysTraining from '@/components/dashboard/TodaysTraining';
import PerformanceInsights from '@/components/dashboard/PerformanceInsights';
import GoalProgressPreview from '@/components/dashboard/GoalProgressPreview';
import QuickNavigation from '@/components/dashboard/QuickNavigation';
import { Loader2, AlertTriangle } from 'lucide-react';

const AthleteDashboard = () => {
  const { toast } = useToast();

  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();

  // Only fetch user role if Supabase is configured
  const { data: userRole, isLoading: roleLoading, error: roleError } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      if (!isConfigured) {
        throw new Error('Supabase is not configured');
      }
      
      const { data: userResponse } = await supabase.auth.getUser();
      
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userResponse.user?.id)
        .single();
      
      if (error) throw error;
      return userData.role;
    },
    enabled: isConfigured, // Only run query if Supabase is configured
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

  // If Supabase is not configured, show configuration error
  if (!isConfigured) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-athlex-background text-white p-6">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
        <p className="text-center max-w-md mb-6">
          Supabase environment variables are missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.
        </p>
        <div className="p-4 bg-athlex-gray-800 rounded-md text-sm font-mono max-w-md overflow-auto">
          <p><strong>VITE_SUPABASE_URL</strong>: Your Supabase project URL</p>
          <p><strong>VITE_SUPABASE_ANON_KEY</strong>: Your Supabase anon/public key</p>
        </div>
      </div>
    );
  }

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
