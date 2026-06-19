import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data: featured, error: err1 } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .limit(8);
    
  console.log("Featured Products (is_active=true, is_featured=true):", featured?.length, err1);

  const { data: novidades, error: err2 } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_new", true)
    .limit(8);
    
  console.log("New Products (is_active=true, is_new=true):", novidades?.length, err2);
  
  const { data: allActive, error: err3 } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .limit(8);
    
  console.log("All active products:", allActive?.length, err3);

  const { data: allProducts, error: err4 } = await supabase
    .from("products")
    .select("*")
    .limit(8);
    
  console.log("All products (no filter):", allProducts?.length, err4);
}

check();
