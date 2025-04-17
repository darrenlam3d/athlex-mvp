
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ScoutProfileFormValues } from '@/components/auth/types';
import { UniversalFormValues } from '@/components/auth/UniversalRegistrationForm';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useScoutRegistration = (universalFormData: UniversalFormValues | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserRole } = useAuth();

  const handleScoutSubmit = async (data: ScoutProfileFormValues) => {
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
            role: 'scout',
          }
        }
      });

      if (signUpError) throw signUpError;

      const { error } = await supabase
        .from('scout_profiles')
        .insert([{
          id: signUpData.user!.id,
          organization: data.organization,
          country: data.country,
          scouting_region: data.scoutingRegion,
          scouting_level: data.scoutingLevel,
          preferred_positions: data.preferredPositions || []
        }]);

      if (error) throw error;

      await setUserRole('scout');
      toast.success('Scout profile created successfully');
      window.location.href = '/scout-dashboard';
    } catch (error) {
      console.error('Error creating scout profile:', error);
      toast.error('Failed to create scout profile');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleScoutSubmit
  };
};
