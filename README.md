# Agadê

> **Projeto conceitual de portfólio — não é uma empresa ou operação comercial em funcionamento.**

A Agadê é uma proposta de marca brasileira de moda ocular que explora armações autorais produzidas por fabricação digital, unindo design contemporâneo, manufatura digital e economia circular.

Este repositório documenta e prototipa essa proposta de produto e experiência digital. Os modelos, renders, especificações, dados comerciais e demais elementos apresentados são **conceituais e fictícios**, criados para demonstrar a visão do projeto.

---

# Status do Projeto

> **Fase Atual:** Protótipo conceitual — Drop 01

O projeto está atualmente concentrado na validação da experiência e da linguagem visual por meio de um protótipo frontend.

### O que existe hoje

- ✅ Branding Book
- ✅ Architecture Decision Records (ADR)
- ✅ Product Requirements Document (PRD)
- ✅ Catálogo conceitual do Drop 01
- ✅ Renders conceituais dos 12 modelos
- ⏳ Migração do protótipo para Next.js
- ⏳ Estrutura inicial do banco de dados
- ⏳ Integração Supabase
- ⏳ Fluxos de personalização e checkout
- ⏳ Testes
- ⏳ Deploy

> As etapas de backend, pagamentos, produção e operação comercial são parte da visão futura do projeto e **não representam funcionalidades atualmente disponíveis**.

---

# Sobre os Dados Conceituais

Para fins de portfólio, o projeto utiliza dados fictícios para representar como uma futura operação poderia funcionar.

Isso inclui, quando aplicável:

- produtos e variantes;
- renders e imagens conceituais;
- preços e informações comerciais;
- especificações técnicas estimadas;
- SKUs e inventário;
- fluxos de personalização;
- sustentabilidade e economia circular.

Esses dados não devem ser interpretados como produtos disponíveis para compra, especificações de produtos fabricados ou informações de uma empresa em operação.

---

# Princípios do Projeto

Toda decisão técnica deve preservar os pilares fundamentais da Agadê:

- Performance
- Simplicidade
- Sustentabilidade
- Consistência de marca

A implementação nunca deve contradizer esses princípios sem revisão formal.

---

# Stack Tecnológica

## Protótipo atual

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion
- React Router

## Arquitetura planejada

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend (BaaS)

- Supabase
    - PostgreSQL
    - Authentication
    - Row Level Security (RLS)
    - Storage
    - Edge Functions

### Infraestrutura

- Vercel
- Supabase Managed

### Pagamentos

- Mercado Pago

> A stack planejada acima representa a arquitetura definida nos documentos do projeto. A implementação será feita progressivamente, após a validação do protótipo.

---

# Arquitetura

A arquitetura futura segue uma abordagem **Backend as a Service (BaaS)**.

O objetivo é minimizar infraestrutura operacional, concentrando as regras de negócio em:

- Banco PostgreSQL
- Row Level Security
- Edge Functions
- Políticas de segurança

Não existe servidor dedicado previsto para a arquitetura planejada.

---

# Estrutura do Repositório

```text
.
├── prototype/
│   ├── public/
│   │   └── imagens/
│   │       └── catalog/
│   │           └── drop-01/
│   └── src/
├── docs/
│   ├── adr/
│   ├── prd/
│   ├── brandbook/
│   └── assets/
├── supabase/
└── README.md
```

---

# Objetivo do Projeto

A Agadê é desenvolvida como um projeto de portfólio para explorar, na prática, a construção de um produto digital completo: da definição de marca e produto à arquitetura de software, experiência de e-commerce, dados e futura infraestrutura.

O objetivo não é apenas apresentar uma interface visual, mas demonstrar o processo de transformar uma ideia em um sistema digital coerente, documentado e tecnicamente estruturado.
