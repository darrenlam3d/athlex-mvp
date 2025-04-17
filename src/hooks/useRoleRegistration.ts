
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { 
  CoachProfileFormValues, 
  ScoutProfileFormValues,
  AthleteProfileFormValues 
} from '@/components/auth/types';

type Role = 'athlete' | 'coach' | 'scout';

// Define universal form values type
export interface UniversalFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRoleRegistration = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [universalFormData, setUniversalFormData] = useState<UniversalFormValues | null>(null);
  const { user, setUserRole } = useAuth();

  // Handle the universal form submission (account creation)
  const handleUniversalSubmit = async (data: UniversalFormValues) => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    try {
      // Store the universal form data for the next step
      setUniversalFormData(data);
      
      // Note: We don't actually sign up the user here
      // That will be done after profile completion
      toast.success('Account details saved! Complete your profile to finish registration.');
    } catch (error) {
      console.error('Error in universal registration step:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAthleteSubmit = async (data: AthleteProfileFormValues) => {
    if (!universalFormData) {
      toast.error('Please complete your account details first');
      return;
    }
    
    setIsLoading(true);
    try {
      // First sign up the user with universal data
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

      // Then create athlete profile
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'athlete' })
        .eq('id', signUpData.user!.id);

      if (error) throw error;

      // Then create athlete stats
      const { error: statsError } = await supabase
        .from('athlete_stats')
        .insert([{
          athlete_id: signUpData.user!.id,
          sport: data.sport,
          position: data.position || null,
          height: data.height || null,
          weight: data.weight || null
        }]);

      if (statsError) throw statsError;

      await setUserRole('athlete');
      toast.success('Athlete profile created successfully');
      
      // Redirect to athlete dashboard
      window.location.href = '/athlete-dashboard';
    } catch (error) {
      console.error('Error creating athlete profile:', error);
      toast.error('Failed to create athlete profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoachSubmit = async (data: CoachProfileFormValues) => {
    if (!universalFormData) {
      toast.error('Please complete your account details first');
      return;
    }
    
    setIsLoading(true);
    try {
      // First sign up the user with universal data
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
      
      // Redirect to coach dashboard
      window.location.href = '/coach-dashboard';
    } catch (error) {
      console.error('Error creating coach profile:', error);
      toast.error('Failed to create coach profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScoutSubmit = async (data: ScoutProfileFormValues) => {
    if (!universalFormData) {
      toast.error('Please complete your account details first');
      return;
    }
    
    setIsLoading(true);
    try {
      // First sign up the user with universal data
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
      
      // Redirect to scout dashboard
      window.location.href = '/scout-dashboard';
    } catch (error) {
      console.error('Error creating scout profile:', error);
      toast.error('Failed to create scout profile');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedRole,
    setSelectedRole,
    isLoading,
    universalFormData,
    setUniversalFormData,
    handleUniversalSubmit,
    handleAthleteSubmit,
    handleCoachSubmit,
    handleScoutSubmit
  };
};
