
import React from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import AthleteSidebar from './AthleteSidebar';
import ScoutSidebar from './ScoutSidebar';
import { Sidebar } from '@/components/ui/sidebar';

// This component is a wrapper that loads the appropriate sidebar based on user role
const DashboardSidebar = () => {
  const { userRole } = useUserRole();
  
  // Return the appropriate sidebar based on user role
  if (userRole === 'scout') {
    return <ScoutSidebar />;
  }
  
  // Default to athlete sidebar
  return <AthleteSidebar />;
};

export default DashboardSidebar;
