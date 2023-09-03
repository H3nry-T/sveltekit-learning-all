import { createClient } from '@supabase/supabase-js';
import { PUBLIC_PROJECT_ANON_KEY, PUBLIC_PROJECT_URL } from '$env/static/public';

const supabaseUrl = PUBLIC_PROJECT_URL;
const supabaseAnonKey = PUBLIC_PROJECT_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
