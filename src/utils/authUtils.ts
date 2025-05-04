
import { supabase } from '@/lib/supabase';
import { UserWithRole } from '@/types/auth';

export const checkUserRole = async (user: UserWithRole | null): Promise<'athlete' | 'coach' | null> => {
  if (!user) return null;
  
  try {
    // Check if user is an athlete
    const { data: athlete, error: athleteError } = await supabase
      .from('athletes')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();
    
    if (athlete) {
      return 'athlete';
    }
    
    // If not an athlete, check if user is a coach
    const { data: coach, error: coachError } = await supabase
      .from('coaches')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();
    
    if (coach) {
      return 'coach';
    }
    
    return null;
  } catch (error) {
    console.error('Error checking user role:', error);
    return null;
  }
};
