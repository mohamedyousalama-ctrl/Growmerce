# 13 — Architecture Decisions

> The major architectural decisions (ADRs): what was decided, why it exists, and which alternatives
> were rejected. These are the load-bearing choices a senior engineer must understand and not
> accidentally undo. Each is downstream of the doctrine (19–24); none redesigns it.

Format: **Decision · Why · Rejected alternatives.**

---

### ADR-01 — Object/graph core with mandatory provenance and confidence
- **Decision:** every datum is a typed object (24) carrying provenance and (for intelligence objects)
  computed confidence; relationships are typed edges; the system is a knowledge graph.
- **Why:** auditability, grounded reasoning, and compounding all require explicit objects, lineage, and
  relationships. It is the foundation of trust.
- **Rejected:** (a) plain relational rows without provenance — can't trace conclusions; (b) documents/
  JSON blobs without typed edges — can't reason over relationships; (c) "data in the model" (AI
  wrapper) — unauditable, ungrounded.

### ADR-02 — Layered pipeline with strict object boundaries
- **Decision:** layers produce only their object type and consume the prior's (ingestion→signal,
  evidence→pattern, etc.); boundaries are enforced (01).
- **Why:** makes the doctrine's separation (knowledge≠pattern≠signal≠evidence≠recommendation) an
  enforceable system property; keeps the system honest and debuggable.
- **Rejected:** a monolithic "analyze everything" function — collapses the separations, becomes
  unauditable and unmaintainable.

### ADR-03 — Event-driven pipeline with an immutable log
- **Decision:** the supply chain + learning loop run as events; the event log is the audit/lineage
  spine and the replay source (04).
- **Why:** decoupling, auditability, replay, and the learning loop all fall out of event-sourcing.
- **Rejected:** synchronous service-to-service calls only — tight coupling, no audit spine, brittle
  under load; a CRUD system without events — no lineage, no replay.

### ADR-04 — Polyglot persistence over one object model, one system of record per type
- **Decision:** relational + graph + vector + time-series + object + event-log + version stores, each
  for its access pattern; one authoritative store per object type, rest are projections (03).
- **Why:** no single store fits append-heavy signals, graph reasoning, semantic recall, and time-travel.
- **Rejected:** (a) one relational DB for everything — graph traversal and signal volume suffer; (b)
  one graph DB for everything — poor for high-volume time-series and transactions; (c) separate models
  per store — loses the unified object model. (Note: the **MVP deliberately collapses** this to ~Postgres
  for simplicity — 12 — without losing the model.)

### ADR-05 — Grounded retrieval; the AI never originates truth
- **Decision:** reasoning consumes only retrieved, referenced objects; the AI is a bounded gateway
  (extract/normalize/draft/propose); GUARD + citation gates sit before every write/surface (06, 10).
- **Why:** the single most important trust decision — it prevents hallucination structurally and is the
  line between an intelligence system and an AI wrapper.
- **Rejected:** RAG-where-the-model-answers (model still asserts/ hallucinates); fine-tuned model as the
  knowledge base (unauditable, un-versioned, can't represent gaps); agentic AI with write/act authority
  (unsafe, ungrounded).

### ADR-06 — Confidence is a computed, capped, recomputable value object
- **Decision:** confidence is derived from an explicit basis (evidence/knowledge), tier-capped, never
  asserted; recomputed on input change; calibrated by outcomes (24 §11).
- **Why:** the brand's promise ("we tell you how sure we are") must be structurally true and honest,
  not a model's self-reported number.
- **Rejected:** the LLM's self-reported confidence (uncalibrated, gameable); a single hidden score
  (black-box, unexplainable); no confidence at all (the dashboard/AI-wrapper failure).

### ADR-07 — Append-only versioning with pinned lineage (time-travel)
- **Decision:** no destructive edits; every change is a version; derived objects pin input versions; "as
  of" reconstruction is supported (24 §12).
- **Why:** reproducibility and auditability of past conclusions; safe evolution of knowledge.
- **Rejected:** mutable records (lose history, can't explain past conclusions); soft-delete only (loses
  the *why* and the pinned basis).

### ADR-08 — Multi-tenant: private data, shared knowledge, consented aggregates
- **Decision:** three scopes (business/shared/network-aggregate); strict isolation; a one-way
  anonymising consent valve from private data to aggregates; shared library of *knowledge* not *data*
  (08).
- **Why:** delivers the compounding moat to every tenant while guaranteeing privacy; the only way to
  share understanding without sharing data.
- **Rejected:** full isolation with no sharing (no compounding, no moat); shared data across tenants
  (privacy violation, trust-destroying); per-tenant separate deployments (no shared knowledge, costly).

### ADR-09 — Stateless services, managed data tier, region-aware
- **Decision:** stateless horizontally-scalable services; managed data stores; deployable per region
  (11).
- **Why:** scale tenants/signals cheaply; focus engineering on intelligence, not infra; meet data
  residency.
- **Rejected:** stateful services (hard to scale, fragile); self-managed databases (undifferentiated
  toil); single global region (residency problems for Arabic-first markets).

### ADR-10 — Human-in-the-loop, earned automation
- **Decision:** humans review high-stakes/low-confidence/novel findings; automation of detection is
  earned by track record; overrides are logged and calibrated (20, 09).
- **Why:** trust and safety early; the system earns autonomy as patterns prove reliable.
- **Rejected:** full automation from day one (unsafe, untrusted, no calibration); permanent manual
  everything (doesn't scale, ignores compounding).

### ADR-11 — Intelligence observability as a first-class production concern
- **Decision:** monitor confidence calibration, abstention rate, GUARD blocks, coverage, knowledge
  drift, AI-boundary compliance — not just system health (11).
- **Why:** Growmerce must operate its own *correctness and honesty*, not just uptime; this is how trust
  is maintained at scale.
- **Rejected:** standard observability only (system is "up" but could be silently miscalibrated or
  drifting — the worst failure for an intelligence company).

### ADR-12 — MVP preserves doctrine, simplifies engineering
- **Decision:** v1 is a modular monolith on ~Postgres with the full trust core (provenance, tiers,
  confidence, grounding, GUARD, AI boundary, outcome capture), deep in one domain (12).
- **Why:** ship fast without becoming an AI wrapper; the trust core is part of v1, not later hardening.
- **Rejected:** "LLM + prompt over user data" MVP (an AI wrapper; violates the doctrine); full
  microservices from day one (over-engineered for v1 scale).

---

## Meta-decision

> **Across every ADR, the constant is: simplify the engineering when needed, never the doctrine.** The
> non-negotiables — provenance, tiering, computed confidence, grounded retrieval, the AI boundary,
> append-only versioning, private-data/shared-knowledge tenancy — appear at every scale from MVP to
> full platform. They are what make Growmerce an intelligence institution rather than a tool, and
> undoing any of them quietly turns it into the AI wrapper or dashboard it must never be.
