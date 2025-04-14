
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isUserRoleLoaded } from '@/utils/roleUtils';
import { Loader2 } from 'lucide-react';
import { isDemoMode } from '@/lib/supabase';

const Dashboard = () => {
  const { role, user, loading } = useAuth();
  
  useEffect(() => {
    console.log("Dashboard.tsx - Current user:", user?.email);
    console.log("Dashboard.tsx - Current user role:", role);
    console.log("Dashboard.tsx - Demo mode:", isDemoMode());
  }, [user, role]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading dashboard...</span>
      </div>
    );
  }
  
  // In real auth mode (not demo), check if user is authenticated
  if (!isDemoMode() && !user) {
    console.log("Dashboard - No authenticated user, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // If no role is loaded, redirect to login page
  if (!isUserRoleLoaded(role)) {
    console.log("Dashboard - No role loaded, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // Redirect based on role
  if (role === 'athlete') return <Navigate to="/athlete-dashboard" replace />;
  if (role === 'scout') return <Navigate to="/scout-dashboard" replace />;
  if (role === 'coach') return <Navigate to="/coach-dashboard" replace />;
  
  // Default fallback
  console.log("Dashboard - Unrecognized role, redirecting to login");
  return <Navigate to="/login" replace />;
};

export default Dashboard;
