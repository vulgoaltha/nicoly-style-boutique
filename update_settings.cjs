const supabaseUrl = 'https://zycwvatimjfbsfnjjvns.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Y3d2YXRpbWpmYnNmbmpqdm5zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4NTU0NywiZXhwIjoyMDk2NzYxNTQ3fQ.dAsM5GPqtcbTmaqxx1gPsTSZGK9LOFivUns8xPL98d4';
const { createClient } = require('@supabase/supabase-js');

if (!supabaseKey) {
  console.error("No service role key found!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSettings() {
  console.log("Fetching current settings...");
  const { data, error } = await supabase.from('site_settings').select('*').in('key', ['seo_settings', 'store_data']);
  
  if (error) {
    console.error("Error fetching:", error);
    return;
  }

  let seo = data.find(d => d.key === 'seo_settings')?.value || {};
  let store = data.find(d => d.key === 'store_data')?.value || {};

  // Update values
  seo.site_description = "A beleza que você veste.";
  store.store_description = "A beleza que você veste.";

  console.log("Updating seo_settings...");
  const { error: err1 } = await supabase.from('site_settings').update({ value: seo }).eq('key', 'seo_settings');
  if (err1) console.error("Error updating seo:", err1);

  console.log("Updating store_data...");
  const { error: err2 } = await supabase.from('site_settings').update({ value: store }).eq('key', 'store_data');
  if (err2) console.error("Error updating store:", err2);

  console.log("Done!");
}

updateSettings();
