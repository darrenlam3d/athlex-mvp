
import { Session, User } from '@supabase/supabase-js';

// Define the extended user interface to include role information
export interface UserWithRole extends User {
  role?: 'athlete' | 'coach';
}

// Define the type for our context
export interface AuthContextProps {
  user: UserWithRole | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  userRole: 'athlete' | 'coach' | null;
  checkUserRole: () => Promise<'athlete' | 'coach' | null>;
}
