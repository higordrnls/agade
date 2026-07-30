# PRD 09 — Requisitos Não Funcionais

## Objetivo

Definir os requisitos de qualidade do ecossistema digital da Agadê que não estão relacionados diretamente às funcionalidades do produto, mas que garantem desempenho, segurança, confiabilidade, acessibilidade e escalabilidade da plataforma.

---

# Visão Geral

Além de atender às regras de negócio, a plataforma deverá oferecer uma experiência consistente, rápida e confiável em todos os dispositivos suportados.

Os requisitos descritos neste documento servem como critérios técnicos permanentes para desenvolvimento, testes e manutenção do sistema.

---

# Performance

A aplicação deverá priorizar velocidade de carregamento e responsividade.

Objetivos iniciais:

- First Contentful Paint (FCP) inferior a 2 segundos;
- Largest Contentful Paint (LCP) inferior a 2,5 segundos;
- Time to Interactive (TTI) inferior a 3 segundos;
- CLS (Cumulative Layout Shift) inferior a 0,1.

O uso de Server Components, Image Optimization e cache deverá ser priorizado sempre que possível.

---

# Disponibilidade

Os serviços principais deverão permanecer disponíveis continuamente.

Objetivo inicial:

- disponibilidade mínima de 99,9%.

Em caso de indisponibilidade parcial, a plataforma deverá falhar de forma controlada, preservando dados e evitando inconsistências.

---

# Escalabilidade

A arquitetura deverá permitir crescimento gradual sem necessidade de reescrita.

A solução deverá suportar:

- aumento do catálogo;
- novos Drops;
- múltiplas impressoras;
- novos coletores;
- novos administradores;
- crescimento da base de clientes.

Novos módulos deverão ser adicionados sem alterar significativamente a estrutura existente.

---

# Responsividade

Toda interface deverá funcionar adequadamente em:

- smartphones;
- tablets;
- notebooks;
- desktops.

O mobile será considerado prioridade durante o desenvolvimento.

---

# Compatibilidade

A aplicação deverá oferecer suporte às versões atuais dos principais navegadores modernos:

- Chrome;
- Edge;
- Firefox;
- Safari.

Não haverá suporte dedicado para navegadores obsoletos.

---

# SEO

Como a Agadê possui forte componente editorial, mecanismos de busca fazem parte da estratégia da marca.

O sistema deverá utilizar:

- Server Side Rendering (SSR) quando apropriado;
- Static Generation (SSG) para conteúdos institucionais;
- Metadata dinâmica;
- Open Graph;
- Sitemap;
- Robots.txt;
- URLs amigáveis.

---

# Acessibilidade

A plataforma deverá seguir, sempre que possível, as recomendações da WCAG 2.1 nível AA.

Entre elas:

- contraste adequado;
- navegação por teclado;
- textos alternativos em imagens;
- foco visível;
- hierarquia correta de títulos;
- elementos semânticos.

A experiência deve ser inclusiva sem comprometer a identidade visual da marca.

---

# Observabilidade

O sistema deverá gerar informações suficientes para monitoramento da operação.

Serão considerados:

- logs estruturados;
- métricas;
- rastreamento de erros;
- histórico de eventos.

Problemas críticos deverão ser identificáveis sem necessidade de reproduzir manualmente o erro.

---

# Tratamento de Erros

Nenhum erro deverá resultar em falha silenciosa.

A aplicação deverá:

- informar o usuário quando apropriado;
- registrar o erro internamente;
- preservar a integridade dos dados.

Mensagens técnicas nunca deverão ser exibidas diretamente ao usuário final.

---

# Confiabilidade

Operações críticas deverão garantir consistência dos dados.

Exemplos:

- criação de pedidos;
- aplicação de créditos;
- confirmação de pagamentos;
- atualização de estoque;
- auditoria de materiais.

Sempre que necessário deverão ser utilizadas transações atômicas.

---

# Versionamento

Toda alteração estrutural deverá ser rastreável.

Serão versionados:

- código;
- migrations;
- documentação;
- ADRs;
- PRDs.

Nenhuma alteração estrutural deverá ocorrer diretamente em produção.

---

# Manutenibilidade

O código deverá priorizar:

- baixo acoplamento;
- alta coesão;
- tipagem forte;
- reutilização de componentes;
- documentação quando necessária.

Complexidade desnecessária deverá ser evitada.

---

# Testabilidade

A arquitetura deverá permitir testes automatizados.

Sempre que possível deverão existir testes para:

- regras de negócio;
- funções críticas;
- integrações;
- componentes principais.

Fluxos financeiros e de crédito deverão possuir cobertura prioritária.

---

# Internacionalização

Embora o MVP seja destinado ao mercado brasileiro, a arquitetura deverá permitir futura internacionalização.

Isso inclui:

- suporte a múltiplos idiomas;
- múltiplas moedas;
- novos gateways de pagamento;
- expansão geográfica.

Esses recursos não fazem parte do escopo inicial.

---

# Sustentabilidade Tecnológica

As escolhas técnicas deverão privilegiar:

- tecnologias amplamente utilizadas;
- documentação consolidada;
- comunidade ativa;
- facilidade de manutenção.

Dependências experimentais deverão ser evitadas quando existirem alternativas maduras.

---

# Monitoramento

A plataforma deverá possibilitar acompanhamento de indicadores técnicos como:

- tempo médio de resposta;
- erros por minuto;
- disponibilidade;
- consumo de recursos;
- falhas de integração.

Esses indicadores apoiarão decisões futuras de otimização.

---

# Regras Gerais

O sistema deverá garantir que:

- a experiência permaneça fluida mesmo com crescimento do catálogo;
- nenhuma operação crítica comprometa a integridade dos dados;
- a plataforma permaneça acessível em dispositivos móveis;
- conteúdos editoriais sejam indexáveis pelos mecanismos de busca;
- a arquitetura permaneça preparada para evolução contínua.

---

# Fora do Escopo (MVP)

Os itens abaixo não fazem parte da primeira versão do produto:

- funcionamento offline;
- aplicativo nativo para iOS e Android;
- arquitetura multi-tenant;
- operação internacional;
- suporte multilíngue;
- alta disponibilidade entre múltiplas regiões.

---

# Critérios de Aceite

Este documento será considerado atendido quando:

- a aplicação apresentar desempenho compatível com os objetivos definidos;
- todas as interfaces forem responsivas;
- a autenticação e autorização forem confiáveis;
- a arquitetura suportar evolução incremental;
- o sistema produzir logs e métricas suficientes para operação;
- os requisitos mínimos de SEO e acessibilidade estiverem implementados;
- a qualidade técnica for mantida durante todo o ciclo de desenvolvimento.