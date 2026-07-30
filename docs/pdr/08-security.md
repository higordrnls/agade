# PRD 08 — Segurança, Autenticação e Controle de Acesso

## Objetivo

Definir os requisitos de autenticação, autorização, proteção de dados e auditoria do ecossistema digital da Agadê, garantindo que todas as operações respeitem os princípios de segurança definidos pela arquitetura do projeto.

---

# Visão Geral

A segurança da Agadê é construída em múltiplas camadas.

O frontend nunca será considerado uma fonte confiável para validação de regras de negócio.

Toda autorização deverá ser aplicada no banco de dados através do Row Level Security (RLS) do PostgreSQL, utilizando o Supabase como provedor de autenticação e infraestrutura.

---

# Princípios de Segurança

O sistema adota os seguintes princípios:

- menor privilégio possível;
- banco de dados como fonte da verdade;
- autenticação centralizada;
- autorização por papéis;
- auditoria permanente;
- operações críticas executadas apenas no servidor.

---

# Autenticação

A autenticação será realizada através do Supabase Auth.

Métodos suportados inicialmente:

- e-mail e senha.

Métodos futuros poderão incluir:

- Google;
- Apple;
- GitHub;
- Magic Link.

A inclusão de novos provedores não deverá alterar as regras de autorização existentes.

---

# Sessões

Após autenticação bem-sucedida, o usuário possuirá uma sessão segura emitida pelo Supabase.

A aplicação deverá:

- validar sessões automaticamente;
- renovar tokens quando necessário;
- encerrar sessões expiradas;
- proteger rotas privadas.

Nenhuma informação sensível deverá depender exclusivamente do estado do frontend.

---

# Papéis (Roles)

O sistema possui três papéis principais.

## Customer

Consumidor final.

Permissões:

- visualizar próprio perfil;
- editar dados permitidos;
- realizar compras;
- acompanhar pedidos;
- consultar carteira verde;
- utilizar créditos disponíveis.

Jamais poderá visualizar informações de outros usuários.

---

## Collector

Parceiro responsável por auditorias físicas.

Permissões:

- visualizar entregas atribuídas;
- registrar auditorias;
- aprovar ou rejeitar materiais;
- informar peso auditado.

Não poderá acessar informações administrativas.

---

## Admin

Equipe responsável pela operação.

Permissões:

- gerenciamento do catálogo;
- gerenciamento de pedidos;
- gerenciamento de produção;
- auditoria de créditos;
- administração de usuários;
- configuração do sistema.

---

# Row Level Security (RLS)

Toda tabela pública deverá possuir RLS habilitado imediatamente após sua criação.

Nenhuma tabela poderá permanecer acessível sem políticas explícitas.

As políticas deverão utilizar:

- auth.uid();
- role;
- ownership;
- relacionamentos necessários.

O frontend nunca deverá substituir políticas de segurança do banco.

---

# Proteção de Dados

Informações pessoais deverão ser armazenadas apenas quando necessárias para operação da plataforma.

Exemplos:

- nome;
- e-mail;
- telefone;
- endereço;
- histórico de pedidos.

Dados sensíveis nunca deverão ser expostos em consultas públicas.

---

# Auditoria

Operações críticas deverão gerar registros permanentes.

Exemplos:

- alteração de pedidos;
- alteração de créditos;
- cancelamentos;
- alterações administrativas;
- mudanças de status;
- reembolsos.

Os registros deverão conter:

- usuário responsável;
- data;
- origem;
- ação realizada.

---

# Logs

Eventos importantes deverão ser registrados para investigação futura.

Exemplos:

- falhas de autenticação;
- erros de pagamento;
- erros de webhook;
- alterações administrativas;
- exceções críticas.

Logs não substituem auditoria.

---

# Edge Functions

Toda lógica crítica deverá ser executada através das Edge Functions do Supabase.

Exemplos:

- criação de pedidos;
- aplicação de créditos;
- integração Mercado Pago;
- processamento de webhooks;
- geração de notificações.

Nenhuma dessas regras poderá depender exclusivamente do frontend.

---

# Webhooks

Toda comunicação recebida de serviços externos deverá validar autenticidade antes de qualquer processamento.

No caso do Mercado Pago:

- validar assinatura;
- confirmar pagamento diretamente na API;
- somente depois atualizar o banco.

Nunca confiar apenas no conteúdo enviado pelo webhook.

---

# Idempotência

Operações críticas deverão ser idempotentes.

Exemplos:

- criação de pedidos;
- confirmação de pagamento;
- processamento de webhooks.

Caso uma mesma solicitação seja recebida múltiplas vezes, apenas a primeira deverá produzir efeitos permanentes.

---

# Migrações

Toda alteração estrutural do banco deverá ocorrer exclusivamente por migrations versionadas.

Nenhuma modificação manual em produção será considerada válida.

Cada migration deverá:

- ser atômica;
- possuir rollback quando possível;
- habilitar RLS imediatamente após criação das tabelas.

---

# Privacidade

O sistema deverá respeitar os princípios da Lei Geral de Proteção de Dados (LGPD).

Entre eles:

- coleta mínima de informações;
- finalidade clara;
- armazenamento seguro;
- possibilidade de atualização dos dados cadastrais;
- tratamento responsável das informações pessoais.

---

# Regras de Negócio

O sistema deverá garantir que:

- nenhum usuário acesse dados de terceiros;
- toda operação crítica seja autenticada;
- toda autorização seja aplicada no banco;
- nenhuma tabela pública permaneça sem RLS;
- logs e auditorias sejam preservados;
- integrações externas sejam verificadas antes de alterar dados internos.

---

# Critérios de Aceite

O módulo será considerado concluído quando:

- autenticação funcionar corretamente;
- sessões forem protegidas;
- RLS estiver ativo em todas as tabelas;
- papéis forem respeitados;
- operações críticas ocorrerem apenas via Edge Functions;
- webhooks forem autenticados;
- logs e auditorias forem gerados automaticamente;
- migrations estiverem versionadas e reproduzíveis.