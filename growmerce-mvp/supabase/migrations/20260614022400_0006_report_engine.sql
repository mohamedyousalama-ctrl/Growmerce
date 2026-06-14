-- Growmerce Real Intelligence System V1 — Phase 4
-- Migration 0006: report engine tables (patterns_matched, reports, opportunities,
-- report_validation_issues).
--
-- These hold DETERMINISTIC, evidence-only draft reports composed by the
-- compose-report function. NO AI, NO external calls. Reports are NEVER shown to
-- end users here; publication is gated by human review (Phase 5). The MVP still
-- serves the deterministic demo finding.

-- ============================================================================
-- patterns_matched
-- ============================================================================
create table if not exists public.patterns_matched (
  id                uuid primary key default gen_random_uuid(),
  report_request_id uuid references public.report_requests (id) on delete cascade,
  business_id       uuid references public.businesses (id) on delete set null,
  pattern_key       text not null,
  family            text,
  why_fits          text,
  what_weakens      text,
  score             integer not null default 0,
  evidence_refs     jsonb not null default '[]'::jsonb,
  status            text not null default 'draft'
                      check (status in ('draft', 'accepted', 'rejected')),
  created_at        timestamptz not null default now()
);

comment on table public.patterns_matched is 'Conservative deterministic pattern match for a report request (evidence-only).';
create index if not exists patterns_matched_report_request_id_idx on public.patterns_matched (report_request_id);
create index if not exists patterns_matched_business_id_idx on public.patterns_matched (business_id);

-- ============================================================================
-- reports
-- ============================================================================
create table if not exists public.reports (
  id                uuid primary key default gen_random_uuid(),
  report_request_id uuid references public.report_requests (id) on delete cascade,
  business_id       uuid references public.businesses (id) on delete set null,
  contact_id        uuid references public.contacts (id) on delete set null,
  finding           jsonb not null default '{}'::jsonb,   -- DiagnosticFinding-shaped draft
  confidence        jsonb not null default '{}'::jsonb,
  opportunity       jsonb not null default '{}'::jsonb,
  evidence_refs     jsonb not null default '[]'::jsonb,
  status            text not null default 'draft'
                      check (status in (
                        'draft', 'in_review', 'approved', 'published',
                        'returned_for_more_data', 'rejected', 'superseded'
                      )),
  validation_status text not null default 'pending'
                      check (validation_status in ('pending', 'passed', 'failed')),
  validation_issues jsonb not null default '[]'::jsonb,
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.reports is 'Deterministic evidence-only draft reports. NOT shown to end users; publication is human-review gated.';
create index if not exists reports_report_request_id_idx on public.reports (report_request_id);
create index if not exists reports_business_id_idx on public.reports (business_id);
create index if not exists reports_status_idx on public.reports (status);
create index if not exists reports_validation_status_idx on public.reports (validation_status);

create trigger reports_set_updated_at
  before update on public.reports
  for each row execute function public.set_updated_at();

-- ============================================================================
-- opportunities
-- ============================================================================
create table if not exists public.opportunities (
  id                uuid primary key default gen_random_uuid(),
  report_id         uuid references public.reports (id) on delete cascade,
  report_request_id uuid references public.report_requests (id) on delete cascade,
  business_id       uuid references public.businesses (id) on delete set null,
  title             text not null,
  description       text,
  impact_estimate   text,
  priority          text not null default 'normal'
                      check (priority in ('low', 'normal', 'high', 'urgent')),
  effort            text not null default 'low'
                      check (effort in ('low', 'medium', 'high')),
  evidence_refs     jsonb not null default '[]'::jsonb,
  status            text not null default 'draft'
                      check (status in ('draft', 'accepted', 'rejected', 'in_progress', 'done')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.opportunities is 'Single prioritized opportunity per draft report (evidence-linked; impact is an estimate).';
create index if not exists opportunities_report_id_idx on public.opportunities (report_id);
create index if not exists opportunities_report_request_id_idx on public.opportunities (report_request_id);

create trigger opportunities_set_updated_at
  before update on public.opportunities
  for each row execute function public.set_updated_at();

-- ============================================================================
-- report_validation_issues
-- ============================================================================
create table if not exists public.report_validation_issues (
  id           uuid primary key default gen_random_uuid(),
  report_id    uuid references public.reports (id) on delete cascade,
  issue_type   text not null,
  severity     text not null default 'warning'
                 check (severity in ('info', 'warning', 'error')),
  message      text,
  evidence_ref uuid,
  created_at   timestamptz not null default now()
);

comment on table public.report_validation_issues is 'Validation-gate findings (e.g. claim without evidence). One row per issue.';
create index if not exists report_validation_issues_report_id_idx on public.report_validation_issues (report_id);

-- ============================================================================
-- RLS — deny by default on all four.
-- ============================================================================
alter table public.patterns_matched          enable row level security;
alter table public.reports                    enable row level security;
alter table public.opportunities              enable row level security;
alter table public.report_validation_issues   enable row level security;
-- INTENDED FUTURE POLICIES (documentation only — none created now):
--   * Writes via service_role inside compose-report / review-report functions.
--   * Reviewer read (Phase 5): authenticated SELECT scoped to reviewer role.
--   * End users NEVER read reports directly; a published report is delivered only
--     after human review, through a controlled, reviewed channel.
