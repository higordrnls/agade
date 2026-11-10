# Cadastro comercial AGADE — estágio 1

Implementado em branch de revisão: login por senha + cadastro por senha + recuperação por email + link mágico preservado, perfil de nome e celular com RLS, sem checkout.

## Por que não copiar a Tray literalmente
- **E-mail e senha:** na criação de conta; Supabase Auth gerencia segredo e confirmação de e-mail.
- **Nome completo e celular:** perfil editável depois do login, sem obrigatoriedade no cadastro inicial.
- **CPF:** coletar no checkout somente se indispensável à emissão de documentos fiscais, antifraude, pagamento ou operação legal; validar, proteger e definir retenção. Não pedir agora.
- **Endereço:** solicitar no checkout com CEP, logradouro, número, complemento opcional, bairro, município e UF; não coletar só para navegar.
- **Pessoa jurídica:** não habilitada inicialmente. Precisa de fluxo de faturamento PJ e dados de CNPJ/representante antes.
- **Data de nascimento, sexo:** não coletados sem finalidade proporcional. Idade mínima pode ser tratada em termos/fluxo de compra conforme enquadramento jurídico, a validar.
- **Aprovação manual de cadastros, ocultar produtos para não logados, carrinho abandonado:** não habilitar no pré-lançamento.
- **2FA obrigatório para administração:** configurar nos provedores de acesso do GitHub, Cloudflare e Supabase, independentemente do login do cliente.
- **Cancelamento de pedido, frete e parcelamento:** somente após checkout e configuração do ERP/meios de pagamento.

## Antes de permitir cadastro do público
1. Aplicar `supabase/migrations/20261110_customer_profiles.sql` no banco de desenvolvimento, após revisão do SQL. Testar que um usuário não lê nem altera o perfil de outro e que anônimos não têm acesso.
2. Supabase Authentication → Sign In / Providers: habilitar Email e manter **Confirm email** ativo. Testar confirmação por e-mail; não desativar apenas para evitar SMTP.
3. Usar serviço SMTP confiável com domínio validado para usuários finais; o serviço de testes do Supabase pode ter restrições.
4. Manter `VITE_AGADE_AUTH_ENABLED=true` apenas se Supabase estiver configurado. O frontend já tinha flag e chaves públicas.
5. Testar criação de conta, confirmação, login, logout, recuperação, mudança de senha, edição do perfil e acesso entre contas distintas. QA mobile e acessibilidade reais.
6. Não habilitar checkout ou alegar integração de pedidos só porque login funciona.

## Riscos residuais
- Sessão permanece em `sessionStorage` do navegador: não equivale a sessão em cookie HttpOnly. Revisar estratégia antes de lançar pagamentos.
- Links implícitos via Supabase Auth. Login e recuperação exigem redirecionamento autorizado para `https://agade.pages.dev/conta`.
- Senhas não são gravadas em `customer_profiles`. Políticas RLS separam usuários.
- O cadastro complementa mas não substitui a modelagem posterior de endereços, faturamento e pedidos.
