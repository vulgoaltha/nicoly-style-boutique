const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const supabaseUrl = 'https://zycwvatimjfbsfnjjvns.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Y3d2YXRpbWpmYnNmbmpqdm5zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4NTU0NywiZXhwIjoyMDk2NzYxNTQ3fQ.dAsM5GPqtcbTmaqxx1gPsTSZGK9LOFivUns8xPL98d4';
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRoles() {
  const { data, error } = await supabase.from('user_roles').select('*');
  console.log("Roles:", data);
  console.log("Error:", error);
}

checkRoles();
