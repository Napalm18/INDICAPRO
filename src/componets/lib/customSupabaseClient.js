import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gwvauiuxazuztcgvcfmb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dmF1aXV4YXp1enRjZ3ZjZm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NjAxNDcsImV4cCI6MjA3MjMzNjE0N30.M5wdO-EBB3eS2wiXfr3XeFRYrrrnhovK-mhwVoGIL8U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);