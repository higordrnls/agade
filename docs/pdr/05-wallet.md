# PRD 05 — Carteira Verde

---

# Objetivo

A Carteira Verde é o sistema proprietário de recompensas da Agadê.

Ela registra, audita e controla todos os créditos provenientes da participação do cliente no programa de logística reversa da marca.

Seu funcionamento é baseado em um modelo de razão contábil (ledger), garantindo rastreabilidade, auditoria e integridade de todas as movimentações.

---

# Princípios

A Carteira Verde não é uma conta bancária.

Ela não possui saldo financeiro.

O ativo da plataforma é representado exclusivamente em massa (quilogramas de material auditado).

Todo benefício financeiro é calculado apenas durante o checkout.

---

# Unidade Oficial

A única unidade oficial da Carteira Verde é:

```
Quilograma (kg)
```

O sistema nunca armazena valores monetários como saldo.

---

# Ciclo de Vida dos Créditos

Todo crédito percorre obrigatoriamente o seguinte fluxo:

```
Entrega

↓

Auditoria

↓

Crédito Disponível

↓

Reserva

↓

Consumo
```

ou

```
Entrega

↓

Auditoria

↓

Rejeição
```

---

# Origem dos Créditos

Um crédito pode ser originado por:

- entrega de material reciclável;
- campanhas promocionais;
- bônus administrativos;
- ações institucionais;
- estorno de pedidos.

Toda origem deve permanecer registrada permanentemente.

---

# Solicitação de Coleta

O cliente poderá solicitar uma coleta através da plataforma.

Cada solicitação deverá conter:

- usuário;
- endereço;
- data;
- observações;
- materiais declarados;
- peso declarado.

O peso informado pelo cliente possui caráter apenas informativo.

---

# Auditoria

Após a coleta, um coletor autorizado realiza a pesagem física.

São registrados:

- peso auditado;
- responsável;
- data;
- observações.

Somente após a auditoria os créditos tornam-se utilizáveis.

---

# Estados de Auditoria

Uma entrega pode assumir:

```
pending
```

Aguardando validação.

---

```
audited
```

Material validado.

---

```
rejected
```

Material recusado.

---

# Peso Declarado

Peso informado pelo cliente.

Nunca gera crédito automaticamente.

Serve apenas como expectativa da coleta.

---

# Peso Auditado

Peso validado fisicamente.

É o único valor utilizado para geração de créditos.

---

# Ledger

A Carteira Verde funciona como um livro razão.

Cada movimentação gera um lançamento permanente.

Nenhum registro é apagado.

Novos eventos geram novas linhas.

Nunca alterações destrutivas.

---

# Estados dos Créditos

Cada lançamento poderá assumir:

```
pending
```

Ainda aguardando auditoria.

---

```
available
```

Disponível para utilização.

---

```
reserved
```

Separado durante o checkout.

---

```
consumed
```

Utilizado em uma compra.

---

```
cancelled
```

Movimentação cancelada.

---

```
expired
```

Caso futuras políticas prevejam expiração.

---

# Reserva

Durante o checkout os créditos deixam temporariamente de estar disponíveis.

Fluxo:

```
available

↓

reserved
```

Caso o pagamento seja aprovado:

```
reserved

↓

consumed
```

Caso o pagamento expire:

```
reserved

↓

available
```

---

# Política de Conversão

A conversão entre quilogramas e desconto é definida por políticas versionadas.

A política determina:

- percentual por kg;
- limite máximo;
- vigência;
- versão.

A Carteira Verde nunca realiza conversões por conta própria.

Ela apenas fornece o saldo.

---

# Limite de Utilização

No MVP:

```
Máximo de 50%

de desconto
por pedido.
```

Esse limite pertence à política de desconto.

Não ao saldo da carteira.

---

# Estornos

Pedidos cancelados poderão devolver créditos.

Nesse caso:

```
consumed

↓

available
```

O estorno gera um novo lançamento.

O histórico original permanece intacto.

---

# Histórico

O usuário poderá visualizar:

- data;
- origem;
- peso;
- status;
- observações;
- pedido relacionado.

O histórico nunca poderá ser editado pelo cliente.

---

# Ajustes Administrativos

Administradores poderão criar ajustes manuais.

Todo ajuste deverá possuir:

- justificativa;
- responsável;
- data;
- tipo.

Nenhum ajuste poderá apagar histórico anterior.

---

# Auditoria Completa

Todas as movimentações deverão registrar:

- usuário;
- origem;
- responsável;
- data;
- horário;
- operação;
- referência.

Esses dados serão utilizados para rastreabilidade.

---

# Segurança

Clientes acessam apenas seus próprios registros.

Coletores acessam apenas auditorias autorizadas.

Administradores possuem acesso completo.

Todas as permissões são controladas por RLS.

---

# Casos de Borda

O sistema deve impedir:

- saldo negativo;
- consumo duplicado;
- reservas duplicadas;
- auditorias duplicadas;
- utilização de créditos pendentes;
- utilização de créditos rejeitados.

---

# Escalabilidade

A estrutura da Carteira Verde deverá permitir futuras funcionalidades:

- campanhas sazonais;
- bônus temporários;
- validade de créditos;
- níveis de fidelidade;
- carteira compartilhada;
- múltiplos materiais recicláveis.

Sem alteração estrutural do modelo de dados.

---

# Dependências

Relaciona-se diretamente com:

- PRD 03 — Business Rules
- PRD 06 — Orders
- PRD 08 — Security
- ADR 0002 — Autenticação e Segurança

---

# Status

Versão **1.0**

Este documento define oficialmente o funcionamento da Carteira Verde da Agadê e deverá ser considerado a referência principal para implementação do ledger, auditoria e políticas de desconto.