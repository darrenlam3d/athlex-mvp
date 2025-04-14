
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Updated type to explicitly include empty string for initialization states
export type UserRole = 'athlete' | 'scout' | 'coach' | '';

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const { role: authRole, setUserRole: updateAuthRole } = useAuth();
  
  // Initialize with the role from AuthContext or fallback to localStorage
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    // First try to use the role from auth context
    if (authRole) return authRole as UserRole;
    
    // Fall back to localStorage if needed
    const storedRole = localStorage.getItem('userRole');
    return (storedRole as UserRole) || 'athlete';
  });

  // Update local state when auth role changes
  useEffect(() => {
    if (authRole) {
      setUserRoleState(authRole as UserRole);
    }
  }, [authRole]);

  // When role changes, update both local state and auth context
  const setUserRole = (newRole: UserRole) => {
    setUserRoleState(newRole);
    localStorage.setItem('userRole', newRole);
    
    // Also update the auth context role
    updateAuthRole(newRole as 'athlete' | 'scout' | 'coach' | null);
    
    console.log('User role updated to:', newRole);
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
