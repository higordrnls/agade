\set ON_ERROR_STOP on

insert into public.catalog_products(slug,name,status) values ('order-active','Óculos teste','active');
insert into public.catalog_variants(product_id,sku,color_name,price_cents,acquisition_cost_cents,available_stock,active)
values ((select id from public.catalog_products where slug='order-active'),'TEST-ORDER-SKU','Preto',12900,3500,3,true);

-- Público nunca cria pedidos/reservas.
do $$
begin
  if has_function_privilege('anon','public.reserve_test_order(text,text,integer)','EXECUTE') then
    raise exception 'Reserva não pode ser chamada pelo público';
  end if;
  if has_table_privilege('anon','public.sales_orders','SELECT') then
    raise exception 'Pedidos devem ser privados';
  end if;
end
$$;

-- Reserva 2 unidades; a mesma chave deve retornar o mesmo pedido, sem duplicar estoque.
select * from public.reserve_test_order('order-01','TEST-ORDER-SKU',2);
do $$
declare r record;
begin
  select * into r from public.reserve_test_order('order-01','TEST-ORDER-SKU',2);
  if r.was_reused is not true or r.total_cents <> 25800 then
    raise exception 'Idempotência/preço incorretos';
  end if;
  if (select reserved_stock from public.catalog_variants where sku='TEST-ORDER-SKU') <> 2 then
    raise exception 'Reserva duplicada';
  end if;
end
$$;

-- Falha de estoque não deve gerar pedido ou reserva parcial.
do $$
begin
  begin
    perform * from public.reserve_test_order('order-02','TEST-ORDER-SKU',2);
    raise exception 'Deveria rejeitar estoque insuficiente';
  exception when raise_exception then
    if exists(select 1 from public.sales_orders where reference='order-02') then
      raise exception 'Pedido parcial persistido';
    end if;
  end;
end
$$;

-- Confirmação baixa estoque uma única vez.
select public.transition_test_order('order-01','paid','MP-TEST-01');
select public.transition_test_order('order-01','paid','MP-TEST-01');
do $$
begin
 if (select available_stock from public.catalog_variants where sku='TEST-ORDER-SKU') <> 1
    or (select reserved_stock from public.catalog_variants where sku='TEST-ORDER-SKU') <> 0 then
   raise exception 'Baixa de estoque incorreta';
 end if;
 if (select count(*) from public.sales_order_events e
     join public.sales_orders o on o.id=e.order_id
     where o.reference='order-01') <> 2 then
   raise exception 'Histórico duplicado em repetição idempotente';
 end if;
end
$$;

-- Pedido cancelado libera reserva sem reduzir estoque físico.
select * from public.reserve_test_order('order-03','TEST-ORDER-SKU',1);
select public.transition_test_order('order-03','cancelled');
do $$
begin
  if (select available_stock from public.catalog_variants where sku='TEST-ORDER-SKU') <> 1
    or (select reserved_stock from public.catalog_variants where sku='TEST-ORDER-SKU') <> 0 then
    raise exception 'Cancelamento não liberou reserva';
  end if;
end
$$;

-- Referência não pode ser reutilizada para SKU/quantidade diferente.
do $$
begin
  begin
    perform * from public.reserve_test_order('order-01','TEST-ORDER-SKU',1);
    raise exception 'Referência conflitante foi aceita';
  exception when unique_violation then null;
  end;
end
$$;

-- Nenhum pagamento pode reabrir um pedido cancelado.
do $$
begin
  begin
    perform public.transition_test_order('order-03','paid','MP-TEST-03');
    raise exception 'Pedido cancelado foi reaberto';
  exception when check_violation then null;
  end;
end
$$;

select 'PASS: reserva, idempotência, baixa, cancelamento e permissões' as result;
