# Decisions — Intelligence Object Architecture

Locked decisions for this workstream. Build on these; do not re-litigate.

---

### D-24.1 — This is software-ready architecture, not strategy/brand/UX/marketing
It converts the approved intelligence (19, 20, 22, 23) into engineerable objects: schemas, attributes,
relationships, lifecycles, confidence, versioning, storage, retrieval, and Brain interactions. It does
not redesign or rewrite those workstreams. Reference models: Palantir ontology, Amazon internal
systems, Bloomberg data architecture, knowledge graphs — not startup SaaS, not AI wrappers.

### D-24.2 — Everything is an object on a shared base
Every entity and intelligence object extends `BaseObject`: `id`, `object_type`, `status`, timestamps,
`provenance`, `version`, `tenant_scope`. Intelligence objects additionally carry `confidence` and
`derived_from`. Two fields are non-negotiable invariants: **provenance** (no object without a traceable
origin) and **confidence** (no intelligence object without a stated certainty). (`01`.)

### D-24.3 — Two layers over one ontology
Layer 1: Commerce Entities (09) — the world. Layer 2: Intelligence Objects (Signal→Evidence→Knowledge/
Pattern→Opportunity/Threat→Recommendation) — what we produce about it. Both reference one ontology (23
§14). (`01`, `09`.)

### D-24.4 — The object chain mirrors the doctrine
state → Signal (02) → Evidence (03) → interpreted by Knowledge (04) → Pattern (05) → Opportunity (07)/
Threat (08) → Recommendation (06) → Outcome → Knowledge. This encodes 23 §09 (knowledge vs pattern vs
signal vs evidence vs recommendation) and the Brain's cognition pipeline (20) as object creation.

### D-24.5 — Provenance is a DAG; relationships are first-class typed edges
Provenance forms a directed acyclic graph back to raw signals/entities — the audit trail and grounding
substrate. Relationships are typed, attributed edges (weight/confidence/provenance), not embedded keys,
making the system a knowledge graph. (`01`, `10`, `14`.)

### D-24.6 — Knowledge lives in typed, versioned, human-readable cards — never only in model weights
Knowledge cards (fact/principle/model/framework/rule/heuristic/playbook/benchmark/pattern_def/
anti_pattern/assumption/exception/lesson/case_observation) are retrieved by reference. This is the core
distinction from an AI wrapper. Pattern_defs and playbooks are knowledge; Pattern and Recommendation
objects are runtime instances. (`04`, `05`, `06`.)

### D-24.7 — Confidence is a computed, capped, recomputable value object
Attached to every intelligence object and inferred edge. Band+score derived from a stored `basis`
(evidence strength, convergence, counter-evidence, context fit, knowledge certainty, track record,
ambiguity); caps from the source hierarchy and GUARD (Tier-4/5-only → max Medium; unverified/conflict/
missing-context → down-band). Abstention is first-class. Never set directly; recomputed when inputs
change. (`11`.)

### D-24.8 — Source tier caps influence regardless of stated confidence
Every Signal/Evidence carries a 1–5 source tier (22). Tier caps how much any object can influence a
conclusion; lower tiers never override stronger evidence. (`02`, `03`, `11`.)

### D-24.9 — Append-only versioning; pinned lineage; reasoned change
No destructive edits or deletes — every change is a new version, archived, with mandatory rationale for
material changes. Derived objects pin the versions of their inputs, so historical conclusions are
reconstructable (time-travel). Reasoning configuration (confidence policy, tier rules, pattern defs) is
itself versioned. (`12`.)

### D-24.10 — Retrieval is grounded, not generative — the anti-hallucination layer
The Brain reasons only over real objects retrieved by reference, with provenance and confidence
attached; anything not retrieved does not exist for that step. The AI model may extract, normalise,
draft, and propose — but never assert facts not in retrieved objects, generate benchmarks/numbers,
produce a recommendation without a playbook_ref, or express uncomputed confidence. Generated output
must cite its grounded inputs; abstention is allowed when grounding is absent. (`13`.)

### D-24.11 — Entity state lives as Signal/Evidence history, not mutable fields
Entities (09) hold identity + facts; their state (stock, rank, conversion, pricing) is reconstructed
from the immutable Signal/Evidence time-series — making "what was true on date T, and how did we know?"
answerable. Revenue-vs-profit (Transaction.fully_loaded_contribution, Margin) and offer-vs-product are
structural in the schema. (`09`.)

### D-24.12 — The architecture is a knowledge graph and scales in trust
Objects are nodes, relationships are edges; reasoning is traversal, provenance is a path, confidence is
weighted traversal, learning is added nodes/edges. It scales in data (append-only/tiered/fresh),
businesses (scoped graphs + shared transferable knowledge), and knowledge (compounding outcomes on a
validated base) — and uniquely in trust (intrinsic provenance, computed/capped confidence, grounded
retrieval, outcome calibration). (`14`, `15`.)

### D-24.13 — The final test governs completeness
The four engines (Knowledge, Pattern, Reasoning, Recommendation) must be buildable from 19, 20, 22, 23,
and 24 alone. `15` maps each engine to its objects. If an engine can't be built from these, the
workstream is incomplete.
