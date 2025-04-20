
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isUserRoleLoaded } from '@/utils/roleUtils';
import { Loader2 } from 'lucide-react';
import { isDemoMode } from '@/lib/supabase';
import type { UserRole } from '@/contexts/UserRoleContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiredRole }) => {
  const { role, user, loading } = useAuth();
  const location = useLocation();
  
  const isFromDemoLogin = location.state?.fromDemoLogin === true;
  const isInDemoMode = isDemoMode() || isFromDemoLogin;
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading authentication...</span>
      </div>
    );
  }
  
  if (!isInDemoMode && !user) {
    console.log("RouteGuard - No authenticated user, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  if (!requiredRole) {
    return <>{children}</>;
  }
  
  if (isUserRoleLoaded(role) && role !== requiredRole) {
    console.log(`RouteGuard - User role ${role} doesn't match required role ${requiredRole}, redirecting to dashboard`);
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default RouteGuard;
