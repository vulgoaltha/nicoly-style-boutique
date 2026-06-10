-- Migration: Add payment_method column to orders table
-- Date: 2026-06-10
-- Objective: Add payment method tracking for Mercado Pago integration

BEGIN;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_method TEXT;

COMMENT ON COLUMN public.orders.payment_method IS 'Payment method used (pix, credit_card, debit_card, mercado_pago_balance)';

COMMIT;