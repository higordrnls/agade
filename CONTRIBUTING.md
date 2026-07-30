# Contributing to Agadê

Obrigado por contribuir com a plataforma digital da **Agadê Moda Ocular LTDA ME**.

Este documento define as convenções de desenvolvimento, fluxo de trabalho e padrões mínimos de qualidade adotados pelo projeto.

---

# Antes de começar

Leia os documentos na seguinte ordem:

1. `README.md`
2. `docs/brandbook/`
3. `docs/adr/`
4. `docs/prd/`

A documentação é considerada parte do produto. Alterações relevantes de arquitetura ou regras de negócio devem ser documentadas antes da implementação.

---

# Princípios de Engenharia

Toda contribuição deve preservar os pilares da Agadê.

- Simplicidade
- Performance
- Segurança
- Sustentabilidade
- Consistência de marca

Sempre priorize soluções simples antes de soluções sofisticadas.

---

# Fluxo de Desenvolvimento

Todas as alterações seguem o fluxo:

Issue

↓

Branch

↓

Código

↓

Pull Request

↓

Review

↓

Merge

A branch `main` deve permanecer sempre estável.

---

# Nomenclatura de Branches

Utilize os seguintes prefixos:

```text
feat/
fix/
refactor/
docs/
test/
chore/
```

Exemplos:

```text
feat/checkout
feat/wallet-ledger
fix/payment-webhook
docs/prd-update
refactor/catalog-domain
```

---

# Commits

Este projeto utiliza **Conventional Commits**.

Formato:

```text
tipo(escopo): descrição
```

Exemplos:

```text
feat(checkout): reserve wallet credits

fix(wallet): prevent double spending

docs(prd): update production flow
```

Tipos aceitos:

- feat
- fix
- docs
- refactor
- style
- test
- chore

---

# Pull Requests

Cada Pull Request deve:

- possuir objetivo claro;
- referenciar a Issue correspondente;
- conter apenas uma responsabilidade;
- manter escopo reduzido;
- passar por revisão antes do merge.

Evite PRs grandes.

Prefira alterações pequenas e frequentes.

---

# Definition of Done

Uma funcionalidade somente pode ser considerada concluída quando:

- segue o PRD;
- respeita os ADRs;
- possui tipagem completa;
- respeita as políticas de RLS;
- trata cenários de erro;
- possui logs quando necessário;
- passa em lint e build;
- possui documentação atualizada;
- foi revisada em Pull Request.

---

# Banco de Dados

Toda alteração estrutural deve ser feita através de **Supabase Migrations**.

Nunca altere o banco manualmente em produção.

Estrutura recomendada:

```text
supabase/
└── migrations/
```

Cada migration deve representar apenas uma responsabilidade.

Exemplo:

```text
00001_profiles.sql
00002_catalog.sql
00003_wallet.sql
00004_orders.sql
```

---

# Arquitetura

Mudanças arquitetônicas exigem um novo ADR.

Exemplos:

- adoção de nova tecnologia;
- alteração de autenticação;
- mudança de gateway;
- alteração de estratégia de segurança;
- mudanças estruturais de domínio.

Os ADRs vivem em:

```text
docs/adr/
```

---

# Organização da Documentação

```text
docs/

├── adr/
├── architecture/
├── brandbook/
├── prd/
└── process/
```

Cada diretório possui uma responsabilidade específica.

Evite duplicação de informações entre documentos.

---

# Qualidade

Antes de abrir um Pull Request confirme que:

- o projeto compila;
- não existem erros de TypeScript;
- o ESLint não aponta erros;
- o Prettier foi executado;
- as migrations funcionam;
- as políticas RLS foram validadas;
- os testes existentes continuam passando.

---

# Filosofia do Projeto

A Agadê prioriza:

- clareza sobre complexidade;
- documentação sobre suposições;
- consistência sobre velocidade;
- qualidade sobre quantidade.

Toda implementação deve poder ser compreendida meses depois por outro desenvolvedor.

> "Architecture is validated by implementation, not by documentation."