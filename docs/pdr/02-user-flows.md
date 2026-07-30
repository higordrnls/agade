# PRD 02 — User Flows

---

# Objetivo

Este documento descreve todos os fluxos principais da plataforma Agadê sob a perspectiva do usuário.

Os fluxos representam a jornada completa desde o primeiro acesso até o pós-venda, servindo como referência para UX, frontend e backend.

---

# Fluxo 01 — Descoberta

## Objetivo

Apresentar a identidade da marca e conduzir o visitante até a coleção.

## Etapas

1. Landing Page
2. Manifesto
3. Coleção (Drop)
4. Catálogo
5. Página do Produto

## Resultado Esperado

O usuário compreende a proposta da Agadê e inicia a exploração do catálogo.

---

# Fluxo 02 — Exploração do Catálogo

## Objetivo

Permitir que o usuário descubra os modelos disponíveis.

## Funcionalidades

- visualizar coleção;
- navegar entre produtos;
- pesquisar;
- filtrar por coleção (futuro);
- visualizar detalhes.

## Resultado Esperado

O usuário encontra um modelo de interesse.

---

# Fluxo 03 — Página do Produto (PDP)

## Objetivo

Apresentar todas as informações necessárias para tomada de decisão.

## Conteúdo

- nome;
- descrição;
- imagens;
- galeria;
- especificações;
- cores disponíveis;
- peso;
- preço;
- prazo estimado;
- materiais.

## Ações

- selecionar cor;
- selecionar lente;
- adicionar ao carrinho.

---

# Fluxo 04 — Personalização

Após escolher um modelo o usuário poderá configurar sua peça.

## Configurações

- cor;
- tipo de lente;
- observações futuras.

A personalização deve atualizar o resumo do pedido em tempo real.

---

# Fluxo 05 — Carrinho

## Objetivo

Revisar os produtos antes do pagamento.

## Funcionalidades

- alterar quantidade (quando permitido);
- remover produto;
- visualizar subtotal;
- calcular frete (futuro);
- iniciar checkout.

---

# Fluxo 06 — Checkout

## Etapas

1. autenticação (caso necessário);
2. endereço;
3. revisão do pedido;
4. aplicação opcional de créditos;
5. pagamento.

## Gateway

Mercado Pago.

Métodos previstos:

- PIX;
- cartão de crédito;
- boleto (quando disponível).

---

# Fluxo 07 — Carteira Verde

A Carteira Verde concentra todo o relacionamento com a logística reversa.

## Informações

- saldo disponível;
- histórico;
- créditos utilizados;
- auditorias;
- entregas realizadas.

## Funcionalidades

- acompanhar solicitações;
- visualizar histórico;
- acompanhar validações.

---

# Fluxo 08 — Solicitação de Coleta

## Objetivo

Permitir que o cliente participe do programa circular.

## Etapas

1. iniciar solicitação;
2. informar materiais;
3. confirmar endereço;
4. aguardar auditoria;
5. receber créditos.

O crédito somente será disponibilizado após validação.

---

# Fluxo 09 — Acompanhamento do Pedido

Após confirmação do pagamento o cliente acompanha toda a produção.

## Estados

- aguardando pagamento;
- pagamento aprovado;
- em produção;
- controle de qualidade;
- pronto para envio;
- enviado;
- entregue.

Sempre que possível haverá atualização automática.

---

# Fluxo 10 — Área do Cliente

A área autenticada concentra toda a relação entre usuário e plataforma.

## Funcionalidades

- perfil;
- pedidos;
- carteira verde;
- endereços;
- configurações.

---

# Fluxo 11 — Administração

A área administrativa é restrita aos usuários com papel administrativo.

## Funcionalidades

- catálogo;
- pedidos;
- produção;
- carteira verde;
- usuários;
- configurações.

Todo acesso deve respeitar as políticas de segurança definidas no sistema.

---

# Estados Gerais do Usuário

Visitante

↓

Cliente autenticado

↓

Cliente comprador

↓

Cliente participante da logística reversa

↓

Cliente recorrente

---

# Critérios Gerais

Todos os fluxos devem priorizar:

- simplicidade;
- baixa fricção;
- clareza;
- consistência visual;
- acessibilidade;
- responsividade.

---

# Dependências

Este documento é complementado por:

- PRD 03 — Business Rules
- PRD 05 — Wallet
- PRD 06 — Orders
- PRD 08 — Security

---

# Status

Versão **1.0**

Os fluxos descritos representam a experiência oficial do MVP da plataforma Agadê.