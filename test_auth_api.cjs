const { createClient } = require('@supabase/supabase-js');
const URL = process.env.VITE_SUPABASE_URL || 'https://zycwvatimjfbsfnjjvns.supabase.co';
const ANON_KEY = 'sb_publishable_movab4IrHC8zoT_BnEYoVA_bStZZxDm';
const client = createClient(URL, ANON_KEY);

async function testAuth() {
  console.log('Testando auth API direta com modas.nicoly26@gmail.com...');
  const { data, error } = await client.auth.signInWithPassword({
    email: 'modas.nicoly26@gmail.com',
    password: 'modasnicoly2026'
  });
  if (error) {
    console.error('FALHA NA API:', error.message);
  } else {
    console.log('SUCESSO NA API! User ID:', data.user.id);
  }
}
testAuth();
