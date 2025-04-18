
import React from 'react';
import ScoutLayout from '@/layouts/ScoutLayout';
import CoachLayout from '@/layouts/CoachLayout';
import { useUserRole } from '@/contexts/UserRoleContext';

interface AthleteDetailLayoutProps {
  children: React.ReactNode;
}

const AthleteDetailLayout: React.FC<AthleteDetailLayoutProps> = ({ children }) => {
  const { userRole } = useUserRole();

  if (userRole === 'coach') {
    return <CoachLayout>{children}</CoachLayout>;
  }
  
  // Default to Scout layout
  return <ScoutLayout>{children}</ScoutLayout>;
};

export default AthleteDetailLayout;
