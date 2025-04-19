
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for user roles
export type UserRole = 'athlete' | 'coach' | null;

// Define the context type
interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isRoleLoading: boolean;
  setIsRoleLoading: (loading: boolean) => void;
}

// Create the context with default values
const UserRoleContext = createContext<UserRoleContextType>({
  userRole: null,
  setUserRole: () => {},
  isRoleLoading: true,
  setIsRoleLoading: () => {},
});

// Create a provider component
export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  // These values are passed to consuming components
  const value = {
    userRole,
    setUserRole,
    isRoleLoading,
    setIsRoleLoading,
  };

  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>;
};

// Create a custom hook to use the context
export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
