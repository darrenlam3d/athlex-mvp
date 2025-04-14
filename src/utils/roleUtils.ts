
import { UserRole } from '@/contexts/UserRoleContext';

// Utility function to check if a user role is valid
export const isValidRole = (role: UserRole): boolean => {
  return role === 'athlete' || role === 'scout' || role === 'coach';
};

// Utility function to check if a user role is loaded
export const isUserRoleLoaded = (role: UserRole): boolean => {
  return isValidRole(role);
};
