
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { UserRole } from '@/contexts/AuthContext';

export const useSupabaseAuthState = () => {
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

  useEffect(() => {
    const setupAuthListener = async () => {
      // Check if we have a stored role in localStorage
      const storedRole = localStorage.getItem('userRole') as UserRole;
      
      if (storedRole) {
        setRole(storedRole);
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        console.info('AuthContext - Auth state changed, event:', event);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          if (newSession?.user) {
            const userRole = await fetchUserProfile(newSession.user.id);
            if (userRole) {
              setRole(userRole);
              localStorage.setItem('userRole', userRole);
            }
          }
        }
        
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setRole(null);
          localStorage.removeItem('userRole');
        }
      });

      // Get initial session
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      if (initialSession?.user) {
        setSession(initialSession);
        setUser(initialSession.user);
        const userRole = await fetchUserProfile(initialSession.user.id);
        if (userRole) {
          setRole(userRole);
          localStorage.setItem('userRole', userRole);
        }
      }

      setLoading(false);

      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuthListener();
  }, []);

  return { session, user, role, loading, setRole };
};
