
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';

const Dashboard = () => {
  const { userRole } = useUserRole();
  
  console.log("Dashboard.tsx - Current user role:", userRole);
  
  // Handling empty string case - redirect to athlete dashboard by default
  if (!userRole || userRole === '' as UserRole) return <Navigate to="/athlete-dashboard" replace />;
  
  // Redirect based on role
  if (userRole === 'athlete') return <Navigate to="/athlete-dashboard" replace />;
  if (userRole === 'scout') return <Navigate to="/scout-dashboard" replace />;
  if (userRole === 'coach') return <Navigate to="/coach-dashboard" replace />;
  
  // Default fallback
  return <Navigate to="/athlete-dashboard" replace />;
};

export default Dashboard;
