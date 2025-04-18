
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { isDemoMode } from '@/lib/supabase';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: 'athlete' | 'scout' | 'coach';
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiredRole }) => {
  const { role, user, loading } = useAuth();
  const location = useLocation();

  // Define public routes that don't require authentication
  const publicPaths = ['/', '/login', '/login-demo', '/registration'];
  const isPublicPath = publicPaths.includes(location.pathname);

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading authentication...</span>
      </div>
    );
  }

  // Allow access to public paths
  if (isPublicPath) {
    return <>{children}</>;
  }

  // Check if user is authenticated for protected routes
  if (!isDemoMode() && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific role is required, allow access
  if (!requiredRole) {
    return <>{children}</>;
  }

  // Check role match only after confirming authentication
  if (user && role !== requiredRole) {
    if (role === 'athlete') {
      return <Navigate to="/athlete/dashboard" replace />;
    } else if (role === 'scout') {
      return <Navigate to="/scout/dashboard" replace />;
    } else if (role === 'coach') {
      return <Navigate to="/coach/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
