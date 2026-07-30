# ADR 0001: Definição da Stack Tecnológica Principal

## Status
✅ Aceito

## Contexto
A Agadê nasce como um e-commerce de alta-costura sustentável (armações em PET-G reciclado) com modelo circular. Precisamos de uma stack moderna, ágil e com excelente performance de SEO para a camada editorial, sem inchar a infraestrutura com servidores dedicados.

## Decisão
Adotamos a seguinte stack tecnológica:
- **Frontend & App Layer:** Next.js (React) + TypeScript + Tailwind CSS + Framer Motion.
- **Backend & Database (BaaS):** Supabase (PostgreSQL + Auth + Storage + Edge Functions).
- **Hospedagem:** Vercel (Frontend) + Supabase Managed (Banco de Dados e Infra).

## Alternativas Avaliadas
- **Arquitetura Tradicional (Node.js/NestJS + Banco Próprio):** Descartada por exigir manutenção de servidor 24/7 e introduzir complexidade operacional desnecessária.
- **Outros BaaS (Firebase):** Descartado pela fraqueza na modelagem relacional comparada ao PostgreSQL nativo.

## Consequências
- Zero gestão de servidores dedicados.
- Alta velocidade de entrega com ecossistemas integrados.

## Revisão
Este ADR somente poderá ser revisado caso uma das seguintes condições ocorra:
- Necessidade comprovada de backend dedicado;
- Limitações estruturais do Supabase para os requisitos do produto;
- Mudança significativa na estratégia de escalabilidade da plataforma.