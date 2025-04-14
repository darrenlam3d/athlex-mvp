
// This file re-exports the Supabase client from the integrations folder
// to maintain compatibility with existing imports
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';

export { supabase, isSupabaseConfigured };
