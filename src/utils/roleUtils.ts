
import { UserRole } from '@/contexts/UserRoleContext';

/**
 * Type guard to check if a user role is loaded (not empty string)
 */
export const isUserRoleLoaded = (role: UserRole): role is Exclude<UserRole, ""> => {
  return role !== "";
};

/**
 * Type guard to check if a user role is specific (not empty and matches a specific role)
 */
export const hasSpecificRole = (role: UserRole, specificRole: Exclude<UserRole, "">): boolean => {
  return isUserRoleLoaded(role) && role === specificRole;
};
