
import { useState } from 'react';
import { useUniversalRegistration } from './useUniversalRegistration';
import { useAthleteRegistration } from './useAthleteRegistration';
import { useCoachRegistration } from './useCoachRegistration';
import type { UserRole } from '@/contexts/UserRoleContext';

export const useRoleRegistration = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
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

  const isLoading = universalLoading || athleteLoading || coachLoading;

  return {
    selectedRole,
    setSelectedRole,
    isLoading,
    handleUniversalSubmit,
    handleAthleteSubmit,
    handleCoachSubmit,
  };
};
