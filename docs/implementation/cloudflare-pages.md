# AGADE — migração gratuita da Vercel para Cloudflare Pages

## Arquitetura
- Frontend: React + Vite + Tailwind, SPA estática em **Cloudflare Pages**.
- Autenticação, banco e Edge Functions: **Supabase existente**, sem migração de dados.
- Pagamentos: **Mercado Pago via Supabase Edge Functions** (checkout ainda DESATIVADO).
- Pesquisa fabril/arquivos históricos continuam no repositório.

## Configuração no dashboard Cloudflare
1. Cloudflare Dashboard → Workers & Pages → Create application → **Pages** → Connect to Git.
2. Autorizar Cloudflare a acessar o repositório GitHub `higordrnls/agade`.
3. Nome do projeto sugerido: `agade` (ou `agade-site` se já estiver ocupado).
4. Production branch: `main`. Habilitar preview da branch `feat/brasil-terracota-editorial` no controle de branches, para revisar a nova direção sem publicar na principal.
5. Root directory: `prototype`.
6. Framework preset: **React (Vite)** ou Vite. Build command: `npm run build`. Output directory: `dist` (relativo à raiz `prototype`).
7. Variável de build `NODE_VERSION=22` (se precisar fixar versão). Não instalar/adicionar Wrangler para um frontend estático.
8. Primeiro deploy deve publicar a branch `main`, mantendo a nova direção na URL de preview.
9. O serviço gerará `https://<project>.pages.dev`; testes obrigatórios: `/`, `/loja`, `/sobre`, `/conta`, `/ajuda`, `/guia`, `/politicas`, `/privacidade`, refresh direto em rotas profundas, telas mobile e desktop, menu, sacola e links.

### Variáveis públicas opcionais (apenas se realmente necessário)
- `VITE_SUPABASE_URL=https://vhzzxrtmnvlkrsdcnrbf.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = chave **publicável** `sb_publishable_...` da instância Supabase, **NÃO** segredo/service role.
- `VITE_AGADE_NEWSLETTER_ENABLED` deixar ausente/false.
- `VITE_AGADE_NEWSLETTER_ENDPOINT` deixar ausente.
- Nenhuma variável privada do Mercado Pago, `SUPABASE_SERVICE_ROLE_KEY`, `sb_secret_...`, chaves administrativas ou tokens em `VITE_` ou Cloudflare Pages frontend.

Se configurar Auth por link, ajustar Supabase Authentication → URL Configuration:
- Site URL e Redirect URLs para os hosts reais Cloudflare Pages, produção e previews escolhidos.
- Evitar wildcard abrangente em produção. Verificar redirects, CORS e SMTP antes de anunciar login funcionando.

## Estrutura SPA
- `prototype/public/_redirects` garante fallback para `index.html` em links diretos (React Router), sem servidor Node.
- `prototype/public/_headers` aplica cabeçalhos defensivos simples a ativos estáticos.
- Não configurar Pages Functions/Workers nem serviço de API público para checkout nesta etapa.
- Todos os assets estáticos do protótipo continuam em `prototype/public` e são copiados para `dist` pelo Vite.

## Plano de corte
1. **Não remover Vercel imediatamente**. Primeiro abrir e testar `pages.dev`.
2. Testar preview da direção terracota antes de fazer merge no GitHub `main`.
3. Apontar domínio próprio quando existir, verificando DNS, SSL e redirecionamentos.
4. Atualizar URLs de autenticação e links externos; configurar domínio canônico e analytics quando aprovados.
5. Somente depois desativar deploys na Vercel para não gerar builds desnecessários.
6. `agade.vercel.app` não muda automaticamente para a Cloudflare e não se pode transferir essa URL para Pages. Publicar novo link `pages.dev` ou usar domínio próprio.

## Limites e custos
- Cloudflare Pages Free: 500 builds/mês, 1 build simultâneo, timeout de 20 min. Limites sujeitos a alteração; monitorar quota.
- Vercel Hobby: restrição contratual de projetos comerciais. Não usar como hospedagem definitiva da loja.
- Cloudflare Pages e Supabase são serviços separados; suas cotas devem ser acompanhadas individualmente.
- Provedores de pagamento, envios e e-mail podem cobrar taxas operacionais.

## Links oficiais
- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/pages/configuration/build-configuration/#build-environment-variables
