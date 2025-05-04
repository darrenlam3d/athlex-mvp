
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'athlete' | 'coach';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading, isAuthenticated, userRole, checkUserRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check or refresh user role when component mounts
    if (isAuthenticated && !userRole) {
      checkUserRole();
    }
  }, [isAuthenticated, userRole, checkUserRole]);

  // If auth is still loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-athlex-accent"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If a role is required but the user doesn't have it, redirect to appropriate dashboard
  if (requiredRole && userRole !== requiredRole) {
    // If they're an athlete trying to access coach routes
    if (userRole === 'athlete' && requiredRole === 'coach') {
      return <Navigate to="/athlete/dashboard" state={{ from: location }} replace />;
    }
    
    // If they're a coach trying to access athlete routes
    if (userRole === 'coach' && requiredRole === 'athlete') {
      return <Navigate to="/coach/dashboard" state={{ from: location }} replace />;
    }
    
    // If role not yet determined, go to general dashboard
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // User is authenticated and has required role (or no specific role required)
  return <>{children}</>;
};

export default ProtectedRoute;
