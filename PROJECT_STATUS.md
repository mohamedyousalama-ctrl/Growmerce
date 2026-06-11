# Growmerce — Project Status

_Last updated: 2026-06-10_

Growmerce is a commerce growth-operations company powered by a compounding **commerce
intelligence** engine. This document tracks the status of each strategic workstream.

---

## Workstream status

| # | Workstream | Status |
|---|---|---|
| 01 | Company Strategy | ✅ Complete |
| 02 | Commerce Intelligence Architecture | ✅ Complete |
| 03 | Brand Identity | ✅ **Just completed** |
| 04 | Website UX | ✅ Complete |
| 05 | (reserved) | — |
| 06 | Commerce Diagnostic | ✅ Complete |
| 07 | AI Agent Architecture | ✅ Complete |
| 08 | Lead Generation System | ✅ Complete |
| 09 | Sales Process | ✅ Complete |
| 10 | Service Packages | ✅ Complete |
| 11 | Operations Delivery | ✅ Complete |
| 12 | TikTok Growth Engine | ✅ Complete |
| 13 | Data Integrations | ✅ Complete |
| 14 | Structured Commerce Input Layer | ✅ Complete |
| 16 | Growmerce Intelligence System | ✅ Complete |
| 17 | Commerce Knowledge Assets | ✅ Complete |
| 18 | Industry / Marketplace / Channel / Occasion Playbooks | ✅ Complete |
| **19** | **Commerce Intelligence Patterns** | ✅ Complete |
| **20** | **Growmerce Intelligence Brain** | ✅ Complete |
| **21** | **Brand Narrative System** | ✅ Complete |
| **22** | **Commerce Intelligence Supply Chain** | ✅ Complete |
| **23** | **Commerce Knowledge System** | ✅ Complete |
| **24** | **Intelligence Object Architecture** | ✅ Complete |
| **25** | **Growmerce System Architecture** | ✅ **Just completed** |

> Workstream numbering reflects the strategic build order. Reserved slots are placeholders for
> work not yet opened.

---

## Latest milestone — 25 Growmerce System Architecture

**How Growmerce works as a software system** is defined (v1) — the buildable systems architecture that
converts the intelligence doctrine (19, 20, 22, 23, 24) into services, data stores, events, runtimes,
and a deployment. Designed like a principal architect (Palantir / Bloomberg / Databricks / Stripe), not
a startup.

**Delivered (18 documents):**
- **The system (01–04):** the layered architecture (User → Inputs → Intelligence → Knowledge → Pattern →
  Recommendation → Reports → Actions); the services (Signal, Evidence, Knowledge, Pattern,
  Recommendation, Reasoning Runtime, Retrieval, AI Gateway, Confidence, Memory, Audit…); the polyglot
  data stores (relational, graph, vector, time-series, object, event log, version); and the event
  architecture (producers/consumers/payloads, forward + feedback flows).
- **The runtimes (05–06):** the end-to-end intelligence runtime (question → grounded retrieve → reason →
  GUARD → recommendation → delivery → learning), and the grounded retrieval / anti-hallucination runtime
  (expanding 24 §13) — the engineering core of trust.
- **The hard problems (07–11):** memory/learning, multi-tenancy (private data, shared knowledge,
  consented aggregates), security & trust (auditability/lineage/integrity/traceability), the strict AI
  role definition (allow/forbid, enforced), and deployment/observability/scale.
- **Build & governance (12–15):** the MVP architecture (smallest system that preserves doctrine), the
  ADRs (with rejected alternatives), the risk register, and why the architecture wins (compounds in
  accuracy, trust, and knowledge where competitors plateau).
- Governance: Open Questions, Backlog.

**Core principle:** simplify the engineering, never the doctrine. Every object carries provenance and
computed confidence; reasoning is grounded retrieval (no hallucination); the AI is strictly bounded;
everything is versioned and auditable; outcomes feed back so the system compounds. A senior engineer can
build v1 from `12_MVP_Architecture.md`.

### Prior milestone — 24 Intelligence Object Architecture

**How the intelligence becomes software** is defined (v1) — the engineerable object model that turns
the Patterns (19), Brain (20), Supply Chain (22), and Knowledge System (23) into buildable schemas.
Modelled on Palantir ontology / Amazon internal systems / Bloomberg data architecture / knowledge
graphs — not startup SaaS or AI wrappers.

