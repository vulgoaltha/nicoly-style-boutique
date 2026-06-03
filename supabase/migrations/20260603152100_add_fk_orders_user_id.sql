-- Migração Segura: Adição de Foreign Key em orders.user_id -> auth.users.id
-- Data: 2026-06-03

BEGIN;

-- 1. Verificação e correção de registros órfãos
-- Atualiza para NULL qualquer user_id na tabela orders que não tenha um correspondente válido na tabela auth.users.
-- Isso previne que a criação da Foreign Key falhe caso haja inconsistências prévias no banco de dados.
UPDATE public.orders
SET user_id = NULL
WHERE user_id IS NOT NULL 
  AND user_id NOT IN (SELECT id FROM auth.users);

-- 2. Criação da restrição de chave estrangeira (Foreign Key)
-- Se a restrição já existir por algum motivo, removemos antes para garantir que a nova com ON DELETE SET NULL prevaleça (idempotência).
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS fk_orders_user_id;

ALTER TABLE public.orders
  ADD CONSTRAINT fk_orders_user_id
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE SET NULL;

-- 3. Criação de índice para otimizar buscas por user_id
-- O modificador IF NOT EXISTS previne erros caso o índice já tenha sido criado anteriormente.
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);

COMMIT;
