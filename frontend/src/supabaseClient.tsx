import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY = ""
const supabaseUrl = "own self make url"
const supabaseKey = SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;