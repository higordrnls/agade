# Catálogo comercial · implementação 01

Esta entrega cria a base técnica para a futura coleção real da AGADE **sem alterar o catálogo conceitual** em `prototype/src/app/data/catalog.ts`.

## O que foi implementado
- `supabase/migrations/20261110_catalogo_comercial.sql`: produtos, variantes, estoque, preço em centavos e RPC pública com campos limitados.
- `prototype/src/app/data/storefrontCatalog.ts`: leitura da RPC e agrupamento por produto, sem inventar produtos quando a integração não estiver configurada.
- `prototype/src/app/lib/pricing.ts`: cálculo puro de preço mínimo como apoio gerencial, **não** o valor final confiável do checkout.

## Pré-requisitos para ativar
1. Criar/selecionar projeto Supabase e executar a migração.
2. Informar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` na configuração do build. **Nunca informar service role key ao navegador.**
3. Cadastrar produtos reais via ambiente administrativo seguro (ainda não desenvolvido). Por padrão, tudo começa como rascunho e nenhuma variante é vendável.
4. Conectar a vitrine atual à função `loadStorefrontCatalog` na próxima etapa, com estados de carregamento e vazio.

## Não implementado nesta etapa
Painel administrativo, autenticação, controle transacional de reservas, checkout Mercado Pago, frete, newsletter, tags de analytics e deploy. Eles permanecem fora do escopo desta PR.

## Segurança
A função pública entrega somente catálogo ativo e disponibilidade; custos de aquisição não são retornados. O cadastro comercial deverá ocorrer exclusivamente por backend com autenticação e autorização administrativa. O checkout futuro deverá reconfirmar preços e estoques no servidor, em transação.

## Preservação documental
Não editar ou remover dados conceituais, PRDs, ADRs ou Brand Book. A mudança de produção sob demanda para curadoria e revenda deverá ser documentada num ADR próprio antes de trocar o fluxo do checkout.

## Verificação prevista
- Conferir migração em projeto Supabase de desenvolvimento (ainda sem credenciais).
- Confirmar que chamadas anônimas à tabela de custos são negadas.
- Confirmar que `list_storefront_catalog` não mostra rascunhos nem estoque indisponível.
- Exercitar erro de rede e ausência de configuração.
- Executar `npm run build` em ambiente com dependências instaladas antes de merge.
