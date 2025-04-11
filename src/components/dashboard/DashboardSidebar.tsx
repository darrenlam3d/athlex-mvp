
import React from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import AthleteSidebar from './AthleteSidebar';
import { Sidebar } from '@/components/ui/sidebar';

// This component is a wrapper that loads the appropriate sidebar based on user role
const DashboardSidebar = () => {
  const { userRole } = useUserRole();
  
  // For now, we'll just return the AthleteSidebar since that's what we're working with
  // In the future, we can add Coach and Scout sidebars based on the user's role
  return <AthleteSidebar />;
};

export default DashboardSidebar;
