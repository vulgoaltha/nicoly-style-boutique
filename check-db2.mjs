import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data: novidades, error: err2 } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_new", true)
    .limit(8);
    
  console.log("Novidades:", JSON.stringify(novidades, null, 2));
}

check();
