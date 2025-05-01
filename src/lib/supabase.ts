
// This file re-exports the Supabase client from the integrations folder
// to maintain compatibility with existing imports
import { supabase } from '@/integrations/supabase/client';

// Add helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  // Supabase is configured with hardcoded values in the client file
  return true;
};

// Export wrapped Supabase client
export { supabase };
