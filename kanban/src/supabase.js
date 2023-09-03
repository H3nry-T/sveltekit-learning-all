import { createClient } from '@supabase/supabase-js';
import { PUBLIC_PROJECT_ANON_KEY } from '$env/static/public';
import { SECRET_PROJECT_URL } from '$env/static/public';

const supabaseUrl = SECRET_PROJECT_URL;
const supabaseAnonKey = PUBLIC_PROJECT_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
