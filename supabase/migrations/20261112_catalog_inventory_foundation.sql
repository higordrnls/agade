-- AGADE | Fundação do catálogo e estoque (sem produtos ou vendas).
-- Executar no Supabase SQL Editor, como proprietário do projeto.
-- NÃO habilita checkout, cobranças ou pedidos e NÃO insere produtos fictícios.
-- Produto comercial só aparece se publicado, com imagem, preço e saldo confirmado.

create table if not exists public.agade_catalog_products (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 name text not null check(length(btrim(name)) between 2 and 120),
 editorial_description text not null default '',
 technical_description text not null default '',
 collection_name text,
 status text not null default 'draft'
   check(status in ('draft','ready','published','archived')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.agade_catalog_variants (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.agade_catalog_products(id) on delete restrict,
 sku text not null unique check(sku ~ '^[A-Z0-9][A-Z0-9._-]{1,63}$'),
 color_name text not null check(length(btrim(color_name)) between 2 and 80),
 lens_type text not null check(length(btrim(lens_type)) between 2 and 120),
 uv_claim text,
 polarized_claim boolean,
 size_description text,
 weight_grams numeric(7,2) check(weight_grams is null or weight_grams > 0),
 price_cents integer check(price_cents is null or price_cents > 0),
 status text not null default 'draft'
   check(status in ('draft','available','discontinued')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

-- Uma foto de produto publicada deve corresponder a um ativo real com direito de uso.
-- As URLs aqui não são geradas automaticamente; imagens privadas de clientes nunca entram neste catálogo.
create table if not exists public.agade_catalog_images (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.agade_catalog_products(id) on delete cascade,
 image_url text not null check(image_url ~ '^https://[^[:space:]]+$'),
 alt_text text not null check(length(btrim(alt_text)) between 5 and 250),
 position integer not null default 0 check(position >= 0),
 is_hero boolean not null default false,
 created_at timestamptz not null default now()
);
create unique index if not exists agade_one_hero_per_product
 on public.agade_catalog_images(product_id) where is_hero;
create index if not exists agade_image_order_idx
 on public.agade_catalog_images(product_id,position,id);

-- Saldo controlado separadamente dos atributos de produto.
-- reserved é uma previsão estrutural: ainda não existe rotina de reserva/pedido.
create table if not exists public.agade_inventory_balances (
 variant_id uuid primary key references public.agade_catalog_variants(id) on delete restrict,
 on_hand integer not null default 0 check(on_hand >= 0),
 reserved integer not null default 0 check(reserved >= 0 and reserved <= on_hand),
 updated_at timestamptz not null default now()
);

create index if not exists agade_variants_product_idx
 on public.agade_catalog_variants(product_id,status);

-- Não expor tabelas brutas à API pública. 
alter table public.agade_catalog_products enable row level security;
alter table public.agade_catalog_variants enable row level security;
alter table public.agade_catalog_images enable row level security;
alter table public.agade_inventory_balances enable row level security;
revoke all on public.agade_catalog_products from public, anon, authenticated;
revoke all on public.agade_catalog_variants from public, anon, authenticated;
revoke all on public.agade_catalog_images from public, anon, authenticated;
revoke all on public.agade_inventory_balances from public, anon, authenticated;

-- Contrato da vitrine existente: prototype/src/app/data/storefrontCatalog.ts.
-- SECURITY DEFINER acessa tabelas internas apenas para devolver itens rigorosamente publicados.
create or replace function public.list_storefront_catalog()
returns table (
 product_id uuid,
 slug text,
 name text,
 editorial_description text,
 technical_description text,
 collection_name text,
 hero_image_url text,
 variant_id uuid,
 sku text,
 color_name text,
 lens_type text,
 uv_claim text,
 polarized_claim boolean,
 size_description text,
 weight_grams numeric,
 price_cents integer,
 sellable_stock integer
)
language sql
stable
security definer
set search_path = ''
as $$
 select
  p.id as product_id, p.slug, p.name,
  p.editorial_description, p.technical_description, p.collection_name,
  im.image_url as hero_image_url,
  v.id as variant_id, v.sku, v.color_name, v.lens_type,
  v.uv_claim, v.polarized_claim, v.size_description, v.weight_grams,
  v.price_cents, (b.on_hand - b.reserved) as sellable_stock
 from public.agade_catalog_products p
 join public.agade_catalog_variants v on v.product_id=p.id
 join public.agade_inventory_balances b on b.variant_id=v.id
 join public.agade_catalog_images im on im.product_id=p.id and im.is_hero=true
 where p.status='published'
   and v.status='available'
   and v.price_cents is not null and v.price_cents>0
   and b.on_hand>b.reserved
 order by p.created_at desc,p.id,v.sku
$$;

revoke all on function public.list_storefront_catalog() from public;
grant execute on function public.list_storefront_catalog() to anon, authenticated;

comment on function public.list_storefront_catalog() is
 'Lista somente variantes realmente publicadas e disponíveis para a vitrine; não autoriza compra nem reserva.';
