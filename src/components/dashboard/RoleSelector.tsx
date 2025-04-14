
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserRole } from '@/contexts/UserRoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const RoleSelector = () => {
  const { userRole, setUserRole } = useUserRole();
  const { user, updateUserProfile } = useAuth();
  
  const handleRoleChange = async (newRole: string) => {
    const userRoleValue = newRole as 'athlete' | 'scout' | 'coach';
    
    // Set the user role
    setUserRole(userRoleValue);
    
    // If user is authenticated, update their profile in the database
    if (user) {
      await updateUserProfile({ role: userRoleValue });
    }
    
    // Show a toast notification
    toast.success(`Switched to ${userRoleValue} role`, {
      description: `You now have ${userRoleValue} privileges.`,
      duration: 3000,
    });
    
    // Redirect to the appropriate dashboard
    window.location.href = `/${userRoleValue}-dashboard`;
  };
  
  return (
    <Select value={userRole || undefined} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="athlete">Athlete</SelectItem>
        <SelectItem value="scout">Scout</SelectItem>
        <SelectItem value="coach">Coach</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RoleSelector;
