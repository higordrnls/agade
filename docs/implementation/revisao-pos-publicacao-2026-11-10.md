# AGADE — revisão inicial pós-publicação (2026-11-10)

## Publicação aprovada
- PR #5 merged em `main` no commit `1dbc04ff75c75fb247366a1f085ac3667df19b59`.
- CI do último commit de revisão visual: sucesso antes do merge.
- Cloudflare Pages acompanha `main`; deployment público precisa de confirmação no painel Cloudflare, pois o GitHub connector só expõe status da antiga Vercel.

## Achados e prioridades
| Prioridade | Tema | Estado atual | Próximo passo |
|---|---|---|---|
| P0 | Fotos editoriais em CDN Pexels externo | Imagens ilustrativas externas, sem comprovação de disponibilidade em todos os dispositivos | Revisar preview mobile e desktop; obter ativos próprios e autorizações de uso antes do lançamento |
| P0 | Checkout | Não disponível, sacola local sem reserva | Não ativar pagamentos sem frete real, estoque transacional, pedidos, webhook e reconciliação testados |
| P0 | Identificação legal do fornecedor | Dados de fornecedor e endereço do e-commerce não publicados de forma completa | Validar identificação comercial conforme legislação antes de vender; proteger endereço residencial |
| P0 | Produto verdadeiro | Sem catálogo final de SKU, fotos, preços, disponibilidade e laudos dos fornecedores | Aguardar seleção dos modelos e evidências técnicas |
| P1 | Supabase Auth | Magic link prototipado; sem comprovação de redirect, SMTP e ciclo completo de sessão | Configurar URLs Cloudflare no Supabase e testar login real; revisar expiração/renovação de sessão |
| P1 | Newsletter | Front e backend opt-in ainda desativados | Testar consentimento, antiabuso, descadastro e privacidade antes de permitir inscrições |
| P1 | Navegação mobile | Menu e busca responsivos; QA visual 320/375/390 px ainda pendente | Testar toque/teclado, contraste, overflow, fontes e imagens em aparelhos reais |
| P1 | Sacola acessível | Faltava devolver foco e conter Tab no drawer | Corrigido na branch `fix/revisao-loja-mobile-acessibilidade`, pendente revisão visual/merge |
| P1 | Estoque na ficha | Botão permitia adicionar variação com estoque declarado igual a 0 | Corrigido na branch `fix/revisao-loja-mobile-acessibilidade` |
| P2 | SEO/Performance | Imagens Pexels hospedadas fora do projeto, sem controle de estabilidade/CDN próprio | Estratégia de imagens originais, compressão AVIF/WebP e metadados individuais para produto |
| P2 | Guia e Ajuda | Conteúdo de apoio disponível e honesto, mas estilo ainda parcialmente diferente da home | Harmonizar sem grande redesign |
| P2 | Comunicação | Instagram público @itsagade e atendimento@agade.com exibidos; WhatsApp não divulgado | Confirmar funcionamento de email; WhatsApp deixado para depois |
| P2 | Vercel | Deploy legado ainda pode tentar builds e retornar falha por limite Hobby | Desconectar integração Vercel quando Cloudflare estiver definitivamente validada |

## O que não fazer
- Não inventar catálogo, estoque, certificações UV, frete grátis, condições de parcelamento ou política comercial extra.
- Não migrar Supabase para Cloudflare só porque o frontend mudou de host.
- Não habilitar pagamentos, autenticação ou newsletter sem testes reais de ponta a ponta.
- Não reabrir redesenho da identidade cromática aprovada.
