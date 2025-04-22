
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type UserRole = 'athlete' | 'coach' | 'scout' | null;

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isRoleLoading: boolean;
  setIsRoleLoading: (loading: boolean) => void;
}

const UserRoleContext = createContext<UserRoleContextType>({
  userRole: null,
  setUserRole: () => {},
  isRoleLoading: true,
  setIsRoleLoading: () => {},
});

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  const value = {
    userRole,
    setUserRole,
    isRoleLoading,
    setIsRoleLoading,
  };

  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>;
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
