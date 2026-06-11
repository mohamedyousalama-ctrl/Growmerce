# 24 — Intelligence Object Architecture

> Software-ready architecture. This workstream converts the approved intelligence —
> Patterns (19), Brain (20), Supply Chain (22), Knowledge System (23) — into **engineerable
> objects**: schemas, attributes, relationships, lifecycles, confidence, versioning, and retrieval.
> It is the bridge from doctrine to code.

This is **not** strategy, branding, UX, or marketing. It is the object model an engineer builds the
Knowledge Engine, Pattern Engine, Reasoning Engine, and Recommendation Engine from.

---

## The mission

Until now Growmerce has defined *what it knows* (23), *how it thinks* (20), *why it can be trusted*
(22), and *what it recognises* (19). This workstream defines **how all of that becomes software
objects** — typed, related, versioned, confidence-bearing, and retrievable without hallucination.

> The deliverable is an **ontology of intelligence objects** precise enough that a future engineer
> can build the four engines using only workstreams 19, 20, 22, 23, and 24.

---

## How to think about this (the reference models)

| Reference | What we borrow |
|---|---|
| **Palantir Ontology** | a formal object model (entities + objects + relationships) that all software refers to |
| **Amazon internal systems** | durable, versioned, service-grade data objects with provenance |
| **Bloomberg data architecture** | tiered, sourced, freshness-aware data objects built for retrieval at scale |
| **Knowledge-graph systems** | nodes + typed edges; reasoning over relationships |
| **Intelligence platforms** | provenance, confidence, and auditability as first-class schema |

**Not** startup SaaS, **not** AI wrappers. Every object carries provenance and confidence by
construction, because the whole point (from 22) is that conclusions must be defensible.

---

## The object catalogue

Two layers: **Commerce Entities** (what exists in the world) and **Intelligence Objects** (what
Growmerce produces about the world). Both sit on one ontology (from 23 §14).

```
COMMERCE ENTITIES (09)          INTELLIGENCE OBJECTS
Business, Product, Offer,       Signal (02) → Evidence (03)
Channel, Marketplace,           Knowledge (04)
Customer, Location,             Pattern (05)
Competitor, Occasion,           Opportunity (07) / Threat (08)
Order, Transaction,             Recommendation (06)
Promotion, Margin               Confidence (11)   [a value-object on all of the above]
```

| # | Document | Object / subsystem |
|---|---|---|
| 01 | `01_Intelligence_Object_Architecture.md` | The whole architecture + the shared base object |
| 02 | `02_Signal_Object.md` | Signal |
| 03 | `03_Evidence_Object.md` | Evidence |
| 04 | `04_Knowledge_Object.md` | Knowledge (card / node / entity) |
| 05 | `05_Pattern_Object.md` | Pattern |
| 06 | `06_Recommendation_Object.md` | Recommendation |
| 07 | `07_Opportunity_Object.md` | Opportunity |
| 08 | `08_Threat_Object.md` | Threat |
| 09 | `09_Commerce_Entity_Model.md` | The commerce entities + relationships |
| 10 | `10_Intelligence_Relationship_Model.md` | The edges between all objects |
| 11 | `11_Confidence_Object_Model.md` | Confidence as a first-class value object |
| 12 | `12_Intelligence_Versioning_Model.md` | Versioning across all objects |
| 13 | `13_Retrieval_Architecture.md` | Grounded retrieval (no hallucination) |
| 14 | `14_Future_Knowledge_Graph_Foundation.md` | The graph this becomes |
| 15 | `15_Why_This_Architecture_Scales.md` | Why it scales |

Plus governance: `Decisions.md`, `Open_Questions.md`, `Backlog.md`.

---

## The required facets (every object document covers all ten)

Per the brief, each object is specified across:

1. **Purpose** — what it is and why it exists
2. **Schema** — fields, types
3. **Attributes** — semantics of the fields
4. **Relationships** — edges to other objects/entities
5. **Lifecycle** — its state machine
6. **Confidence** — how confidence attaches
7. **Versioning** — how it changes over time
8. **Storage considerations** — how it's persisted
9. **Retrieval considerations** — how it's fetched (and grounded)
10. **Brain interactions** — how the Brain (20) reads/writes it

---

## Mapping to the source workstreams

This architecture does not invent concepts; it **gives shape to the approved ones**:

- **19 Patterns** → the `Pattern` object (05) + the pattern library as `Knowledge` objects.
- **20 Brain** → the `Reasoning` that reads/writes these objects; the cognition pipeline is the
  sequence of object transformations; the four-band confidence becomes the `Confidence` object (11).
- **22 Supply Chain** → `Signal` (02) and `Evidence` (03), the source tiers, verification status,
  freshness; the pipeline stages map to object lifecycles; retrieval (13) enforces the
  anti-hallucination discipline.
- **23 Knowledge System** → the `Knowledge` object (04), the commerce entity model (09 ← ontology),
  versioning (12 ← quality framework), and the knowledge-graph foundation (14).

> 19/20/22/23 are the doctrine; **24 is the schema.** Nothing here redesigns them — it makes them
> buildable.

---

## The final test

A future engineer can build the **Knowledge Engine, Pattern Engine, Reasoning Engine, and
Recommendation Engine** using only 19, 20, 22, 23, and this workstream. If they cannot, this
workstream is incomplete. `15_Why_This_Architecture_Scales.md` closes by mapping each engine to the
objects it is built from.
