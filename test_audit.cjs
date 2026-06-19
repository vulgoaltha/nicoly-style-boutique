const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...value] = line.split('=');
    envVars[key.trim()] = value.join('=').trim().replace(/"/g, '');
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTests() {
  console.log("--- TEST 1 & 2: Updating DB with Service Role ---");
  const newStoreData = {
    store_name: "Nicoly Modas Teste Auditoria",
    store_description: "Loja oficial de moda feminina premium - teste de auditoria",
    store_phone: "11999999999",
    store_email: "contato@nicolymodas.com.br"
  };

  const newSeoData = {
    site_title: "Nicoly Modas Teste Auditoria",
    site_description: "Loja oficial de moda feminina premium - teste de auditoria",
    site_keywords: "teste, auditoria"
  };

  const { error: err1 } = await supabase.from('site_settings').upsert({ key: 'store_data', value: newStoreData }, { onConflict: 'key' });
  const { error: err2 } = await supabase.from('site_settings').upsert({ key: 'seo_settings', value: newSeoData }, { onConflict: 'key' });

  if (err1 || err2) {
    console.error("Error updating", err1, err2);
  } else {
    console.log("DB Updated Successfully for testing.");
  }
}

runTests();
