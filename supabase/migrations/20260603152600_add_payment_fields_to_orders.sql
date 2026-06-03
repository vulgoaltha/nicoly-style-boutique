-- Migração: Adição de colunas estruturais para Gateways de Pagamento
-- Data: 2026-06-03
-- Objetivo: Preparar tabela orders para integrações com InfinityPay, Mercado Pago e Stripe

BEGIN;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_gateway TEXT,
  ADD COLUMN IF NOT EXISTS payment_gateway_id TEXT,
  ADD COLUMN IF NOT EXISTS transaction_id TEXT,
  ADD COLUMN IF NOT EXISTS pix_code TEXT,
  ADD COLUMN IF NOT EXISTS pix_qrcode TEXT,
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS webhook_payload JSONB;

-- Comentários para documentar a função de cada coluna diretamente no banco
COMMENT ON COLUMN public.orders.payment_gateway IS 'Nome do gateway (ex: mercadopago, stripe, infinitypay)';
COMMENT ON COLUMN public.orders.payment_gateway_id IS 'ID do lojista/conta no gateway, se aplicável';
COMMENT ON COLUMN public.orders.transaction_id IS 'ID da transação retornado pelo gateway';
COMMENT ON COLUMN public.orders.pix_code IS 'Código copia e cola do Pix';
COMMENT ON COLUMN public.orders.pix_qrcode IS 'URL ou base64 do QRCode do Pix';
COMMENT ON COLUMN public.orders.paid_at IS 'Data e hora exata da aprovação do pagamento';
COMMENT ON COLUMN public.orders.webhook_payload IS 'Payload cru do webhook de aprovação para fins de auditoria';

COMMIT;
