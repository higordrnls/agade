# PRD 10 — Roadmap do Produto

## Objetivo

Definir a evolução planejada do ecossistema digital da Agadê, organizando entregas por fases e estabelecendo prioridades para garantir uma evolução consistente do produto sem comprometer a qualidade técnica.

Este roadmap representa a visão atual da equipe e poderá ser atualizado conforme aprendizado de mercado, métricas de uso e necessidades estratégicas.

---

# Princípios

O roadmap da Agadê segue alguns princípios fundamentais:

- construir primeiro o essencial;
- validar hipóteses com usuários reais;
- evitar complexidade prematura;
- priorizar qualidade em vez de quantidade;
- documentar decisões arquiteturais relevantes através de ADRs.

Nenhuma fase futura deve comprometer a estabilidade das anteriores.

---

# Fase 0 — Fundação (Concluída)

## Objetivos

Construção da base documental e arquitetural do projeto.

### Entregas

- Brand Book
- Manifesto Visual
- Arquitetura do Sistema
- ADRs
- PRDs
- Context Map
- README
- CONTRIBUTING
- Definition of Done

**Status:** ✅ Concluído

---

# Fase 1 — MVP (Drop 1)

## Objetivo

Lançar a primeira versão pública da plataforma.

### Escopo

### Infraestrutura

- configuração do repositório;
- Next.js;
- Tailwind;
- Supabase;
- ambiente de desenvolvimento;
- deploy inicial.

### Catálogo

- produtos;
- variantes;
- SKUs;
- páginas individuais;
- galeria editorial.

### Autenticação

- cadastro;
- login;
- recuperação de senha;
- perfis.

### Checkout

- carrinho;
- Mercado Pago;
- confirmação de pagamento;
- webhooks;
- pedidos.

### Carteira Verde

- saldo;
- histórico;
- aplicação de créditos;
- limite de desconto;
- auditoria.

### Produção

- ordens de produção;
- jobs;
- lotes;
- consumo de filamento;
- controle de qualidade.

### Administração

- painel administrativo;
- catálogo;
- pedidos;
- auditorias;
- produção.

### Observabilidade

- logs;
- auditoria;
- métricas básicas.

**Objetivo da fase:**

Primeiras vendas reais.

---

# Fase 2 — Consolidação

## Objetivo

Melhorar a experiência do usuário após validação do MVP.

### Funcionalidades

- favoritos;
- lista de desejos;
- avaliações;
- notificações;
- melhoria da carteira verde;
- histórico detalhado de produção;
- cupons promocionais;
- campanhas.

### Operação

- dashboards;
- indicadores;
- relatórios;
- analytics.

---

# Fase 3 — Experiência Editorial

## Objetivo

Transformar o site em uma plataforma de conteúdo.

### Funcionalidades

- editoriais;
- lookbooks;
- campanhas;
- manifesto interativo;
- landing pages;
- storytelling por coleção;
- páginas especiais para cada Drop.

Nesta fase a Agadê deixa de ser apenas um e-commerce.

---

# Fase 4 — Produção Avançada

## Objetivo

Escalar a operação industrial.

### Funcionalidades

- múltiplas impressoras;
- filas inteligentes;
- manutenção preventiva;
- dashboards industriais;
- rastreamento completo;
- indicadores de desperdício;
- previsão de produção.

---

# Fase 5 — Circularidade Expandida

## Objetivo

Expandir o ecossistema sustentável.

### Funcionalidades

- novos pontos de coleta;
- coletores parceiros;
- campanhas ambientais;
- bonificações;
- carteira expandida;
- programas de fidelidade.

---

# Fase 6 — Experiências Imersivas

## Objetivo

Adicionar recursos visuais avançados.

### Funcionalidades

- WebAR;
- prova virtual;
- visualização 3D;
- animações avançadas;
- configurador de armações.

Esta fase dependerá da maturidade tecnológica e da aceitação do mercado.

---

# Fase 7 — Internacionalização

## Objetivo

Preparar a expansão internacional.

### Funcionalidades

- múltiplos idiomas;
- múltiplas moedas;
- Stripe;
- novos mercados;
- logística internacional;
- impostos internacionais.

Esta fase somente será iniciada após consolidação da operação nacional.

---

# Backlog Estratégico

Itens considerados importantes, mas sem prioridade definida.

- aplicativo mobile;
- programa de assinatura;
- marketplace de peças autorais;
- personalização avançada;
- IA para recomendações;
- dashboard para coletores;
- dashboard para fornecedores;
- APIs públicas;
- integração com ERP;
- integração logística avançada;
- notificações por WhatsApp;
- integração com CRM.

---

# Critérios de Priorização

Toda nova funcionalidade deverá responder positivamente às seguintes perguntas:

- resolve um problema real do usuário?
- fortalece o posicionamento da marca?
- reduz esforço operacional?
- melhora a experiência do cliente?
- gera valor mensurável para o negócio?
- respeita os ADRs existentes?

Caso contrário, deverá permanecer no backlog.

---

# Gestão das Entregas

O desenvolvimento seguirá a seguinte estrutura:

Roadmap

↓

Épicos

↓

User Stories

↓

Tasks

↓

Pull Requests

↓

Deploy

Toda funcionalidade deverá estar vinculada a um Épico e, quando necessário, a um ADR correspondente.

---

# Critérios de Encerramento da Fase

Uma fase será considerada concluída quando:

- todas as funcionalidades planejadas estiverem implementadas;
- os critérios de aceite dos PRDs forem atendidos;
- os testes estiverem aprovados;
- a documentação estiver atualizada;
- o deploy estiver estável;
- a operação estiver validada.

---

# Revisão do Roadmap

Este documento deverá ser revisado sempre que ocorrer uma das seguintes situações:

- lançamento de um novo Drop;
- alteração significativa da estratégia da marca;
- mudança arquitetural relevante;
- surgimento de novas necessidades de negócio;
- evolução tecnológica que justifique revisão do escopo.

O roadmap representa uma direção estratégica, não um contrato imutável.

---

# Encerramento

Com este documento conclui-se oficialmente a documentação funcional da versão **PRD v1.0** da Agadê.

A partir deste ponto, a evolução do projeto deverá ocorrer prioritariamente através da implementação, validação prática, abertura de Issues, novos ADRs quando necessários e evolução incremental do código.

A arquitetura passa a ser validada pela implementação, e não pela documentação.