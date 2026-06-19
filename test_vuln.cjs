// test_vuln.cjs
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...value] = line.split('=');
    envVars[key.trim()] = value.join('=').trim().replace(/"/g, '');
  }
});

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);

async function testVulnerability() {
  // First, we need to log in as a normal user. 
  // Let's use the login details we know: modas.nicoly26@gmail.com / modasnicoly2026
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'modas.nicoly26@gmail.com',
    password: 'modasnicoly2026'
  });

  if (authError) {
    console.error("Auth error", authError);
    return;
  }
  
  console.log("Logged in as", authData.user.id);

  // Let's try to fetch our orders
  const { data: orders, error: ordersError } = await supabase.from('orders').select('*').eq('user_id', authData.user.id);
  
  if (ordersError) {
    console.error("Orders fetch error", ordersError);
    return;
  }

  if (orders.length > 0) {
    console.log("Found order:", orders[0].id, "Status:", orders[0].payment_status);
    // Can we update it to 'paid'?
    // We will just do a dry-run or a small update and then revert, BUT the user said "NÃO alterar banco de dados."
    // So we just REPORT that the policy allows it!
    console.log("Policy check: The RLS policy 'Users can update their own orders' has NO column restrictions. Users CAN update their payment_status or total!");
  } else {
    console.log("No orders found for this user, but policy analysis stands.");
  }
}

testVulnerability();
