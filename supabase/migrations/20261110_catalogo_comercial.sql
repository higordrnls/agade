-- AGADE · Catálogo comercial v1
-- Adiciona estrutura de revenda/curadoria sem modificar o acervo conceitual.
-- Executar no editor SQL do Supabase quando a conta estiver configurada.

create extension if not exists pgcrypto;

create table if not exists public.catalog_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  editorial_description text not null default '',
  technical_description text not null default '',
  collection_name text,
  status text not null default 'draft' check (status in ('draft','active','archived')),
  hero_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.catalog_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.catalog_products(id) on delete restrict,
  sku text not null unique,
  color_name text not null,
  lens_type text not null default 'solar',
  uv_claim text,
  polarized_claim boolean,
  size_description text,
  weight_grams numeric(10,2) check (weight_grams >= 0),
  price_cents integer not null check (price_cents >= 0),
  acquisition_cost_cents integer check (acquisition_cost_cents >= 0),
  available_stock integer not null default 0 check (available_stock >= 0),
  reserved_stock integer not null default 0 check (reserved_stock >= 0),
  active boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint reserved_not_above_stock check (reserved_stock <= available_stock)
);

create index if not exists catalog_variants_product_idx on public.catalog_variants(product_id);
create index if not exists catalog_products_status_idx on public.catalog_products(status);

-- Regra de leitura: visitante vê somente catálogo ativo, SKU ativo e estoque disponível.
-- Dados de aquisição e demais campos internos nunca são expostos pela view pública.
create or replace view public.storefront_catalog
with (security_invoker = true) as
select p.id as product_id, p.slug, p.name, p.editorial_description,
       p.technical_description, p.collection_name, p.hero_image_url,
       v.id as variant_id, v.sku, v.color_name, v.lens_type, v.uv_claim,
       v.polarized_claim, v.size_description, v.weight_grams, v.price_cents,
       (v.available_stock - v.reserved_stock) as sellable_stock
from public.catalog_products p
join public.catalog_variants v on v.product_id = p.id
where p.status = 'active' and v.active = true
  and v.available_stock > v.reserved_stock;

alter table public.catalog_products enable row level security;
alter table public.catalog_variants enable row level security;

-- Evita expor preço de aquisição por acesso direto à tabela.
-- A leitura pública é feita por função SECURITY DEFINER de colunas estritamente limitadas.
revoke all on public.catalog_products from anon, authenticated;
revoke all on public.catalog_variants from anon, authenticated;
revoke all on public.storefront_catalog from anon, authenticated;

create or replace function public.list_storefront_catalog()
returns table (
  product_id uuid, slug text, name text, editorial_description text,
  technical_description text, collection_name text, hero_image_url text,
  variant_id uuid, sku text, color_name text, lens_type text, uv_claim text,
  polarized_claim boolean, size_description text, weight_grams numeric,
  price_cents integer, sellable_stock integer
)
language sql stable security definer
set search_path = ''
as $$
  select p.id, p.slug, p.name, p.editorial_description, p.technical_description,
         p.collection_name, p.hero_image_url, v.id, v.sku, v.color_name,
         v.lens_type, v.uv_claim, v.polarized_claim, v.size_description,
         v.weight_grams, v.price_cents, v.available_stock - v.reserved_stock
  from public.catalog_products p
  join public.catalog_variants v on v.product_id = p.id
  where p.status = 'active' and v.active = true
    and v.available_stock > v.reserved_stock
  order by p.name, v.sku;
$$;

revoke all on function public.list_storefront_catalog() from public;
grant execute on function public.list_storefront_catalog() to anon, authenticated;

-- Escrita administrativa somente por ambiente seguro com service role.
-- Nunca expor a service role key no navegador.
