
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Updated type to explicitly include empty string for initialization states
export type UserRole = 'athlete' | 'scout' | 'coach' | '';

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  // Check if we have a stored role in localStorage
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const storedRole = localStorage.getItem('userRole');
    return (storedRole as UserRole) || 'athlete';
  });

  // When role changes, save to localStorage
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
    console.log('User role updated to:', userRole);
  }, [userRole]);

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
