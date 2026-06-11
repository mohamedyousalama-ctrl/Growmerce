# 01 — Intelligence Object Architecture

> The master document. It defines the full set of intelligence objects, the shared **base object**
> every one inherits, the two-layer model (commerce entities + intelligence objects), and the
> conventions (identity, provenance, confidence, versioning, status) that make the whole system
> buildable and auditable.

---

## 1. The architectural premise

Everything Growmerce produces is an **object**: typed, identified, provenance-bearing,
confidence-scored, versioned, and related to other objects through typed edges. There is no
free-floating "data" and no untracked "AI output." This premise is what operationalises the
doctrine of 22 (every conclusion is defensible) and 23 (knowledge is typed, sourced, versioned).

```
                    ┌──────────────────────────────────────────────┐
                    │              ONTOLOGY (from 23 §14)            │
                    │   one schema all objects & entities refer to  │
                    └──────────────────────────────────────────────┘
   LAYER 1: COMMERCE ENTITIES (09)            LAYER 2: INTELLIGENCE OBJECTS
   the world Growmerce reasons about          what Growmerce produces about it
   Business, Product, Offer, Channel,         Signal → Evidence → (Pattern, Knowledge)
   Marketplace, Customer, Competitor,         → Opportunity / Threat → Recommendation
   Location, Occasion, Order, Transaction,    + Confidence (value object on all)
   Promotion, Margin                          + Version (on all)
```

---

## 2. The object catalogue

### Layer 1 — Commerce entities (09)
Real-world things with observable **state**. They are the *subjects* that intelligence objects
describe. (Full schema: `09_Commerce_Entity_Model.md`.)
`Business · Product · Offer · Channel · Marketplace · Customer · Location · Competitor · Occasion ·
Order · Transaction · Promotion · Margin`

### Layer 2 — Intelligence objects
What the system produces. Each has its own document:
| Object | Doc | One-line role |
|---|---|---|
| **Signal** | 02 | a raw observation of an entity's state |
| **Evidence** | 03 | a verified, tiered, fresh Signal |
| **Knowledge** | 04 | standing understanding (card / node / entity) |
| **Pattern** | 05 | a recurring, diagnosable configuration |
| **Opportunity** | 07 | a configuration where value can be gained |
| **Threat** | 08 | a configuration where value is at risk |
| **Recommendation** | 06 | a proposed intervention |

### Value objects (attach to the above, not stand-alone)
| Object | Doc | Role |
|---|---|---|
| **Confidence** | 11 | calibrated certainty, attached to any intelligence object |
| **Version** | 12 | the change record, attached to every object |
| **Provenance** | here (§4) | the source/lineage chain, attached to every object |

---

## 3. The base object (everything inherits this)

To guarantee auditability and uniformity, every object — entity or intelligence — extends a common
base. Engineers implement this once.

```
BaseObject
  id              UUID            # globally unique, immutable
  object_type     enum            # Signal | Evidence | Knowledge | Pattern | ... | Business | ...
  schema_version  semver          # the schema this record conforms to
  status          enum            # see lifecycle (§5); object-type-specific values
  created_at      timestamp
  updated_at      timestamp
  provenance      Provenance      # how this object came to exist (§4) — MANDATORY
  version         Version         # current version + history pointer (12)
  tenant_scope    enum            # business-scoped | shared/library | network-aggregate
  metadata        map<string,any> # extensible, typed where possible
```

Intelligence objects additionally carry:
```
  confidence      Confidence      # (11) — MANDATORY on intelligence objects, absent on raw entities
  derived_from    list<EdgeRef>   # the objects this was produced from (provenance graph)
```

