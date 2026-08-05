-- =====================================================
-- Migration: 00000000000002_fix_checkout_rls.sql
-- Projeto: Nicoly Modas E-commerce
-- Objetivo: Revogar permissoes diretas da API Rest (anon) 
--           sobre orders e order_items, blindando a fraude.
--           O fluxo legitimo funciona via RPC / SDK Admin.
-- =====================================================

-- 1. ORDERS
-- Remover politicas indevidas ou redundantes que permitem escrita direta
DROP POLICY IF EXISTS "orders_update_own" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "orders_insert_own" ON public.orders;

-- Consolidar uma unica politica de leitura para que o usuario veja SEUS pedidos
DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

CREATE POLICY "orders_select_own" ON public.orders 
  FOR SELECT USING (
    auth.uid() = user_id OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- 2. ORDER_ITEMS
-- Remover politica que permite insercao direta de itens (com precos forjados) na API publica
DROP POLICY IF EXISTS "order_items_insert_own" ON public.order_items;

-- (O order_items_select_own continua intocado para o usuario ver o detalhe de seus pedidos)
