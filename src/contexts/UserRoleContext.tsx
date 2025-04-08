
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'athlete' | 'scout';

interface UserRoleContextType {
  userRole: UserRole;
  toggleUserRole: () => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>('athlete');

  const toggleUserRole = () => {
    setUserRole(prevRole => prevRole === 'athlete' ? 'scout' : 'athlete');
  };

  return (
    <UserRoleContext.Provider value={{ userRole, toggleUserRole }}>
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
