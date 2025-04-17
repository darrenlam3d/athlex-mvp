
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { CoachProfileFormValues, ScoutProfileFormValues } from '@/components/auth/types';

type Role = 'coach' | 'scout';

export const useRoleRegistration = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUserRole } = useAuth();

  const handleCoachSubmit = async (data: CoachProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('coach_profiles')
        .insert([{
          id: user.id,
          team_name: data.teamName,
          sport: data.sport,
          country: data.country,
          coaching_level: data.coachingLevel,
          age_groups: data.ageGroups || []
        }]);

      if (error) throw error;

      await setUserRole('coach');
      toast.success('Coach profile created successfully');
    } catch (error) {
      console.error('Error creating coach profile:', error);
      toast.error('Failed to create coach profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScoutSubmit = async (data: ScoutProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('scout_profiles')
        .insert([{
          id: user.id,
          organization: data.organization,
          country: data.country,
          scouting_region: data.scoutingRegion,
          scouting_level: data.scoutingLevel,
          preferred_positions: data.preferredPositions || []
        }]);

      if (error) throw error;

      await setUserRole('scout');
      toast.success('Scout profile created successfully');
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
    handleCoachSubmit,
    handleScoutSubmit
  };
};
