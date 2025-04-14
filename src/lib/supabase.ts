
// This file re-exports the Supabase client from the integrations folder
// to maintain compatibility with existing imports
import { supabase } from '@/integrations/supabase/client';

// Add helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  // Check if Supabase URL and key are present in the environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return !!supabaseUrl && !!supabaseKey;
};

// Enhanced demo mode flag check
export const isDemoMode = (): boolean => {
  // If Supabase is not configured, we're in demo mode
  // Or user can explicitly enable demo mode by setting VITE_DEMO_MODE=true
  const explicitDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
  return !isSupabaseConfigured() || explicitDemoMode;
};

// Export wrapped Supabase client with demo mode check
export { supabase };
