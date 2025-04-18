
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@/lib/supabase';
import { toast } from 'sonner';
import { UserRole } from '@/contexts/AuthContext';
import { User } from '@supabase/supabase-js';

export const useAuthActions = (user: User | null) => {
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
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const signOut = async () => {
    try {
      if (!isDemoMode()) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      
      // Clear all auth state and localStorage
      localStorage.clear();
      
      // Force reload the page to ensure clean state
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
      throw error;
    }
  };

  return { updateUserProfile, signOut };
};
