
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import { UserRole } from './UserRoleContext';

interface AuthContextType {
  user: any | null;
  role: UserRole;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: "",
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<UserRole>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      console.log("AuthContext - fetchUser - Starting");
      
      try {
        // Get role from localStorage for demo mode or if Supabase is not configured
        const storedRole = localStorage.getItem('userRole') as UserRole || 'athlete';
        console.log("AuthContext - Stored role:", storedRole);
        
        // Check if Supabase is configured
        const isConfigured = isSupabaseConfigured();
        console.log("AuthContext - Supabase configured:", isConfigured);
        
        if (!isConfigured) {
          // For demo mode, use the stored role
          console.log("AuthContext - Demo mode - setting stored role:", storedRole);
          setRole(storedRole);
          setUser(null);
          setLoading(false);
          return;
        }
        
        // If Supabase is configured, get the session
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("AuthContext - Session data:", sessionData ? "received" : "none");
        const currentUser = sessionData.session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          // Method 1: From user_metadata
          const userRole = currentUser.user_metadata?.role as UserRole;
          console.log("AuthContext - User metadata role:", userRole);

          // Method 2 (optional): Fetch from your "users" table if needed
          if (!userRole) {
            console.log("AuthContext - No role in metadata, checking users table");
            try {
              // Using any type to avoid TypeScript errors with the database schema
              const { data: profileData, error } = await supabase
                .from('users')
                .select('role')
                .eq('id', currentUser.id)
                .maybeSingle();
              
              console.log("AuthContext - Users table profile:", profileData);
              
              if (profileData?.role) {
                setRole(profileData.role as UserRole);
              } else {
                // Default to 'athlete' if no role is found
                setRole('athlete');
              }
            } catch (err) {
              console.error("AuthContext - Error fetching from users table:", err);
              // Default to 'athlete' if there's an error
              setRole('athlete');
            }
          } else {
            setRole(userRole);
          }
        } else {
          // If no user is authenticated, use the stored role for demo purposes
          console.log("AuthContext - No current user, using stored role:", storedRole);
          setRole(storedRole);
        }
        
        // Store in localStorage for persistence
        localStorage.setItem('userRole', role || storedRole);
      } catch (error) {
        console.error("AuthContext - Error in auth process:", error);
        // Fallback to demo mode on error
        const storedRole = localStorage.getItem('userRole') as UserRole || 'athlete';
        setRole(storedRole);
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();

    // Set up auth state change listener
    let listener = { subscription: { unsubscribe: () => {} } };
    
    if (isSupabaseConfigured()) {
      const { data } = supabase.auth.onAuthStateChange(() => {
        console.log("AuthContext - Auth state changed, refreshing user");
        fetchUser();
      });
      listener = data;
    }

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Debug log
  console.log("AuthContext - Current user:", user?.email, "Role:", role, "Loading:", loading);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
