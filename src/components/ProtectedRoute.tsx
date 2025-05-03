
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'athlete' | 'coach' | 'scout';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Check if the user has the required role
  const checkUserRole = async () => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      return requiredRole ? data.role === requiredRole : true;
    } catch (error) {
      console.error("Error checking user role:", error);
      return false;
    }
  };

  // If auth is still loading, show nothing or a loading spinner
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If a role is required but the user doesn't have it, redirect to appropriate page
  if (requiredRole) {
    return checkUserRole() ? (
      <>{children}</>
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
  }

  // User is authenticated and has required role (or no specific role required)
  return <>{children}</>;
};

export default ProtectedRoute;
