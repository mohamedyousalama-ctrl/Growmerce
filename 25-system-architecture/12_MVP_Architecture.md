# 12 — MVP Architecture

> If we built Growmerce today: the smallest architecture that still **preserves the doctrine.** This
> answers "how to build version 1" — what to simplify, what to defer, and what can never be
> compromised without making it a different (and untrustworthy) product.

---

## 1. The MVP principle

> Simplify the *engineering*, never the *doctrine.* The MVP can collapse services, use fewer stores,
> and serve one cognition mode — but it must still be grounded, provenance-bearing, confidence-scored,
> versioned, and AI-bounded. The moment it fabricates, hides uncertainty, or lets the AI assert, it
> stops being Growmerce.

So the MVP is defined by two lists: **what can be simplified** and **what cannot be compromised.**

---

## 2. What CANNOT be compromised (the doctrine invariants)

These are present from day one, however small the system:

1. **Provenance on every object.** Even in v1, every Signal/Evidence/Pattern/Recommendation traces to
   its origin. No untraceable conclusions. (24 §01, 09)
2. **Source tiering.** Inputs are tiered (verified data > platform > observed > user claim > AI
   inference); tier caps influence. (22, 24 §03)
3. **Computed, honest confidence.** Findings carry Low/Med/High/Very-High, computed from evidence,
   capped, never asserted. (24 §11)
4. **Grounded retrieval + GUARD.** Reasoning consumes retrieved objects; GUARD blocks ungrounded/
   uncited/overclaimed output; abstention is allowed. (06)
5. **The AI boundary.** The AI may extract/normalize/draft/propose only — never invent facts, create
   evidence, set confidence, or assert conclusions. (10)
6. **Knowledge as explicit objects.** Benchmarks/patterns/playbooks are explicit, human-readable,
   versioned cards — not buried in a prompt or model. (23, 24 §04)
7. **Append-only + auditable.** No destructive edits; an audit/lineage trail exists. (24 §12, 09)
8. **Profit ≠ revenue.** The model separates them from the start (it's structural, cheap to keep). (H1)

If any of these eight is dropped, the result is an AI wrapper or a dashboard — not Growmerce.

---

## 3. What CAN be simplified in v1

| Full architecture | MVP simplification | Why it's safe |
|---|---|---|
| ~17 separate services (02) | a **modular monolith** with clear internal module boundaries by object type | boundaries are logical; can be split into services later without redesign |
| 7 specialised stores (03) | **Postgres (relational + JSONB) + a graph capability + object store** + an append table for signals | one strong DB can carry entities/plans/signals/evidence; a graph extension or modeled edges covers relationships; vector optional |
| Vector semantic recall (C) | **defer or use simple keyword/structured retrieval** | retrieval can be rule/structured first; semantic recall is an enhancement, not a doctrine requirement |
| Full event bus (04) | **an outbox/event table + in-process handlers** | the event *model* (with correlation/causation) matters; a heavy streaming platform does not, yet |
| Network intelligence (08) | **omit entirely in v1** | needs many tenants to be meaningful; add when scale justifies |
| Full automation of detection | **human-in-the-loop heavy**; analysts drive detection with the system assisting | the path to automation is earned by track record (19/20); start supervised |
| Many integrations (Connector) | **uploads + URLs + a couple of key integrations** | the acquisition ladder (22) starts with manual inputs; integrations deepen over time |
| Multi-region deployment | **single region** | residency matters at scale; v1 can be one region |
| Deep memory/learning loop | **capture outcomes from day one** (even manually); compounding can start simple | outcome capture is doctrine (it's #1 differentiator) but its *processing* can be lightweight initially |

---

## 4. The MVP shape

```
   Web / WhatsApp  →  API + Auth
        │
   ┌────▼─────────────────────────────────────────────────────────────┐
   │  MODULAR MONOLITH (clear modules by object type)                  │
   │   Ingestion(Profile, Signal)  │  Evidence  │  Knowledge(cards)    │
   │   Pattern  │  Recommendation(+Opp/Threat)  │  Reasoning(orch.)    │
   │   Retrieval(grounded)  │  AI Gateway(bounded)  │  Confidence       │
   │   Reporting  │  Memory/Outcome  │  Audit(event/outbox table)      │
   └────┬─────────────────────────────────────────────────────────────┘
        │
   ┌────▼─────────────────────────────────────────────────────────┐
   │  Postgres (entities, evidence, patterns, plans, versions,    │
   │  outbox events; JSONB for flexible payloads; modeled edges)   │
   │  + Object store (raw artifacts)  + optional graph/vector      │
   └──────────────────────────────────────────────────────────────┘
        │
   AI provider (via bounded AI Gateway only)
```

A single team can build this. It runs the full forward flow (signal → … → report) for one or a few
verticals (e.g. marketplace sellers or delivery/F&B), in fast-judgement + light deep-diagnosis modes,
with humans doing review and operating fixes.

---

## 5. MVP scope (functional)

- **One or two domains deep** (e.g. Marketplace + Pricing/Promotion knowledge, 23 §04/05) rather than
  all sixteen — enough to deliver real, grounded findings in a niche.
- **A starter pattern library** (a dozen high-recognition patterns from 19) as pattern_def cards.
- **Manual + light-integration ingestion** (uploads, URLs, one marketplace connector).
- **The full trust stack** (provenance, tiers, confidence, GUARD, abstention, citations) — non-
  negotiable even in v1.
- **Human-in-the-loop** review + Growth Operations execution + **outcome capture** (to start
  compounding immediately).
- **The executive report** as the primary output; WhatsApp consultation as the handoff.

---

## 6. The MVP build order (how to actually start)

1. **Object model + Postgres schema** (24) with provenance, confidence, versioning, tiers.
2. **Ingestion** (Profile + Signal) with bounded AI extraction.
3. **Evidence** (verification + tiering + benchmarks).
4. **Knowledge cards** (a starter library: benchmarks, pattern_defs, playbooks for one domain).
5. **Retrieval + Reasoning + GUARD** (grounded runtime, 05/06) — the trust core.
6. **Pattern → Opportunity/Threat → Recommendation** for the chosen domain.
7. **Confidence service** (computed/capped) wired throughout.
8. **Reporting** (executive brief) + **Consultation** handoff.
9. **Outcome capture** (even manual) → Memory → Knowledge, to begin compounding.
10. **Audit/lineage** from step 1 onward (it's cross-cutting, not a phase).

Steps 1, 5, 7, and 10 are the doctrine core and come first/throughout; everything else is scope that
can grow.

---

## 7. The anti-pattern MVP to avoid

The tempting "MVP" that **must be rejected**: *an LLM with a good prompt over the user's data,
producing recommendations.* It would be faster to build and would be an **AI wrapper** — ungrounded,
unauditable, confidently wrong, with no compounding. It violates invariants 1–6 (§2). It is not a
smaller Growmerce; it is a different, untrustworthy product. The whole point of this document is that
the *grounding/trust core is part of the MVP, not a later hardening.*

---

## 8. Why this MVP still wins

Even at v1 scale, this architecture: produces grounded, confidence-scored, evidence-backed findings no
AI wrapper can match; captures outcomes from day one so it *starts compounding immediately*; and is
structured so it grows into the full system (more services, stores, domains, integrations, network
intelligence) **without re-architecting** — because the object model, grounding, and boundaries are
right from the start.

> Build the doctrine small, not the doctrine compromised. The MVP is a modular monolith on Postgres
> with a bounded AI and the full trust core — deep in one domain, human-assisted, capturing outcomes.
> It is unmistakably Growmerce, and it is the seed that grows into the whole system.
