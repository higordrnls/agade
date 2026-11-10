-- AGADE · Pré-pedido e reserva transacional (versão de desenvolvimento)
-- Nenhuma cobrança real é autorizada por esta migração.

create table if not exists public.sales_orders (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique check(reference ~ '^[A-Za-z0-9_-]{1,64}$'),
  variant_id uuid not null references public.catalog_variants(id) on delete restrict,
  quantity integer not null check(quantity between 1 and 10),
  unit_price_cents integer not null check(unit_price_cents >= 0),
  total_cents bigint generated always as (quantity::bigint * unit_price_cents::bigint) stored,
  status text not null default 'pending_payment' check (status in ('pending_payment','paid','cancelled','expired')),
  payment_provider_id text unique,
  expires_at timestamptz not null default (now() + interval '30 minutes'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sales_orders_status_expiry_idx
on public.sales_orders(status, expires_at);

create table if not exists public.sales_order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.sales_orders(id) on delete restrict,
  old_status text,
  new_status text not null,
  event_reason text not null,
  occurred_at timestamptz not null default now()
);

alter table public.sales_orders enable row level security;
alter table public.sales_order_events enable row level security;
revoke all on public.sales_orders from anon, authenticated;
revoke all on public.sales_order_events from anon, authenticated;

-- Chamadas somente do backend autenticado (service_role).
-- Row lock garante que duas solicitações concorrentes não reservem a mesma peça.
create or replace function public.reserve_test_order(
  p_reference text, p_sku text, p_quantity integer
)
returns table (
  order_id uuid, order_status text, unit_price_cents integer,
  total_cents bigint, expires_at timestamptz, was_reused boolean
)
language plpgsql volatile security definer
set search_path = ''
as $$
declare
  v_existing public.sales_orders%rowtype;
  v_variant record;
  v_order public.sales_orders%rowtype;
begin
  if p_reference is null or p_reference !~ '^[A-Za-z0-9_-]{1,64}$'
      or p_sku is null or length(p_sku) > 80
      or p_quantity is null or p_quantity not between 1 and 10 then
    raise exception 'Parâmetros de reserva inválidos' using errcode = '22023';
  end if;

  -- Serialização por referência protege contra duplo clique/idempotência.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_reference, 0));
  select * into v_existing from public.sales_orders where reference = p_reference;
  if found then
    if v_existing.quantity <> p_quantity or
       not exists (select 1 from public.catalog_variants
                   where id = v_existing.variant_id and sku = p_sku) then
      raise exception 'Referência já utilizada para pedido diferente' using errcode = '23505';
    end if;
    return query select v_existing.id, v_existing.status, v_existing.unit_price_cents,
      v_existing.total_cents, v_existing.expires_at, true;
    return;
  end if;

  select v.id, v.price_cents, v.available_stock, v.reserved_stock
    into v_variant
  from public.catalog_variants v
  join public.catalog_products p on p.id = v.product_id
  where v.sku = p_sku and v.active and p.status = 'active'
  for update of v;

  if not found or v_variant.available_stock - v_variant.reserved_stock < p_quantity then
    raise exception 'Estoque insuficiente ou produto inativo' using errcode = 'P0001';
  end if;

  update public.catalog_variants
  set reserved_stock = reserved_stock + p_quantity, updated_at = now()
  where id = v_variant.id;

  insert into public.sales_orders(reference, variant_id, quantity, unit_price_cents)
  values (p_reference, v_variant.id, p_quantity, v_variant.price_cents)
  returning * into v_order;

  insert into public.sales_order_events(order_id, old_status, new_status, event_reason)
  values(v_order.id, null, v_order.status, 'reservation_created');

  return query select v_order.id, v_order.status, v_order.unit_price_cents,
    v_order.total_cents, v_order.expires_at, false;
end;
$$;

-- Transições idempotentes: pagos baixam estoque, expirados/cancelados liberam reserva.
-- Pagamentos devem ser confirmados por consulta segura à API do provedor ANTES desta chamada.
create or replace function public.transition_test_order(
  p_reference text, p_target text, p_provider_id text default null
)
returns text
language plpgsql volatile security definer
set search_path = ''
as $$
declare
  v_order public.sales_orders%rowtype;
begin
  if p_target not in ('paid','cancelled','expired') or
     p_reference is null then
    raise exception 'Transição inválida' using errcode = '22023';
  end if;
  select * into v_order from public.sales_orders
  where reference = p_reference for update;
  if not found then
    raise exception 'Pedido não encontrado' using errcode = 'P0002';
  end if;
  if v_order.status = p_target then
    if p_target = 'paid' and
       (p_provider_id is null or v_order.payment_provider_id is distinct from p_provider_id) then
      raise exception 'Pagamento conflitante' using errcode = '23505';
    end if;
    return v_order.status;
  end if;
  if v_order.status <> 'pending_payment' then
    raise exception 'Transição de estado proibida' using errcode = '23514';
  end if;
  if p_target = 'paid' and
     (p_provider_id is null or length(p_provider_id) < 1 or
      now() > v_order.expires_at) then
    raise exception 'Pagamento sem identificação ou pedido expirado' using errcode = '22023';
  end if;

  update public.catalog_variants
  set reserved_stock = reserved_stock - v_order.quantity,
      available_stock = available_stock - case when p_target = 'paid' then v_order.quantity else 0 end,
      updated_at = now()
  where id = v_order.variant_id;

  update public.sales_orders
  set status = p_target,
      payment_provider_id = case when p_target = 'paid' then p_provider_id else payment_provider_id end,
      updated_at = now()
  where id = v_order.id;
  insert into public.sales_order_events(order_id, old_status, new_status, event_reason)
  values(v_order.id, v_order.status, p_target, 'backend_verified_transition');
  return p_target;
end;
$$;

revoke all on function public.reserve_test_order(text,text,integer) from public;
revoke all on function public.transition_test_order(text,text,text) from public;
-- O papel service_role já existe no projeto Supabase; simulado no CI.
grant execute on function public.reserve_test_order(text,text,integer) to service_role;
grant execute on function public.transition_test_order(text,text,text) to service_role;
