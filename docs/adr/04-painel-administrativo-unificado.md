# ADR 0004: Estrutura do Painel Administrativo e Design System

## Status
✅ Aceito

## Contexto
A operação necessita de um painel de controle (*backoffice*) para gerenciar pedidos, créditos e catálogo sem overhead estrutural.

## Decisão
- O painel administrativo viverá sob o diretório protegido `/admin` dentro da mesma aplicação Next.js.
- O acesso será restrito via middleware e verificação de *role* no Supabase.
- **Design System:** O painel administrativo reutilizará integralmente o mesmo Design System da aplicação pública, evitando bibliotecas visuais independentes.

## Alternativas Avaliadas
- **Monorepo com `/apps/admin` separado:** Descartado por gerar overhead de build e manutenção para o volume operacional do MVP.

## Consequências
- Código unificado, reuso total de componentes e facilidade de deploy contínuo na Vercel.