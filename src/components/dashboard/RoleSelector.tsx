
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const RoleSelector = () => {
  const { role, setUserRole } = useAuth();
  
  const handleRoleChange = (newRole: string) => {
    const userRole = newRole as 'athlete' | 'scout' | 'coach';
    
    // Set the user role
    setUserRole(userRole);
    
    // Show a toast notification
    toast.success(`Switched to ${userRole} role`, {
      description: `You now have ${userRole} privileges.`,
      duration: 3000,
    });
    
    // Redirect to the appropriate dashboard
    window.location.href = `/${userRole}-dashboard`;
  };
  
  return (
    <Select value={role || undefined} onValueChange={handleRoleChange}>
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
