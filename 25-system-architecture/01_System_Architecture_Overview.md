# 01 — System Architecture Overview

> The complete, layered architecture: how a user's inputs flow through the intelligence, knowledge,
> pattern, and recommendation layers into reports and actions — and what each layer owns. This is the
> map; documents 02–15 zoom into each part.

---

## 1. Architectural style

Growmerce is a **layered, event-driven, multi-tenant intelligence platform** over an **object/graph
core** (24). The defining architectural properties:

- **Object/graph core.** Every datum is a typed object with provenance and (for intelligence objects)
  computed confidence, related by typed edges (24). Services and stores implement this model.
- **Event-driven pipeline.** The supply chain (22) is realised as an event flow: each stage emits a
  domain event the next stage consumes (04). This decouples services and creates the audit trail.
- **Grounded reasoning.** A reasoning runtime (the Brain, 20) orchestrates *retrieve → reason → write*,
  with an AI gateway strictly bounded (10). No conclusion exists without retrieved, cited grounding.
- **Multi-tenant with shared knowledge.** Per-business data is isolated; the knowledge library is
  shared; network aggregates are consented and anonymised (08).
- **Append-only + auditable.** Nothing is destructively mutated; lineage and versioning make every
  conclusion traceable (09, 24 §12).

---

## 2. The layers (the spine)

```
   USER  (operator: founder, commerce/marketplace manager, restaurant/retail operator)
     │  asks a question / starts a diagnostic / provides inputs
     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ 0. EXPERIENCE / EDGE LAYER                                                      │
│    web, mobile, WhatsApp, TikTok landers · API gateway · auth · session         │
│    (presentation is workstreams 03/04 — out of scope here; this is the seam)    │
└──────────────────────────────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ 1. INPUT / INGESTION LAYER                                                      │
│    Commerce Profile · Signal ingestion (inputs, uploads, URLs, integrations)    │
│    → produces SIGNAL objects (02 of 24)                                          │
└──────────────────────────────────────────────────────────────────────────────┘
     │  (event: signal.created)
     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ 2. INTELLIGENCE LAYER  (the Supply Chain, 22 + the Brain runtime, 20)           │
│    Evidence (verify/tier/normalize) · Reasoning Runtime (orchestrator) ·         │
│    Retrieval · AI Gateway (bounded) · Confidence                                │
│    → produces EVIDENCE; drives the cognition pipeline                            │
└──────────────────────────────────────────────────────────────────────────────┘
     │
     ├──────────────► 3. KNOWLEDGE LAYER (23, 24 §04)  ◄── interprets evidence, supplies benchmarks/
     │                   Knowledge Service · knowledge graph · memory/learning      models/playbooks
     │
     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ 4. PATTERN LAYER (19, 24 §05)                                                   │
│    Pattern Service · pattern detection/interaction · compound findings          │
│    → produces PATTERN objects (findings) with confidence                        │
└──────────────────────────────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ 5. RECOMMENDATION LAYER (20, 24 §06–08)                                          │
│    Opportunity · Threat · Recommendation Services · prioritisation/sequencing   │
│    → produces OPPORTUNITY/THREAT + sequenced RECOMMENDATIONS                     │
└──────────────────────────────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ 6. DELIVERY LAYER                                                               │
│    Reporting Service (executive brief) · Consultation Service (WhatsApp/human)   │
│    → REPORTS, conversations, the surfaced plan                                   │
└──────────────────────────────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ 7. ACTION / LEARNING LAYER                                                       │
│    Growth Operations execution · Outcome capture                                │
│    → OUTCOMES become SIGNALS → update KNOWLEDGE (the compounding loop)           │
└──────────────────────────────────────────────────────────────────────────────┘

   CROSS-CUTTING SPINE (every layer):
   Identity · Audit/Lineage · Versioning · Confidence · Multi-tenant scoping · Observability
```

---

## 3. Layer responsibilities & boundaries