**Delivered (19 documents):**
- **The architecture (01):** the shared `BaseObject`, the provenance DAG, the two-layer model
  (commerce entities + intelligence objects), and the five invariants (provenance, typed edges,
  mandatory confidence, append-only versioning, grounded retrieval).
- **The objects (02–08):** Signal, Evidence, Knowledge (card/node/entity), Pattern, Recommendation,
  Opportunity, Threat — each fully specified across the ten facets (purpose, schema, attributes,
  relationships, lifecycle, confidence, versioning, storage, retrieval, Brain interactions).
- **The model (09–12):** the Commerce Entity Model (the ontology as schemas), the Relationship Model
  (the full edge catalogue), the Confidence value object, and the Versioning model.
- **The critical layer (13):** grounded retrieval — how the Brain retrieves without hallucinating
  (reason over referenced objects, never model weights; the AI is bounded to extract/draft/propose).
- **The foundation & proof (14–15):** the knowledge graph the architecture forms, and why it scales —
  in data, businesses, knowledge, and uniquely in trust — mapping each of the four engines to its
  objects.
- Governance: Decisions, Open Questions, Backlog.

**Core principle:** everything is a typed object with provenance and computed confidence, related by
typed edges, versioned append-only, and retrieved by reference — software-ready intelligence, not an
AI wrapper. A future engineer can build the Knowledge, Pattern, Reasoning, and Recommendation Engines
from 19, 20, 22, 23, and 24 alone.

### Prior milestone — 23 Commerce Knowledge System

**What Growmerce knows** is defined (v1) — the structured, compounding body of commercial
understanding that makes its recommendations better than anyone else's. The answer to *"what expertise
lets Growmerce recommend better?"* is now explicit: **a Commerce Knowledge System**, not AI. Built as a
knowledge institution (McKinsey / Bloomberg / Palantir ontology / Amazon doctrine), not a feature.

**Delivered (19 documents):**
- **Foundation (01–03, 14):** the System overview (and how it connects to patterns, brain, supply
  chain, diagnostics, reports, recommendations, execution); the sixteen knowledge **domains**; the
  fourteen **knowledge objects** (facts → principles → models → playbooks → patterns → lessons); and
  the **commerce ontology** (the entities/relationships everything refers to).
- **Domain knowledge (04–08):** real transferable doctrine for marketplaces, pricing & promotion,
  customer behaviour, occasion & demand, and competitor & market.
- **Connections (09–10):** knowledge → pattern mapping (the precise distinction between knowledge,
  pattern, signal, evidence, recommendation) and knowledge → brain mapping (where knowledge enters
  reasoning).
- **Trust & growth (11–13):** the compounding model, the quality framework (validation/versioning),
  and gaps & unknowns (preventing false certainty).
- **The case (15):** why Growmerce knows more over time and why competitors structurally can't.
- Governance: Decisions, Open Questions, Backlog.

**Core principle:** recommendations are downstream of understanding; superior, compounding,
institutional commercial understanding is the moat — and it is the asset competitors can't copy.

### Prior milestone — 22 Commerce Intelligence Supply Chain

**How Growmerce produces output accuracy** is defined (v1) — the machinery that converts raw market
signals into trusted commerce intelligence. The defensible answer to *"why should I trust Growmerce's
recommendation?"* is now explicit: **because Growmerce runs a superior Intelligence Supply Chain**,
not because it has AI. Framed and built like an intelligence-production firm (Bloomberg / Moody's /
credit bureau), not a SaaS startup.

**Delivered (14 documents):**
- **The pipeline (01):** the twelve-stage supply chain (Signal → … → Delivery), each with failure
  modes and quality controls.
- **Inputs (02–04):** the Signal Taxonomy (every signal category, rated), the five-tier Source
  Hierarchy (what outranks/overrides what; AI inference is Tier 5), and the Acquisition Strategy
  (where intelligence comes from + the acquisition ladder + coverage).
- **The engine (05–06):** the Verification & Trust System (how hallucinations, weak evidence, and
  contradictions are caught) and the Evidence Scoring Engine (how evidence becomes computed
  confidence).
- **The core (07):** the Output Accuracy Framework — an eight-factor model of what determines output
  quality and why it improves over time.
- **Robustness (08–09):** the Intelligence Failure Modes catalogue (detection/mitigation/recovery)
  and Quality Control checkpoints before every output.
