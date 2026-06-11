# 08 — Intelligence Failure Modes

> Critical. An intelligence system earns trust by knowing exactly how it can fail and having a
> defence for each failure. This document catalogues every way Growmerce's intelligence can be
> wrong, and for each: **how it's detected, how it's mitigated, and how the system recovers.**

A credit bureau or risk firm survives by anticipating its own failure modes. This is Growmerce's
failure catalogue — the inverse of the accuracy framework (07): each failure is a factor degrading,
and each defence is a supply-chain control.

---

## Format
For each: **what it is · detection · mitigation · recovery.**

---

## A. Data failures (the inputs are bad)

### 1. Missing data
- **What:** a signal category needed for a conclusion is absent (no cost data → can't judge profit).
- **Detection:** coverage tracking (04) flags absent required signals (05).
- **Mitigation:** abstain or down-band; surface the gap and what would fill it ("we can't assess
  profit without cost data"); never assume the missing value.
- **Recovery:** acquire the missing signal (climb the acquisition ladder); upgrade the finding when
  it arrives.

### 2. Wrong data
- **What:** a signal is factually incorrect or mis-attributed (a competitor's number logged as the
  client's).
- **Detection:** cross-signal consistency checks; entity-resolution confidence; tier/verification
  (05).
- **Mitigation:** verification before influence; mis-attributed data is rejected or re-tiered.
- **Recovery:** correct the record (provenance is versioned); re-run affected findings; log the
  cause to harden the check.

### 3. Outdated data
- **What:** a once-true signal is now stale (old price, old rank, pre-change funnel).
- **Detection:** freshness windows per signal (02); recency factor in scoring (06).
- **Mitigation:** decay weight with staleness; flag stale-but-load-bearing evidence; freshness check
  at delivery (12).
- **Recovery:** re-acquire current data; recompute; note the change.

### 4. Biased data
- **What:** the sample is skewed (self-selected reviews, vocal-minority complaints, a cherry-picked
  good day).
- **Detection:** sample/selection-bias watch; comparison to expected distributions; independence
  checks.
- **Mitigation:** weight for representativeness; seek disconfirming evidence; don't generalise from a
  skewed sample.
- **Recovery:** broaden the sample; re-score; record the bias pattern.

### 5. Sparse data / low sample size
- **What:** too little evidence to conclude (a new listing, a tiny cohort, one week of data).
- **Detection:** sufficiency thresholds (06); sample-size checks.
- **Mitigation:** cap confidence (often Medium); frame as "early signal"; offer the test that would
  confirm.
- **Recovery:** accumulate more data over time; upgrade when sufficient.

---

## B. Reasoning failures (the inputs are fine but the inference is wrong)

### 6. Misleading patterns
- **What:** a pattern *appears* present but the situation is an exception (a deliberate loss-leader
  read as a profit leak).
- **Detection:** mandatory counter-evidence checks (each pattern's innocent explanations, 19/20).
- **Mitigation:** rule out counter-evidence before concluding; context gate (does it fit this
  business?).
- **Recovery:** if counter-evidence later appears, retract/down-band; record to refine the pattern's
  detection.

### 7. False correlations
- **What:** two things move together by coincidence or a shared cause, mistaken for a real
  relationship ("sales rose after X, so X works").
- **Detection:** independence checks; demand for a *mechanism* (the pattern's root cause), not just
  co-movement; trajectory/repeat over one-off.
- **Mitigation:** treat correlation as a hypothesis, not a conclusion; require corroboration and a
  plausible causal pathway; where possible, an act-to-learn test.
- **Recovery:** test; if it doesn't replicate, discard and log.

### 8. Double-counting (correlated signals as convergence)
- **What:** several signals derived from one source counted as independent corroboration, inflating
  confidence.
- **Detection:** shared-provenance/independence checks in scoring (06).
- **Mitigation:** count correlated signals once; convergence bonus only for independent sources.
- **Recovery:** re-score affected findings; tighten the independence check.

---

## C. Extraction & system failures (the machinery errs)

### 9. AI extraction mistakes
- **What:** the AI mis-reads a screenshot/PDF/review/URL (wrong number, wrong field, invented
  detail).
- **Detection:** extraction outputs treated as *claims about the source*, re-checked against it;
  plausibility/consistency checks; tier cap on unverified extraction (05).
- **Mitigation:** verify before use; flag low-confidence extractions for human review; never let an
  unverified extraction drive a high-stakes conclusion.
- **Recovery:** re-extract/confirm; correct downstream; log the error type to improve extraction.

### 10. Hallucination (asserting the ungrounded)
- **What:** stating a "fact" or finding with no supporting signal.
- **Detection:** grounding gate — every claim must trace to a logged signal (GUARD G1, 20).
- **Mitigation:** no provenance → cannot ship; AI inference is Tier 5 and labelled; abstention
  allowed.
- **Recovery:** strip/kill the ungrounded claim; the rest of the report is unaffected (each finding
  stands on its own provenance).

### 11. Mis-classification / normalization errors
- **What:** wrong signal type, tier, unit, currency, or entity link.
- **Detection:** schema validation; tier-assignment rules; unit/currency/time checks (stages 4–5).
- **Mitigation:** canonical schemas; deterministic entity resolution with confidence; reject
  ambiguous mappings.
- **Recovery:** re-classify; recompute; harden the rule.

---

## D. External failures (the world changes)

### 12. Market shifts
- **What:** the environment changes (a platform algorithm/policy/fee change, a demand shock, a new
  competitor) so prior intelligence is suddenly less valid.
- **Detection:** trajectory monitoring; drift detection on previously-reliable patterns (20);
  freshness checks.
- **Mitigation:** flag affected conclusions; lower confidence on time-sensitive findings; re-acquire
  current data.
- **Recovery:** re-run with fresh data; update patterns/benchmarks; record the shift (it's itself
  intelligence).

### 13. Human input errors
- **What:** the user enters something wrong (typo, wrong figure, mis-selected option).
- **Detection:** consistency checks against other signals; sanity/plausibility ranges; tier (user
  input is Tier 4, never authoritative over data).
- **Mitigation:** confirm anomalous inputs ("that figure looks unusual — confirm?"); never let a
  lone Tier-4 input override Tier 1–2.
- **Recovery:** correct on confirmation; re-score.

### 14. Reviewer / human-override errors
- **What:** a human reviewer is wrong (mis-calibrated override, rubber-stamp, or over-correction).
- **Detection:** overrides are reasoned, logged, and scored against outcomes (20's Human Override);
  reviewer calibration tracked.
- **Mitigation:** tiered review; require evidence-based reasons; track chronically-miscalibrated
  reviewers.
- **Recovery:** outcome data corrects the record; recalibrate the reviewer and the gate.

---

## The meta-defences (cut across all failure modes)

1. **Provenance everywhere** — any wrong conclusion is traceable to its cause and correctable.
2. **Tier discipline** — weak/unverified sources can't drive conclusions, neutralising whole classes
   of failure.
3. **Mandatory counter-evidence + abstention** — the system argues against itself and is allowed to
   say "we don't know."
4. **Closed-loop learning** — every failure that's caught is logged and used to harden the relevant
   control (recurring failures tighten the gate that should have caught them).

> An intelligence system that can list its failure modes and show a detection-mitigation-recovery
> path for each is, by definition, more trustworthy than one that claims it doesn't fail. This
> catalogue is not an admission of weakness — it is the proof of rigour. The system is designed
> assuming things *will* go wrong, and to catch and recover when they do.
