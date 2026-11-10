-- Perfil ampliado AGADE. Aplicar APÓS 20261110_customer_profiles.sql.
-- Perfil privado por auth.uid(); não conceder acesso ao público.
alter table public.customer_profiles
 add column if not exists birth_date date,
 add column if not exists gender_identity text,
 add column if not exists demographic_consent boolean not null default false,
 add column if not exists cpf text,
 add column if not exists postal_code text,
 add column if not exists address_line text,
 add column if not exists address_number text,
 add column if not exists address_complement text,
 add column if not exists neighborhood text,
 add column if not exists city text,
 add column if not exists state_code text,
 add column if not exists avatar_path text;
alter table public.customer_profiles
 drop constraint if exists customer_birth_date_check,
 add constraint customer_birth_date_check check(birth_date is null or (birth_date between '1900-01-01'::date and current_date)),
 drop constraint if exists customer_gender_identity_check,
 add constraint customer_gender_identity_check check(gender_identity is null or gender_identity in ('woman','man','nonbinary','self_described','prefer_not')),
 drop constraint if exists customer_cpf_format_check,
 add constraint customer_cpf_format_check check(cpf is null or cpf ~ '^[0-9]{11}$'),
 drop constraint if exists customer_postal_code_check,
 add constraint customer_postal_code_check check(postal_code is null or postal_code ~ '^[0-9]{8}$'),
 drop constraint if exists customer_state_code_check,
 add constraint customer_state_code_check check(state_code is null or state_code ~ '^[A-Z]{2}$'),
 drop constraint if exists customer_avatar_path_check,
 add constraint customer_avatar_path_check check(avatar_path is null or avatar_path ~ ('^' || user_id::text || '/avatar\\.(jpg|png|webp)$'));
-- Armazenamento PRIVADO para retratos fornecidos voluntariamente.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('customer-avatars','customer-avatars',false,2097152,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=false,file_size_limit=2097152,
 allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists "agade_avatar_select_own" on storage.objects;
create policy "agade_avatar_select_own" on storage.objects
 for select to authenticated using (bucket_id='customer-avatars' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "agade_avatar_insert_own" on storage.objects;
create policy "agade_avatar_insert_own" on storage.objects
 for insert to authenticated with check (bucket_id='customer-avatars' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "agade_avatar_update_own" on storage.objects;
create policy "agade_avatar_update_own" on storage.objects
 for update to authenticated using (bucket_id='customer-avatars' and (storage.foldername(name))[1]=(select auth.uid())::text)
 with check(bucket_id='customer-avatars' and (storage.foldername(name))[1]=(select auth.uid())::text);
-- Sem delete público, sem SELECT por anon. CPF/endereço/foto não devem entrar em relatórios de público.
