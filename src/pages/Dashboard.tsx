
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';

const Dashboard = () => {
  const { userRole } = useUserRole();
  
  return userRole === 'athlete' 
    ? <Navigate to="/profile" replace /> 
    : <Navigate to="/scout-dashboard" replace />;
};

export default Dashboard;
