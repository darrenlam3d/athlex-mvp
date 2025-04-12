
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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
      
      // Check if Supabase is configured
      const isConfigured = isSupabaseConfigured();
      console.log("AuthContext - Supabase configured:", isConfigured);
      
      if (!isConfigured) {
        // For demo mode, try to get role from localStorage
        const storedRole = localStorage.getItem('userRole') as UserRole || '';
        console.log("AuthContext - Demo mode - stored role:", storedRole);
        setRole(storedRole);
        setUser(null);
        setLoading(false);
        return;
      }
      
      // If Supabase is configured, get the session
      try {
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
              const { data: profile } = await supabase
                .from("users")
                .select("role")
                .eq("id", currentUser.id)
                .single();
              
              console.log("AuthContext - Users table profile:", profile);
              setRole((profile?.role as UserRole) || "");
            } catch (err) {
              console.error("AuthContext - Error fetching from users table:", err);
              setRole("");
            }
          } else {
            setRole(userRole);
          }
          
          // Store in localStorage for persistence
          localStorage.setItem('userRole', role);
        } else {
          console.log("AuthContext - No current user, setting empty role");
          setRole("");
          localStorage.removeItem('userRole');
        }
      } catch (error) {
        console.error("AuthContext - Error in auth process:", error);
        // Fallback to demo mode on error
        const storedRole = localStorage.getItem('userRole') as UserRole || '';
        setRole(storedRole);
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();

    // Set up auth state change listener
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      console.log("AuthContext - Auth state changed, refreshing user");
      fetchUser();
    });

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
