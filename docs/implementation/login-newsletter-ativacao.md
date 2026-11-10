# AGADE — login e newsletter: implantação segura e pendências (10/11/2026)

## Estado real após esta entrega

- Código React para `/conta` recebe magic link via Supabase Auth, valida usuário na API, renova sessão expirada com refresh token, encerra sessão e exibe estado honesto quando não configurado.
- O login **não está ativado por padrão**. Requer `VITE_AGADE_AUTH_ENABLED=true`, URL do projeto e chave **publicável** no Cloudflare Pages, configuração de redirects, template e envio de e-mail no Supabase.
- Newsletter do rodapé só pode habilitar formulário com inscrição e endpoint de descadastro configurados, além da flag de ativação. Backend de inscrição continua condicionado a `ENABLE_NEWSLETTER_SIGNUP=true`.
- Migração nova `20261113_newsletter_unsubscribe.sql`: `unsubscribe_newsletter_interest` privada, idempotente, revoga consentimento (`active=false`).
- Edge Function `newsletter-unsubscribe`: aceita POST com `email` + assinatura HMAC, origin exato da AGADE, retorna confirmação sem expor lista de e-mails.
- `/cancelar-newsletter` permite confirmar a revogação pelo link de mensagem e oferece atendimento por e-mail se o link não estiver disponível.
- Nenhum envio de newsletter, campanha, double opt-in ou serviço SMTP de produção foi implementado. **Não ativar disparos ou captar endereços antes de configurar envio/confirmar consentimento, descadastro e política de retenção.**

## Etapa 1 — autenticação pelo Supabase (sem pagamento)

1. Supabase → Authentication → URL Configuration.
2. Site URL: `https://agade.pages.dev`.
3. Redirect URLs: incluir **exatamente** `https://agade.pages.dev/conta`; adicionar apenas o endereço de preview Cloudflare escolhido para testes, sem wildcards amplos na produção.
4. Email provider habilitado; revisar template de **Magic Link**, preferencialmente com `{{ .ConfirmationURL }}` do Supabase. Esta implementação trata o **fluxo implicit** de fragmento `access_token` + `refresh_token`, não PKCE `?code=`.
5. Confirmar domínio/SMTP, entregabilidade, limites e antifraude do Supabase Auth. O SMTP de teste pode não atender usuários finais.
6. Cloudflare Pages → agade → Settings → Variables and Secrets (variáveis de **build**, apenas públicas):
   - `VITE_SUPABASE_URL=https://vhzzxrtmnvlkrsdcnrbf.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...` (**somente** chave publicável do projeto)
   - `VITE_AGADE_AUTH_ENABLED=true` **somente após validar configuração do Auth**
7. Testar receber link, abrir no mesmo navegador, validar identificação, atualizar a página e sair; testar link expirado e sessão vencida.
8. A página não exibe histórico de pedidos ainda. Nunca afirmar que o dashboard de compras está pronto.

**Segurança:** A SPA guarda a sessão em `sessionStorage`, não em cookies HttpOnly; não há servidor de sessão neste fluxo. O JWT é removido da URL antes de mostrar dados e o refresh token é rotacionado quando necessário. Para lidar com compras reais, considerar o SDK oficial Supabase Auth, políticas RLS por usuário e revisão de segurança de sessão antes de conectar pedidos.

## Etapa 2 — SQL e Edge Functions de newsletter

