-- AGADE / diagnóstico SOMENTE LEITURA: executar no SQL Editor antes das migrações.
select
  to_regclass('public.customer_profiles') is not null as tabela_clientes_existe,
  to_regclass('storage.buckets') is not null as storage_disponivel,
  exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='customer_profiles'
      and column_name='gender_self_description'
  ) as campo_genero_ampliado_existe,
  exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='customer_profiles'
      and policyname='customer_read_own_profile'
  ) as politica_leitura_individual_existe,
  exists (
    select 1 from storage.buckets where id='customer-avatars' and public=false
  ) as fotos_privadas_configuradas;