**Two fields are non-negotiable** (the architecture's load-bearing invariants):
- `provenance` — no object exists without a traceable origin (enforces 22's grounding rule).
- `confidence` on intelligence objects — no conclusion exists without a stated certainty (enforces
  20/22).

An object missing either is invalid and cannot be persisted or retrieved.

---

## 4. Provenance (the lineage value object)

Provenance is the chain that makes any object defensible. It is the schema form of 22's "every claim
traces to a logged signal" and 23's knowledge metadata.

```
Provenance
  origin_type     enum            # observed | derived | imported | human_authored | outcome
  source_ref      ref             # the Source (02) / Entity / Knowledge / human / engagement it came from
  method          string          # how it was produced (extraction, computation, rule, model, review)
  source_tier     enum(1..5)      # (22) Tier 1 verified … Tier 5 AI/intuition — caps influence
  derivation      list<EdgeRef>   # parent objects (forms a DAG back to raw signals/entities)
  captured_at     timestamp
  captured_by     ref             # agent | integration | human
```

Provenance forms a **directed acyclic graph**: every intelligence object can be walked back through
its `derivation` to the raw Signals and Entities that produced it. This DAG *is* the audit trail and
the substrate of grounded retrieval (13).

---

## 5. The universal lifecycle pattern

Each object type has its own state machine (defined in its document), but all follow a common
shape derived from the supply-chain stages (22) and knowledge lifecycle (23):

```
PROPOSED → VALIDATED → ACTIVE → (SUPERSEDED | DEPRECATED | RETIRED) → ARCHIVED
   │           │          │
 created    passed     in use by
           checks/      the Brain
           verification
```

- An object is never silently mutated or deleted. State transitions are recorded (12); old versions
  are retained `ARCHIVED`, never destroyed (auditability).
- Promotion (PROPOSED→VALIDATED→ACTIVE) is gated by the relevant quality control: verification for
  Evidence (22), validation for Knowledge (23), confidence floor for Patterns/Recommendations (20).

---

## 6. Identity & relationships

- **Identity:** every object has a stable `id`; entities also have natural keys for resolution (09).
- **Relationships** are first-class, typed **edges**, not embedded foreign keys, so the system is a
  graph (14). Edges themselves carry provenance and (where relevant) confidence and weight. The full
  edge catalogue is `10_Intelligence_Relationship_Model.md`.

```
Edge
  id            UUID
  type          enum            # supports | contradicts | derived_from | detects | recommends | about | ...
  from_ref      ObjectRef
  to_ref        ObjectRef
  weight        float?          # e.g. evidence weight toward a pattern (03/05)
  confidence    Confidence?
  provenance    Provenance
  version       Version
```

---

## 7. The object flow (how objects produce objects)

The architecture is a transformation pipeline — the supply chain (22) and cognition pipeline (20)
expressed as object creation:

```
ENTITY.state
   │ observed →
SIGNAL (02) ── verified → EVIDENCE (03)
   │                          │ interpreted (against KNOWLEDGE 04, via benchmarks) →
   │                          ▼
   │                       evidence-supports edges → PATTERN (05)   [confidence from 11]
   │                                                    │ valued →
   │                                          OPPORTUNITY (07) / THREAT (08)
   │                                                    │ →
   │                                          RECOMMENDATION (06) ── execution → OUTCOME
   │                                                                              │
   └────────────  OUTCOME becomes a Signal/Lesson → updates KNOWLEDGE (04)  ◄─────┘
```

Each arrow is an object-creation event with provenance linking child to parents. KNOWLEDGE (04) is
both *consumed* (to interpret evidence and detect patterns) and *produced* (from outcomes) — the
compounding loop of 23, made concrete as object writes.

---

## 8. Cross-cutting conventions

| Concern | Convention |
|---|---|
| **Identity** | UUID `id`, immutable; entities also carry resolvable natural keys |
| **Provenance** | mandatory `Provenance` DAG on every object (§4) |
| **Confidence** | mandatory `Confidence` (11) on every intelligence object |
| **Versioning** | mandatory `Version` (12); append-only history; no destructive edits |
| **Tiering** | `source_tier` (22) on provenance caps influence regardless of stated confidence |
| **Scoping** | `tenant_scope` separates business-private, shared-library, and network-aggregate data |
| **Status** | explicit lifecycle state (§5); archived, never deleted |
| **Relationships** | typed edges (10), themselves provenance- and weight-bearing |

These conventions are what let the four engines (15) be built independently against a common,
trustworthy object model.

---

## 9. What the rest of the workstream specifies

- Documents **02–08** define each object in full (the ten facets).
- **09** defines the commerce entities; **10** defines every edge type.
- **11** defines the Confidence value object; **12** defines Versioning.
- **13** defines grounded retrieval (the anti-hallucination layer) — arguably the most important
  engineering document.
- **14** shows the knowledge graph this becomes; **15** proves it scales and maps objects → engines.

> The base object, provenance DAG, typed edges, mandatory confidence, and append-only versioning are
> the five invariants of this architecture. Hold them, and every higher-level object and engine
> inherits auditability, trust, and the capacity to compound.
