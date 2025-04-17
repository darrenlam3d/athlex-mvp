
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

export const useRoleRegistration = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUserRole } = useAuth();

  const handleAthleteSubmit = async (data: AthleteProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // First create athlete profile
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'athlete' })
        .eq('id', user.id);

      if (error) throw error;

      // Then create athlete stats
      const { error: statsError } = await supabase
        .from('athlete_stats')
        .insert([{
          athlete_id: user.id,
          sport: data.sport,
          position: data.position || null,
          height: data.height || null,
          weight: data.weight || null
        }]);

      if (statsError) throw statsError;

      await setUserRole('athlete');
      toast.success('Athlete profile created successfully');
    } catch (error) {
      console.error('Error creating athlete profile:', error);
      toast.error('Failed to create athlete profile');
    } finally {
      setIsLoading(false);
    }
  };

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
    handleAthleteSubmit,
    handleCoachSubmit,
    handleScoutSubmit
  };
};
