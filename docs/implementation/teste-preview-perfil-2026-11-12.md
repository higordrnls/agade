# AGADE — execução de teste de cadastro em Cloudflare Preview

Esta branch existe apenas para disparar um deployment **Preview**, sem modificar o código em produção ou ativar a flag de perfil da branch main.

## Preparação
- Cloudflare Pages → Settings → **Preview** → Variables and secrets: URL e chave pública Supabase, `VITE_AGADE_AUTH_ENABLED=true`, `VITE_AGADE_PROFILE_ENABLED=true`.
- Confirmar em **Deployments** que existe deployment de branch `test/profile-preview-validation` com status **Success**. Não assumir endereço de Preview até Cloudflare informar URL.
- URLs de retorno de confirmação/recuperação de senha precisam ser incluídas **exatamente** no Supabase Auth → URL Configuration; nunca abrir redirect amplo de produção.
- Preview pode ser público. Configurar Cloudflare Access para restringir Preview antes de inserir dados reais. Para primeiro teste, usar contas e dados *fictícios*; não usar CPF real, fotos pessoais ou endereços reais.

## Matriz de testes manuais
1. Confirmar que Production continua com perfil desativado.
2. No Preview, criar duas contas de teste A e B, ambas com e-mails controlados e confirmação habilitada.
3. A preenche ficha com nome e identidade de gênero. Verificar campo obrigatório e opção "Prefiro não declarar".
4. Em A, tentar CPF inválido e CEP inválido, verificar que não salva. Conferir que consentimento demográfico começa desmarcado.
5. Salvar e recarregar A: confirmar persistência, verificar foto opcional e limites 2 MB/MIME com imagens fictícias.
6. Sair de A e entrar em B: validar que dados e foto de A não aparecem. A verificação de isolamento deve incluir requisições com JWT de B ao ID de A, não apenas ausência na interface.
7. Confirmar políticas em Supabase RLS, bucket privado, ausência de SELECT para anon, isolamento de SELECT/INSERT/UPDATE e Storage (download/upload por outro usuário).
8. Recuperação de senha, reenvio, erro e expiração de links.
9. Não ativar perfil em Production enquanto checklist de segurança e privacidade não estiver aprovado.

## Restrições
Sem checkout, sem CRM analítico, sem dados pessoais reais no teste de pré-lançamento.
