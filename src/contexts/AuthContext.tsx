
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
      
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        // For demo mode, try to get role from localStorage
        const storedRole = localStorage.getItem('userRole') as UserRole || '';
        setRole(storedRole);
        setUser(null);
        setLoading(false);
        return;
      }
      
      // If Supabase is configured, get the session
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUser = sessionData.session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        // Method 1: From user_metadata
        const userRole = currentUser.user_metadata?.role as UserRole;

        // Method 2 (optional): Fetch from your "users" table if needed
        if (!userRole) {
          const { data: profile } = await supabase
            .from("users")
            .select("role")
            .eq("id", currentUser.id)
            .single();
          
          setRole((profile?.role as UserRole) || "");
        } else {
          setRole(userRole);
        }
        
        // Store in localStorage for persistence
        localStorage.setItem('userRole', role);
      } else {
        setRole("");
        localStorage.removeItem('userRole');
      }

      setLoading(false);
    };

    fetchUser();

    // Set up auth state change listener
    const { data: listener } = supabase.auth.onAuthStateChange(() => fetchUser());

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Debug log
  console.log("AuthContext - Current user:", user?.email, "Role:", role);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
