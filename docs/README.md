# Agadê — Documentação Técnica

Bem-vindo à documentação oficial da **Agadê Moda Ocular**.

Este diretório reúne toda a documentação de produto, arquitetura, processos internos e identidade da plataforma digital da Agadê.

A documentação é organizada por domínios para facilitar manutenção, versionamento e evolução do projeto ao longo do desenvolvimento.

---

# Estrutura

```
docs/
│
├── README.md
│
├── adr/
├── architecture/
├── brand/
├── prd/
└── process/
```

Cada diretório possui uma responsabilidade específica e deve permanecer desacoplado dos demais sempre que possível.

---

# Organização da documentação

## ADR (Architecture Decision Records)

Local onde ficam registradas todas as decisões arquiteturais permanentes do projeto.

Exemplos:

- escolha da stack
- autenticação
- gateway de pagamento
- estratégia de deploy
- decisões de infraestrutura

Toda mudança arquitetural relevante deve gerar um novo ADR.

---

## Architecture

Documentação técnica da arquitetura do sistema.

Inclui:

- visão geral do sistema
- mapa de domínios
- fluxo de eventos
- diagramas
- stack tecnológica

Esta pasta explica **como o sistema funciona**.

---

## Brand

Documentação institucional da marca.

Inclui:

- manifesto
- branding book
- posicionamento
- tom de voz
- sistema visual
- referências criativas

Esta documentação serve como referência para design, marketing e produto.

---

## PRD

Product Requirements Documents.

Descrevem o funcionamento do produto sob a perspectiva de negócio.

Incluem:

- funcionalidades
- regras de negócio
- fluxos
- requisitos
- restrições
- roadmap

Nenhuma funcionalidade deve ser implementada sem possuir um requisito correspondente documentado.

---

## Process

Documentação relacionada ao processo de engenharia.

Inclui:

- guia de contribuição
- Definition of Done
- estratégia de branches
- processo de releases

Esses documentos padronizam o desenvolvimento do projeto.

---

# Princípios

A documentação da Agadê segue alguns princípios fundamentais.

## Fonte única da verdade

Cada informação deve existir em apenas um lugar.

Evite duplicação de regras entre documentos.

---

## Evolução incremental

A documentação acompanha o código.

Não reescrevemos documentos inteiros.

Documentos evoluem através de:

- Pull Requests
- ADRs
- Issues
- Revisões de produto

---

## Arquitetura documentada

Toda decisão técnica importante deve ser registrada antes ou durante sua implementação.

Nunca dependa apenas de conhecimento implícito.

---

## Clareza

Prefira documentos pequenos e especializados.

É melhor possuir dez documentos de cinco páginas do que um documento de cinquenta páginas.

---

# Fluxo de evolução

A evolução do projeto segue a seguinte ordem:

```
Brand

↓

PRD

↓

ADR

↓

Architecture

↓

Implementação

↓

Issues

↓

Novos ADRs (quando necessário)
```

---

# Versionamento

A documentação acompanha a evolução do software.

Mudanças relevantes devem ser registradas através de:

- Pull Requests
- ADRs
- Versionamento Git

---

# Status

Versão da documentação:

**v1.0**

Situação:

✅ Congelada para início da implementação.

A partir desta versão, a implementação passa a orientar a evolução da documentação.