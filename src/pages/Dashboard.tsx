
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isUserRoleLoaded } from '@/utils/roleUtils';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { role, loading } = useAuth();
  
  console.log("Dashboard.tsx - Current user role:", role);
  
  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading dashboard...</span>
      </div>
    );
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
