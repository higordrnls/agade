\set ON_ERROR_STOP on

-- Banco temporário usado somente no CI, sem dados reais.
insert into public.catalog_products (slug, name, editorial_description, status)
values
  ('rascunho', 'Peça ainda não lançada', 'Interna', 'draft'),
  ('ativo', 'Peça disponível', 'Editorial', 'active'),
  ('arquivado', 'Peça histórica', 'Editorial', 'archived');

insert into public.catalog_variants
  (product_id, sku, color_name, price_cents, acquisition_cost_cents, available_stock, reserved_stock, active)
values
  ((select id from public.catalog_products where slug='rascunho'), 'SKU-DRAFT', 'Azul', 12900, 3500, 10, 0, true),
  ((select id from public.catalog_products where slug='ativo'), 'SKU-OK', 'Preto', 12900, 3500, 5, 1, true),
  ((select id from public.catalog_products where slug='ativo'), 'SKU-ZERO', 'Tartaruga', 12900, 3500, 2, 2, true),
  ((select id from public.catalog_products where slug='ativo'), 'SKU-OFF', 'Marrom', 12900, 3500, 8, 0, false),
  ((select id from public.catalog_products where slug='arquivado'), 'SKU-ARCHIVE', 'Prata', 12900, 3500, 4, 0, true);

do $$
begin
  if (select count(*) from public.list_storefront_catalog()) <> 1 then
    raise exception 'Catálogo público deveria exibir somente uma variante vendável';
  end if;
  if (select sellable_stock from public.list_storefront_catalog() limit 1) <> 4 then
    raise exception 'Estoque público calculado incorretamente';
  end if;
  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='storefront_catalog'
      and column_name='acquisition_cost_cents'
  ) then
    raise exception 'View pública expõe custo de aquisição';
  end if;
end
$$;

-- Banco simula perfis anônimo e autenticado do Supabase.
do $$
begin
  if has_table_privilege('anon', 'public.catalog_variants', 'SELECT') then
    raise exception 'anon não pode ler tabela privada';
  end if;
  if has_table_privilege('authenticated', 'public.catalog_variants', 'SELECT') then
    raise exception 'authenticated não pode ler tabela privada';
  end if;
  if has_table_privilege('anon', 'public.catalog_products', 'INSERT') then
    raise exception 'anon não pode inserir produtos';
  end if;
  if not has_function_privilege('anon', 'public.list_storefront_catalog()', 'EXECUTE') then
    raise exception 'anon deveria poder executar a leitura pública';
  end if;
end
$$;

begin;
set local role anon;
do $$
begin
  if (select count(*) from public.list_storefront_catalog()) <> 1 then
    raise exception 'RPC não acessível como anon';
  end if;
end
$$;
rollback;

-- Teste de integridade de estoque/preço com captura de erro esperado.
do $$
begin
  begin
    insert into public.catalog_variants(product_id,sku,color_name,price_cents,available_stock,reserved_stock)
    values ((select id from public.catalog_products where slug='ativo'), 'SKU-INVALID', 'Preto', -1, 1, 0);
    raise exception 'Preço negativo foi indevidamente aceito';
  exception when check_violation then null;
  end;
  begin
    insert into public.catalog_variants(product_id,sku,color_name,price_cents,available_stock,reserved_stock)
    values ((select id from public.catalog_products where slug='ativo'), 'SKU-INVALID2', 'Preto', 100, 1, 2);
    raise exception 'Reserva superior ao estoque foi indevidamente aceita';
  exception when check_violation then null;
  end;
end
$$;

select 'PASS: catálogo público, isolamento e integridade' as result;
