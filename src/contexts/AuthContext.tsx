import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile data including role
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error.message);
        return null;
      }

      return data?.role as UserRole;
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      return null;
    }
  };

  // Function to fetch the user data
  const fetchUser = async () => {
    console.info('AuthContext - fetchUser - Starting');
    
    // Check if we have a stored role in localStorage
    const storedRole = localStorage.getItem('userRole') as UserRole;
    console.info('AuthContext - Stored role:', storedRole);
    
    // Check if we have a valid Supabase configuration
    const hasSupabaseConfig = typeof supabase !== 'undefined';
    console.info('AuthContext - Supabase configured:', hasSupabaseConfig);
    
    if (hasSupabaseConfig && !isDemoMode()) {
      try {
        // Get the current session from Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthContext - Error fetching session:', error.message);
        } else {
          console.info('AuthContext - Session data:', data.session ? 'received' : 'null');
          
          if (data.session?.user) {
            setSession(data.session);
            setUser(data.session.user);
            
            // Fetch the user's role from the profiles table
            const userRole = await fetchUserProfile(data.session.user.id);
            
            if (userRole) {
              console.info('AuthContext - User role from database:', userRole);
              setRole(userRole);
              // Update localStorage to keep role in sync
              localStorage.setItem('userRole', userRole);
            } else if (storedRole) {
              // Fallback to stored role if profile fetch fails
              console.info('AuthContext - Falling back to stored role:', storedRole);
              setRole(storedRole);
            }
          } else {
            // No current user, use the stored role if available
            if (storedRole) {
              console.info('AuthContext - No current user, using stored role:', storedRole);
              setRole(storedRole);
            }
          }
        }
      } catch (error) {
        console.error('AuthContext - Unexpected error:', error);
      }
    } else {
      // No Supabase config or in demo mode, use the stored role if available
      if (storedRole) {
        console.info('AuthContext - No Supabase config or in demo mode, using stored role:', storedRole);
        setRole(storedRole);
      }
    }
    
    // Set loading to false
    setLoading(false);
    console.info('AuthContext - Current user:', user?.email, 'Role:', role, 'Loading:', loading);
  };
  
  // Function to set the user role
  const setUserRole = async (newRole: UserRole) => {
    setRole(newRole);
    
    if (newRole) {
      localStorage.setItem('userRole', newRole);
      
      // If we have a user, update their profile in the database
      if (user && !isDemoMode()) {
        await updateUserProfile({ role: newRole });
      }
    } else {
      localStorage.removeItem('userRole');
    }
  };
  
  // Function to sign out
  const signOut = async () => {
    if (!isDemoMode()) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Error signing out:', error.message);
        toast.error('Error signing out');
      }
    }
    
    // Clear session and user data
    setSession(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem('userRole');
    
    toast.success('Signed out successfully');
    
    // Redirect to home page
    window.location.href = '/';
  };
  
  // Function to update user profile
  const updateUserProfile = async (updates: { role?: UserRole, first_name?: string, last_name?: string }) => {
    if (!user || isDemoMode()) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) {
        throw error;
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast.error('Error updating profile');
    }
  };
  
  // Fetch the user on component mount
  useEffect(() => {
    fetchUser();
    
    // Set up an auth state change listener
    if (typeof supabase !== 'undefined') {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
        console.info('AuthContext - Auth state changed, event:', event);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          // Defer the profile fetch to avoid blocking the auth event
          if (newSession?.user) {
            setTimeout(() => {
              fetchUserProfile(newSession.user!.id).then(userRole => {
                if (userRole) {
                  setRole(userRole);
                  localStorage.setItem('userRole', userRole);
                }
              });
            }, 0);
          }
        }
        
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setRole(null);
          localStorage.removeItem('userRole');
        }
      });
      
      // Clean up the subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);
  
  // Create the auth context value
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
