const { createClient } = require('@supabase/supabase-js');

async function testDb(name, url, key) {
  const supabase = createClient(url, key);
  console.log(`\n--- Testando ${name} ---`);
  
  const queries = ['products', 'categories', 'orders', 'profiles'];
  for (const table of queries) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`${table}: ERRO - `, error);
    } else {
      console.log(`${table}: ${count} registros`);
    }
  }
}

async function run() {
  const url1 = 'https://zycwvatimjfbsfnjjvns.supabase.co';
  const key1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Y3d2YXRpbWpmYnNmbmpqdm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODU1NDcsImV4cCI6MjA5Njc2MTU0N30.xMHVJVLDbDFZPmEApMsq391AxHHhI73pr6aG2nyXoDA';
  
  const url2 = 'https://mjnsfkivjbfpxedydtkn.supabase.co';
  const key2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qbnNma2l2amJmcHhlZHlkdGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4NTU0NywiZXhwIjoyMDk2NzYxNTQ3fQ.dAsM5GPqtcbTmaqxx1gPsTSZGK9LOFivUns8xPL98d4';

  await testDb('DB 1 (zycwvatimjfbsfnjjvns)', url1, key1);
  await testDb('DB 2 (mjnsfkivjbfpxedydtkn)', url2, key2);
}

run();
