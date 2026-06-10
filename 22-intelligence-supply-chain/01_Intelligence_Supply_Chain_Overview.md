# 01 — Intelligence Supply Chain Overview

> The complete pipeline that converts a raw market signal into a trusted, delivered
> recommendation. Each stage is a transformation with its own inputs, outputs, failure modes, and
> quality controls. This is the spine of the entire workstream; every other document deepens one
> or more of these stages.

Think of it as a **factory for trusted intelligence**: raw material (signals) enters one end, and
a verified, confidence-scored recommendation exits the other — with inspection at every station.

---

## The twelve stages

```
 1. SIGNAL          a raw observation exists in the world
 2. COLLECTION      we acquire it
 3. VERIFICATION    we check it is real, current, and what it claims to be
 4. NORMALIZATION   we convert it to a common, comparable form
 5. CLASSIFICATION  we tag it (signal type, tier, entity, recency)
 6. STORAGE         we persist it with provenance
 7. PATTERN DETECTION   we recognise recurring commercial realities (19)
 8. EVIDENCE SCORING    we weigh how strongly the evidence supports each pattern (06)
 9. INTELLIGENCE GENERATION  we form findings with confidence (20)
10. RECOMMENDATION GENERATION  we turn findings into prioritised actions (20)
11. HUMAN REVIEW    an operator verifies high-stakes output (20: Human Override)
12. DELIVERY        the recommendation reaches the customer, with its evidence and confidence
```

The pipeline maps onto the Intelligence Brain's cognition stages (20): stages 1–6 are the Brain's
SENSE/GROUND; 7 is RECOGNISE/INTERACT; 8–9 are ASSESS; 10 is DECIDE; 11 is the human gate over
GUARD; 12 is ACT. **This workstream is the production-grade detailing of those stages** — what can
go wrong at each, and how the system guarantees quality regardless.

---

## Stage-by-stage

### 1. Signal
- **What:** a raw, observable fact about a business or its market (a price, a review, a stockout, a
  funnel drop, a competitor move). Defined exhaustively in `02_Signal_Taxonomy.md`.
- **Failure modes:** the signal doesn't exist yet (no coverage); it's ambiguous; it's transient.
- **Quality control:** the Signal Taxonomy defines what a valid signal of each type *is*, so we
  know what we're looking for and what's noise.

### 2. Collection
- **What:** acquiring the signal — from user input, an upload, a URL, a screenshot, a platform, or
  (future) an integration/partner feed. Mapped in `04_Intelligence_Acquisition_Strategy.md`.
