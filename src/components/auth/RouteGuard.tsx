
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isUserRoleLoaded } from '@/utils/roleUtils';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: 'athlete' | 'scout' | 'coach';
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiredRole }) => {
  const { role, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading authentication...</span>
      </div>
    );
  }
  
  // If no specific role is required, just render the children
  if (!requiredRole) {
    return <>{children}</>;
  }
  
  // If a role is required and the user doesn't have it
  if (isUserRoleLoaded(role) && role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }
  
  // If the user has the required role or no role is loaded yet
  return <>{children}</>;
};

export default RouteGuard;
