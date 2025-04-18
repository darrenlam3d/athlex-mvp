
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Updated type to explicitly include empty string for initialization states
export type UserRole = 'athlete' | 'scout' | 'coach' | '';

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  clearRole: () => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const { role: authRole, setUserRole: updateAuthRole } = useAuth();
  const [userRole, setUserRoleState] = useState<UserRole>('');

  // Initialize with the role from AuthContext
  useEffect(() => {
    if (authRole) {
      setUserRoleState(authRole as UserRole);
    }
  }, [authRole]);

  // When role changes, update both local state and auth context
  const setUserRole = (newRole: UserRole) => {
    setUserRoleState(newRole);
    updateAuthRole(newRole as 'athlete' | 'scout' | 'coach' | null);
    console.log('User role updated to:', newRole);
  };

  // Clear role state
  const clearRole = () => {
    setUserRoleState('');
    localStorage.removeItem('userRole');
    console.log('User role cleared');
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole, clearRole }}>
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
