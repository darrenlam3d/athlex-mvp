
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { CoachProfileFormValues, ScoutProfileFormValues } from './types';
import CoachRegistrationForm from './CoachRegistrationForm';
import ScoutRegistrationForm from './ScoutRegistrationForm';

type Role = 'coach' | 'scout';

const RoleRegistration = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUserRole } = useAuth();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleCoachSubmit = async (data: CoachProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('coach_profiles')
        .insert([
          {
            id: user.id,
            team_name: data.teamName,
            sport: data.sport,
            country: data.country,
            coaching_level: data.coachingLevel,
            age_groups: data.ageGroups || []
          }
        ]);

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
        .insert([
          {
            id: user.id,
            organization: data.organization,
            country: data.country,
            scouting_region: data.scoutingRegion,
            scouting_level: data.scoutingLevel,
            preferred_positions: data.preferredPositions || []
          }
        ]);

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

  if (!selectedRole) {
    return (
      <div className="flex flex-col items-center space-y-4 p-4">
        <h2 className="text-2xl font-bold mb-4">Choose Your Role</h2>
        <div className="flex gap-4">
          <Button
            onClick={() => handleRoleSelect('coach')}
            size="lg"
            variant="outline"
          >
            Register as Coach
          </Button>
          <Button
            onClick={() => handleRoleSelect('scout')}
            size="lg"
            variant="outline"
          >
            Register as Scout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4">
      {selectedRole === 'coach' ? (
        <CoachRegistrationForm onSubmit={handleCoachSubmit} isLoading={isLoading} />
      ) : (
        <ScoutRegistrationForm onSubmit={handleScoutSubmit} isLoading={isLoading} />
      )}
    </div>
  );
};

export default RoleRegistration;
