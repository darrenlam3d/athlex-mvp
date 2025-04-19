
import React from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import AthleteSidebar from './AthleteSidebar';
import CoachSidebar from './CoachSidebar';

// This component is a wrapper that loads the appropriate sidebar based on user role
const DashboardSidebar = () => {
  const { userRole } = useUserRole();
  
  // Return the appropriate sidebar based on user role
  if (userRole === 'coach') {
    return <CoachSidebar />;
  }
  
  // Default to athlete sidebar
  return <AthleteSidebar />;
};

export default DashboardSidebar;
