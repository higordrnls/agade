-- Aplicar após 20261110_customer_profiles.sql e 20261110_customer_profile_extended.sql.
-- Nova configuração: uma resposta ao campo de gênero é necessária para salvar a ficha,
-- sem obrigar ninguém a revelar uma identidade (opção "Prefiro não declarar").
-- Não alterar a opção de consentimento demográfico, que permanece voluntária.
alter table public.customer_profiles
 add column if not exists gender_self_description text;

alter table public.customer_profiles
 drop constraint if exists customer_gender_identity_check;

alter table public.customer_profiles
 add constraint customer_gender_identity_check check(
  gender_identity in (
   'cis_woman','cis_man','trans_woman','trans_man','travesti',
   'nonbinary','agender','genderfluid','bigender','genderqueer',
   'self_described','prefer_not'
  )
 ) not valid;

alter table public.customer_profiles
 drop constraint if exists customer_gender_self_description_check;

alter table public.customer_profiles
 add constraint customer_gender_self_description_check check(
  (gender_identity='self_described' and
   gender_self_description is not null and
   length(btrim(gender_self_description)) between 1 and 120)
  or
  (gender_identity<>'self_described' and gender_self_description is null)
 ) not valid;

-- NOT VALID preserva perfis legados sem resposta, mas aplica as regras
-- a novas inserções e a atualizações de registros.
-- A ficha no frontend exige explicitamente uma escolha.
-- Dados só podem ser usados em análises agregadas se demographic_consent=true.
