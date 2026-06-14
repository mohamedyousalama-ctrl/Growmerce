-- Growmerce Real Intelligence System V1 — Phase 1, Sprint 1
-- Migration 0003: Row Level Security — DENY BY DEFAULT.
--
-- Posture for this sprint: enable RLS on every table and add NO permissive
-- policies. With RLS enabled and no policy present, the `anon` and
-- `authenticated` roles are denied ALL access. The `service_role` key
-- (used only server-side by future Edge Functions) BYPASSES RLS and is the
-- only way data is read/written until we deliberately open narrow paths.
--
-- We intentionally do NOT add an anon insert path yet: the lead sink is not
-- wired to Supabase in this sprint (that is Phase 1 Sprint 2). Preferring the
-- stricter posture now; intended future policies are documented as comments so
-- the next sprint can add them deliberately and reviewably.

alter table public.contacts        enable row level security;
alter table public.businesses      enable row level security;
alter table public.consent_records enable row level security;
alter table public.report_requests enable row level security;
alter table public.agent_runs      enable row level security;

-- Optional hardening: also enforce RLS for the table owner. Leave default
-- (owner not forced) so migrations/admin tooling keep working; service_role
-- already bypasses RLS. Uncomment per-table later if owner-side enforcement is wanted.
-- alter table public.contacts force row level security;

-- ----------------------------------------------------------------------------
-- INTENDED FUTURE POLICIES (NOT created now — documentation only)
-- ----------------------------------------------------------------------------
-- contacts / businesses / consent_records (lead capture, Phase 1 Sprint 2):
--   Prefer writing leads via an Edge Function using the service_role key
--   (no anon policy needed). If a direct anon insert is ever required, keep it
--   INSERT-only and column-narrow, e.g.:
--     create policy contacts_anon_insert on public.contacts
--       for insert to anon with check (true);
--   and NEVER grant anon SELECT on PII tables.
--
-- report_requests (operator review console, Phase 5):
--   create policy report_requests_reviewer_read on public.report_requests
--     for select to authenticated
--     using (exists (select 1 from public.users u
--                    where u.auth_id = auth.uid() and u.role in ('reviewer','admin')));
--   Writes (status transitions) should go through SECURITY DEFINER functions or
--   the service_role, not broad authenticated UPDATE policies.
--
-- agent_runs:
--   service_role only (no anon/authenticated policy). It is internal observability.
--
-- consent_records:
--   service_role write only; no client read. Treat as an immutable audit trail
--   (no UPDATE/DELETE policies; corrections are new rows / withdrawn_at set server-side).
