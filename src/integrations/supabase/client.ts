
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dndudgqkoiybenqnavoi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZHVkZ3Frb2l5YmVucW5hdm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDkwODMsImV4cCI6MjA2MDAyNTA4M30.fix5Vo1a06P-uN0bhj5y5og3QIg4NcZ-tM5ZGWX0aRQ";

// Export the supabase client for use throughout the app
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return true; // Since we have hardcoded the URL and key, we are configured
};
