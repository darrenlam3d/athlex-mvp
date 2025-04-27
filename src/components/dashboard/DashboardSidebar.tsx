
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AthleteSidebar from '@/components/athlete/AthleteSidebar';
import CoachSidebar from '@/components/coach/CoachSidebar';
import ScoutSidebar from '@/components/scout/ScoutSidebar';
import { Loader2 } from 'lucide-react';

// This component is a wrapper that loads the appropriate sidebar based on user role
const DashboardSidebar = () => {
  const { role, loading } = useAuth();
  
  console.log('DashboardSidebar - Current role:', role);
  console.log('DashboardSidebar - Loading state:', loading);
  
  if (loading) {
    return (
      <div className="w-64 bg-athlex-gray-900 flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-athlex-accent" />
      </div>
    );
  }
  
  // Return the appropriate sidebar based on user role
  if (role === 'coach') {
    console.log('DashboardSidebar - Rendering CoachSidebar');
    return <CoachSidebar />;
  }
  
  if (role === 'scout') {
    console.log('DashboardSidebar - Rendering ScoutSidebar');
    return <ScoutSidebar />;
  }
  
  console.log('DashboardSidebar - Rendering AthleteSidebar (default)');
  // Default to athlete sidebar
  return <AthleteSidebar />;
};

export default DashboardSidebar;
