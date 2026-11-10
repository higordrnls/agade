-- AGADE: vínculo com provedor e limpeza segura de reservas SEM cobrança externa.
-- Executar após 20261111_orders_reservations.sql.
-- Atenção: pedidos vinculados a Mercado Pago NÃO são expirados por tempo,
-- pois pagamentos Pix podem ser confirmados posteriormente.

create or replace function public.attach_test_provider_order(
  p_reference text, p_provider_order_id text
)
returns boolean
language plpgsql volatile security definer
set search_path = ''
as $$
declare
  v_order public.sales_orders%rowtype;
begin
  if p_reference is null or p_provider_order_id is null
    or p_provider_order_id !~ '^ORD[A-Za-z0-9_-]{5,100}$' then
    raise exception 'Identificador inválido' using errcode = '22023';
  end if;
  select * into v_order from public.sales_orders
    where reference = p_reference for update;
  if not found or v_order.status <> 'pending_payment' then
    raise exception 'Reserva inexistente ou encerrada' using errcode = 'P0002';
  end if;
  if v_order.payment_provider_id is not null then
    if v_order.payment_provider_id = p_provider_order_id then return false; end if;
    raise exception 'Pagamento já vinculado a outra order' using errcode = '23505';
  end if;
  update public.sales_orders
  set payment_provider_id = p_provider_order_id, updated_at = now()
  where id = v_order.id;
  insert into public.sales_order_events(order_id, old_status, new_status, event_reason)
  values (v_order.id, v_order.status, v_order.status, 'provider_order_linked');
  return true;
end;
$$;

-- Importante: na migração anterior, payment_provider_id tinha uso na
-- transição paid. Agora é vinculado previamente e não deve ser alterado.
create or replace function public.transition_test_order(
  p_reference text, p_target text, p_provider_id text default null
)
returns text
language plpgsql volatile security definer
set search_path = ''
as $$
declare v_order public.sales_orders%rowtype;
begin
  if p_reference is null or p_target not in ('paid','cancelled','expired') then
    raise exception 'Transição inválida' using errcode = '22023';
  end if;
  select * into v_order from public.sales_orders where reference=p_reference for update;
  if not found then raise exception 'Pedido não encontrado' using errcode='P0002'; end if;
  if v_order.status = p_target then
    if p_target='paid' and (p_provider_id is null or v_order.payment_provider_id is distinct from p_provider_id) then
      raise exception 'Pagamento conflitante' using errcode='23505';
    end if;
    return p_target;
  end if;
  if v_order.status <> 'pending_payment' then
    raise exception 'Transição proibida' using errcode='23514';
  end if;
  if v_order.payment_provider_id is not null and v_order.payment_provider_id is distinct from p_provider_id then
    raise exception 'Vínculo de pagamento divergente' using errcode='23505';
  end if;
  if p_target='paid' then
    if p_provider_id is null or v_order.payment_provider_id is null then
      raise exception 'Order do provedor não vinculada' using errcode='22023';
    end if;
    -- Pagamento confirmado depois do prazo requer tratamento manual e não baixa automática.
    if now()>v_order.expires_at then
      raise exception 'Pagamento tardio exige conciliação manual' using errcode='22023';
    end if;
  end if;

  update public.catalog_variants
  set reserved_stock = reserved_stock - v_order.quantity,
      available_stock = available_stock - case when p_target='paid' then v_order.quantity else 0 end,
      updated_at=now()
  where id=v_order.variant_id;

  update public.sales_orders
  set status=p_target, updated_at=now()
  where id=v_order.id;
  insert into public.sales_order_events(order_id,old_status,new_status,event_reason)
  values(v_order.id,v_order.status,p_target,'verified_provider_transition');
  return p_target;
end;
$$;

-- É seguro soltar SOMENTE reservas que sequer chegaram ao provedor.
-- Reservas com payment_provider_id precisam de reconciliação remota.
create or replace function public.expire_unlinked_test_orders(p_batch_size integer default 100)
returns integer
language plpgsql volatile security definer
set search_path = ''
as $$
declare v_order record; v_count integer := 0;
begin
  if p_batch_size < 1 or p_batch_size > 1000 then
    raise exception 'Lote inválido' using errcode='22023';
  end if;
  for v_order in
    select id, reference from public.sales_orders
    where status='pending_payment'
      and expires_at <= now()
      and payment_provider_id is null
    order by expires_at
    for update skip locked
    limit p_batch_size
  loop
    perform public.transition_test_order(v_order.reference,'expired',null);
    v_count := v_count+1;
  end loop;
  return v_count;
end;
$$;

revoke all on function public.attach_test_provider_order(text,text) from public;
revoke all on function public.expire_unlinked_test_orders(integer) from public;
grant execute on function public.attach_test_provider_order(text,text) to service_role;
grant execute on function public.expire_unlinked_test_orders(integer) to service_role;

-- Agendamento intencionalmente NÃO habilitado neste arquivo.
-- No Supabase real: configurar Cron para chamar apenas
-- public.expire_unlinked_test_orders(100) a cada 5 minutos.
