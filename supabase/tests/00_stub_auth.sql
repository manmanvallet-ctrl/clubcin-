-- Imite le strict nécessaire de Supabase pour tester le schéma sur un Postgres nu.
-- À NE PAS exécuter sur un vrai projet Supabase.
create schema auth;
create table auth.users (
  id uuid primary key default gen_random_uuid(),
  raw_user_meta_data jsonb not null default '{}'
);
create function auth.uid() returns uuid language sql stable
as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;

create role anon nologin;
create role authenticated nologin;
grant usage on schema public, auth to anon, authenticated;
