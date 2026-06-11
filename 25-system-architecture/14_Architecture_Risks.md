# 14 — Architecture Risks

> Everything that could fail — technical, data, AI, trust, scale, and governance — with mitigations. A
> principal architect names the failure modes before they happen. Each risk maps to a doctrine
> invariant it threatens and the control that defends it.

Format: **Risk · Impact · Mitigation.**

---

## 1. Technical risks

**T1 — Polyglot complexity / consistency drift.** Multiple stores (03) drift out of sync; projections
disagree with systems of record.
- *Impact:* wrong conclusions from stale projections; debugging hell.
- *Mitigation:* one system of record per object type; projections rebuildable from the event log;
  idempotent handlers; reconciliation jobs; the MVP collapses stores to reduce surface (12).

**T2 — Graph performance at scale.** Traversal-heavy reasoning (provenance, interactions) slows as the
graph grows.
- *Impact:* latency; degraded UX; reasoning timeouts.
- *Mitigation:* indexed edges + materialised projections; scoped traversal (tenant + relevance);
  caching the hot knowledge sub-graph; read replicas.

**T3 — Event pipeline failure / backlog.** The bus (04) lags or drops; stages stall.
- *Impact:* delayed intelligence; missed learning.
- *Mitigation:* at-least-once + idempotency; dead-letter + retry; backpressure; the durable log enables
  replay/recovery; graceful degradation (lower confidence, not fabrication).

