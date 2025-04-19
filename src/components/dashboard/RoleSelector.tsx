
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserRole } from '@/contexts/UserRoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@/lib/supabase';

const RoleSelector = () => {
  const { userRole, setUserRole } = useUserRole();
  const { user, updateUserProfile } = useAuth();
  
  const handleRoleChange = async (newRole: string) => {
    const userRoleValue = newRole as 'athlete' | 'coach';
    
    try {
      // Set the user role in context
      setUserRole(userRoleValue);
      
      // If user is authenticated and not in demo mode, update their profile in the database
      if (user && !isDemoMode()) {
        // First update the profiles table
        await updateUserProfile({ role: userRoleValue });
        
        // If changing to athlete role, ensure they have athlete_stats entry
        if (userRoleValue === 'athlete') {
          // Check if athlete_stats entry exists
          const { data: existingStats } = await supabase
            .from('athlete_stats')
            .select('id')
            .eq('athlete_id', user.id)
            .maybeSingle();
            
          // If no stats exist, create a default entry
          if (!existingStats) {
            await supabase
              .from('athlete_stats')
              .insert({
                athlete_id: user.id,
                sport: 'General',
                height: 0,
                weight: 0,
                age: 0
              });
          }
        }
      }
      
      // Show a toast notification
      toast.success(`Switched to ${userRoleValue} role`, {
        description: `You now have ${userRoleValue} privileges.`,
        duration: 3000,
      });
      
      // Redirect to the appropriate dashboard
      window.location.href = `/${userRoleValue}-dashboard`;
    } catch (error) {
      console.error('Error changing role:', error);
      toast.error('Failed to update role', {
        description: 'Please try again or contact support.',
      });
    }
  };
  
  return (
    <Select value={userRole || undefined} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="athlete">Athlete</SelectItem>
        <SelectItem value="coach">Coach</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RoleSelector;
