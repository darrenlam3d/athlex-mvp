
import React, { createContext, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useSupabaseAuthState } from '@/hooks/useSupabaseAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';

// Define the user role type
export type UserRole = 'athlete' | 'scout' | 'coach' | null;

// Define the auth context type
interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: UserRole;
  loading: boolean;
  setUserRole: (role: UserRole) => void;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: { role?: UserRole, first_name?: string, last_name?: string }) => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, user, role, loading, setRole } = useSupabaseAuthState();
  const { updateUserProfile, signOut } = useAuthActions(user);

  const setUserRole = async (newRole: UserRole) => {
    setRole(newRole);
    
    if (newRole) {
      localStorage.setItem('userRole', newRole);
      if (user) {
        await updateUserProfile({ role: newRole });
      }
    } else {
      localStorage.removeItem('userRole');
    }
  };

  const contextValue: AuthContextType = {
    session,
    user,
    role,
    loading,
    setUserRole,
    signOut,
    updateUserProfile
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the auth context hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