- **The moat (10):** why agencies, consultants, dashboards, generic AI tools, marketplace
  consultants, and SaaS companies see less and conclude worse.
- Governance: Decisions, Open Questions, Backlog (supply-chain hardening).

**Core principle:** the recommendation isn't trustworthy because it's AI — it's trustworthy because
of the verified, tiered, quality-gated, outcome-calibrated supply chain behind it.

### Prior milestone — 03 Brand Identity

The **strategic identity brief** is defined (v1) — how Growmerce should *look*, translated directly
from how it thinks (20), speaks (21), and is experienced (04). This is **not** the design itself
(no code, no logo files, no mockups); it is the brief Claude Design will use, so visual exploration
starts from a fully-defined company.

**Delivered (22 documents):**
- **Foundation:** Purpose, Brand Identity Strategy, Brand Positioning Summary (the north star),
  Personality→Visual Principles (each narrative trait → a visual principle).
- **Visual direction:** Direction A evolved into **Growmerce Commerce Intelligence OS** (calm,
  premium, Arabic-first command center); logo direction brief; Arabic name & naming system
  (جرومرس); typography (Arabic-first); colour (semantic roles, profit≠revenue, confidence scale);
  layout; iconography; motion.
- **Intelligence visual systems:** the Intelligence-OS visual metaphor, the platform ecosystem map
  (never a logo wall), the executive-decision-brief report/diagnostic language, the trust &
  confidence visual language (a core differentiator), and mobile-first.
- **The handoff:** `Claude_Design_Brief.md` — everything Claude Design needs to begin.
- Governance: Decisions, Open Questions, Backlog.

**Core principle:** make people feel "this company understands online sales deeply," never "this is
a nice-looking agency." Calm intelligence over hype; Arabic-first; evidence and confidence made
visible.

### Prior milestone — 21 Brand Narrative System

