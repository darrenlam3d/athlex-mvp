
// This file re-exports the Supabase client from the integrations folder
// to maintain compatibility with existing imports
import { supabase } from '@/integrations/supabase/client';

// Add helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return (
    process.env.SUPABASE_URL !== undefined &&
    process.env.SUPABASE_KEY !== undefined
  );
};

// Enhanced demo mode flag check
export const isDemoMode = (): boolean => {
  // If Supabase is not configured, we're in demo mode
  return !isSupabaseConfigured();
};

// Export wrapped Supabase client with demo mode check
export { supabase };
