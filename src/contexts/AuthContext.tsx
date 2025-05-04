
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";

// Define the extended user interface to include role information
interface UserWithRole extends User {
  role?: 'athlete' | 'coach';
}

// Define the type for our context
interface AuthContextProps {
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

// Hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps your app and provides the auth context value
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'athlete' | 'coach' | null>(null);
  const { toast } = useToast();

  const checkUserRole = async (): Promise<'athlete' | 'coach' | null> => {
    if (!user) return null;
    
    try {
      // Check if user is an athlete
      const { data: athlete, error: athleteError } = await supabase
        .from('athletes')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
      
      if (athlete) {
        setUserRole('athlete');
        return 'athlete';
      }
      
      // If not an athlete, check if user is a coach
      const { data: coach, error: coachError } = await supabase
        .from('coaches')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
      
      if (coach) {
        setUserRole('coach');
        return 'coach';
      }
      
      return null;
    } catch (error) {
      console.error('Error checking user role:', error);
      return null;
    }
  };

  // Effect to handle auth state changes
  useEffect(() => {
    // First set up the auth state listener to handle changes in real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && currentSession?.user) {
          console.log('User signed in', currentSession?.user);
          // Don't call checkUserRole directly within onAuthStateChange to avoid potential deadlock
          setTimeout(() => {
            checkUserRole();
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Then check for an existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await checkUserRole();
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to sign up a new user
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Could not complete registration",
        variant: "destructive",
      });
      return { error };
    }
  };

  // Function to sign in a user
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
      return { error };
    }
  };

  // Function to sign out a user
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserRole(null);
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out",
        variant: "destructive",
      });
    }
  };

  // Value provided to consuming components
  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
    userRole,
    checkUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
