-- AGADE newsletter prelaunch: consent and rate limit; not enabled by default.
create table if not exists public.newsletter_interest (
  email text primary key check(length(email) between 5 and 254),
  consented_at timestamptz not null default now(),
  consent_source text not null default 'footer',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.newsletter_attempts (
  fingerprint text primary key check(length(fingerprint)=64),
  window_started_at timestamptz not null default now(),
  attempts integer not null default 0
);
alter table public.newsletter_interest enable row level security;
alter table public.newsletter_attempts enable row level security;
revoke all on public.newsletter_interest from anon,authenticated;
revoke all on public.newsletter_attempts from anon,authenticated;
-- No public SELECT of emails. Called exclusively by secured Edge Function.
create or replace function public.register_newsletter_interest(
 p_email text,p_source text,p_fingerprint text
)
returns boolean
language plpgsql volatile security definer
set search_path=''
as $$
declare v_attempts integer;
begin
 if p_email is null or length(p_email) not between 5 and 254
    or p_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    or p_source not in ('footer')
    or p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$' then
   raise exception 'Dados inválidos' using errcode='22023';
 end if;
 insert into public.newsletter_attempts(fingerprint,window_started_at,attempts)
 values(p_fingerprint,now(),1)
 on conflict(fingerprint) do update set
    attempts = case when public.newsletter_attempts.window_started_at < now()-interval '1 hour'
                    then 1 else public.newsletter_attempts.attempts+1 end,
    window_started_at = case when public.newsletter_attempts.window_started_at < now()-interval '1 hour'
                             then now() else public.newsletter_attempts.window_started_at end
 returning attempts into v_attempts;
 if v_attempts > 4 then
   raise exception 'Limite de tentativas excedido' using errcode='P0001';
 end if;
 insert into public.newsletter_interest(email,consent_source,consented_at,active,updated_at)
 values(lower(trim(p_email)),p_source,now(),true,now())
 on conflict(email) do update set
   consented_at=excluded.consented_at, consent_source=excluded.consent_source,
   active=true,updated_at=now();
 return true;
end
$$;
revoke all on function public.register_newsletter_interest(text,text,text) from public;
grant execute on function public.register_newsletter_interest(text,text,text) to service_role;
-- No marketing emails sent. Configure unsubscribe before first campaign.
