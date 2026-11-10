# AGADE — Pedidos e reservas de estoque (implementação de testes)

## Entregue
- Migração `supabase/migrations/20261111_orders_reservations.sql`: `sales_orders`, `sales_order_events`, `reserve_test_order` e `transition_test_order`.
- Reserva por SKU com bloqueio transacional de linha e idempotência por referência.
- Preço unitário congelado a partir do catálogo no momento da reserva.
- Confirmação `paid` reduz estoque físico uma única vez.
- Cancelamento e expiração (quando chamados pelo backend) devolvem estoque reservado.
- Dados e funções privados a clientes anônimos e autenticados.
- CI com PostgreSQL 16: `supabase/tests/order_reservations.sql`.

## Ainda não integrado ou validado
- Não há fluxo público de checkout habilitado.
- A Edge Function experimental `checkout-sandbox` ainda **não usa** as funções transacionais e não deve ser publicada como checkout real.
- Não há reconciliação de pagamentos, autenticação de webhook, envio fiscal, frete, taxas finais nem expiração automática agendada.
- `transition_test_order(...,'paid',...)` é uma operação PRIVILEGIADA: nunca chamá-la a partir de parâmetro de status enviado pelo navegador. Ela deve ser usada apenas depois de confirmar status, valor, referência e identificador do pagamento na API do Mercado Pago.
- O teste PostgreSQL simula papéis de permissão e não substitui testes de implantação Supabase.
- Testes automatizados não incluem chamadas à API real Mercado Pago, análise de carga ou concorrência paralela real.

## Próximo critério para ativação
1. Projeto Supabase de desenvolvimento com segredos configurados.
2. Backend de checkout deve gerar a referência, registrar pedido, criar order oficial e manter correspondência segura entre os identificadores.
3. Implementar recebimento/validação de webhooks e reconsulta da API, com reprocessamento seguro.
4. Tratar falhas do provedor, expiração automática, pagamento tardio, devolução e possível reembolso.
5. Testar uma transação fictícia completa sem dados reais de clientes e apenas então liberar o fluxo de teste.
