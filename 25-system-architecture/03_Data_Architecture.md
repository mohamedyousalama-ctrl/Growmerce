# 03 — Data Architecture

> The data stores and what belongs where. The object model (24) is polyglot by necessity: different
> object types have different access patterns (high-volume append, graph traversal, semantic search,
> time-travel). This document assigns each to the right store, explains why, and sets retention.

---

## 1. Principle: polyglot persistence over one object model

No single store fits all access patterns. But all stores implement the **same object/edge model** (24)
and the **same invariants** (provenance, confidence, version, tenant scope). Stores differ in
*physics*, not in *model*. A logical object may be projected into more than one store (e.g. a Pattern
lives in the graph for traversal and in a relational index for plan queries) — with one **system of
record** per object type and the rest as derived projections.

---

## 2. The stores

```
┌────────────────────────────────────────────────────────────────────────────┐
│ A. RELATIONAL / STRUCTURED STORE                                            │
│    System of record for: Commerce Entities (09), Transactions, Profiles,    │
│    Recommendations/Plans, lifecycle/status, tenancy.                         │
│    Why: strong consistency, transactions, structured queries, relations.     │
├────────────────────────────────────────────────────────────────────────────┤
│ B. GRAPH STORE                                                               │
│    System of record for: the Knowledge graph (04), object relationships/     │
│    edges (10), pattern interactions, provenance DAG.                          │
│    Why: reasoning is traversal; provenance is a path; knowledge is a network.│
├────────────────────────────────────────────────────────────────────────────┤
│ C. VECTOR STORE / SEMANTIC INDEX                                             │
│    Embeddings of: knowledge cards, pattern defs, review/VoC text, queries.   │
│    Why: semantic retrieval ("knowledge relevant to this situation"), NL      │
│    query matching — as a *recall aid*, never a source of truth (10/06).      │
├────────────────────────────────────────────────────────────────────────────┤
│ D. TIME-SERIES / APPEND STORE                                               │
│    System of record for: Signals (02) and Evidence (03) — high-volume,       │
│    immutable, time-stamped observations; entity *state* history.             │
│    Why: append-heavy, time-keyed, freshness/decay, cheap retention.          │
├────────────────────────────────────────────────────────────────────────────┤
│ E. OBJECT / BLOB STORE                                                       │
│    Raw artifacts: uploads, screenshots, files behind Signals; report exports.│
│    Why: large binaries by reference; cheap, durable.                         │
├────────────────────────────────────────────────────────────────────────────┤
│ F. EVENT LOG (the spine)                                                     │
│    Immutable, ordered log of all domain + audit events (04, 09).             │
│    Why: event-sourcing, audit, lineage, replay; the source of the pipeline.  │
├────────────────────────────────────────────────────────────────────────────┤
│ G. VERSION / HISTORY STORE                                                   │
│    Append-only version records + pinned lineage for time-travel (24 §12).    │
│    Why: "as-of" reconstruction; auditability; safe evolution.                │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. What belongs where (by object type)

| Object (24) | System of record | Projections / indexes | Why |
|---|---|---|---|
| Commerce Entities (09) | Relational (A) | Graph (B) for relationships | facts + transactions; relations in graph |
| Entity **state** | Time-series (D) | — (current state = latest verified Evidence) | state is observation history |
| Signal (02) | Time-series (D) | — | append-heavy, immutable, time-keyed |
| Evidence (03) | Time-series (D) + Graph (B) edges | relational index for status | observations + supports/contradicts edges |
| Knowledge (04) | Graph (B) | Vector (C) for semantic recall; Relational for payloads | a network; semantically retrievable |
| Pattern (05) | Graph (B) | Relational (A) for plan/priority queries | interactions are graph; plans are tabular |
| Opportunity/Threat (07/08) | Relational (A) | Graph (B) edges to patterns | part of the Plan aggregate |
| Recommendation (06) | Relational (A) | Graph (B) edges; event log for outcomes | the Plan; sequenced, transactional |
| Confidence (11) | Embedded in parent | recompute from basis | a value object, not stand-alone |
| Edges (10) | Graph (B) | — | the graph IS the edges |
| Raw artifacts | Object store (E) | referenced from Signals | binaries |
| Events / audit | Event log (F) | derived read models | the immutable spine |
| Versions | Version store (G) | — | append-only history |

**The system of record is authoritative; projections are rebuildable from it (and from the event
log).** This is what keeps polyglot storage consistent: projections can be regenerated; the event log
+ systems of record are the truth.

---

## 4. Tenancy in the data layer (08)

Every store is **tenant-scoped**:
- Per-business data (profiles, signals, evidence, patterns, plans) carries `tenant_scope = business`
  and is logically (and for sensitive data, physically) isolated.
- The **Knowledge graph** is `shared/library` — one copy, read by all tenants (it's transferable
  knowledge).
- **Network-aggregate** nodes (anonymised cross-business knowledge) are `network-aggregate`, stored
  separately with consent metadata (08).
Scoping is enforced at the Retrieval and Tenant services (02), not left to query discipline.

---

## 5. Retention rules

Retention reflects the doctrine: **provenance is bedrock; nothing that grounds a conclusion is
deleted.**

| Data | Retention | Rationale |
|---|---|---|
| Signals (D) | indefinite (hot → cold tiering by age) | provenance bedrock; absence-as-evidence; auditability |
| Evidence (D) | indefinite (cold after freshness window) | grounds historical conclusions |
| Knowledge (B/G) | indefinite, versioned (deprecated, not deleted) | institutional memory; explain past conclusions |
| Patterns/Recs/Opps/Threats (A/B) | indefinite, versioned | the diagnostic record; learning |
| Events / audit (F) | indefinite (compliance-driven minimums) | the audit spine; replay |
| Versions (G) | indefinite | time-travel; auditability |
| Raw artifacts (E) | policy-bound (may be shorter for sensitive uploads) | privacy vs. provenance trade-off (09) |
| Network aggregates | per consent terms | privacy/consent governance |

**Nothing is destructively mutated; "deletion" is deprecation/archival** (24 §12), except where
privacy law/consent requires true erasure of *raw personal data* — handled by erasing the artifact
(E) while retaining the (anonymised) derived provenance, a deliberate privacy/auditability balance (09).

---

## 6. Consistency model

- **Strong consistency** within a service's system of record (relational transactions for Plans,
  Profiles, Recommendations) — these are decision-bearing.
- **Eventual consistency** for projections and the event-driven pipeline (a Pattern projection may lag
  the graph by milliseconds; acceptable).
- **Append-only immutability** for Signals, Evidence, events, versions — no update races by design.
- **Idempotent event handlers** so the pipeline tolerates retries/replays.

---

## 7. Data quality & integrity

- **Schema validation** at write (24 schemas) — no untyped objects; units/currency mandatory on
  Signals; provenance/confidence mandatory (01).
- **Referential integrity** via the graph (edges reference live objects; retracted edges archived).
- **Independence keys** computed at Evidence write to support de-duplication/convergence (24 §03).
- **Checksums/provenance** on raw artifacts (E) for evidence integrity (09).

---

## 8. Why this data architecture serves the doctrine

- **Graph for reasoning + provenance** → traversal-based reasoning and path-based audit (24 §13/14).
- **Time-series for signals/evidence** → cheap, scalable observation history and freshness.
- **Vector as recall aid only** → semantic retrieval without making the model a source of truth (10).
- **Event log + version store** → the auditability and compounding the moat depends on (09/15).
- **One model, many stores, one system of record per type** → consistency without forcing one engine
  to do everything.

> The data architecture is polyglot in physics but singular in model and invariants. Every store
> upholds provenance, confidence, versioning, and tenancy — so trustworthiness is a property of the
> data layer itself, not just the services above it.
