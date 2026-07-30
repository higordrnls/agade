# Architecture Decision Records (ADRs) — Agadê

Este diretório (`docs/adr/`) armazena os **Architecture Decision Records (ADRs)** da **Agadê Moda Ocular**. 

Um ADR é um documento conciso que captura uma decisão arquitetônica importante, juntamente com o seu contexto e as suas consequências. Na Agadê, a regra de engenharia é absoluta: **toda mudança estrutural significativa de arquitetura, stack ou padrão de segurança deve gerar um novo ADR antes de ir para o código**.

---

## 1. O que é um ADR?

Enquanto o PRD (Product Requirements Document) define **o que** o produto faz sob a ótica de negócio, o ADR registra o **porquê** escolhemos determinada tecnologia, padrão ou restrição estrutural. 

Eles servem para:
* Preservar o histórico de escolhas técnicas para futuros colaboradores.
* Evitar reabrir debates arquitetônicos já resolvidos ("por que não usamos X em vez de Y?").
* Garantir que trade-offs (vantagens e desvantagens) tenham sido conscientemente avaliados.

---

## 2. Estrutura Padrão (Template)

Todo novo ADR criado nesta pasta deve seguir rigorosamente a seguinte estrutura em Markdown:

```markdown
# [Número] - [Título Curto da Decisão]

* **Status:** [Proposto | Aceito | Rejeitado | Depreciado]
* **Data:** [DD/MM/AAAA]
* **Decisores:** [Nome da equipe / Engenharia]

## Contexto
Descreva o problema técnico, de infraestrutura ou de negócio que motivou a decisão e quais forças (técnicas, financeiras, de prazo) estavam em jogo.

## Decisão
Explique claramente qual opção foi escolhida e como ela resolve o problema apresentado.

## Consequências
Quais os impactos da decisão?
* **Positivas:** Ganhos de performance, segurança, DX (Developer Experience), etc.
* **Negativas / Riscos:** Complexidade adicionada, limitações técnicas aceitas (trade-offs).