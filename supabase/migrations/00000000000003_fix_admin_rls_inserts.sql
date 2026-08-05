-- =====================================================
-- Fix: RLS WITH CHECK fail for Admin Inserts
-- Autor: AI Engineer
-- Data: 2026-06-14
-- =====================================================
-- PROBLEMA: No PostgreSQL, policies "FOR ALL" avaliam 
-- o "WITH CHECK" com base no USING quando omitido. 
-- Subconsultas diretas para user_roles na hora do INSERT
-- podem falhar silenciosamente por causa do contexto de 
-- seguranca do RLS ou do momento da avaliacao de auth.uid().
--
-- SOLUCAO: Criar uma funcao SECURITY DEFINER que contorna 
-- as limitacoes de contexto para checar o admin, e declarar 
-- o WITH CHECK explicitamente nas tabelas de controle do site.
-- =====================================================

-- 1. Funcao confiavel para checar admin ignorando o RLS da propria tabela user_roles
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

-- Permissoes da funcao
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;

-- 2. Recriando as policies para usar a nova funcao com WITH CHECK explicito

-- homepage_collections
DROP POLICY IF EXISTS "homepage_collections_admin_modify" ON homepage_collections;
CREATE POLICY "homepage_collections_admin_modify" ON homepage_collections
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- homepage_categories
DROP POLICY IF EXISTS "homepage_categories_admin_modify" ON homepage_categories;
CREATE POLICY "homepage_categories_admin_modify" ON homepage_categories
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- hero_banners
DROP POLICY IF EXISTS "hero_banners_admin_modify" ON hero_banners;
CREATE POLICY "hero_banners_admin_modify" ON hero_banners
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- site_settings
DROP POLICY IF EXISTS "site_settings_admin_modify" ON site_settings;
CREATE POLICY "site_settings_admin_modify" ON site_settings
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