- **Failure modes:** incomplete capture; wrong entity; capture error (bad OCR/parse); stale at
  capture; selection bias (we only collect what's easy).
- **Quality control:** capture metadata (source, timestamp, method, confidence-of-capture);
  coverage tracking (what we're *missing*, not just what we have).

### 3. Verification
- **What:** confirming the signal is real, current, internally consistent, and actually about the
  entity it claims to describe. The anti-hallucination stage. Detailed in
  `05_Verification_and_Trust_System.md`.
- **Failure modes:** accepting a fabricated/unverifiable input as fact; trusting a stale figure;
  mis-attributing a competitor's data to the client; OCR/extraction errors passed downstream.
- **Quality control:** verification checks per source tier (03); unverifiable inputs are capped at
  the lowest tier; cross-checks against other signals; freshness validation.

### 4. Normalization
- **What:** converting the signal into a common, comparable representation — units, currency, time
  base, entity references, taxonomy fields. (A price from a marketplace and a price from a
  screenshot become the same kind of object.)
- **Failure modes:** unit/currency errors; timezone/seasonality misalignment; entity-resolution
  errors (two records for one SKU; one record merging two SKUs).
- **Quality control:** canonical schemas; deterministic entity resolution with confidence; explicit
  units and time base on every normalized value.

### 5. Classification
- **What:** tagging the normalized signal: signal type (02), source tier (03), entity, recency,
  reliability, and which patterns it could bear on.
- **Failure modes:** mis-tagging type or tier; over-/under-claiming reliability; wrong entity link.
- **Quality control:** classification rules tied to the taxonomy and hierarchy; tier assignment is
  rule-based and auditable, not arbitrary.

### 6. Storage
- **What:** persisting the classified signal **with full provenance** — where it came from, when,
  how, at what tier, and every transformation applied.
- **Failure modes:** losing provenance (the cardinal sin — an unprovenanced fact can't be trusted
  or audited); silent overwrites; staleness with no decay.
- **Quality control:** provenance is mandatory and immutable; freshness/decay metadata; versioned
  records so history is auditable (feeds the Brain's learning loop, 20).

### 7. Pattern Detection
- **What:** recognising the commerce patterns (19) the evidence supports — and their interactions
  (reinforce/conflict/compound/causal, per 20).
- **Failure modes:** false patterns from coincidence; missing a real pattern (coverage gap); double-
  counting correlated signals as independent.
- **Quality control:** patterns require their defined evidence signals and counter-evidence checks
  (19/20); independence checks prevent double-counting.

### 8. Evidence Scoring
- **What:** weighing how strongly the (verified, tiered) evidence supports each detected pattern.
  The engine in `06_Evidence_Scoring_Engine.md`.
- **Failure modes:** over-weighting weak/low-tier evidence; ignoring contradictions; treating
  correlated signals as convergence.
- **Quality control:** tier-capped weights; convergence requires independence; contradictions
  reduce score; counter-evidence is mandatory.

### 9. Intelligence Generation
- **What:** forming **findings** — a pattern + its evidence + a computed **confidence** (20's
  four-band model). Honest about uncertainty and missing data.
- **Failure modes:** overclaiming confidence; asserting a finding the evidence can't support;
  hiding a data gap.
- **Quality control:** the Brain's GUARD gates (grounding, sufficiency, counter-evidence, context,
  conflict); confidence cannot exceed what evidence supports; Tier-1-only findings capped at Medium.

### 10. Recommendation Generation
- **What:** converting findings into **prioritised, sequenced actions** tied to validated fixes
  (19) and the business's context (20's Recommendation framework).
- **Failure modes:** recommending an unvalidated or infeasible fix; wrong sequence; guaranteeing
  outcomes.
- **Quality control:** recommendations must trace to a finding and a validated fix; sequencing
  rules; honest framing (no guarantees — narrative guardrails, 21).

### 11. Human Review
- **What:** an operator verifies output whose stakes warrant it (high impact, low confidence, novel
  context, critical threats) — the human backstop and trainer (20's Human Override).
- **Failure modes:** rubber-stamping; reviewer bias; bottlenecking everything; or, conversely,
  auto-shipping something that needed a human.
- **Quality control:** tiered review (auto-surface vs. review-required vs. expert-required);
  reasoned, logged overrides; reviewer calibration tracked.

### 12. Delivery
- **What:** the recommendation reaches the customer **with its evidence and confidence attached** —
  in a report, the diagnostic, a consultation, or WhatsApp. (How it's *communicated*: 04/21.)
- **Failure modes:** stripping the evidence/confidence (becoming a bare claim); overstating in
  delivery; stale-by-delivery (the world moved).
- **Quality control:** every delivered conclusion carries provenance + confidence + what-would-
  change-it; freshness check at delivery.

---

## Quality controls that span the whole chain

Beyond per-stage checks, four controls run end-to-end (detailed in `09_Intelligence_Quality_Control.md`):

1. **Provenance everywhere.** Every fact and conclusion is traceable back through every stage. No
   provenance → it cannot ship.
2. **Tier discipline.** Source tier (03) caps how much any signal can influence a conclusion,
   regardless of how confident it sounds.
3. **Confidence honesty.** Confidence is computed (06) and never inflated; uncertainty and gaps are
   surfaced, not hidden.
4. **Closed-loop learning.** Outcomes (did the recommendation work?) flow back to recalibrate the
   chain (20's learning loop) — the supply chain improves with every engagement.

---

## Why the supply-chain framing matters

A dashboard shows stage 6 (stored data) and stops. A generic AI tool jumps from stage 2 (collect)
to stage 10 (recommend), skipping verification, scoring, and review — which is exactly why it
hallucinates. Growmerce runs **all twelve stages with inspection at each**, which is why its output
can be *trusted and defended*, not just produced. The remaining documents detail each stage's
machinery.
