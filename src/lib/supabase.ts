
// This file re-exports the Supabase client from the integrations folder
// to maintain compatibility with existing imports
import { supabase } from '@/integrations/supabase/client';

// Add helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  // Instead of checking process.env directly, use the Supabase URL and key from the client
  // These values are set in src/integrations/supabase/client.ts
  return supabase && true; // If supabase client is initialized, consider it configured
};

// Enhanced demo mode flag check
export const isDemoMode = (): boolean => {
  // If Supabase is not configured, we're in demo mode
  return !isSupabaseConfigured();
};

// Export wrapped Supabase client with demo mode check
export { supabase };
