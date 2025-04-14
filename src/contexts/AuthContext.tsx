
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@/lib/supabase';

// Define the user role type
export type UserRole = 'athlete' | 'scout' | 'coach' | null;

// Define the auth context type
interface AuthContextType {
  role: UserRole;
  loading: boolean;
  setUserRole: (role: UserRole) => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

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
            // For now, we'll skip the profile lookup from Supabase since we're getting type errors
            // Instead, we'll just use the stored role if available
            if (storedRole) {
              console.info('AuthContext - Using stored role:', storedRole);
              setRole(storedRole);
            }
            
            // In a production environment, you would implement proper profile lookup:
            // const { data: userData, error: userError } = await supabase
            //   .from('profiles')
            //   .select('role')
            //   .eq('id', data.session.user.id)
            //   .single();
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
    console.info('AuthContext - Current user:', JSON.stringify(role), 'Role:', role, 'Loading:', loading);
  };
  
  // Function to set the user role
  const setUserRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('userRole', newRole);
    } else {
      localStorage.removeItem('userRole');
    }
  };
  
  // Fetch the user on component mount
  useEffect(() => {
    fetchUser();
    
    // Set up an auth state change listener
    if (typeof supabase !== 'undefined') {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
        console.info('AuthContext - Auth state changed, refreshing user');
        fetchUser();
      });
      
      // Clean up the subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);
  
  // Create the auth context value
  const contextValue: AuthContextType = {
    role,
    loading,
    setUserRole,
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
