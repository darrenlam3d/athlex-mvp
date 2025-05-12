
import { createClient } from '@supabase/supabase-js';

// These values should be replaced with your project-specific values if needed
const supabaseUrl = 'https://dndudgqkoiybenqnavoi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZHVkZ3Frb2l5YmVucW5hdm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDkwODMsImV4cCI6MjA2MDAyNTA4M30.fix5Vo1a06P-uN0bhj5y5og3QIg4NcZ-tM5ZGWX0aRQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