1. Supabase SQL Editor: aplicar **uma única vez** a migração original `supabase/migrations/20261110_newsletter_interest.sql` se ainda não aplicada. Depois aplicar `supabase/migrations/20261113_newsletter_unsubscribe.sql`. Manter os dois códigos disponíveis para rollback planejado, mas **não rodar arquivo de testes CI diretamente no banco da AGADE**.
2. Implantar as Edge Functions `newsletter-subscribe` e `newsletter-unsubscribe` (sem copiar segredos para código ou para ChatGPT). Ambas requerem `verify_jwt=false` e validam origens/assinaturas na aplicação. Configuração no `supabase/config.toml`. <https://supabase.com/docs/guides/functions/auth-headers>
3. Supabase Edge Function Secrets:
   - `AGADE_NEWSLETTER_ORIGIN=https://agade.pages.dev` (se houver preview autorizado, lista exata separada por vírgula).
   - `AGADE_NEWSLETTER_RATE_SALT`: aleatório com >=32 caracteres.
   - `AGADE_NEWSLETTER_UNSUBSCRIBE_SECRET`: **outro** valor aleatório com >=32 caracteres; usado para assinar links no backend.
   - `ENABLE_NEWSLETTER_SIGNUP`: **manter `false`** enquanto descadastro e SMTP/campanha não estiverem operacionalmente testados.
   - `SUPABASE_SERVICE_ROLE_KEY` e `SUPABASE_URL`: disponíveis apenas no runtime Edge; nunca expor publicamente.
4. Ao haver estratégia de confirmação do endereço (double opt-in) e canal confiável de envio, validar fluxo de inscrição, rejeição, limite de tentativas, revogação de consentimento e que campanhas suprimam `active=false`.
5. Cloudflare Pages (variáveis **públicas**, só após tudo funcionar):
   - `VITE_AGADE_NEWSLETTER_ENABLED=true`
   - `VITE_AGADE_NEWSLETTER_ENDPOINT=https://vhzzxrtmnvlkrsdcnrbf.supabase.co/functions/v1/newsletter-subscribe`
   - `VITE_AGADE_NEWSLETTER_UNSUBSCRIBE_ENDPOINT=https://vhzzxrtmnvlkrsdcnrbf.supabase.co/functions/v1/newsletter-unsubscribe`
6. Rebuild intencional da `main` no Cloudflare apenas quando validado; não gastar builds com ajustes intermediários.

## Links assinados e privacidade

Quando um provedor de e-mail/campanha estiver disponível, **o backend** precisa incluir um link individual de descadastro em cada mensagem:
`AGADE_NEWSLETTER_UNSUBSCRIBE_SECRET=<segredo> node scripts/generate-newsletter-unsubscribe.mjs cliente@exemplo.com`

- Nunca executar esse script no navegador, nem publicar a variável secreta; seu resultado é um link individual.
- O link contém o e-mail na query string, logo deve ser tratado como dado pessoal: **não** registrar query em analytics, e evitar encaminhar URLs a terceiros. Preferir tokens opacos sem e-mail na URL em infraestrutura madura.
- O usuário clica no link, confirma, e a Edge Function valida HMAC. Endereço inexistente recebe a mesma resposta (não enumera cadastro).
- Também aceitar solicitações manuais via `atendimento@agade.com` enquanto a newsletter estiver desligada.
- O HMAC não expira automaticamente. Para invalidar links antigos, rotacione `AGADE_NEWSLETTER_UNSUBSCRIBE_SECRET` com cuidado, mantendo plano de descadastro para campanhas anteriores.
- **Não implementar campanhas sem teste de descadastro real e processo de supressão de contatos.**

## Cuidados de domínio e limites

- `agade.pages.dev` é produção na Cloudflare; `agade.vercel.app` é legado e **não deve ser considerado destino de redirects** de login.
- `VITE_` é exposto publicamente no JavaScript compilado; somente URL/chave pública e flags.
- Não divulgar WhatsApp; número não definido.
- E-mail de atendimento informado: `atendimento@agade.com`; confirmar que existe e recebe mensagens.
- Contatos de clientes não podem ser misturados com login nem vendidos.
- O backend antigo em Supabase permanece separado da hospedagem Cloudflare.

## Rebuild após configurar variáveis públicas

Em 10/11/2026, as variáveis públicas de Auth foram informadas como salvas na Cloudflare Pages. Este commit dispara uma nova compilação da branch `main` para que o Vite incorpore essas variáveis de build. Confirmar sucesso em Cloudflare → Deployments, e realizar teste controlado do login por e-mail antes de considerar a autenticação validada em produção.
