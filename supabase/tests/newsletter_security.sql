\set ON_ERROR_STOP on
-- Isolamento de perfis e registros de consentimento.
do $$
begin
 if has_table_privilege('anon','public.newsletter_interest','SELECT') or
    has_table_privilege('anon','public.newsletter_interest','INSERT') or
    has_function_privilege('anon','public.register_newsletter_interest(text,text,text)','EXECUTE') then
  raise exception 'Newsletter indevidamente acessível ao visitante';
 end if;
end $$;
select public.register_newsletter_interest('Pessoa.Exemplo@exemplo.com','footer',repeat('a',64));
do $$
begin
 if (select count(*) from public.newsletter_interest where email='pessoa.exemplo@exemplo.com' and active)=0 then
  raise exception 'Consentimento não registrado';
 end if;
end $$;
select public.register_newsletter_interest('pessoa.exemplo@exemplo.com','footer',repeat('a',64));
do $$
begin
 begin
  perform public.register_newsletter_interest('email-invalido','footer',repeat('b',64));
  raise exception 'Email inválido passou';
 exception when invalid_parameter_value then null;
 end;
 begin
  perform public.register_newsletter_interest('e@exemplo.com','footer','fake');
  raise exception 'Fingerprint inválido passou';
 exception when invalid_parameter_value then null;
 end;
end $$;
select public.register_newsletter_interest('pessoa1@exemplo.com','footer',repeat('a',64));
select public.register_newsletter_interest('pessoa2@exemplo.com','footer',repeat('a',64));
do $$
declare blocked boolean := false;
begin
 begin
  perform public.register_newsletter_interest('pessoa3@exemplo.com','footer',repeat('a',64));
 exception when raise_exception then blocked := true;
 end;
 if not blocked then raise exception 'Rate limit não bloqueou quinta tentativa'; end if;
end $$;
select 'PASS: consentimento privado, validação e rate limit' as result;
