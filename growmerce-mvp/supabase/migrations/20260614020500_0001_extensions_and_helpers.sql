-- Growmerce Real Intelligence System V1 — Phase 1, Sprint 1
-- Migration 0001: extensions + shared helpers.
--
-- Schema foundation ONLY. Nothing here is wired into the MVP UI. The current
-- deterministic/demo diagnostic (getDiagnostic) is unchanged and remains the
-- source of truth for the live app.

-- gen_random_uuid() for primary keys (available by default on Supabase; ensured here).
create extension if not exists pgcrypto;

-- Shared trigger to keep updated_at fresh on row updates.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Sets updated_at = now() on UPDATE. Attached via BEFORE UPDATE triggers to tables that carry updated_at.';
