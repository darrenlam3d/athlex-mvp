
import { useState } from 'react';
import { useUniversalRegistration } from './useUniversalRegistration';
import { useAthleteRegistration } from './useAthleteRegistration';
import { useCoachRegistration } from './useCoachRegistration';
import { useScoutRegistration } from './useScoutRegistration';
import type { Role } from '@/contexts/UserRoleContext';

export const useRoleRegistration = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  const { 
    isLoading: universalLoading,
    universalFormData,
    handleUniversalSubmit 
  } = useUniversalRegistration();

  const { 
    isLoading: athleteLoading,
    handleAthleteSubmit 
  } = useAthleteRegistration(universalFormData);

  const { 
    isLoading: coachLoading,
    handleCoachSubmit 
  } = useCoachRegistration(universalFormData);

  const { 
    isLoading: scoutLoading,
    handleScoutSubmit 
  } = useScoutRegistration(universalFormData);

  const isLoading = universalLoading || athleteLoading || coachLoading || scoutLoading;

  return {
    selectedRole,
    setSelectedRole,
    isLoading,
    handleUniversalSubmit,
    handleAthleteSubmit,
    handleCoachSubmit,
    handleScoutSubmit,
  };
};
