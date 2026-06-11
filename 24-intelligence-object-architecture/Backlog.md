# Backlog — Intelligence Object Architecture

Engineering work to implement the architecture. Candidates, not commitments. Scoped to the object
model and the four engines (not strategy, brand, or UX).

---

## Schema & storage

- **Schema definitions** — formal, machine-validatable schemas for every object (02–11) and edge type
  (10), with the structured payloads (Benchmark, RuleExpr, Playbook, ModelSpec, PatternDef).
- **Storage architecture** — graph store for knowledge/patterns/entities + time-series for signals/
  evidence + relational projections; define the join seams (Open Question #1).
- **Edge storage/indexing** — attributed-edge store optimised for traversal (Open Question #2).
- **Materialisation/invalidation** — confidence/weight materialisation + recomputation on input
  versioning (Open Question #3).

## Identity & resolution

- **Entity-resolution service** — observed refs → canonical entities with confidence; merge/split
  handling (09, Open Question #4).
- **Independence-key computation** — shared-provenance detection for convergence (Open Question #5).

## Confidence & versioning

- **Confidence engine** — `ConfidenceBasis`→band/score function + caps + abstention; calibration
  harness against outcomes (11, Open Questions #6, #7).
- **Versioning/event-sourcing layer** — append-only logs, pinned lineage, time-travel retrieval,
  dependent-conclusion re-evaluation on knowledge deprecation (12, Open Question #15).

## Knowledge encoding & retrieval

- **Knowledge card format** — the retrievable, human-readable, version-pinnable encoding; executable
  RuleExpr/Benchmark/Playbook schemas (the consequential decision, Open Question #8; shared with 23).
- **Scope/exception evaluator** — efficient predicate evaluation at retrieval (Open Question #9).
- **Grounded retrieval services** — the four retrieval services (knowledge/evidence/pattern/
  recommendation) with provenance+confidence attachment, freshness checks, and the grounding
  invariants (13).
- **Citation enforcement + proposal lifecycle** — GUARD citation checks; PROPOSED→validated queue with
  human-review routing (Open Questions #10, #11).
- **Retrieval ranking** — relevance × certainty × freshness without hiding contradictions (Open
  Question #12).

## The four engines (the deliverable of the build, per `15`)

- **Knowledge Engine** — store/validate/version/retrieve knowledge; ingest outcomes as knowledge.
- **Pattern Engine** — instantiate pattern_defs against evidence; triggers, counter-checks, confidence,
  interactions/compound findings.
- **Reasoning Engine** — the cognition pipeline as grounded retrieve→reason→write; GUARD; abstention;
  learning loop.
- **Recommendation Engine** — opportunities/threats → playbook selection + contextualisation →
  prioritise/sequence → success measures → outcome capture.

## Scope, privacy, network

- **Tenant-scoping enforcement** — partitioning + leak prevention across businesses (Open Question #13).
- **Network-aggregate node design** — schema, anonymisation, consent, tiering (Open Question #14;
  ties to the Commerce Intelligence Network as a source).

## Cross-workstream handoffs

- **→ 19 Patterns:** encode the pattern library as `pattern_def` knowledge cards + `PatternDef` payloads.
- **→ 20 Brain:** implement cognition stages as grounded graph read/write; wire GUARD to the retrieval
  invariants.
- **→ 22 Supply Chain:** the Signal/Evidence objects + tiers + verification + scoring engine are this
  architecture's 02/03/11.
- **→ 23 Knowledge System:** the Knowledge object (04), entity model (09), versioning (12) implement
  the doctrine; the knowledge encoding decision is shared.
