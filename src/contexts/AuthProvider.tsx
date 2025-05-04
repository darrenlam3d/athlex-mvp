
import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from './AuthContext';
import { UserWithRole } from '@/types/auth';
import { checkUserRole as checkRole } from '@/utils/authUtils';

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
      const role = await checkRole(user);
      setUserRole(role);
      return role;
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
        // Fixed: Cast the User to UserWithRole
        setUser(currentSession?.user ? {...currentSession.user} as UserWithRole : null);
        
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
      // Fixed: Cast the User to UserWithRole
      setUser(currentSession?.user ? {...currentSession.user} as UserWithRole : null);
      
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
