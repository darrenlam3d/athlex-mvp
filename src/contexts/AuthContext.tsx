
import { createContext } from 'react';
import { AuthContextProps } from '@/types/auth';
import { AuthProvider } from './AuthProvider';
import { useAuth } from '@/hooks/useAuth';

// Create the context with a default value
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  isAuthenticated: false,
  userRole: null,
  checkUserRole: async () => null,
});

export { AuthProvider, useAuth };
