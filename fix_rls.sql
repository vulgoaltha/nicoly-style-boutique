const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const supabaseUrl = 'https://zycwvatimjfbsfnjjvns.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Y3d2YXRpbWpmYnNmbmpqdm5zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4NTU0NywiZXhwIjoyMDk2NzYxNTQ3fQ.dAsM5GPqtcbTmaqxx1gPsTSZGK9LOFivUns8xPL98d4';
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(supabaseUrl, supabaseKey);

const sql = `
-- 1. Create a SECURITY DEFINER function to reliably check admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- 2. Drop the old flaky FOR ALL policies
DROP POLICY IF EXISTS "homepage_collections_admin_modify" ON homepage_collections;
DROP POLICY IF EXISTS "homepage_categories_admin_modify" ON homepage_categories;
DROP POLICY IF EXISTS "hero_banners_admin_modify" ON hero_banners;
DROP POLICY IF EXISTS "announcement_bars_admin_modify" ON announcement_bars;

-- 3. Recreate them explicitly with USING and WITH CHECK using the new function
CREATE POLICY "homepage_collections_admin_modify" ON homepage_collections
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "homepage_categories_admin_modify" ON homepage_categories
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "hero_banners_admin_modify" ON hero_banners
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "announcement_bars_admin_modify" ON announcement_bars
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
`;

async function fix() {
  console.log("Applying SQL fix...");
  // Use a generic RPC or just output the SQL for the user if we don't have an exec_sql RPC
  // Wait, I can't execute raw SQL via standard supabase-js client without a helper RPC.
  console.log("SQL to execute:\\n" + sql);
}

fix();
