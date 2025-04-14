
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { isUserRoleLoaded } from '@/utils/roleUtils';
import AthleteLayout from '@/layouts/AthleteLayout';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import TodaysTraining from '@/components/dashboard/TodaysTraining';
import PerformanceInsights from '@/components/dashboard/PerformanceInsights';
import GoalProgressPreview from '@/components/dashboard/GoalProgressPreview';
import QuickNavigation from '@/components/dashboard/QuickNavigation';
import { Loader2, AlertTriangle, User } from 'lucide-react';
import { mockAthlete } from '@/lib/mockData';

const AthleteDashboard = () => {
  const { toast } = useToast();
  const { role, loading: authLoading, user } = useAuth();
  const [athleteName, setAthleteName] = useState("Athlete");

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
  if (isUserRoleLoaded(role) && role !== 'athlete' && role !== '') {
    console.log('AthleteDashboard - Redirecting - user role:', role);
    return <Navigate to={`/${role}-dashboard`} replace />;
  }

  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured();
  console.log("AthleteDashboard - Supabase configured:", isConfigured);

  // Fetch athlete profile data
  const { data: athleteData, isLoading: profileLoading } = useQuery({
    queryKey: ['athleteProfile'],
    queryFn: async () => {
      console.log("AthleteDashboard - Fetching athlete profile");
      if (!isConfigured) {
        console.log('AthleteDashboard - Using mock athlete data');
        return mockAthlete;
      }
      
      try {
        const { data: userResponse } = await supabase.auth.getUser();
        
        if (!userResponse?.user) {
          throw new Error("User not authenticated");
        }
        
        // Using any type to avoid TypeScript errors with the database schema
        const { data, error } = await supabase
          .from('athletes')
          .select('*')
          .eq('user_id', userResponse.user.id)
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching athlete profile:", error);
        throw error;
      }
    },
    // Using meta property for TanStack Query v5
    meta: {
      onSuccess: (data) => {
        if (data?.name) {
          setAthleteName(data.name.split(' ')[0] || "Athlete");
        }
      },
      onError: (error) => {
        console.error("AthleteDashboard - Profile fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Using default values.",
          variant: "destructive",
        });
      }
    }
  });

  // Side effect to update athlete name when data is available
  useEffect(() => {
    if (athleteData?.name) {
      setAthleteName(athleteData.name.split(' ')[0] || "Athlete");
    }
  }, [athleteData]);

  if (profileLoading && isConfigured) {
    return (
      <AthleteLayout>
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
            <span className="ml-2 text-lg">Loading profile data...</span>
          </div>
        </div>
      </AthleteLayout>
    );
  }
  
  return (
    <AthleteLayout>
      <div className="container mx-auto py-8 px-4 md:px-8">
        {/* Demo Mode Banner */}
        {!isConfigured && (
          <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-md p-3 mb-6 text-yellow-200 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span><strong>Demo Mode:</strong> This dashboard is showing simulated data.</span>
          </div>
        )}
        
        {/* Header with Welcome Message */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Welcome back, {athleteName}
            </h1>
            <p className="text-gray-400 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center bg-athlex-gray-800 p-2 rounded-full">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-athlex-accent to-purple-700 flex items-center justify-center mr-2">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-white mr-2 hidden md:inline">{athleteName}</span>
          </div>
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
        
        <div>
          <QuickNavigation />
        </div>
      </div>
    </AthleteLayout>
  );
};

export default AthleteDashboard;
