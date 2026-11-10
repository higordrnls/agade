# AGADE · Integração Mercado Pago Orders — etapa de desenvolvimento

## O que já foi codificado
- `checkout-sandbox`: reserva SKU em transação PostgreSQL, calcula valor a partir do catálogo, cria Order de TESTE na Orders API e vincula o identificador da Order à reserva antes de devolver a URL de checkout.
- `mp-webhook-sandbox`: exige assinatura HMAC SHA256, recusa eventos de produção e reconsulta Order no Mercado Pago; somente atualiza estoque após conferir identificador, referência e valor pago.
- `reconcile-sandbox`: rotina chamada por agendador privado. Consulta remotamente pagamentos vinculados e somente expira automaticamente reservas que NÃO possuem Order externa.
- `20261112_provider_reconciliation.sql`: funções de vínculo e expiração conservadora.
- `supabase/tests/reconciliation.test.mjs`: teste de HMAC, status, referência e integridade monetária.

## Cuidados importantes
**Não publicado, não comercial e não integrado à conta Mercado Pago**. Os testes de contrato são locais, sem credenciais do provedor. O modo sandbox exige `ENABLE_SANDBOX_CHECKOUT=true` e `MP_TEST_ACCESS_TOKEN` iniciado por `APP_USR-` (inclusive em teste; não usar prefixo para identificar ambiente). Nenhum segredo pode ser incluído em código, frontend ou variáveis `VITE_`.

**Separação de ambientes:** a variável `MP_ACCOUNT_ENV=test` é exigida junto com `ENABLE_SANDBOX_CHECKOUT=true`. Mesmo assim, somente o ambiente **Teste** selecionado no painel do Mercado Pago comprova a origem correta do token. Ambas ficam DESATIVADAS/ausentes até a verificação da implantação. A resposta da Order deve conter ID `ORDTST...` antes de redirecionar. Não configurar produção neste projeto.

Credenciais privadas necessárias no futuro:
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`;
- `MP_TEST_ACCESS_TOKEN`, `MP_WEBHOOK_TEST_SECRET`;
- `ADMIN_SANDBOX_KEY` (restrita a execução administrativa de testes);
- `AGADE_CRON_TEST_SECRET` (restrita à rotina agendada).

Ao configurar webhook, utilizar evento **Order (Mercado Pago)** no ambiente **Teste**. O endpoint necessita da opção que permite chamadas externas sem JWT Supabase, **mas a validação HMAC permanece obrigatória**.

## Política de estoque e estados
- Reserva congelada mantém o preço original até o pagamento.
- Notificação duplicada não desconta estoque duas vezes.
- Um pagamento com status pendente, valor incompleto ou dados divergentes não é aprovado.
- Order externa vinculada não é expirada por relógio local. Requer verificação no Mercado Pago para evitar venda dupla com Pix pendente.
- Se o pagamento chegar depois do prazo local, não baixar estoque automaticamente: registrar para conciliação manual.
- Reservas nunca vinculadas podem expirar por agendamento com `expire_unlinked_test_orders`.

## Integração ainda pendente
1. Provisionar projeto Supabase de desenvolvimento e executar migrações na ordem.
2. Configurar credenciais oficiais de teste do Mercado Pago sem compartilhá-las em chats.
3. Criar agendamento privado no Supabase Cron, invocando `reconcile-sandbox`, por exemplo a cada 5 minutos.
4. Validar assinatura real e notificações simuladas no painel do Mercado Pago.
5. Testar falhas, pagamentos tardios, reembolsos e webhooks fora de ordem. A solução atual não substitui a conciliação financeira nem cobre devoluções.
6. Antes de produção: autenticação de clientes, frete, impostos, checkout completo, mitigação de abusos, métricas e testes end-to-end.

**Não realizar merge ou deploy público enquanto os itens de segurança e integração pendentes não forem tratados.**

Documentação:
- https://www.mercadopago.com.br/developers/pt/docs/checkout-pro-orders/create-order
- https://www.mercadopago.com.br/developers/pt/docs/checkout-pro-orders/notifications
- https://www.mercadopago.com.br/developers/pt/docs/checkout-pro-orders/payment-management/status/order-status
- https://supabase.com/docs/guides/cron
