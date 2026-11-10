# AGADE — ficha ampliada de cliente (10/11/2026)

## O que foi implementado
- A tela de conta mantém **e-mail + senha**, criação de conta e recuperação de senha por e-mail. A opção de login por magic link foi removida da interface; links de recuperação e confirmação de e-mail continuam necessários.
- Ficha de cliente autenticado: nome completo, celular, data de nascimento, identidade de gênero com escolha obrigatória (cis, trans, travesti, não binária, agênero, gênero fluido, bigênero, genderqueer, autodescrição e `Prefiro não declarar`), CPF, CEP, UF, logradouro, número, complemento, bairro, cidade e foto de perfil opcional.
- Consentimento **separado e desmarcado por padrão** para uso de idade e identidade de gênero em **análises estatísticas internas agregadas**. Dados fiscais/endereço/foto não entram em análises demográficas. Não existe painel analítico nem rastreamento implementado.
- Foto JPG, PNG ou WebP de até 2 MB; verificação básica de assinatura binária e MIME. Armazenamento em bucket privado com políticas de usuário proprietário; não é foto pública nem reconhecimento facial.
- O formulário de perfil **só aparece quando** `VITE_AGADE_PROFILE_ENABLED=true`. Não expor antes de executar as migrações e validar regras de RLS/storage.
- Nenhum dado demográfico é coletado durante cadastro inicial de senha: a ficha pode ser preenchida em sessão autenticada. Salvar a ficha exige responder ao campo de identidade de gênero, mas permite `Prefiro não declarar`; a utilização de respostas em pesquisas demográficas exige autorização separada. O checkout continua desativado.

## Implantação no Supabase
1. No SQL Editor do projeto de desenvolvimento, revisar e executar a base `supabase/migrations/20261110_customer_profiles.sql` **caso ainda não tenha sido aplicada**.
2. Aplicar em seguida a ampliação `supabase/migrations/20261110_customer_profile_extended.sql`. Esta cria campos e bucket `customer-avatars`, privado.
3. Aplicar `supabase/migrations/20261110_customer_gender_choices.sql`, que amplia as respostas, cria o campo de autodescrição e exige uma escolha nos novos registros, preservando registros antigos até atualização.
4. Verificar no Supabase Storage que `customer-avatars` está **Private**, com limite 2 MB e MIME types explícitos.
5. Criar ao menos duas contas de teste: comprovar que usuário A consegue alterar apenas seus dados e foto, mas não ler ou alterar dados/foto de B; anônimo também não tem acesso.
6. Confirmar Auth email e senha, confirmação de endereço, recuperação e SMTP funcional; **não desativar confirmação de e-mail para contornar limite**.
7. Após os testes, Cloudflare Pages → Settings → Variables and secrets → adicionar variável pública **de build** `VITE_AGADE_PROFILE_ENABLED=true` (Production). Um novo build de `main` é necessário.
8. Testar cadastro, senha, ficha, consentimento desmarcado, CPF inválido, CEP inválido, imagem inválida, mais de 2 MB, foto de B, logout e login posterior.
9. Validar política LGPD sobre período de retenção, exclusão de dados e atendimento ao titular antes de abrir ao público.

## Pendente para futura operação comercial
- Validação de entrega e endereços, emissão fiscal, antifraude, checkout/pagamento, detalhes de pedidos e ERP.
- Se for necessário CPF na compra, exigir **no checkout**, não para navegar ou criar conta. Não coletar CNPJ sem fluxo PJ real.
- Pesquisa de renda/classe econômica e preferências de compra exigem um questionário próprio e voluntário. CPF, nome, foto e endereço **não** devem ser confundidos com indicadores de renda ou gênero.
- Não expor dados individuais em relatórios; estabelecer limites mínimos de agregação e regras de acesso para pesquisa de público.
- A foto é opcional e não é necessária para comprar; considerar opção de remoção de arquivo e rotina de exclusão da conta antes do lançamento.
