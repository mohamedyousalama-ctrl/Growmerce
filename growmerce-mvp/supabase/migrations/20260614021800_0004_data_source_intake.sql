-- Growmerce Real Intelligence System V1 — Phase 2, Sprint 3
-- Migration 0004: data source INTAKE foundation (capture only — NO analysis).
--
-- These tables capture the raw inputs (URLs, uploads, notes, manual metrics) that the
-- future Evidence Builder will consume. Nothing here extracts, fetches, scrapes, OCRs,
-- or parses. Rows are stored as 'submitted' / 'pending'. The MVP report is still the
-- deterministic demo finding (getDiagnostic).

-- ============================================================================
-- data_sources — submitted URLs / links / sheets / uploads / future connectors
-- ============================================================================
create table if not exists public.data_sources (
  id                uuid primary key default gen_random_uuid(),
  report_request_id uuid references public.report_requests (id) on delete cascade,
  business_id       uuid references public.businesses (id) on delete set null,
  contact_id        uuid references public.contacts (id) on delete set null,
  kind              text not null
                      check (kind in (
                        'website', 'store', 'menu', 'marketplace_listing', 'competitor',
                        'google_sheet', 'upload', 'manual_metrics', 'other'
                      )),
  label             text,
  url               text,
  owner_class       text not null default 'unknown'
                      check (owner_class in ('own', 'competitor', 'market', 'user_uploaded', 'unknown')),
  status            text not null default 'submitted'
                      check (status in ('submitted', 'pending_extraction', 'extracted', 'failed', 'ignored')),
  freshness_class   text not null default 'unknown'
                      check (freshness_class in ('live', 'recent', 'stale', 'unknown')),
  metadata          jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.data_sources is 'Submitted data sources (capture only). status stays submitted until a future extraction sprint.';

create index if not exists data_sources_report_request_id_idx on public.data_sources (report_request_id);
create index if not exists data_sources_business_id_idx on public.data_sources (business_id);
create index if not exists data_sources_kind_idx on public.data_sources (kind);
create index if not exists data_sources_status_idx on public.data_sources (status);

-- ============================================================================
-- uploaded_files — metadata for uploaded screenshots / CSV / Excel / menus
-- (metadata only this sprint; no parsing/OCR)
-- ============================================================================
create table if not exists public.uploaded_files (
  id                uuid primary key default gen_random_uuid(),
  data_source_id    uuid references public.data_sources (id) on delete set null,
  report_request_id uuid references public.report_requests (id) on delete cascade,
  storage_path      text,                         -- path within the 'report-uploads' bucket
  original_filename text,
  mime_type         text,
  size_bytes        bigint,
  sha256            text,
  upload_status     text not null default 'pending'
                      check (upload_status in ('uploaded', 'pending', 'parsed', 'failed', 'skipped')),
  ocr_status        text not null default 'skipped'
                      check (ocr_status in ('pending', 'parsed', 'failed', 'skipped')),
  parse_status      text not null default 'skipped'
                      check (parse_status in ('pending', 'parsed', 'failed', 'skipped')),
  metadata          jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.uploaded_files is 'Uploaded file metadata. No OCR/parse yet (statuses default to skipped/pending).';

create index if not exists uploaded_files_report_request_id_idx on public.uploaded_files (report_request_id);
create index if not exists uploaded_files_data_source_id_idx on public.uploaded_files (data_source_id);

-- ============================================================================
-- raw_observations — raw submitted/entered observations BEFORE they become evidence
-- (append-only; no updated_at)
-- ============================================================================
create table if not exists public.raw_observations (
  id                uuid primary key default gen_random_uuid(),
  report_request_id uuid references public.report_requests (id) on delete cascade,
  data_source_id    uuid references public.data_sources (id) on delete set null,
  agent_run_id      uuid references public.agent_runs (id) on delete set null,
  observation_type  text not null
                      check (observation_type in (
                        'url_submitted', 'file_uploaded', 'manual_metric', 'sheet_reference', 'user_note'
                      )),
  payload           jsonb not null default '{}'::jsonb,
  observed_at       timestamptz not null default now(),
  freshness_class   text not null default 'unknown'
                      check (freshness_class in ('live', 'recent', 'stale', 'unknown')),
  extraction_method text not null default 'user_provided',
  limitations       text,
  created_at        timestamptz not null default now()
);

comment on table public.raw_observations is 'Raw observations as submitted (provenance: user_provided). Not yet evidence — the Evidence Builder consumes these later.';

create index if not exists raw_observations_report_request_id_idx on public.raw_observations (report_request_id);
create index if not exists raw_observations_data_source_id_idx on public.raw_observations (data_source_id);
create index if not exists raw_observations_observation_type_idx on public.raw_observations (observation_type);

-- ============================================================================
-- updated_at triggers (data_sources, uploaded_files; raw_observations is append-only)
-- ============================================================================
create trigger data_sources_set_updated_at
  before update on public.data_sources
  for each row execute function public.set_updated_at();

create trigger uploaded_files_set_updated_at
  before update on public.uploaded_files
  for each row execute function public.set_updated_at();

-- ============================================================================
-- RLS — deny by default (same posture as the core tables)
-- ============================================================================
alter table public.data_sources    enable row level security;
alter table public.uploaded_files  enable row level security;
alter table public.raw_observations enable row level security;

-- INTENDED FUTURE POLICIES (documentation only — none created now):
--   * Writes happen via the service_role inside Edge Functions (submit-report-request),
--     so no anon/authenticated policy is needed for intake.
--   * Reviewer read (Phase 5) will be added as authenticated SELECT scoped to reviewer role,
--     mirroring report_requests.
--   * raw_observations is append-only: never add UPDATE/DELETE policies.

-- ============================================================================
-- Storage bucket for user uploads (private). No public access; no object policies
-- this sprint → only the service_role can read/write objects (deny-by-default).
-- Uploads are NOT wired in the UI yet; this prepares the bucket for a later sprint.
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('report-uploads', 'report-uploads', false)
on conflict (id) do nothing;

-- INTENDED FUTURE STORAGE POLICIES (documentation only — none created now):
--   * Keep the bucket PRIVATE. Generate short-lived signed URLs server-side for
--     uploads/downloads; do not add public read.
--   * If direct authenticated uploads are added later, scope an INSERT policy on
--     storage.objects to the owner's report_request path prefix only.
