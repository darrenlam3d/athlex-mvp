
import { UserRole } from '@/contexts/AuthContext';

// Utility function to check if a user role is valid
export const isValidRole = (role: UserRole): boolean => {
  return role === 'athlete' || role === 'scout' || role === 'coach';
};

// Utility function to check if a user role is loaded
export const isUserRoleLoaded = (role: UserRole): boolean => {
  // When role is an empty string, it's not loaded yet
  if (role === '' as UserRole) return false;
  
  return role !== null && isValidRole(role);
};

// Get dashboard path for a specific role
export const getRoleDashboardPath = (role: UserRole): string => {
  if (role === 'athlete') return '/athlete-dashboard';
  if (role === 'scout') return '/scout-dashboard';
  if (role === 'coach') return '/coach-dashboard';
  return '/login'; // Default fallback
};

// Get user-friendly role name
export const getRoleName = (role: UserRole): string => {
  if (role === 'athlete') return 'Athlete';
  if (role === 'scout') return 'Scout';
  if (role === 'coach') return 'Coach';
  return 'User';
};
