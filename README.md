# Agadê

> Plataforma digital da **Agadê Moda Ocular LTDA ME**.

A Agadê é uma marca brasileira de moda ocular que desenvolve armações autorais impressas em 3D a partir de filamento PET-G reciclado, unindo design contemporâneo, manufatura digital e economia circular.

Este repositório concentra todo o ecossistema digital da marca, incluindo a experiência de e-commerce, personalização de produtos, logística reversa, carteira de créditos verdes e ferramentas administrativas.

---

# Status do Projeto

> **Fase Atual:** Desenvolvimento do MVP — Drop 1

## Roadmap

- ✅ Branding Book
- ✅ Architecture Decision Records (ADR)
- ✅ Product Requirements Document (PRD)
- ⏳ Design de Interface (Figma)
- ⏳ Estrutura inicial do banco de dados
- ⏳ Desenvolvimento Frontend
- ⏳ Integração Supabase
- ⏳ Integração Mercado Pago
- ⏳ Testes
- ⏳ Deploy

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

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Backend (BaaS)

- Supabase
    - PostgreSQL
    - Authentication
    - Row Level Security (RLS)
    - Storage
    - Edge Functions

## Infraestrutura

- Vercel
- Supabase Managed

## Pagamentos

- Mercado Pago

---

# Arquitetura

A arquitetura segue uma abordagem **Backend as a Service (BaaS)**.

O objetivo é minimizar infraestrutura operacional, concentrando as regras de negócio em:

- Banco PostgreSQL
- Row Level Security
- Edge Functions
- Políticas de segurança

Não existe servidor dedicado nesta primeira versão do projeto.

---

# Estrutura do Repositório

```text
.
├── app/
├── components/
├── lib/
├── public/
├── styles/
├── docs/
│   ├── adr/
│   ├── prd/
│   ├── brandbook/
│   └── assets/
├── supabase/
└── README.md