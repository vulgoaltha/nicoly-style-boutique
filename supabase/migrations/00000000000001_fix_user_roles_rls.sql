-- =====================================================
-- Fix: user_roles RLS dependency circular
-- Autor: AI Engineer
-- Data: 2026-06-11
-- =====================================================
-- PROBLEMA: Sem uma policy 'select own', nenhum usuario
--           pode ler a tabela user_roles. Isto faz com que
--           a verificacao de admin em outras tabelas
--           (via subconsulta EXISTS) sempre retorne FALSE,
--           bloqueando o acesso ao dashboard e ao admin.
--
-- SOLUCAO: Permitir que cada usuario SELECT seu proprio
--          registro em user_roles. Isso resolve a
--          dependencia circular e permite que a funcao
--          has_role() e as subconsultas funcionem
--          corretamente para todos os usuarios autenticados.
-- =====================================================

-- Perfil (opcional: para garantir que a funcao has_role esteja OK)
GRANT EXECUTE ON FUNCTION has_role(app_role, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION has_role(app_role, UUID) TO service_role;

-- FIX: Adiciona policy para que cada usuario leia seu proprio role
CREATE POLICY IF NOT EXISTS "user_roles_select_own" ON user_roles
    FOR SELECT USING (user_id = auth.uid());

-- =====================================================
-- MANUAL NECESSARIO: Primeiro Admin
-- =====================================================
-- IMPORTANTE: Se a tabela user_roles esta VAZIA, nenhum
-- usuario sera considerado admin. Para criar o primeiro
-- admin, execute no SQL Editor do Supabase:
--
-- INSERT INTO user_roles (user_id, role)
-- VALUES ('<UUID_DOricese>', 'admin')
-- ON CONFLICT DO NOTHING;
