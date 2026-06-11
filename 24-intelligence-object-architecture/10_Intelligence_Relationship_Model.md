# 10 — Intelligence Relationship Model

> The edge catalogue. The system is a graph; its power is in the **typed relationships** between
> objects and entities. This document defines every edge type, its semantics, cardinality, and the
> attributes it carries — the connective tissue that makes the Knowledge Engine, Pattern Engine,
> Reasoning Engine, and Recommendation Engine possible.

Edges inherit the `Edge` base (01 §6): `id, type, from_ref, to_ref, weight?, confidence?, provenance,
version`.

---

## 1. Why relationships are first-class

In an AI wrapper, relationships are implicit in a prompt. Here they are **explicit, typed, queryable
edges** — so reasoning is graph traversal over auditable links, not inference from opaque weights.
Every conclusion is a path through this graph, and that path *is* the explanation (13).

---

## 2. The core intelligence chain (the spine)

These edges encode the doctrine of 23 §09 (knowledge vs. pattern vs. signal vs. evidence vs.
recommendation) and 20 (the cognition pipeline):

```
Entity.state  --observed_as-->        Signal            # 09 → 02
Signal        --verified_into-->      Evidence          # 02 → 03
Evidence      --interpreted_by-->     Knowledge(benchmark)   # 03 ← 04  (gives meaning)
Evidence      --supports/contradicts->Pattern           # 03 → 05  (weighted)
Knowledge(pattern_def) --instantiated_as--> Pattern     # 04 → 05  (def → instance)
Pattern       --yields-->             Opportunity/Threat # 05 → 07/08
Opportunity/Threat --addressed_by/mitigated_by--> Recommendation  # 07/08 → 06
Recommendation --applies-->           Knowledge(playbook)# 06 ← 04
Recommendation --produces-->          Outcome --becomes--> Signal  # 06 → 02 (loop closes)
```

This single chain is the architecture in one line: **state → signal → evidence → (knowledge) →
pattern → opportunity/threat → recommendation → outcome → knowledge.**

---

## 3. The edge catalogue (by category)

### Provenance / derivation edges (on every object)
| Edge | From → To | Cardinality | Notes |
|---|---|---|---|
| `derived_from` | any intel object → parent objects | N:M | the provenance DAG (01 §4); the audit path |
| `observed_as` | Entity.state → Signal | 1:N | an observation event |
| `verified_into` | Signal → Evidence | 1:1/1:N | promotion on verification |
| `produces` | Recommendation → Outcome | 1:1 | execution result |
| `becomes` | Outcome → Signal/Knowledge | 1:1 | closes the learning loop |

### Evidential edges (weighted; drive confidence)
| Edge | From → To | Carries | Notes |
|---|---|---|---|
| `supports` | Evidence → Pattern/Knowledge | weight, confidence | positive evidentiary force |
| `contradicts` | Evidence → Pattern/Knowledge | weight | counter-evidence; subtracts |
| `interpreted_by` | Evidence → Knowledge(benchmark) | — | how raw became meaning |
| `converges_with` | Evidence → Evidence | — | independent corroboration (↑ confidence) |
| `correlated_with` | Evidence → Evidence | independence_key | shared provenance (NOT convergence) |

### Knowledge edges (the knowledge graph, 14)
| Edge | From → To | Notes |
|---|---|---|
| `about` | Knowledge → Entity/Relationship | what the knowledge concerns |
| `in_domain` | Knowledge → Domain | the 16 domains (23 §02) |
| `explains` | Knowledge → Knowledge | principle/model explains rule/pattern_def |
| `bounds` | Knowledge(exception) → Knowledge | where a rule doesn't hold |
| `supersedes` | Knowledge → Knowledge | replacement (versioning) |
| `contradicts` | Knowledge → Knowledge | resolved by certainty/scope (23 §11) |
| `supported_by` | Knowledge → Lesson/CaseObservation | the inductive backing |
| `instantiated_as` | Knowledge(pattern_def) → Pattern | def → instance |
| `applied_by` | Knowledge(playbook) → Recommendation | playbook use |

