# ADR 0005 — Separação Comercial/Fabril e Evolução Editorial e de Dados

**Data:** 2026-11-09
**Status:** Proposto para revisão (não aprovado como arquitetura implantada)
**Escopo:** planejamento pré-operacional da Agadê; repositório e produtos continuam conceituais.

## Contexto

Os PRDs originais modelam fabricação sob demanda, Carteira Verde e produção 3D dentro do MVP. A estratégia atual prevê **primeiro uma operação comercial de curadoria de óculos solares sem grau comprados de terceiros**, mantendo fabricação autoral e circularidade como P&D futuro. A investigação de canais também passou a considerar marketplaces desde o lançamento, enquanto o website próprio poderá ter posicionamento editorial (blog, coleções, ensaios, newsletter).

O usuário estabeleceu como prioridade não reproduzir erros operacionais de saldo divergente, nota fiscal pendente, atraso de expedição e ausência de KPIs. A arquitetura não deve multiplicar dados pessoais por GitHub, Notion, Sheets, n8n ou BI.

## Decisão proposta

1. **Domínios separados, núcleo comum:** Catálogo, SKU, preço, pedido, pagamento, cliente (acesso restrito), estoque, documento fiscal, logística e eventos são domínio comercial; produção MES, job de impressão, filamento e créditos circulares são módulos futuros e **desabilitados** na revenda. Um pedido pago comercial **não** cria ordem fabril.
2. **Fonte canônica e integridade:** PostgreSQL planejado como banco transacional, com separação de ambientes, transações atômicas de reserva, idempotência de webhooks/API, auditoria e histórico temporal. A API própria validará operações; não assumir que n8n ou planilhas reconciliam estoque automaticamente. Ausência de integração confiável exige canal único ou estoque alocado por canal.
3. **Stack modular e revisável:** preservar como baseline histórico Next.js/TypeScript, Supabase/PostgreSQL, Vercel e gateway terceiro, documentado no ADR 0001. Avaliar Cloudflare/AWS, serviços fiscais, fila e n8n somente em ADR posterior com custos, LGPD, residência/transferências de dados, limites operacionais, observabilidade e portabilidade. **Não revogar ADR 0001 automaticamente**.
4. **Experiência editorial e confiança:** manter páginas de produto separadas do conteúdo editorial. Blog / revista digital, manifesto, lookbooks, ensaios, explicação de proteção solar, bastidores verdadeiros e newsletter de adesão voluntária podem existir antes de catálogo comercial ativo, desde que não simulem compra disponível. Checkout deve identificar fornecedor, exibir frete/prazo/preço integral, canal de suporte, política de arrependimento e reembolso, gateway confiável e rastreio real. Não publicar avaliações, selos ou certificações inventadas.
5. **Privacidade:** o GitHub público contém só código/documentos publicáveis e dados fictícios; Notion registra decisão e pesquisa; Sheets contém simulações sem PII desnecessária; dados transacionais em banco restrito. Classificação, minimização, bases legais, preferência de newsletter e opt-out, consentimento/gestão de cookies quando aplicável, MFA, backup/restore testados, segregação de papéis, retenção e incidentes são requisitos antes do lançamento.
6. **P&D fabril com gates:** avançar somente após viabilidade comercial, orçamento e capital de giro protegido, especificação verificável de material e origem pós-consumo, ensaios, custos unitários completos, conformidade e autorização de piloto. Carteira Verde fica suspensa até existir cadeia de coleta e destinação auditável.
7. **Canais pré-definidos por evidência, não por protótipo:** comparar marketplace, site e híbrido com pesquisas de consumidores, custos contratuais por SKU/UF e fluxo de caixa. A experiência de uma operação de pesca é sinal de risco operacional, não evidência representativa de compradores de óculos.

## Fluxo conceitual

Visitante → conteúdo editorial / catálogo → SKU elegível → reserva transacional → pagamento por provedor → documento fiscal → conferência / embalagem → postagem → entrega → pós-venda.

Com o mesmo histórico: eventos → agregação/pseudonimização → dashboard operacional/BI. O módulo de fabricação futura conectará pedidos **somente** para SKUs próprios sob regime produtivo ativado.

## Consequências e trade-offs

**Positivas:** lançamento menor, preservação dos PRDs industriais, menos acoplamento, confiabilidade mensurável, evolução editorial controlada.

**Custos/riscos:** integrar marketplace, fiscal e logística demanda contratos, regras próprias, testes, manutenção; componentes de blog/newsletter/BI introduzem operadores de dados e custos. Integração multicanal pode não ser viável no MVP; não prometer sincronização que não existe.

## Critérios de aceite para transformar em Aceito

- Revisão jurídica/fiscal (comércio em Uberlândia/MG e óculos solares sem grau), documentos UV e custos por canal; contrato e retenção dos operadores de dados; política de privacidade.
- Testes: última unidade sob concorrência; Pix expirado; webhook duplicado; marketplace desconectado; falha de nota; devolução sob inspeção; restauração de backup; acesso de usuário sem privilégios.
- Páginas editoriais identificam publicidade de modo correto, checkout exibe informações legais, newsletter registra adesão e descadastro de maneira auditável.
- Plano de custos realista sem aquisição de serviços, equipamentos ou filamento antes do gate financeiro.

## Documentação relacionada

- [ADR 0001 — Stack](01-stack-tecnologica.md)
- [PRD 01 — Visão](../prd/01-product-overview.md)
- [PRD 03 — Regras](../prd/03-business-rules.md)
- [PRD 04 — Catálogo](../prd/04-catalog.md)
- [PRD 06 — Pedidos](../prd/06-orders.md)
- [PRD 07 — Produção](../prd/07-production.md)
- [PRD 09 — Não funcionais](../prd/09-non-functional.md)
- [PRD 10 — Roadmap](../prd/10-roadmap.md)

## Fontes para validação externa

- CX Trends 2026, Opinion Box + Octadesk: 2.000 compradores online, nov/2025, relatório publicado fev/2026. A utilização de canais e percepção de segurança **não** equivalem a taxas de conversão específicas de solares: https://europadigital.com.br/cx2026/
- Decreto 7.962/2013 (comércio eletrônico): https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm
- Guia de cookies ANPD: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais
- SEF/MG NFF: https://www.fazenda.mg.gov.br/noticias/2026/2026.05.13_NFF/
- TikTok Shop tarifa pública jul/2026: https://seller-br.tiktok.com/university/essay?knowledge_id=24428156307201
