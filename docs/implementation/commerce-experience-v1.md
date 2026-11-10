# AGADE — Matriz de recursos comerciais e editoriais (v1)

A comparação foi feita com as referências fornecidas pelo projeto: Misci, Ecran Studios, Boca Rosa e GoldKo. Não se trata de copiar layout ou afirmar que todas usam os mesmos provedores.

| Recurso | Referência observada | AGADE nesta entrega | Para ativação plena |
| --- | --- | --- | --- |
| Hero editorial | Misci, Ecran | Existente na home | Fotografias comerciais próprias ou licenciadas |
| Catálogo comercial | As quatro | Supabase RPC com busca e filtros | Cadastrar produtos aprovados e imagens |
| Página individual de produto | Misci, Ecran, Boca Rosa | **Nova:** `/produto/:slug` com variação, SKU, preço, dados técnicos condicionais | Galeria real e carrinho |
| Cliente / conta | Boca Rosa, GoldKo | **Nova:** `/conta` com formulário Auth OTP quando variáveis públicas configuradas | Revisar Supabase Auth, limites de e-mail, templates e domínio; implementar pedidos autorizados |
| Newsletter | GoldKo, Boca Rosa | **Nova:** seção editorial com consentimento, desabilitada enquanto backend não estiver conectado | API de subscrição, política LGPD, sistema de descadastro e antispam |
| Ajuda | Todas têm conteúdo institucional/comercial | **Nova:** `/ajuda` com FAQs e status transparente | Política final, canais reais de suporte, rastreio |
| Confiança | Políticas, meios de pagamento, informação técnica | Dados específicos de UV/polarização mostrados somente quando registrados | Declarações verificáveis por SKU, documentação apropriada e informações comerciais completas |
| Carrinho e pagamento | As quatro | **Não habilitado** | Fluxo ponta a ponta Mercado Pago, estoque, frete e antifraude |
| Frete | As quatro | Informação honesta de que depende de configuração | Melhor Envio/transportadoras, CEP e prazos verificáveis |
| Selos e avaliação | Alguns sites, dependendo do item | **Não fabricados** | Exibir somente se houver comprovação e autorização |

## Princípios de implementação
1. Nenhuma alegação de certificação UV é universal. `uv_claim` é uma informação específica da variante, não um selo.
2. Não criar reviews, descontos, contadores, políticas, endereços, telefone ou modalidades de pagamento fictícios.
3. A pesquisa fabril e o acervo 3D continuam no repositório; não aparecem no frontend comercial.
4. O envio de newsletter só será habilitado se `VITE_AGADE_NEWSLETTER_ENABLED=true` e `VITE_AGADE_NEWSLETTER_ENDPOINT` apontar para endpoint seguro de inscrição. Sem ambos, a página não captura dados.
5. A conta usa `VITE_SUPABASE_URL` e chave pública para solicitar link de acesso por e-mail. É necessário adicionar o domínio correto em Supabase Auth → URL Configuration. O painel de pedidos está indisponível até implementar autenticação/autorização do catálogo de pedidos de clientes.
6. Segredos de servidor nunca em variáveis `VITE_`.

## Fontes de referência
- https://www.misci.com/bolsa-eli-000133040/p
- https://www.ecranstudios.com/product-page/penduricalho
- https://bocarosa.com.br/account/login
- https://bocarosa.com.br/collections/produtos
- https://www.goldko.com.br/duvidas

## Newsletter — implementação de servidor (ainda desativada)
- Migração: `supabase/migrations/20261110_newsletter_interest.sql`, tabela privada de consentimentos e controle de tentativas.
- Edge Function: `supabase/functions/newsletter-subscribe/index.ts`, valida origem, consentimento e uso excessivo por fingerprint HMAC.
- Publicar somente depois de definir `AGADE_NEWSLETTER_ORIGIN=https://agade.vercel.app`, segredo `AGADE_NEWSLETTER_RATE_SALT` com mais de 32 caracteres e `ENABLE_NEWSLETTER_SIGNUP=true`.
- Frontend requer `VITE_AGADE_NEWSLETTER_ENABLED=true` e `VITE_AGADE_NEWSLETTER_ENDPOINT=https://<project>.supabase.co/functions/v1/newsletter-subscribe`.
- **Não ativar até haver política de privacidade publicada, contato real para solicitações e descadastro automático ou operacional.** O envio de campanhas não está implementado.
- A versão inicial não é verificação dupla de e-mail (double opt-in). Não declarar o e-mail como confirmado.
