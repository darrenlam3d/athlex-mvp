
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isUserRoleLoaded } from '@/utils/roleUtils';
import { Loader2 } from 'lucide-react';
import { isDemoMode } from '@/lib/supabase';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: 'athlete' | 'scout' | 'coach';
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiredRole }) => {
  const { role, user, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading authentication...</span>
      </div>
    );
  }
  
  // In real auth mode (not demo), check if user is authenticated
  if (!isDemoMode() && !user) {
    console.log("RouteGuard - No authenticated user, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // If no specific role is required, just render the children
  if (!requiredRole) {
    return <>{children}</>;
  }
  
  // Check if role is loaded and if it doesn't match the required role
  if (isUserRoleLoaded(role) && role !== requiredRole) {
    console.log(`RouteGuard - User role ${role} doesn't match required role ${requiredRole}, redirecting to dashboard`);
    // Redirect to the dashboard instead of login since the user is authenticated
    // The dashboard will handle redirecting to the correct role-specific dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  // If the user has the required role or no role is loaded yet
  return <>{children}</>;
};

export default RouteGuard;
