const https = require('https');

// Supabase project ref
const PROJECT_REF = 'zycwvatimjfbsfnjjvns';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Y3d2YXRpbWpmYnNmbmpqdm5zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4NTU0NywiZXhwIjoyMDk2NzYxNTQ3fQ.dAsM5GPqtcbTmaqxx1gPsTSZGK9LOFivUns8xPL98d4';

const sql = `
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "homepage_collections_select_public" ON homepage_collections;
DROP POLICY IF EXISTS "homepage_collections_admin_modify" ON homepage_collections;

-- Create SELECT policy (public read)
CREATE POLICY "homepage_collections_select_public"
  ON homepage_collections
  FOR SELECT
  USING (true);

-- Create ALL policy for admin (insert, update, delete)
CREATE POLICY "homepage_collections_admin_modify"
  ON homepage_collections
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
`;

// Use the pg-meta REST API to execute SQL
const postData = JSON.stringify({ query: sql });

const options = {
  hostname: `${PROJECT_REF}.supabase.co`,
  port: 443,
  path: '/rest/v1/rpc/exec_sql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Length': Buffer.byteLength(postData),
  },
};

// Try direct pg connection via fetch
async function applySql() {
  // Method: Use supabase-js to call the SQL via a temporary function
  const { createClient } = require('@supabase/supabase-js');
  const c = createClient(
    `https://${PROJECT_REF}.supabase.co`,
    SERVICE_ROLE_KEY,
    { db: { schema: 'public' } }
  );

  // First, create a temporary function to run our SQL
  const createFnSQL = `
    CREATE OR REPLACE FUNCTION _temp_fix_rls()
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $f$
    BEGIN
      -- Drop existing policies
      DROP POLICY IF EXISTS "homepage_collections_select_public" ON homepage_collections;
      DROP POLICY IF EXISTS "homepage_collections_admin_modify" ON homepage_collections;

      -- Create SELECT policy (public read)
      EXECUTE 'CREATE POLICY "homepage_collections_select_public" ON homepage_collections FOR SELECT USING (true)';

      -- Create ALL policy for admin
      EXECUTE 'CREATE POLICY "homepage_collections_admin_modify" ON homepage_collections FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = ''admin'')) WITH CHECK (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = ''admin''))';
    END;
    $f$;
  `;

  // Try to create the function via REST
  const url = `https://${PROJECT_REF}.supabase.co/rest/v1/rpc/_temp_fix_rls`;

  // First try: directly query to create function
  const resp = await fetch(`https://${PROJECT_REF}.supabase.co/rest/v1/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: createFnSQL }),
  });

  console.log('Create function response:', resp.status);

  // Alternative: use the database URL directly
  // Since we can't run raw SQL via REST, let's try using supabase admin API
  
  // Check if the policies already exist by trying an insert with the admin user token
  const { data: authData } = await c.auth.signInWithPassword({
    email: 'modas.nicoly26@gmail.com',
    password: 'modasnicoly2026',
  });
  
  if (authData?.session) {
    const userClient = createClient(
      `https://${PROJECT_REF}.supabase.co`,
      'sb_publishable_movab4IrHC8zoT_BnEYoVA_bStZZxDm',
      {
        global: {
          headers: {
            Authorization: `Bearer ${authData.session.access_token}`,
          },
        },
      }
    );

    // Test insert as authenticated admin
    const { data: testData, error: testError } = await userClient
      .from('homepage_collections')
      .insert({
        title: 'Test Policy Check',
        image_url: 'https://test.com/img.jpg',
        order_position: 99,
        active: false,
      })
      .select();

    console.log('Insert as admin user:', testData ? 'SUCCESS' : 'FAILED');
    console.log('Error:', testError?.message);
    
    if (testError) {
      console.log('\n❌ RLS policy is NOT applied. You need to run the SQL manually.');
      console.log('Go to: https://supabase.com/dashboard/project/' + PROJECT_REF + '/sql/new');
      console.log('And paste the contents of fix_collections_rls.sql');
    } else {
      // Clean up test data
      if (testData?.[0]?.id) {
        await c.from('homepage_collections').delete().eq('id', testData[0].id);
      }
      console.log('\n✅ RLS policy is working! Admin can insert collections.');
    }
  }

  // Also clean up our service-role test data
  await c.from('homepage_collections').delete().eq('title', 'Teste RLS');
}

applySql().catch(console.error);
