---
status: investigating
slug: cadastro-nao-recebe-email
trigger: Usuário realiza cadastro, sistema informa sucesso, nenhum email de confirmação chega, e usuário não consegue fazer login.
updated: 2026-06-11T09:20:00Z
---

# Debug Session: cadastro-nao-recebe-email

## Current Focus

- **Hypothesis:** O `emailRedirectTo` está incorretamente setado ou o fluxo de `exchangeCodeForSession` não existe, mas o problema primário é que nenhum e-mail de confirmação chega. Isso aponta para uma configuração de SMTP/e-mail incorreta ou o e-mail indo para spam.
- **Next Action:** Verificar Supabase Dashboard SMTP ou a rota de callback para trocar o code por uma sessão.

## Evidence Gathered

- Documento: `trace-evidence-01`

## Eliminated Hypotheses

- The user is not being created: Não verificado ainda.
- The frontend is swallowing errors: O catch do blocono login.tsx não parece estar swallowing.
