-- Growmerce Real Intelligence System V1 — Phase 3
-- Migration 0005: evidence_items — the first real evidence layer.
--
-- Evidence is created ONLY from already-captured raw_observations (user-provided).
-- NO external fetch, NO AI, NO OCR, NO scraping. Strength/tier are rule-assigned and
-- conservative; nothing here is "verified". The MVP report is still the demo finding.

create table if not exists public.evidence_items (
  id                 uuid primary key default gen_random_uuid(),
  report_request_id  uuid references public.report_requests (id) on delete cascade,
  business_id        uuid references public.businesses (id) on delete set null,
  contact_id         uuid references public.contacts (id) on delete set null,
  data_source_id     uuid references public.data_sources (id) on delete set null,
  raw_observation_id uuid references public.raw_observations (id) on delete set null,
  claim_supported    text not null,
  relation           text not null
                       check (relation in ('supports', 'weakens', 'contextual', 'missing')),
  source_type        text not null
                       check (source_type in (
                         'website', 'store', 'menu', 'marketplace_listing', 'competitor',
                         'google_sheet', 'upload', 'manual_metrics', 'user_note', 'other'
                       )),
  extraction_method  text not null
                       check (extraction_method in (
                         'user_provided', 'api_extraction', 'ocr', 'csv_parse',
                         'web_search', 'screenshot', 'inferred_rule'
                       )),
  origin_class       text not null
                       check (origin_class in (
                         'user', 'extracted', 'inferred', 'benchmark', 'external', 'missing', 'demo'
                       )),
  value_signals      jsonb not null default '{}'::jsonb,
  raw_excerpt        text,
  proof_ref          text,
  strength           text not null check (strength in ('weak', 'moderate', 'strong')),
  source_tier        integer not null check (source_tier between 1 and 5),
  freshness_at       timestamptz,
  freshness_class    text not null default 'unknown'
                       check (freshness_class in ('live', 'recent', 'stale', 'unknown')),
  confidence_impact  integer not null default 0,
  limitations        text,
  provenance         text not null
                       check (provenance in (
                         'user', 'extracted', 'inferred', 'benchmark', 'external', 'missing', 'demo'
                       )),
  status             text not null default 'draft'
                       check (status in ('draft', 'accepted', 'rejected', 'superseded')),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table public.evidence_items is
  'Rule-derived evidence from user-provided raw_observations. Conservative strength/tier; nothing externally verified yet.';

create index if not exists evidence_items_report_request_id_idx on public.evidence_items (report_request_id);
create index if not exists evidence_items_business_id_idx on public.evidence_items (business_id);
create index if not exists evidence_items_data_source_id_idx on public.evidence_items (data_source_id);
create index if not exists evidence_items_raw_observation_id_idx on public.evidence_items (raw_observation_id);
create index if not exists evidence_items_origin_class_idx on public.evidence_items (origin_class);
create index if not exists evidence_items_strength_idx on public.evidence_items (strength);
create index if not exists evidence_items_status_idx on public.evidence_items (status);

create trigger evidence_items_set_updated_at
  before update on public.evidence_items
  for each row execute function public.set_updated_at();

-- RLS — deny by default (same posture as all other tables).
alter table public.evidence_items enable row level security;
-- INTENDED FUTURE POLICIES (documentation only — none created now):
--   * Writes happen via the service_role inside the build-evidence Edge Function.
--   * Reviewer read (Phase 5) → authenticated SELECT scoped to reviewer role.
--   * No anon access. Evidence may reference business context — never expose publicly.
