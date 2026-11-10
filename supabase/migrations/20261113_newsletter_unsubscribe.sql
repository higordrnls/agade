-- Descadastro da newsletter AGADE. Somente Edge Function com credencial de serviço.
-- Requer a migração 20261110_newsletter_interest.sql já aplicada.
create or replace function public.unsubscribe_newsletter_interest(p_email text)
returns boolean
language plpgsql volatile security definer
set search_path = ''
as $$
declare
  v_email text := lower(trim(p_email));
begin
  if p_email is null or length(v_email) not between 5 and 254
      or v_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then
    raise exception 'Dados inválidos' using errcode = '22023';
  end if;
  update public.newsletter_interest
     set active = false, updated_at = now()
   where email = v_email;
  -- Resposta idempotente e sem enumeração de assinantes.
  return true;
end
$$;
revoke all on function public.unsubscribe_newsletter_interest(text) from public, anon, authenticated;
grant execute on function public.unsubscribe_newsletter_interest(text) to service_role;