**T4 — Schema/knowledge evolution breakage.** Changing schemas or knowledge defs breaks consumers.
- *Impact:* outages; corrupted reasoning.
- *Mitigation:* additive, versioned schemas (24); stable-core/extensible-edge design; pinned versions
  (consumers don't break when knowledge evolves); progressive rollout behind flags.

---

## 2. Data risks

**D1 — Bad input data (wrong/stale/biased).** Garbage in (a wrong upload, a stale price).
- *Impact:* wrong findings.
- *Mitigation:* verification + tiering (Tier caps influence); freshness windows; consistency checks;
  confirm anomalous user inputs; the supply chain's failure-mode handling (22 §08).

**D2 — Confidently-wrong Tier-1 data.** A connected "verified" source is itself inaccurate/incomplete.
- *Impact:* the most dangerous failure — high confidence on bad ground truth.
- *Mitigation:* Tier-1 integrity checks at intake (completeness/consistency); cross-signal corroboration
  (convergence across independent sources); flagged anomalies for review. (A live open question — 22.)

**D3 — Entity-resolution errors.** Two records for one product; a competitor mis-identified.
- *Impact:* mis-attributed evidence; wrong conclusions.
- *Mitigation:* resolution with confidence; merge/split handling; ambiguous resolutions flagged not
  guessed (09/24 §09).

**D4 — Double-counting / false convergence.** Correlated signals treated as independent inflate
confidence.
- *Impact:* false certainty.
- *Mitigation:* independence keys; convergence only for independent provenance; GUARD sufficiency check
  (06).

---

## 3. AI risks

**A1 — Hallucination / the AI escaping its box.** The model asserts a fact, sets confidence, or is
believed.
- *Impact:* the existential failure — Growmerce becomes an untrustworthy AI wrapper.
- *Mitigation:* the entire grounding architecture (06) + the AI boundary (10): single gateway, no write
  authority, grounded inputs only, GUARD + citation gates, tier-capped extractions, full logging. This
  is the most heavily defended risk in the system.

**A2 — Prompt injection via ingested content.** Malicious text in a review/page/upload manipulates the
AI.
- *Impact:* corrupted extraction; attempted policy bypass.
- *Mitigation:* ingested content is *data to extract from*, never instructions (09 §4/10); extractions
  are low-tier Signals, GUARD-checked; fixed task contracts at the gateway.

**A3 — AI provider dependency / drift.** Provider outage, rate limits, or model behaviour change.
- *Impact:* degraded ingestion/drafting.
- *Mitigation:* the AI is non-load-bearing for *truth* (it only transforms) — the system degrades to
  reduced extraction/drafting, never to fabrication; provider abstraction + fallbacks; bounded tasks
  are model-portable.

**A4 — Over-reliance creep.** Engineers gradually let the AI do more than allowed.
- *Impact:* slow erosion of the trust boundary.
- *Mitigation:* the boundary is architectural (no write path), not policy; AI-boundary observability
  (11) flags over-reach; the forbid-list (10) is enforced and audited.

---

## 4. Trust risks

**Tr1 — Confidence miscalibration.** "High" doesn't actually mean accurate.
- *Impact:* the brand promise breaks; trust collapses.
- *Mitigation:* outcome-based calibration (24 §11, 22 §07); calibration monitored as a first-class
  metric (11); abstention when basis is weak.

**Tr2 — Silent fabrication under pressure.** The system "fills a gap" to give an answer.
- *Impact:* catastrophic, relationship-ending.
- *Mitigation:* abstention is a first-class, valid output (06); GUARD blocks ungrounded claims; "we
  don't know yet" is never an error to suppress.

**Tr3 — Broken auditability.** A conclusion can't be explained (lineage gap).
- *Impact:* loss of the core differentiator.
- *Mitigation:* mandatory provenance (no orphan conclusions); event log + version store as durable
  spine; lineage is a tested, queryable capability (09).

**Tr4 — Stale knowledge / undetected drift.** Knowledge becomes wrong (market shift) and keeps being
used.
- *Impact:* confidently outdated advice.
- *Mitigation:* drift detection (outcomes contradicting knowledge → review); benchmark re-derivation;
  versioned deprecation (23 §11/12); knowledge-health observability (11).

---

## 5. Scale risks

**S1 — Multi-tenant leakage.** One tenant's data exposed to another.
- *Impact:* severe privacy breach; trust destruction; legal.
- *Mitigation:* scope-enforced retrieval (not caller discipline); per-tenant encryption; physical
  isolation for sensitive data; the one-way anonymising valve for aggregates; pen-testing (08/09).

**S2 — Noisy neighbour.** One heavy tenant degrades others.
- *Impact:* unreliable service.
- *Mitigation:* per-tenant quotas/rate limits; autoscaling; sharding hot tenants (08/11).

**S3 — Cost blow-up (AI / storage).** AI calls or signal volume balloon costs.
- *Impact:* unit economics break.
- *Mitigation:* bounded/batched/cached AI (10/11); cheap append store + hot/cold tiering for signals;
  the expensive asset (knowledge) is small and shared (08).

---

## 6. Governance risks

**G1 — Knowledge corruption (bad lessons learned).** The system learns the wrong thing (overfits a loud
engagement).
- *Impact:* corrupted institutional knowledge.
- *Mitigation:* validation requires recurrence across independent contexts; human review of material
  knowledge changes; versioned + reversible (23 §11/12).

**G2 — Unaccountable human overrides.** Reviewers change conclusions without record/reason.
- *Impact:* hidden errors; lost auditability.
- *Mitigation:* mandatory-reason override logging; overrides scored against outcomes; reviewer
  calibration (09/20).

**G3 — Consent/privacy governance failure.** Network aggregation breaches consent/anonymity.
- *Impact:* privacy/legal breach; trust loss.
- *Mitigation:* consent gating; anonymisation thresholds; the one-way valve; audit of aggregation (08).

**G4 — Doctrine erosion over time.** Teams quietly compromise an invariant for speed.
- *Impact:* gradual decay into an AI wrapper/dashboard.
- *Mitigation:* the invariants are architectural (hard to bypass), audited, and observable; ADRs (13)
  document why they exist; this risk register names the slide so it's watched.

---

## 7. The risk philosophy

Three meta-principles govern risk:
1. **Degradation lowers confidence, never honesty.** Every failure mode resolves toward *abstention or
   reduced confidence*, never fabrication. The system fails *honest.*
2. **The trust boundary is architectural, not procedural.** The most dangerous risks (AI escape,
   fabrication, leakage) are defended by structure (no write path, scope-enforced retrieval, mandatory
   provenance), not by hoping people follow rules.
3. **The system observes its own correctness.** Calibration, abstention, drift, and AI-boundary
   compliance are monitored (11) — so trust risks are *detected*, not discovered by a burned client.

> The biggest risk to Growmerce is not a bug — it is quietly becoming the AI wrapper or dashboard it
> exists to replace, by eroding an invariant under deadline pressure. The architecture defends against
> this by making the invariants structural and observable, and by ensuring every failure mode fails
> toward honesty. Name the risks, defend them structurally, watch them operationally.
