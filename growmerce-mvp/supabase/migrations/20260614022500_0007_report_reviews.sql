-- Growmerce Real Intelligence System V1 — Phase 5
-- Migration 0007: report_reviews — human review audit trail.
--
-- Human review GATES publication of real reports in V1. This table records each
-- review decision. Production-grade reviewer AUTH is still required before launch
-- (this sprint allows service-role calls without end-user auth — internal only).

create table if not exists public.report_reviews (
  id                uuid primary key default gen_random_uuid(),
  report_id         uuid references public.reports (id) on delete cascade,
  report_request_id uuid references public.report_requests (id) on delete set null,
  reviewer_id       uuid,                         -- nullable until reviewer auth exists
  action            text not null
                      check (action in ('approve', 'edit', 'return_for_more_data', 'reject', 'publish')),
  notes             text,
  diff              jsonb not null default '{}'::jsonb,
  decided_at        timestamptz not null default now(),
  created_at        timestamptz not null default now()
);

comment on table public.report_reviews is 'Audit trail of human review decisions on reports. Publication requires a passed validation + a publish action.';

create index if not exists report_reviews_report_id_idx on public.report_reviews (report_id);
create index if not exists report_reviews_report_request_id_idx on public.report_reviews (report_request_id);

-- RLS — deny by default.
alter table public.report_reviews enable row level security;
-- INTENDED FUTURE POLICIES (documentation only — none created now):
--   * Writes via the service_role inside review-report (until reviewer auth exists).
--   * Once auth exists: authenticated reviewers INSERT their own reviews; reviewer_id = auth.uid().
--   * Append-only audit trail — no UPDATE/DELETE policies.
