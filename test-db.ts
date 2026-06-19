import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://zycwvatimjfbsfnjjvns.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Y3d2YXRpbWpmYnNmbmpqdm5zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4NTU0NywiZXhwIjoyMDk2NzYxNTQ3fQ.dAsM5GPqtcbTmaqxx1gPsTSZGK9LOFivUns8xPL98d4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: allProducts, error: err1 } = await supabase.from('products').select('*');
  const { data: activeProducts, error: err2 } = await supabase.from('products').select('*').eq('is_active', true);
  const { data: featuredProducts, error: err3 } = await supabase.from('products').select('*').eq('is_featured', true);
  const { data: specific, error: err4 } = await supabase.from('products').select('id, slug, name').eq('is_active', true);
  console.log('All Products:', allProducts?.length || 0);
  console.log('Active Products:', activeProducts?.length || 0);
  console.log('Featured Products:', featuredProducts?.length || 0);
  console.log('Specific Query Result:', specific);
  console.log('Errors:', err1 || err2 || err3 || err4);
}
test();
