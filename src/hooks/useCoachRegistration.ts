
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CoachProfileFormValues } from '@/components/auth/types';
import { UniversalFormValues } from '@/components/auth/UniversalRegistrationForm';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useCoachRegistration = (universalFormData: UniversalFormValues | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserRole } = useAuth();

  const handleCoachSubmit = async (data: CoachProfileFormValues) => {
    if (!universalFormData) {
      toast.error('Please complete your account details first');
      return;
    }
    
    setIsLoading(true);
    try {
      const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
        email: universalFormData.email,
        password: universalFormData.password,
        options: {
          data: {
            full_name: universalFormData.fullName,
            role: 'coach',
          }
        }
      });

      if (signUpError) throw signUpError;

      const { error } = await supabase
        .from('coach_profiles')
        .insert([{
          id: signUpData.user!.id,
          team_name: data.teamName,
          sport: data.sport,
          country: data.country,
          coaching_level: data.coachingLevel,
          age_groups: data.ageGroups || []
        }]);

      if (error) throw error;

      await setUserRole('coach');
      toast.success('Coach profile created successfully');
      window.location.href = '/coach-dashboard';
    } catch (error) {
      console.error('Error creating coach profile:', error);
      toast.error('Failed to create coach profile');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleCoachSubmit
  };
};
