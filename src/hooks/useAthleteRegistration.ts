
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AthleteProfileFormValues } from '@/components/auth/types';
import { UniversalFormValues } from '@/components/auth/UniversalRegistrationForm';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useAthleteRegistration = (universalFormData: UniversalFormValues | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserRole } = useAuth();

  const handleAthleteSubmit = async (data: AthleteProfileFormValues) => {
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
            role: 'athlete',
          }
        }
      });

      if (signUpError) throw signUpError;

      const { error } = await supabase
        .from('athlete_stats')
        .insert([{
          athlete_id: signUpData.user!.id,
          sport: data.sport,
          position: data.position || null,
          height: data.height || null,
          weight: data.weight || null
        }]);

      if (error) throw error;

      await setUserRole('athlete');
      toast.success('Athlete profile created successfully');
      window.location.href = '/athlete-dashboard';
    } catch (error) {
      console.error('Error creating athlete profile:', error);
      toast.error('Failed to create athlete profile');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleAthleteSubmit
  };
};
