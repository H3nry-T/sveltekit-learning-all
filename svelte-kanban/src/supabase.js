import { createClient } from '@supabase/supabase-js';
import { PRIVATE_SUPABASE_ANON_KEY, PRIVATE_SUPABASE_URL } from '$env/static/private';

const supabaseUrl = PRIVATE_SUPABASE_URL;
const supabaseAnonKey = PRIVATE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
