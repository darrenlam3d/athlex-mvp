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
import { useAuth } from '@/contexts/AuthContext';
import { isUserRoleLoaded } from '@/utils/roleUtils';

const AthleteDashboard = () => {
  const { toast } = useToast();
  const { role, loading: authLoading, user } = useAuth();

  console.log("AthleteDashboard - Component rendering");
  console.log("AthleteDashboard - Auth state:", { role, authLoading, userExists: !!user });

  // Show auth loading state
  if (authLoading) {
    console.log("AthleteDashboard - Auth is still loading");
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading authentication...</span>
      </div>
    );
  }

  // Only redirect if user has a specific non-athlete role
  // This prevents redirects when role is empty or still loading
  if (isUserRoleLoaded(role) && role !== 'athlete') {
    console.log('AthleteDashboard - Redirecting - user role:', role);
    return <Navigate to={`/${role}-dashboard`} replace />;
  }

  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();
  console.log("AthleteDashboard - Supabase configured:", isConfigured);

  // Only fetch user role if Supabase is configured
  const { data: userData, isLoading: roleLoading, error: roleError } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      console.log("AthleteDashboard - Running userRole query function");
      if (!isConfigured) {
        console.log('AthleteDashboard - Using mock user role: athlete');
        return { role: 'athlete' };
      }
      
      try {
        const { data: userResponse } = await supabase.auth.getUser();
        console.log("AthleteDashboard - Supabase user response:", userResponse ? "received" : "none");
        
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', userResponse.user?.id)
          .single();
        
        if (error) {
          console.error("AthleteDashboard - Error fetching user data:", error);
          throw error;
        }
        
        console.log("AthleteDashboard - Fetched user data:", userData);
        return userData;
      } catch (error) {
        console.error("AthleteDashboard - Error in userRole query:", error);
        throw error;
      }
    },
    enabled: true, // Always run the query since we now handle non-configured Supabase
  });

  useEffect(() => {
    if (roleError) {
      console.error("AthleteDashboard - Role error:", roleError);
      toast({
        title: "Error",
        description: "Failed to load user role. Please try again.",
        variant: "destructive",
      });
    }
  }, [roleError, toast]);

  // If Supabase is not configured, show demo mode notice
  if (!isConfigured) {
    console.log('AthleteDashboard - Running in demo mode with mock data');
  }

  // If role is loading, show loading state
  if (roleLoading && isConfigured) {
    console.log("AthleteDashboard - Role is still loading");
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading dashboard...</span>
      </div>
    );
  }

  console.log("AthleteDashboard - Rendering full dashboard");
  return (
    <AthleteLayout>
      <div className="container mx-auto">
        {/* Current user role debug display */}
        <div className="bg-gray-800 p-2 rounded mb-4 text-sm">
          <p>Current user role: {role || 'loading...'}</p>
          <p>Auth loading: {authLoading ? 'true' : 'false'}</p>
          <p>Role loading: {roleLoading ? 'true' : 'false'}</p>
          <p>Supabase configured: {isConfigured ? 'true' : 'false'}</p>
        </div>
        
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
