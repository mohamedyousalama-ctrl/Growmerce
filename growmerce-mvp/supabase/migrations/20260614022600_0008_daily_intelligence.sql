-- Growmerce Real Intelligence System V1 — Phase 6
-- Migration 0008: daily/timely intelligence skeleton (daily_snapshots, alerts,
-- growth_ops_actions, scheduled_jobs).
--
-- Skeleton only. NO external fetching, NO customer notifications. Snapshots are
-- built from internal state; alerts are INTERNAL (status 'new') and never sent to
-- customers in this sprint. Scheduled jobs are NOT activated (no cron wired).

-- ============================================================================
-- daily_snapshots — append-only point-in-time snapshot of internal state
-- ============================================================================
create table if not exists public.daily_snapshots (
  id                uuid primary key default gen_random_uuid(),
  business_id       uuid references public.businesses (id) on delete cascade,
  report_request_id uuid references public.report_requests (id) on delete set null,
  data_source_id    uuid references public.data_sources (id) on delete set null,
  payload           jsonb not null default '{}'::jsonb,
  diff_from_prev    jsonb not null default '{}'::jsonb,
  captured_at       timestamptz not null default now(),
  freshness_class   text not null default 'unknown'
                      check (freshness_class in ('live', 'recent', 'stale', 'unknown')),
  created_at        timestamptz not null default now()
);

comment on table public.daily_snapshots is 'Append-only internal-state snapshots. No external data fetched.';
create index if not exists daily_snapshots_business_id_idx on public.daily_snapshots (business_id);
create index if not exists daily_snapshots_report_request_id_idx on public.daily_snapshots (report_request_id);

-- ============================================================================
-- alerts — INTERNAL alerts only (never auto-sent to customers this sprint)
-- ============================================================================
create table if not exists public.alerts (
  id                uuid primary key default gen_random_uuid(),
  business_id       uuid references public.businesses (id) on delete cascade,
  report_request_id uuid references public.report_requests (id) on delete set null,
  data_source_id    uuid references public.data_sources (id) on delete set null,
  rule              text not null,
  severity          text not null default 'low'
                      check (severity in ('low', 'medium', 'high', 'critical')),
  status            text not null default 'new'
                      check (status in ('new', 'acknowledged', 'sent', 'dismissed')),
  title             text,
  message           text,
  evidence_refs     jsonb not null default '[]'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.alerts is 'Internal operator alerts. Customer delivery is a later phase; default status new.';
create index if not exists alerts_business_id_idx on public.alerts (business_id);
create index if not exists alerts_status_idx on public.alerts (status);

create trigger alerts_set_updated_at
  before update on public.alerts
  for each row execute function public.set_updated_at();

-- ============================================================================
-- growth_ops_actions — operational follow-ups tied to an opportunity/report
-- ============================================================================
create table if not exists public.growth_ops_actions (
  id            uuid primary key default gen_random_uuid(),
  opportunity_id uuid references public.opportunities (id) on delete set null,
  report_id     uuid references public.reports (id) on delete set null,
  business_id   uuid references public.businesses (id) on delete cascade,
  action        text not null,
  description   text,
  status        text not null default 'suggested'
                  check (status in ('suggested', 'accepted', 'in_progress', 'done', 'rejected')),
  is_estimate   boolean not null default true,
  due_at        timestamptz,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.growth_ops_actions is 'Growth Operations follow-ups. is_estimate defaults true; no guaranteed outcomes.';
create index if not exists growth_ops_actions_business_id_idx on public.growth_ops_actions (business_id);
create index if not exists growth_ops_actions_opportunity_id_idx on public.growth_ops_actions (opportunity_id);

create trigger growth_ops_actions_set_updated_at
  before update on public.growth_ops_actions
  for each row execute function public.set_updated_at();

-- ============================================================================
-- scheduled_jobs — registry only (NOT activated; no cron wired this sprint)
-- ============================================================================
create table if not exists public.scheduled_jobs (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid references public.businesses (id) on delete cascade,
  job_type      text not null,
  schedule      text,                            -- cron expr / human schedule (inactive)
  status        text not null default 'disabled'
                  check (status in ('disabled', 'active', 'paused', 'error')),
  last_run_at   timestamptz,
  next_run_at   timestamptz,
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.scheduled_jobs is 'Schedule registry. Default disabled; no pg_cron is configured in this sprint.';
create index if not exists scheduled_jobs_business_id_idx on public.scheduled_jobs (business_id);

create trigger scheduled_jobs_set_updated_at
  before update on public.scheduled_jobs
  for each row execute function public.set_updated_at();

-- ============================================================================
-- RLS — deny by default on all four.
-- ============================================================================
alter table public.daily_snapshots    enable row level security;
alter table public.alerts             enable row level security;
alter table public.growth_ops_actions enable row level security;
alter table public.scheduled_jobs     enable row level security;
-- INTENDED FUTURE POLICIES (documentation only — none created now):
--   * Writes via the service_role inside run-daily-snapshot / future cron jobs.
--   * Operator read (review console) → authenticated reviewer role.
--   * Customer-facing alert delivery is a separate, explicitly gated later phase.