### Pattern-interaction edges (drive compound findings, 20)
| Edge | From → To | Effect |
|---|---|---|
| `reinforces` | Pattern → Pattern | ↑ confidence (independent) |
| `conflicts_with` | Pattern → Pattern | ↓ weaker pattern |
| `compounds_with` | Pattern → Pattern | forms a compound Opportunity/Threat |
| `causes` | Pattern → Pattern | directed; head = intervention point |

### Commerce-entity edges (the ontology, 09/23 §14)
`sells, packaged_into, priced_by, merchandised_on, modified_by, serves, places, realises, yields,
operates_on, competes_on, shapes, flows_through, exhibits, has` — as catalogued in 09 §4.

### Action / planning edges
| Edge | From → To | Notes |
|---|---|---|
| `addresses` | Recommendation → Pattern/Opportunity/Threat | what it resolves |
| `intervenes_on` | Recommendation → Entity | the lever it pulls |
| `depends_on` / `blocks` | Recommendation → Recommendation | sequencing |
| `part_of` | Opportunity/Threat/Recommendation → Plan | the engagement plan aggregate |

---

## 4. Edge attributes (semantics)

- **`weight`** (on `supports`/`contradicts`): the evidentiary force toward a target (03), feeding
  confidence (11). Tier-capped, freshness-decayed.
- **`confidence`** (on edges where the *relationship itself* is uncertain): e.g. an inferred `causes`
  edge between patterns carries its own confidence.
- **`provenance`** (on every edge): how the relationship was established (a rule fired, a model
  inferred it, a human asserted it) — edges are as auditable as objects.
- **`version`**: edges version like objects; a retracted edge is archived, not deleted.

---

## 5. Cardinality & integrity rules

- Provenance edges form a **DAG** (no cycles) — an object cannot be derived from itself
  transitively; enforced at write.
- `instantiated_as` and `applied_by` link **library knowledge** to **runtime instances** — many
  instances per definition.
- Every intelligence object must have at least one `derived_from`/`observed_as` edge (the grounding
  invariant — no orphan conclusions, 01).
- `contradicts`/`conflicts_with` are symmetric in detection but resolved asymmetrically by tier/
  certainty (22/23).

---

## 6. Lifecycle / 7. Confidence / 8–9. Storage & retrieval

- **Lifecycle:** edges follow object lifecycle (proposed→active→archived); a contradicted/superseded
  relationship is archived with a reason.
- **Confidence:** edges that represent *inferences* (causal, interaction, resolution) carry
  confidence; edges that represent *facts* (observed_as, applies) do not.
- **Storage:** native graph store (nodes + typed edges) is the natural fit; relational projections for
  hot paths. Edges indexed by `type`, `from_ref`, `to_ref`.
- **Retrieval:** reasoning is **traversal** — "walk supports/contradicts edges into Pattern X",
  "walk causes edges to the head", "walk derived_from for the audit trail". The retrieval architecture
  (13) is built on these traversals.

---

## 10. Brain interactions (20)

Every Brain stage is a graph operation:
- **GROUND/RECOGNISE:** create `supports`/`contradicts`, `instantiated_as` edges.
- **INTERACT:** create `reinforces`/`conflicts_with`/`compounds_with`/`causes` edges.
- **VALUE:** create `yields` edges to Opportunities/Threats.
- **DECIDE:** create `addresses`/`applies`/`depends_on` edges.
- **LEARN:** create `produces`/`becomes` edges, updating Knowledge.

> The relationship model is the architecture's nervous system. Because every link is typed,
> provenance-bearing, and (where inferred) confidence-bearing, the entire reasoning process is a
> walkable, explainable graph — which is precisely what an AI wrapper cannot offer and what makes the
> four engines buildable.
