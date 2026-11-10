-- Cadastro complementar mínimo de clientes, sem documentos fiscais ou endereços nesta etapa.
-- Aplicar no Supabase antes de habilitar o formulário de edição de dados em produção.
create table if not exists public.customer_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null check(length(btrim(full_name)) between 3 and 120),
 phone_mobile text null check(phone_mobile is null or phone_mobile ~ '^[1-9][0-9]{10}$'),
 updated_at timestamptz not null default now(),
 created_at timestamptz not null default now()
);
alter table public.customer_profiles enable row level security;
revoke all on public.customer_profiles from anon, authenticated;
grant select,insert,update on public.customer_profiles to authenticated;
drop policy if exists "customer_read_own_profile" on public.customer_profiles;
create policy "customer_read_own_profile" on public.customer_profiles for select to authenticated
 using ((select auth.uid()) = user_id);
drop policy if exists "customer_insert_own_profile" on public.customer_profiles;
create policy "customer_insert_own_profile" on public.customer_profiles for insert to authenticated
 with check ((select auth.uid()) = user_id);
drop policy if exists "customer_update_own_profile" on public.customer_profiles;
create policy "customer_update_own_profile" on public.customer_profiles for update to authenticated
 using ((select auth.uid()) = user_id)
 with check ((select auth.uid()) = user_id);
-- Intentional: no DELETE policy, no public reads, no storage of passwords in this table.
