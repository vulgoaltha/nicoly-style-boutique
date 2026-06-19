-- =====================================================
-- FIX: RLS policies para homepage_collections
-- Execute este SQL no Supabase Dashboard > SQL Editor
-- =====================================================

-- 1. Garantir que RLS está habilitado
ALTER TABLE homepage_collections ENABLE ROW LEVEL SECURITY;

-- 2. Remover policies antigas (caso existam parcialmente)
DROP POLICY IF EXISTS "homepage_collections_select_public" ON homepage_collections;
DROP POLICY IF EXISTS "homepage_collections_admin_modify" ON homepage_collections;

-- 3. Criar policy de leitura pública (qualquer visitante pode ver coleções)
CREATE POLICY "homepage_collections_select_public"
  ON homepage_collections
  FOR SELECT
  USING (true);

-- 4. Criar policy de modificação para admin (INSERT, UPDATE, DELETE)
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
