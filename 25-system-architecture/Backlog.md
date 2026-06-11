# Backlog — System Architecture

Engineering work to build the system. Candidates, not commitments. Scoped to architecture/build (not
strategy, brand, or UX). The MVP build order is in `12_MVP_Architecture.md`; this is the fuller backlog.

---

## Foundation (the trust core — build first)

- **Object model + schema** — implement the 24 objects/edges with provenance, confidence, version,
  tenant_scope (the base object + invariants).
- **Event/outbox layer** — domain events with correlation/causation; outbox in the MVP, stream platform
  at scale (04).
- **Audit/lineage** — the event log as audit spine; provenance-DAG queries (09).
- **Versioning layer** — append-only, pinned lineage, time-travel reads (24 §12).

## Ingestion

- **Commerce Profile + entity resolution** (09); the saved, reusable profile (07).
- **Signal Service** + bounded AI extraction (10); capture metadata + tiering.
- **Connector framework** — a couple of key integrations first; expand the acquisition ladder (22).

## Intelligence core

- **Evidence Service** — verification, tiering, freshness, weighting, independence keys (03 of 24).
- **Knowledge Service + card store** — the encoding format (Open Question #10), graph, validation,
  versioning, retirement (23).
- **Retrieval Service** — grounded retrieval with scope/exception/freshness filters + provenance
  attachment (06); the grounding invariants.
- **AI Gateway** — the single bounded entry point; allow/forbid enforcement; citation + logging (10).
- **Reasoning Runtime** — the cognition pipeline orchestration; GUARD gates; abstention (05).
- **Pattern Service** — pattern_def instantiation, triggers, counter-checks, interactions, compounds (05).
- **Confidence Service** — basis→band computation, caps, recomputation, calibration (24 §11).
- **Opportunity/Threat/Recommendation Services** — sizing, severity/trajectory, playbook selection,
  prioritisation, sequencing, success measures (06–08).

## Delivery & learning

- **Reporting Service** — executive-brief content object + report quality checkpoint (22 §09).
- **Consultation Service** — WhatsApp/human handoff; capture human input as Signals.
- **Execution + Memory/Outcome** — outcome capture, attribution, lesson generation → knowledge (the
  compounding loop, 07).

## Multi-tenant, security, ops

- **Tenant/Permission Service** — scope enforcement on all retrieval; roles; isolation (08).
- **Network-aggregate pipeline** — consent + anonymisation + thresholds (08; Open Questions #13–15).
- **Security** — encryption, secrets, input sandboxing, prompt-injection defence (09).
- **Observability** — system + intelligence observability (calibration, abstention, GUARD, drift,
  AI-boundary) (11; ADR-11).
- **Deployment** — managed data tier, autoscaling, region-awareness, durable-spine backups (11).

## Calibration & governance (continuous)

- **Calibration harness** — confidence vs. outcomes (Open Question #11).
- **Drift detection** — knowledge/pattern drift → review/deprecation (Open Question #12).
- **Override + review workflow** — logged, reasoned, outcome-scored human overrides (09/20).

## Cross-workstream handoffs

- **→ 24 Object Architecture:** this build implements its object/edge schemas and invariants.
- **→ 19/20/22/23:** Pattern library as cards (19); cognition pipeline as the runtime (20); supply-chain
  stages as services/events (22); knowledge corpus + learning loop (23).
- **→ 03/04 (presentation):** Reporting/Consultation produce the content objects the UX renders.
