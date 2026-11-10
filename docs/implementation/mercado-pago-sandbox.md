# Checkout Mercado Pago — integração experimental

**Não é um checkout comercial habilitado.** Este código prepara chamadas à Orders API (Checkout Pro) usando exclusivamente credenciais de teste. A função não está publicada nem foi testada contra a API real.

Documentação oficial:
- https://www.mercadopago.com.br/developers/pt/docs/checkout-pro-orders/create-order
- https://supabase.com/docs/guides/functions/secrets

## Segurança
- `ENABLE_SANDBOX_CHECKOUT` ausente ou diferente de `true` => HTTP 503.
- Somente token `MP_TEST_ACCESS_TOKEN` iniciado por `TEST-`.
- `ADMIN_SANDBOX_KEY` (mínimo 32 caracteres) exigida no header privado.
- `SUPABASE_SERVICE_ROLE_KEY` só no servidor.
- Valor e título são recuperados do banco; payload do navegador não define preço.
- Somente SKU ativo, produto ativo e estoque disponível entram no teste.
- A URL de redirecionamento deve ser HTTPS de `mercadopago.com.br`.

## Ainda bloqueantes para vendas reais
Criar pedidos transacionais com reserva e expiração de estoque, adicionar frete e descontos calculados no servidor, testar webhooks autenticados, reconciliação, reembolso e idempotência persistente. Adicionar autenticação administrativa real e limites de taxa antes de qualquer deploy público do endpoint. Não ativar credenciais de produção nem expor `ADMIN_SANDBOX_KEY` no frontend.

## Ativação de teste (futura)
Usar conta de desenvolvimento Supabase e credenciais de teste oficiais do Mercado Pago. Não salvar segredos no GitHub. Não inserir dados reais de clientes na simulação.
