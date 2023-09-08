import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYWpvdmthZnZqY2FncmV6ZXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwOTEyNDYsImV4cCI6MjAwOTY2NzI0Nn0.UHSA2iY2lxZoAWHfIl1MYfgfD_bEpyMX9w3KmB4W10w"
const supabaseUrl = "https://ooajovkafvjcagrezewd.supabase.co"
const supabaseKey = SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;