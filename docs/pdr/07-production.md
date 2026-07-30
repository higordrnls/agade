# PRD 07 — Produção (MES)

## Objetivo

Definir o funcionamento do módulo de produção da Agadê, responsável por transformar pedidos aprovados em armações físicas através da impressão 3D, garantindo rastreabilidade completa desde o filamento utilizado até a inspeção final.

---

# Visão Geral

Diferente de um e-commerce tradicional, a Agadê fabrica cada peça sob demanda.

Cada pedido aprovado gera automaticamente uma Ordem de Produção, que percorre todas as etapas industriais até a expedição.

O sistema deve registrar integralmente o histórico de fabricação para garantir qualidade, rastreabilidade e melhoria contínua do processo.

---

# Fluxo Geral

```text
Pedido Pago

↓

Ordem de Produção

↓

Fila de Impressão

↓

Lote de Produção

↓

Job de Impressão

↓

Controle de Qualidade

↓

Acabamento

↓

Expedição
```

---

# Entidades do Domínio

O módulo de produção é composto pelas seguintes entidades.

## Printers

Representa cada impressora disponível.

Campos mínimos:

- id
- nome
- modelo
- fabricante
- número de patrimônio
- volume útil
- diâmetro do bico
- status

Status possíveis:

- available
- printing
- maintenance
- offline

---

## Filament Batches

Representa cada lote físico de filamento.

Campos mínimos:

- id
- fornecedor
- material
- cor
- peso inicial
- peso restante
- data de fabricação
- lote do fabricante

Todo consumo deverá reduzir o peso disponível.

---

## Production Orders

Criada automaticamente após pagamento aprovado.

Representa o pedido industrial.

Campos mínimos:

- id
- order_id
- prioridade
- status
- data de criação
- previsão de conclusão

---

## Production Batches

Agrupa diversas ordens semelhantes.

Critérios sugeridos:

- mesma cor
- mesmo filamento
- mesma impressora
- mesmo perfil de impressão

Objetivos:

- reduzir trocas de material
- aumentar eficiência
- reduzir desperdício

---

## Production Jobs

Cada tentativa física de impressão.

Uma Ordem pode possuir vários Jobs.

Exemplo:

Job 01

↓

falhou

↓

Job 02

↓

sucesso

Nenhum histórico deve ser perdido.

---

# Estados da Ordem de Produção

## queued

Aguardando fila.

---

## scheduled

Alocada para uma impressora.

---

## printing

Impressão em andamento.

---

## paused

Pausada manualmente.

---

## failed

Falha de impressão.

Nova tentativa poderá ser criada.

---

## quality_check

Peça impressa.

Aguardando inspeção.

---

## finishing

Recebendo acabamento.

---

## approved

Produção concluída.

Produto liberado.

---

## rejected

Reprovada na qualidade.

Nova produção poderá ser aberta.

---

# Controle de Qualidade

Toda peça deverá passar por inspeção.

Itens avaliados:

- acabamento superficial
- fidelidade dimensional
- alinhamento
- integridade estrutural
- defeitos visuais
- resistência mecânica

Resultado:

- approved
- rejected

Nenhuma peça poderá seguir para expedição sem aprovação.

---

# Falhas de Impressão

Falhas comuns:

- descolamento da mesa
- entupimento
- quebra de filamento
- deslocamento de camada
- falha elétrica
- erro humano

Cada falha deverá registrar:

- motivo
- operador
- impressora
- horário
- observações

---

# Consumo de Material

Cada Job deverá registrar:

- peso previsto
- peso consumido
- desperdício
- tempo de impressão

Esses dados permitirão calcular:

- eficiência
- custo real
- índice de perdas

---

# Scrap (Refugo)

Peças descartadas deverão gerar registros.

Campos mínimos:

- motivo
- peso
- material
- reaproveitável

O sistema permitirá medir desperdício por:

- impressora
- operador
- modelo
- lote

---

# Impressoras

Cada impressora deverá manter histórico de:

- horas trabalhadas
- quantidade de impressões
- taxa de falhas
- manutenção realizada

Esses indicadores apoiarão decisões futuras de manutenção preventiva.

---

# Rastreabilidade

Uma armação deverá ser rastreável até:

- pedido
- cliente
- impressora
- operador
- lote de filamento
- job de impressão
- inspeção de qualidade

Nenhuma informação deverá ser perdida.

---

# Indicadores

O sistema deverá disponibilizar indicadores como:

Produção:

- peças produzidas
- peças aprovadas
- peças reprovadas

Qualidade:

- taxa de aprovação
- taxa de refugo
- retrabalho

Eficiência:

- tempo médio de impressão
- consumo médio por modelo
- utilização das impressoras

Material:

- consumo diário
- consumo por lote
- desperdício

---

# Regras de Negócio

O sistema deverá garantir que:

- toda Ordem de Produção esteja vinculada a um Pedido pago;
- toda peça possua pelo menos um Job;
- um Job nunca pertença a duas Ordens;
- falhas não apaguem o histórico;
- todo consumo de filamento seja registrado;
- nenhuma peça seja enviada sem aprovação de qualidade;
- toda movimentação permaneça auditável.

---

# Critérios de Aceite

O módulo será considerado concluído quando:

- pedidos pagos gerarem Ordens automaticamente;
- Jobs puderem ser criados e acompanhados;
- lotes de produção agruparem Ordens semelhantes;
- impressoras puderem ser controladas;
- consumo de filamento for registrado;
- falhas gerarem novas tentativas sem perda de histórico;
- inspeções aprovarem ou rejeitarem peças;
- todos os eventos permanecerem rastreáveis.