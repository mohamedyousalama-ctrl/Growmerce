-- Growmerce Real Intelligence System V1 — Phase 1, Sprint 1
-- Migration 0002: core backend tables (contacts, businesses, consent_records,
-- report_requests, agent_runs) + foreign keys, indexes, and updated_at triggers.
--
-- Doctrine note: these tables are the future system of record. APIs/agents will
-- later COLLECT signals into them; Growmerce converts signals to evidence and
-- decides confidence. No agent/AI logic exists yet — this is structure only.

-- ============================================================================
-- contacts — people who submit diagnostics / leads
-- ============================================================================
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  whatsapp    text,
  email       text,
  country     text,
  role        text,
  source      text,                       -- e.g. 'mvp_vertical_slice_v1'
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.contacts is 'People who submit a diagnostic / lead. PII — see consent_records.';

create index if not exists contacts_whatsapp_idx on public.contacts (whatsapp);
create index if not exists contacts_email_lower_idx on public.contacts (lower(email));

-- ============================================================================
-- businesses — business profiles tied to a contact
-- ============================================================================
create table if not exists public.businesses (
  id              uuid primary key default gen_random_uuid(),
  contact_id      uuid references public.contacts (id) on delete cascade,
  name            text,
  business_type   text,                   -- restaurant | marketplace_seller | ecommerce_store | retail | social_commerce
  primary_channel text,                   -- marketplace | store | delivery | social | whatsapp
  channels        jsonb not null default '[]'::jsonb,
  country         text,
  city            text,
  district        text,
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.businesses is 'Business profile captured during intake; channels/metadata kept flexible as JSONB.';

create index if not exists businesses_contact_id_idx on public.businesses (contact_id);

-- ============================================================================
-- consent_records — exactly what consent text was shown and accepted
-- ============================================================================
create table if not exists public.consent_records (
  id          uuid primary key default gen_random_uuid(),
  contact_id  uuid references public.contacts (id) on delete cascade,
  business_id uuid references public.businesses (id) on delete set null,
  scope       text,                       -- e.g. 'contact_about_diagnosis'
  text_shown  text,                       -- verbatim consent copy presented to the user
  granted_at  timestamptz,
  ip_address  inet,
  user_agent  text,
  withdrawn_at timestamptz,
  created_at  timestamptz not null default now()
);

comment on table public.consent_records is 'Audit trail of consent: the exact text shown, when granted, and withdrawal.';

create index if not exists consent_records_contact_id_idx on public.consent_records (contact_id);
create index if not exists consent_records_business_id_idx on public.consent_records (business_id);

-- ============================================================================
-- report_requests — a real report and its review workflow status
-- ============================================================================
create table if not exists public.report_requests (
  id                    uuid primary key default gen_random_uuid(),
  business_id           uuid references public.businesses (id) on delete cascade,
  contact_id            uuid references public.contacts (id) on delete set null,
  diagnostic_session_id uuid,             -- nullable for now; diagnostic_sessions table arrives a later phase
  mode                  text not null default 'auto_draft',
  status                text not null default 'queued'
                          check (status in (
                            'queued', 'extracting', 'drafted', 'in_review',
                            'published', 'returned_for_more_data', 'failed'
                          )),
  submitted_payload     jsonb not null default '{}'::jsonb,
  structured_input      jsonb not null default '{}'::jsonb,
  current_demo_finding  jsonb,            -- snapshot of the demo finding shown in the MVP (nullable)
  priority              text not null default 'normal'
                          check (priority in ('low', 'normal', 'high')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

comment on table public.report_requests is 'A request for a real, evidence-backed report; status drives the human-reviewed pipeline.';
comment on column public.report_requests.current_demo_finding is 'Optional snapshot of the deterministic demo finding the user saw; not a real report.';

create index if not exists report_requests_business_id_idx on public.report_requests (business_id);
create index if not exists report_requests_contact_id_idx on public.report_requests (contact_id);
create index if not exists report_requests_status_idx on public.report_requests (status);

-- ============================================================================
-- agent_runs — execution log for future intelligence agents
-- ============================================================================
create table if not exists public.agent_runs (
  id                uuid primary key default gen_random_uuid(),
  report_request_id uuid references public.report_requests (id) on delete cascade,
  agent_name        text not null,
  input_hash        text,
  input_summary     jsonb,
  output_ref        text,                 -- storage path / row ref to the full output
  output_summary    jsonb,
  status            text not null default 'queued'
                      check (status in ('queued', 'running', 'succeeded', 'failed', 'skipped')),
  error             text,
  tokens_used       integer,
  cost_estimate     numeric(12,4),
  latency_ms        integer,
  started_at        timestamptz,
  finished_at       timestamptz,
  created_at        timestamptz not null default now()
);

comment on table public.agent_runs is 'Per-agent execution log (inputs hash, outputs, tokens, cost, latency, status). Observability for the future pipeline.';

create index if not exists agent_runs_report_request_id_idx on public.agent_runs (report_request_id);
create index if not exists agent_runs_status_idx on public.agent_runs (status);
create index if not exists agent_runs_agent_name_idx on public.agent_runs (agent_name);

-- ============================================================================
-- updated_at triggers (only for tables that carry updated_at)
-- ============================================================================
create trigger contacts_set_updated_at
  before update on public.contacts
  for each row execute function public.set_updated_at();

create trigger businesses_set_updated_at
  before update on public.businesses
  for each row execute function public.set_updated_at();

create trigger report_requests_set_updated_at
  before update on public.report_requests
  for each row execute function public.set_updated_at();
