# 14 — Future Knowledge Graph Foundation

> The objects (02–11) and relationships (10) are, taken together, a **knowledge graph**. This document
> makes that explicit: it shows the graph the architecture forms, why a graph is the right substrate,
> and the foundation it lays for future intelligence capabilities (network intelligence, automated
> reasoning, scale). It is forward-looking *architecture*, not product vision.

---

## 1. The system is already a graph

Every object is a **node**; every relationship (10) is a typed **edge**. The commerce entities (09)
and the intelligence objects (02–08), connected by the edge catalogue, form one property graph:

```
        ┌─────────────────────── THE COMMERCE INTELLIGENCE GRAPH ───────────────────────┐
        │                                                                                │
  [Business]──sells──[Product]──merchandised_on──[Marketplace]──competes_on──[Competitor]│
        │                 │                            │                                 │
     serves            observed_as                 observed_as                           │
        │                 ▼                            ▼                                  │
  [Customer]          [Signal]──verified_into──▶[Evidence]──supports──▶[Pattern]──yields──▶[Opportunity/Threat]
        │                                          │   ▲                   │                    │
     places                            interpreted_by  │              instantiated_as      addressed_by
        ▼                                          ▼   │                   │                    ▼
     [Order]──realises──[Transaction]──yields──[Margin]│            [Knowledge:pattern_def] [Recommendation]──applies──▶[Knowledge:playbook]
                                                       │                                          │
                                                  [Knowledge:benchmark]                       produces──▶[Outcome]──becomes──▶[Signal/Knowledge]
        └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Reasoning (20) is **traversal** of this graph; provenance (01) is a **path** through it; confidence
(11) is computed from **weighted edges**; learning (23) is **new nodes and edges** added from outcomes.

---

## 2. Why a graph is the right substrate

- **Relationships are the intelligence.** Compound findings, causal chains, pattern interactions,
  cross-domain reasoning (20/23) are all *relationship* phenomena — native to a graph, awkward in
  tables.
- **Provenance is a path.** Auditing "why did we conclude this?" is walking `derived_from` edges — a
  graph traversal, which is exactly the explainability requirement (22/13).
- **Knowledge is a network.** Principles explain rules which define patterns bounded by exceptions
  (23 §03) — a knowledge graph, literally.
- **It grows without schema breakage.** New entity types, knowledge, and relationships are new
  nodes/edge-types at the edges; the core stays stable (the ontology principle, 23 §14).

---

## 3. The three sub-graphs

The graph has three layers that interoperate:
1. **The commerce sub-graph** (09) — entities + their relationships; the model of the world.
2. **The evidence sub-graph** (02/03) — observations + verification; the per-business, time-stamped
   facts.
3. **The knowledge sub-graph** (04) — the standing, validated understanding; mostly shared library,
   slowly changing.

Patterns/Opportunities/Threats/Recommendations (05–08) are where the three meet: a Pattern node links
knowledge (its def), evidence (its support), and entities (its subject). This meeting point is the
"finding," and it is structurally a join across the three sub-graphs.

---

## 4. The foundation this lays for the future

(Each is an *architectural* capability the graph enables — referenced, not a roadmap.)

### Network intelligence
The knowledge sub-graph can incorporate **aggregated, anonymised** nodes derived across many
businesses' graphs (pattern frequencies, fix-outcome rates, benchmarks). Because knowledge is typed
and scoped (`tenant_scope = network-aggregate`), network knowledge plugs into the same graph as a
high-tier source (22/23 backlog) without contaminating per-business data. The graph is the substrate
that makes the Commerce Intelligence Network (approved context) a *source*, not a separate system.

### Automated reasoning at scale
Because reasoning is graph traversal over typed, grounded edges, more of it can be automated safely:
detection (pattern_def matching against evidence sub-graphs), interaction (graph algorithms over
pattern edges), and prioritisation (scoring over weighted edges) are graph operations an agent can run
under the grounding invariants (13) — the path from human-led to automated detection (19/20 lifecycle).

### Cross-business pattern discovery
Recurring un-named configurations across many businesses' graphs are candidate new `pattern_def`s
(23 §11 induction) — discoverable by graph mining, then validated. The graph is how the system finds
what it doesn't yet know it knows.

### Temporal & causal reasoning
With versioning (12) the graph is **temporal** (state over time) and, via `causes` edges, **causal** —
enabling "what changed and why" and "where to intervene" reasoning as first-class graph queries.

---

## 5. Graph governance (so it stays trustworthy as it grows)

- **Core ontology is stable; edges extend** (23 §14) — new entity/edge types are added by governance,
  not ad hoc.
- **Every node and edge carries provenance + (where inferred) confidence** — the graph is auditable by
  construction.
- **Scoping partitions the graph** — per-business, shared library, network aggregate — with consent/
  privacy controls on aggregation.
- **Versioning makes the graph time-travel-able** — the graph at date T is reconstructable (12).

---

## 6. Storage / retrieval (graph-native)

- A property-graph store (nodes + typed, attributed edges) is the natural home; relational/time-series
  projections serve hot, high-volume paths (Signals/Evidence) and analytics.
- Retrieval (13) is traversal: scoped, status-filtered, provenance-carrying. Caching for the hot
  knowledge sub-graph.

---

## 7. Brain interactions (20)

The Brain is a **graph reasoner**: each cognition stage reads a sub-graph (grounded retrieval),
computes, and writes new nodes/edges with provenance and confidence. The whole cognition pipeline is a
sequence of graph reads and writes — which is why the architecture is buildable as engines over a
shared graph (15).

> The architecture is not "objects that could become a graph later" — it *is* a knowledge graph today,
> and that is deliberate. The graph is what makes provenance a path, confidence a weighted traversal,
> reasoning an algorithm, and learning the addition of nodes and edges — and it is the foundation on
> which network intelligence and automated reasoning are built without re-architecting anything.
