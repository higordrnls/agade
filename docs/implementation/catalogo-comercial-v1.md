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
4. Página `/loja` já usa `loadStorefrontCatalog`, com estados de carregamento, vazio e falha. A coleção conceitual antiga permanece em `/collection`.
5. Para cadastro inicial de baixo custo, utilizar **Supabase Studio > Table Editor** sob autenticação administrativa da conta do projeto; não expor telas públicas de edição. Um painel próprio só será implementado quando trouxer benefício operacional. Todos os registros começam em `draft` / variante `active=false`.

## Não implementado nesta etapa
Painel administrativo próprio (Supabase Studio serve como administração provisória), autenticação de clientes, controle transacional de reservas, checkout Mercado Pago, frete, newsletter, tags de analytics e deploy. Eles permanecem fora do escopo desta PR.

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

## CI automatizada
O workflow `.github/workflows/catalog-checks.yml` executa testes de precificação e agrupamento de variantes em Node 22 e build com Vite. Testes de banco/RLS e fluxo de compra exigem infraestrutura de desenvolvimento e permanecem pendentes. Não realizar merge até a revisão dessas verificações.
