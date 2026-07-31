# PRD 06 — Orders & Checkout

---

# Objetivo

Este documento define todo o ciclo de vida dos pedidos da Agadê, desde a criação do carrinho até a confirmação do pagamento.

Também estabelece as regras oficiais de checkout, integração com o gateway de pagamento, utilização da Carteira Verde e controle transacional dos pedidos.

---

# Visão Geral

Um pedido representa a intenção formal de compra de um ou mais produtos.

Durante seu ciclo de vida o pedido poderá passar por diversos estados até ser concluído, cancelado ou reembolsado.

Todo pedido pertence exatamente a um usuário autenticado.

---

# Estrutura do Pedido

Cada pedido deverá registrar, no mínimo:

- cliente;
- itens;
- endereço;
- valores;
- descontos;
- créditos utilizados;
- pagamento;
- histórico de status;
- datas de criação e atualização.

Nenhuma informação crítica deverá depender apenas de cálculos realizados no frontend.

---

# Fluxo Geral

```
Carrinho

↓

Checkout

↓

Criação do Pedido

↓

Reserva de Créditos

↓

Pagamento

↓

Confirmação

↓

Produção
```

---

# Carrinho

O carrinho representa uma sessão temporária.

Ele poderá existir para usuários autenticados ou visitantes.

Somente usuários autenticados poderão concluir o checkout.

---

# Início do Checkout

Ao iniciar o checkout o sistema deverá:

- validar autenticação;
- validar disponibilidade dos produtos;
- validar estoque;
- calcular valores;
- calcular frete (quando disponível);
- consultar saldo disponível da Carteira Verde.

---

# Aplicação da Carteira Verde

O uso dos créditos é opcional.

O cliente poderá escolher quantos quilogramas deseja utilizar.

O backend será responsável por:

- validar saldo disponível;
- aplicar a política vigente;
- respeitar o limite máximo permitido.

Nenhum cálculo realizado pelo frontend poderá ser considerado definitivo.

---

# Reserva de Créditos

Antes da criação da preferência de pagamento:

```
available

↓

reserved
```

Essa operação deve ocorrer dentro da mesma transação que cria o pedido.

---

# Criação do Pedido

Após todas as validações:

o sistema cria o pedido em estado:

```
pending_payment
```

Nesse momento:

- o pedido recebe um identificador único;
- os itens são registrados;
- os créditos ficam reservados;
- inicia-se a integração com o gateway.

---

# Integração com Mercado Pago

O Mercado Pago é o gateway oficial do MVP.

A integração deverá ser realizada através de Supabase Edge Functions.

Fluxo:

```
Frontend

↓

Edge Function

↓

Mercado Pago

↓

Payment Preference

↓

Frontend
```

O frontend nunca comunica diretamente informações sensíveis ao gateway.

---

# Métodos de Pagamento

Inicialmente serão suportados:

- PIX
- Cartão de Crédito

Outros métodos poderão ser adicionados futuramente.

---

# Webhooks

Após o pagamento o Mercado Pago enviará notificações para a plataforma.

Todo webhook deverá:

- validar assinatura;
- consultar novamente a API oficial;
- confirmar o status real do pagamento;
- executar apenas operações idempotentes.

Nenhuma decisão crítica deverá utilizar apenas o payload recebido.

---

# Estados do Pedido

Durante o checkout:

```
draft
```

Pedido em construção.

---

```
pending_payment
```

Pagamento aguardando confirmação.

---

```
paid
```

Pagamento confirmado.

---

```
cancelled
```

Pagamento cancelado.

---

```
expired
```

Pagamento expirado.

---

```
refunded
```

Pedido reembolsado.

Após confirmação do pagamento o controle passa para o domínio de Produção.

---

# Estoque

Antes da criação da preferência de pagamento:

o sistema deverá validar disponibilidade.

Caso exista reserva de estoque, ela deverá ocorrer de forma transacional.

Nunca deverá existir estoque negativo.

---

# Idempotência

Todas as operações críticas deverão aceitar um:

```
Idempotency-Key
```

Chamadas repetidas deverão retornar exatamente o mesmo resultado.

Isso inclui:

- criação do pedido;
- geração da preferência;
- confirmação de pagamento;
- processamento de webhooks.

---

# Concorrência

O sistema deverá impedir:

- pedidos duplicados;
- consumo duplicado de créditos;
- reservas duplicadas;
- pagamentos duplicados.

Operações críticas deverão utilizar transações com isolamento apropriado.

---

# Falha de Pagamento

Caso o pagamento expire:

```
pending_payment

↓

expired
```

Os créditos reservados retornam para:

```
available
```

Nenhum desconto poderá permanecer reservado.

---

# Cancelamento

Pedidos poderão ser cancelados antes do início da produção.

Após confirmação do cancelamento:

- créditos retornam quando aplicável;
- estoque é atualizado quando necessário;
- histórico permanece preservado.

---

# Reembolso

Pedidos pagos poderão ser reembolsados.

O reembolso deverá registrar:

- responsável;
- motivo;
- data;
- operação financeira;
- estorno da Carteira Verde (quando aplicável).

Nenhuma informação histórica deverá ser removida.

---

# Histórico

Toda alteração de status gera um registro permanente.

Cada evento deverá armazenar:

- status anterior;
- novo status;
- origem;
- usuário responsável;
- data;
- observações.

---

# Notificações

O cliente deverá ser informado quando ocorrer:

- criação do pedido;
- pagamento confirmado;
- pagamento recusado;
- pagamento expirado;
- cancelamento;
- reembolso.

Os canais poderão incluir:

- interface da plataforma;
- e-mail;
- notificações futuras.

---

# Casos de Borda

O sistema deverá tratar, no mínimo:

- pagamento duplicado;
- webhook duplicado;
- clique repetido no botão de pagamento;
- perda de conexão durante checkout;
- timeout do gateway;
- estoque insuficiente;
- saldo insuficiente;
- tentativa de utilizar créditos pendentes;
- tentativa de utilizar créditos rejeitados.

---

# Critérios de Aceite

Um pedido é considerado válido quando:

- todos os itens existem;
- o estoque foi validado;
- os créditos foram verificados;
- o pagamento foi confirmado;
- o histórico foi registrado.

---

# Dependências

Relaciona-se diretamente com:

- PRD 03 — Business Rules
- PRD 05 — Carteira Verde
- PRD 07 — Production
- ADR 0002 — Autenticação e Segurança
- ADR 0003 — Gateway de Pagamento

---

# Status

Versão **1.0**

Este documento define oficialmente o funcionamento do checkout e do ciclo de pedidos da plataforma Agadê.