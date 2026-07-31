# PRD 03 — Business Rules

---

# Objetivo

Este documento centraliza todas as regras de negócio da plataforma Agadê.

Seu objetivo é garantir que decisões críticas permaneçam consistentes em qualquer implementação, independentemente da tecnologia utilizada.

Toda lógica descrita aqui deve ser considerada fonte oficial para backend, frontend e painel administrativo.

---

# Catálogo

## Produção sob demanda

Nenhuma armação é produzida antes da confirmação do pagamento.

O estoque representa disponibilidade de venda e não necessariamente peças já fabricadas.

---

## Produtos

Cada modelo pertence a uma coleção (Drop).

Um produto pode possuir:

- múltiplas cores;
- múltiplas variantes;
- múltiplos SKUs.

Cada SKU representa uma configuração vendável.

---

## Disponibilidade

Produtos podem assumir os estados:

- ativo;
- indisponível;
- arquivado.

Produtos indisponíveis permanecem acessíveis para consulta quando definido pela administração.

---

# Pedidos

## Criação

Um pedido somente pode ser criado para usuários autenticados.

Ao iniciar o checkout, o sistema cria um pedido em estado temporário.

---

## Estados do pedido

O pedido percorre os seguintes estados:

```
draft

↓

pending_payment

↓

paid

↓

in_production

↓

quality_check

↓

ready_to_ship

↓

shipped

↓

delivered
```

Fluxos alternativos:

```
pending_payment

↓

cancelled
```

ou

```
paid

↓

refunded
```

Toda alteração de estado deve gerar histórico.

---

# Pagamento

O gateway oficial do MVP é o Mercado Pago.

O pedido somente avança para produção após confirmação do pagamento.

Pagamentos cancelados ou expirados encerram automaticamente o pedido.

---

# Carteira Verde

## Objetivo

A Carteira Verde recompensa clientes que participam do programa de logística reversa da Agadê.

Os créditos são contabilizados em quilogramas (kg).

Nunca em reais.

---

## Origem dos créditos

Créditos podem ser gerados por:

- entrega de material reciclável;
- campanhas promocionais;
- bônus administrativos;
- ajustes operacionais.

Toda movimentação deve possuir origem identificável.

---

## Auditoria

Nenhum crédito é disponibilizado imediatamente.

Toda entrega passa por auditoria.

Estados possíveis:

- pending;
- audited;
- rejected.

Somente créditos auditados podem ser utilizados.

---

# Conversão de créditos

A conversão entre kg e desconto ocorre apenas durante o checkout.

A política vigente define:

- fator de conversão;
- percentual máximo permitido;
- período de validade.

A política deve ser versionada.

---

## Limite de desconto

Independentemente do saldo disponível, nenhum pedido poderá receber desconto superior ao limite definido pela política ativa.

No MVP:

**50% do valor do produto.**

---

## Consumo de créditos

Ao iniciar o pagamento:

os créditos deixam de estar disponíveis e passam para estado reservado.

Após confirmação do pagamento:

os créditos tornam-se consumidos.

Caso o pagamento expire:

os créditos retornam automaticamente ao estado disponível.

---

# Produção

Cada pedido aprovado gera uma ordem de produção.

Uma ordem pode possuir diversas tentativas de impressão.

Falhas nunca devem apagar histórico.

---

## Controle de qualidade

Nenhum produto poderá seguir para expedição sem aprovação do controle de qualidade.

Produtos reprovados retornam para nova produção.

---

# Usuários

Papéis oficiais do sistema:

- customer;
- collector;
- admin.

Cada papel possui permissões específicas definidas pelo sistema de autenticação e políticas RLS.

---

# Administração

Somente administradores podem:

- cadastrar produtos;
- alterar catálogo;
- validar auditorias;
- cancelar pedidos;
- realizar ajustes manuais;
- alterar configurações globais.

---

# Integridade

As seguintes regras nunca podem ser violadas:

- saldo não pode ficar negativo;
- estoque não pode ficar negativo;
- um pedido pago nunca volta para draft;
- créditos consumidos não podem ser reutilizados;
- usuários acessam apenas seus próprios dados;
- toda movimentação financeira possui histórico.

---

# Idempotência

Operações críticas devem ser idempotentes.

Incluem:

- criação de pedidos;
- pagamento;
- webhooks;
- consumo de créditos.

Chamadas repetidas não podem gerar duplicidade.

---

# Auditoria

Toda alteração crítica deverá possuir registro permanente.

Exemplos:

- mudança de status;
- alteração de desconto;
- ajustes administrativos;
- movimentação de créditos.

Os registros de auditoria não poderão ser alterados posteriormente.

---

# Feature Flags

Funcionalidades experimentais poderão ser habilitadas ou desabilitadas sem necessidade de novo deploy.

Exemplos:

- WebAR;
- novos Drops;
- campanhas;
- Carteira Verde.

---

# Critérios Gerais

Toda regra de negócio deve obedecer aos princípios:

- consistência;
- rastreabilidade;
- segurança;
- simplicidade;
- escalabilidade.

---

# Dependências

Relaciona-se diretamente com:

- PRD 05 — Wallet
- PRD 06 — Orders
- PRD 07 — Production
- ADR 0002 — Autenticação e Segurança
- ADR 0003 — Gateway de Pagamento

---

# Status

Versão **1.0**

Este documento estabelece as regras oficiais de negócio do MVP da Agadê.

Qualquer alteração funcional futura deverá atualizar este documento antes da implementação.