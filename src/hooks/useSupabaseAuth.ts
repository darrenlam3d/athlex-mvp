
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { UserRole } from '@/contexts/AuthContext';

interface UseSupabaseAuthReturn {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: UserRole;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: {
    first_name?: string;
    last_name?: string;
    role?: UserRole;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: {
    role?: UserRole;
    first_name?: string;
    last_name?: string;
    bio?: string;
    avatar_url?: string;
  }) => Promise<void>;
}

export function useSupabaseAuth(): UseSupabaseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole>(null);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch user profile including role
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, first_name, last_name')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      return null;
    }
  };

  // Initialize auth state on component mount
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase Auth
          setTimeout(async () => {
            const profile = await fetchUserProfile(newSession.user!.id);
            if (profile) {
              setRole(profile.role as UserRole);
            }
          }, 0);
        } else {
          setRole(null);
        }
        
        setLoading(false);
      }
    );

    // Get current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        if (profile) {
          setRole(profile.role as UserRole);
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      setSession(data.session);
      setUser(data.user);
      
      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        if (profile) {
          setRole(profile.role as UserRole);
        }
      }
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (
    email: string, 
    password: string,
    userData: {
      first_name?: string;
      last_name?: string;
      role?: UserRole;
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            role: userData.role || 'athlete',
          }
        }
      });
      
      if (error) throw error;
      
      setSession(data.session);
      setUser(data.user);
      setRole(userData.role || 'athlete');
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setSession(null);
      setUser(null);
      setRole(null);
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (
    updates: {
      role?: UserRole;
      first_name?: string;
      last_name?: string;
      bio?: string;
      avatar_url?: string;
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      if (updates.role) {
        setRole(updates.role);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading,
    role,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile
  };
}
