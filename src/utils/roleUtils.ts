
import { UserRole } from '@/contexts/UserRoleContext';

// Update valid roles to include athlete, coach, and scout
export const isValidRole = (role: UserRole): boolean => {
  return role === 'athlete' || role === 'coach' || role === 'scout';
};

export const isUserRoleLoaded = (role: UserRole): boolean => {
  if (role === '' as UserRole) return false;
  return role !== null && isValidRole(role);
};

export const getRoleDashboardPath = (role: UserRole): string => {
  if (role === 'athlete') return '/athlete/dashboard';
  if (role === 'coach') return '/coach/dashboard';
  if (role === 'scout') return '/scout/dashboard';
  return '/login'; // Default fallback
};

export const getRoleName = (role: UserRole): string => {
  if (role === 'athlete') return 'Athlete';
  if (role === 'coach') return 'Coach';
  if (role === 'scout') return 'Scout';
  return 'User';
};
