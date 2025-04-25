
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AthleteSidebar from '@/components/athlete/AthleteSidebar';
import CoachSidebar from '@/components/coach/CoachSidebar';
import ScoutSidebar from '@/components/scout/ScoutSidebar';

// This component is a wrapper that loads the appropriate sidebar based on user role
const DashboardSidebar = () => {
  const { role } = useAuth();
  
  // Return the appropriate sidebar based on user role
  if (role === 'coach') {
    return <CoachSidebar />;
  }
  
  if (role === 'scout') {
    return <ScoutSidebar />;
  }
  
  // Default to athlete sidebar
  return <AthleteSidebar />;
};

export default DashboardSidebar;
