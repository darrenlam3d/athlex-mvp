
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'athlete' | 'scout' | 'coach';

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  toggleUserRole: () => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>('athlete');

  const toggleUserRole = () => {
    setUserRole(prevRole => {
      if (prevRole === 'athlete') return 'scout';
      if (prevRole === 'scout') return 'coach';
      return 'athlete';
    });
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole, toggleUserRole }}>
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
