
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserRole } from '@/contexts/UserRoleContext';
import { toast } from 'sonner';

const RoleSelector = () => {
  const { userRole, setUserRole } = useUserRole();
  
  const handleRoleChange = (newRole: string) => {
    const userRoleValue = newRole as 'athlete' | 'scout' | 'coach';
    
    // Set the user role
    setUserRole(userRoleValue);
    
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
