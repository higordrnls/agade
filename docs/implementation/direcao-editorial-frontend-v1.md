# AGADE · Direção editorial do frontend v1

**Escopo:** `prototype/src/app/pages/Home.tsx`, `Storefront.tsx`, `Navigation.tsx`, `Footer.tsx`.

## Conceito
**Outra forma de ver.** A AGADE é uma marca editorial de curadoria de óculos solares fundada em Uberlândia/MG. O produto é a escolha de formas e perspectivas, não uma alegação de fabricação própria.

## Linguagem visual
- Hierarquia editorial: serifada de grande escala, títulos expressivos e itálico pontual.
- Paleta: marfim e pedra, verde-cinza escuro, oliva e preto quente. Sem cartões, badges decorativos ou padrões genéricos de e-commerce.
- Ritmo: grid assimétrico, textos concisos, blocos com respiro, entradas discretas e chamadas claras.
- Mobile first com navegação acessível; nenhum pop-up, autoplay ou dependência de ferramenta paga.

## Caminho de leitura
1. Manifesto visual na homepage: AGADE e a primeira chamada à seleção.
2. Contexto de marca e procedência em Uberlândia.
3. Entrada de curadoria comercial em preparação.
4. Arquivo de fabricação digital como projeto conceitual, explicitamente **não à venda**.
5. Página `/loja` com dados reais do Supabase ou estado vazio honesto; não inventa preços, estoque, imagens ou benefícios.

## Limites e próximo ciclo
- Sem carrinho ou botão de compra, pois o checkout não passou por teste ponta a ponta.
- Produtos só aparecem no grid comercial se retornados pela RPC do Supabase.
- Fotos reais e autorização de uso serão necessárias para o lançamento; nenhum material conceitual deve se passar por fotografia de mercadoria.
- Restante das páginas do projeto (`/story`, `/technology`, `/sustainability`, `/collection`) permanece preservado, mas ainda precisa ser integrado ao novo tom visual em outro ciclo.
- Alterações apenas na branch `feat/catalogo-base-v1`/PR #2, sem deploy ou merge automático.

## Verificações
Workflow GitHub Actions: `catalog-checks.yml` (build frontend, testes catálogo, banco e Edge Functions).