| Layer | Owns | Does NOT do | Produces |
|---|---|---|---|
| **0 Experience/Edge** | auth, sessions, API gateway, channel adapters | reasoning, storage of intelligence | requests into Layer 1 |
| **1 Input/Ingestion** | capturing inputs, building the Commerce Profile, emitting Signals | verifying or interpreting (that's L2) | `Signal` objects |
| **2 Intelligence** | verification, tiering, normalization, orchestration, confidence, the bounded AI | inventing facts; presentation | `Evidence`; runs the pipeline |
| **3 Knowledge** | storing/serving/validating/versioning knowledge; the learning loop | per-business conclusions | benchmarks, models, playbooks, pattern_defs |
| **4 Pattern** | detecting/scoring patterns, interactions, compound findings | choosing actions | `Pattern` findings |
| **5 Recommendation** | opportunities/threats, recommendation generation, prioritisation | executing the fix; presentation | `Opportunity`/`Threat`/`Recommendation` |
| **6 Delivery** | reports, consultation handoff, surfacing the plan | reasoning; execution | reports, conversations |
| **7 Action/Learning** | operating fixes, capturing outcomes | re-reasoning (it feeds L1/L3) | outcome `Signal`s → knowledge |
| **Spine** | identity, audit, versioning, confidence, scoping, observability | domain logic | guarantees for all layers |

**Boundary discipline (the key architectural rule):** a layer may only *produce its object type* and
*consume the prior layer's*. Ingestion produces Signals, never Evidence; Pattern consumes Evidence,
never raw Signals; Recommendation consumes Patterns/Opportunities/Threats, never Evidence directly.
This enforces the doctrine's separation (knowledge ≠ pattern ≠ signal ≠ evidence ≠ recommendation, 23
§09) *as a system boundary*, which is what keeps the system honest and auditable.

---

## 4. The two orthogonal flows

The architecture has a **forward flow** (request-time intelligence) and a **feedback flow** (learning):

```
FORWARD  (synchronous-ish, per request):
   inputs → Signal → Evidence → [Knowledge] → Pattern → Opportunity/Threat → Recommendation → Report

FEEDBACK (asynchronous, continuous):
   Recommendation → Execution → Outcome → Signal/Lesson → Knowledge → (improves all future forward flows)
```

The forward flow serves a user *now*; the feedback flow makes the system *better over time*. Both run
over the same object model and event bus. The feedback flow is the compounding moat (23/15) realised
as an architecture: outcomes are first-class events that write knowledge.

---

## 5. Where the Brain sits (20)

The **Reasoning Runtime** is not a layer; it is the **orchestrator** that drives the forward flow
across layers 2–6. The Brain's cognition stages (SENSE→GROUND→RECOGNISE→INTERACT→ASSESS→VALUE→DECIDE→
GUARD→ACT→LEARN) map to a choreography of service calls and event emissions (05). Each stage is
*grounded retrieve → reason (possibly via bounded AI) → write grounded object*. The Brain owns the
sequence and the GUARD gates; the services own the objects.

---

## 6. Where the AI sits (10)

The AI (LLM) is **one bounded service** (the AI Gateway) invoked *inside* the Intelligence layer for
specific, constrained tasks (extraction, normalization help, narrative drafting, candidate proposals,
NL query understanding). It is never the source of truth, never asserts facts, never sets confidence.
This containment is architectural, not advisory (10, 06). It is the single most important boundary in
the system for trust.

---

## 7. Cross-cutting spine

Five concerns run through every layer and are owned by dedicated capabilities:
- **Identity** — who the user/tenant is; auth and scoping.
- **Audit/Lineage** — every object/edge write is recorded; the provenance DAG is queryable (09).
- **Versioning** — append-only history; time-travel (24 §12).
- **Confidence** — computed, capped, recomputable on every intelligence object (24 §11).
- **Multi-tenant scoping** — isolation + shared-knowledge + consented aggregates (08).
- **Observability** — metrics, traces, and reasoning-step logging across the pipeline (11).

These are the guarantees that make the platform trustworthy *by construction* regardless of which
layer is executing.

---

## 8. What this overview establishes

- A **layered pipeline** mirroring the supply chain, with strict object boundaries.
- A **forward flow** (intelligence now) and a **feedback flow** (learning over time) over one object
  model and event bus.
- The **Brain as orchestrator**, the **AI as a bounded service**, and a **cross-cutting trust spine.**

The rest of the workstream specifies the services (02), stores (03), events (04), runtimes (05–06),
memory (07), tenancy (08), trust (09), AI boundary (10), deployment (11), MVP (12), decisions (13),
risks (14), and the moat (15).