**How Growmerce speaks** is defined (v1) — the narrative operating system governing language
across every surface (website, diagnostics, reports, TikTok, sales, WhatsApp, delivery, future
SaaS). Not how Growmerce looks; this is **not** brand identity (that's 03, next).

**Delivered (22 documents):**
- **Worldview foundation:** the Growmerce Worldview, the official belief list (34 convictions),
  and the official rejection list (33 things) — a coherent point of view distinct from agencies,
  consultants, and SaaS vendors.
- **The voice:** six Narrative Pillars, the Brand Personality Framework (operator with a
  scientist's honesty; and what it is *not*), the four-tier Vocabulary System (use / prefer /
  avoid / never), the Trust-Language Framework (calibrated honesty as a differentiator), and
  Evidence & Confidence Communication (wired to the Brain, 20).
- **Applied narrative:** by user state (Curiosity → Return) and by surface (website, diagnostics,
  reports, TikTok, sales, WhatsApp, service delivery).
- **Guardrails:** the bright-line "never say" list (guarantees, fake certainty, hype, AI-magic,
  manipulation, fabrication…).
- Governance: Decisions, Open Questions, Backlog.

**Core principle:** speak like a commercially-scarred, evidence-driven, intellectually-honest
commerce operator — so the reader thinks "these people understand online sales deeply," never
"these people are trying to sell me something."

### Prior milestone — 04 Website UX

The **Commerce Intelligence Experience** is defined (v1) — *how the website converts intelligence
into user experience.* It is documented as the user-facing interface of the Intelligence Brain
(20), organised **primarily around user states and cognitive transitions**, not a page inventory.

**Delivered (23 documents):**
- **Two primary spines:** `User_State_Journey.md` (Curiosity → Recognition → Diagnosis → Evidence
  → Trust → Action → Commitment; pages are containers for states) and
  `Intelligence_Retention_and_Return_Loops.md` (visitors → recurring intelligence users; "I want
  to come back").
- Strategy, IA (commerce-intelligence navigation, not Home/Services/About/Contact), and every
  major surface (homepage command-center, guided diagnostic, Spotlight-style structured input,
  pattern recognition, executive report preview, outcome-organised tools, market pages).
- Conversion & reach: lead capture (value-before-capture), WhatsApp/consultation, mobile/TikTok
  landing.
- Trust layer: Trust & Proof system, Arabic Fusha UX, edge cases (graceful, never fabricating).
- The spine: `Website_to_Intelligence_Brain_Mapping.md` — every surface mapped to a user state,
  the Brain (20), the patterns (19), the action, and the outcome.
- Every surface carries a **User-State Transition block** (state entering/leaving · friction ·
  trust gained · intelligence revealed · next action).
- Governance: Decisions, Open Questions, Backlog.

**Core principle:** prove intelligence, don't claim it; user states are primary, pages secondary;
the site is an intelligence platform you want to return to, not a brochure you bounce from.

### Prior milestone — 20 Growmerce Intelligence Brain

The **central intelligence operating system** is defined (v1) — *how Growmerce thinks.* The
Brain reasons over the Pattern Engine (19) to turn signals into evidence-backed, confidence-
scored, explainable, practical, actionable conclusions, like a highly experienced commerce
operator rather than generic AI.

**Delivered (18 documents):**
- The cognition pipeline: SENSE → GROUND → RECOGNISE → INTERACT → ASSESS → VALUE → DECIDE →
  GUARD → ACT → LEARN, with human override at every gate.
- The master `Growmerce_Intelligence_OS.md` + ten operator heuristics (the "house style").
- Reasoning subsystems: Signal & Evidence Hierarchy, Pattern Interaction Model, Opportunity
  Ranking, Risk & Threat, Revenue/Profit Leakage Intelligence, Recommendation Generation.
- Trust layer: four-band Confidence & Trust Model (with exact movement conditions) and the
  False-Positive & Bias Control immune system (six GUARD gates + bias catalogue).
- Improvement layer: Intelligence Learning Loop and Human Override & Expert Review.
- Governance: Decisions, Open Questions, Backlog.

**Core principle:** every conclusion is evidence-backed, confidence-scored, explainable,
practical, and actionable — or it is not surfaced.

### Prior milestone — 19 Commerce Intelligence Patterns
The Pattern Engine (the Brain's vocabulary): 11 pattern libraries (~32 patterns), the
Evidence/Confidence/Scoring trust stack, five system mappings, the Compounding Model, and the
Website Intelligence Usage brief.

---

## Strategic position

The foundation is in place across two axes, and now spans from doctrine to software. **Intelligence:**
what's true (patterns, 19), how it thinks (the Brain, 20), how it produces trusted output (the Supply
Chain, 22), what it actually knows (the Knowledge System, 23), and now **how all of that becomes
buildable software objects** (the Intelligence Object Architecture, 24), and **how it all runs as a
software system** (the System Architecture, 25 — services, stores, events, runtimes, deployment, MVP).
**Expression:** how it's experienced (Website UX, 04), how it speaks (Brand Narrative, 21), and how it
should look (the Brand Identity brief, 03; consolidated for design in `00-Claude-Design-Master-Brief.md`).
The full arc — doctrine → objects → buildable system → expression — is complete. What remains is
**building**: engineering the system per 25 (starting from `12_MVP_Architecture.md`), and visual
creation (Claude Design).

---

## Design handoff — `00-Claude-Design-Master-Brief.md`

A single, designer-facing **source of truth** now sits at the repository root:
`00-Claude-Design-Master-Brief.md`. It synthesises all eight workstreams (03, 04, 19, 20, 21, 22, 23,
24) into one document so Claude Design can fully understand Growmerce — what it is, why it can be
trusted, how it thinks and learns, and how it must look, feel, and behave — **without reading the
repository.** 18 sections plus a final-test self-check. This is the permanent handoff for the visual
exploration step.

---

## Recommended next step

The intelligence and expression foundations are documented through to software-ready architecture, and
the design source of truth is consolidated. The next steps are **build steps**, not further strategic
documentation:
- **System / engine build** (intelligence track) — implement the platform per
  `25-system-architecture/`, starting from `12_MVP_Architecture.md` (the smallest doctrine-preserving
  system: a modular monolith on Postgres with the full trust core). The build order is in 25's MVP doc
  and Backlog; the knowledge-card encoding format remains the consequential first decision.
- **Claude Design — visual exploration** (expression track) — from `00-Claude-Design-Master-Brief.md`
  (the consolidated source of truth), with `03-brand-identity/Claude_Design_Brief.md` as the detailed
  identity brief beneath it.

Supply-chain and knowledge hardening (`22`/`23` backlogs) are now subsumed into the engine build over
the unified object architecture (24).
