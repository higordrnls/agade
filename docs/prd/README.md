# Product Requirements Documents (PRD)

Esta pasta reúne todos os documentos de requisitos funcionais da plataforma da **Agadê**.

O objetivo do PRD é traduzir a visão do produto em especificações claras para engenharia, design e futuras integrações, garantindo que regras de negócio e fluxos permaneçam consistentes durante toda a evolução do projeto.

---

# Organização

Os documentos são divididos por domínio de negócio.

| Documento | Responsabilidade |
|-----------|------------------|
| 01 - Product Overview | Visão geral do produto, objetivos e escopo |
| 02 - User Flows | Fluxos completos da experiência do usuário |
| 03 - Business Rules | Regras de negócio da plataforma |
| 04 - Catalog | Estrutura do catálogo de produtos |
| 05 - Wallet | Carteira Verde e logística reversa |
| 06 - Orders | Checkout, pedidos e pagamentos |
| 07 - Production | Produção, impressão 3D e controle industrial |
| 08 - Security | Autenticação, permissões e RLS |
| 09 - Non Functional | Requisitos não funcionais |
| 10 - Roadmap | Funcionalidades futuras e evolução do produto |

---

# Objetivo

O PRD responde **o que o sistema deve fazer**.

Ele não descreve detalhes de implementação nem decisões arquitetônicas.

Esses assuntos pertencem, respectivamente, à pasta **architecture/** e aos **ADRs**.

---

# Relação com outros documentos

O desenvolvimento da Agadê segue a seguinte hierarquia documental:

```
Brand

↓

PRD

↓

ADR

↓

Architecture

↓

Código
```

Cada documento possui uma responsabilidade única.

---

# Como atualizar

Sempre que uma funcionalidade alterar o comportamento esperado do produto:

- atualize o capítulo correspondente;
- mantenha os demais documentos inalterados;
- evite duplicação de informações.

Mudanças arquitetônicas **não** devem ser registradas aqui.

---

# Escopo

Os PRDs descrevem:

- funcionalidades;
- fluxos;
- regras de negócio;
- estados;
- restrições;
- critérios de aceite.

Os PRDs não descrevem:

- identidade visual;
- decisões técnicas;
- estrutura de banco;
- detalhes de implementação.

---

# Convenções

Sempre que possível:

- um documento aborda apenas um domínio;
- requisitos são escritos de forma objetiva;
- regras de negócio são centralizadas;
- exemplos servem apenas para ilustrar comportamentos.

---

# Status

Versão:

**1.0**

Todos os documentos desta pasta representam a base funcional do MVP (Drop 01).

Novas funcionalidades deverão ser adicionadas através de novos capítulos ou revisões incrementais, preservando o histórico do projeto.