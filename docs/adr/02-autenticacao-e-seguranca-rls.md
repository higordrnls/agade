# ADR 0002: Estratégia de Autenticação e Segurança (Row Level Security & Ownership)

## Status
✅ Aceito

## Contexto
O ecossistema lida com dados sensíveis de clientes, carteira de créditos verdes em kg e pedidos. A segurança precisa residir na camada do banco de dados para evitar vazamentos de dados entre usuários.

## Decisão
- Utilizar **Supabase Auth** para gestão de identidades.
- Implementar **Row Level Security (RLS)** diretamente nas tabelas do PostgreSQL.
- Toda informação sensível pertence a um proprietário (*owner*). As políticas de RLS devem considerar simultaneamente:
  1. **Role** (`customer`, `collector`, `admin`)
  2. **Ownership** (`auth.uid()`)

## Alternativas Avaliadas
- **Clerk / Auth0:** Descartados por introduzirem serviços externos separados, gerando duplicidade de auth e complexidade de sincronização com o banco.

## Consequências
- Segurança robusta direto no SGBD.
- Simplificação severa da camada de backend.