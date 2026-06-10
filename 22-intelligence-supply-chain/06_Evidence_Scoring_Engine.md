# 06 — Evidence Scoring Engine

> The machinery that turns verified signals into weighted evidence, weighted evidence into
> confidence, and confidence into recommendations. This is stage 8 of the supply chain and the
> quantitative heart of output accuracy. It connects directly to the Intelligence Brain's Confidence
> & Trust Model (20) — the Brain *defines* the confidence bands; this engine *computes* the inputs
> to them from the supply chain's tiered, verified evidence.

---

## 1. What the engine does

```
verified signals (tiered, fresh, classified)
   → weight each piece of evidence
   → combine evidence for/against each pattern
   → resolve contradictions
   → produce a confidence score per finding
   → confidence + value/severity → prioritised recommendations
```

Every number is **explainable** — each score decomposes into named factors a customer (or an
auditor) can follow. There are no black-box weights; that explainability is itself a trust asset.

---

## 2. How evidence receives weight (base weight)

Each piece of evidence starts with a **base weight** from three factors:

```
base_weight = tier_factor × recency_factor × directness_factor
```

| Factor | Meaning | Range |
|---|---|---|
| **tier_factor** | source tier (03) — Tier 1 strongest, Tier 5 weakest | high → low |
| **recency_factor** | freshness within the signal's validity window (02) | fresh → stale (decays) |
| **directness_factor** | how directly it measures the claim (measured > derived > inferred) | direct → indirect |

So a fresh, Tier-1, directly-measuring signal carries maximal weight; a stale, Tier-4, inferred one
carries minimal weight. **Tier sets the ceiling**; recency and directness can only lower the
effective weight within that ceiling (Hierarchy R4/R7, 03).

---

## 3. How evidence gains weight

Weight (and the confidence it produces) increases when:

- **Convergence (independent):** multiple *independent* signals point to the same pattern. This is
  the single biggest confidence multiplier (Brain heuristic H4) — *one signal is a rumour, three
  agreeing are a finding.* **Independence is required** — correlated signals from one source don't
  count (anti double-counting).
- **Tier confirmation:** a hypothesis raised by a low tier is confirmed by a higher tier (e.g. a
  founder's claim verified by order data). The conclusion inherits the higher tier's strength.
- **Counter-evidence ruled out:** the pattern's innocent explanations (19's Counter Evidence) were
  checked and found absent — this *raises* confidence (GUARD G3, 20).
- **Track record:** the pattern's detection logic has predicted correctly before (the learning loop,
  20) — a calibrated, earned boost.
- **Cross-tier agreement:** signals at different tiers agreeing is stronger than agreement within
  one tier (Hierarchy R6).

---

## 4. How evidence loses weight

Weight decreases (and can go negative) when:

- **Staleness:** beyond its freshness window, evidence decays toward irrelevance.
- **Low tier alone:** Tier 4–5 evidence with no higher-tier support is capped low and **cannot lift
  a finding above Medium** (R4).
- **Contradiction:** a higher-tier signal disagrees → the lower-tier evidence is down-weighted or
  becomes a counter-signal (R1).
- **Counter-evidence present:** an innocent explanation is plausibly true → confidence is capped
  (often at Medium) until ruled out.
- **Unverifiable:** capped at Tier 4 until verified (R5); detail doesn't earn weight.
- **Single-source / correlated:** no independent corroboration → no convergence bonus; may incur an
  ambiguity penalty.

---

## 5. How multiple signals combine

Evidence for a pattern is aggregated as a **weighted balance of support vs. counter-evidence**, with
convergence treated specially:

```
support      = Σ (weight of independent signals supporting the pattern, with convergence bonus)
counter      = Σ (weight of signals against the pattern + unruled counter-evidence)
net_support  = support − counter
```

Key rules in the combination:
- **Convergence bonus** applies only to *independent* supporting signals (not to re-counted
  correlated ones).
- **Counter-evidence subtracts** — contradictions and unruled innocent explanations actively lower
  net support (the system argues against itself, 05).
- **Diminishing returns:** the fifth corroborating Tier-4 anecdote adds little; a single Tier-1
  confirmation adds a lot. Weight is about *kind and independence*, not count.

---

## 6. How contradictory evidence works

Contradictions are not averaged; they are *resolved* (05, Hierarchy R1) then scored:
1. Identify the conflicting signals on the same fact.
2. The higher-tier/precedence signal sets the direction; the loser becomes counter-evidence
   (subtracts).
3. If the conflict is genuinely unresolved (comparable strength), **confidence is reduced** and the
   conflict is disclosed — never hidden.
4. A belief-vs-data contradiction may itself become a separate finding.

This is why contradictory evidence *lowers* confidence honestly rather than producing a falsely
tidy answer.

---

## 7. How evidence becomes confidence

`net_support`, together with the sufficiency rules, maps to the Brain's four confidence bands (20):

| Confidence band | Requires |
|---|---|
| **Very High (85–100)** | strong net support + ≥1 Tier-1/2 signal + ≥2 independent converging signals + counter-evidence ruled out + fresh + context-fit |
| **High (70–84)** | strong net support + (≥1 Tier-1/2 **or** ≥3 converging Tier-2/3) + counter-evidence checked |
| **Medium (50–69)** | moderate net support + ≥2 converging signals + counter-evidence considered |
| **Low (<50)** | thin/single-source/Tier 4–5 only — not surfaced as a finding |

**Hard caps (from the hierarchy):** Tier 4–5-only evidence → max Medium (R4). Unverified inputs →
capped (R5). Unresolved contradiction or missing required context → down-banded.

Confidence is **asymmetric** (Brain, 20): hard to raise (needs accumulating, independent,
higher-tier, counter-checked evidence), easy to lower (one higher-tier contradiction, staleness, or
an unruled counter-explanation drops it). The engine is designed to be *sceptical by default.*

---

## 8. How confidence becomes recommendations

Confidence is one input to prioritisation (the Brain's Scoring & Ranking, 20):

```
recommendation priority ≈ (value or severity) × confidence × recoverability ÷ resources,
   then sequenced by: stop active bleeds → dependencies → one quick trust-win → compounding
```

- **Confidence multiplies:** a huge-but-uncertain opportunity correctly ranks below a
  modest-but-certain one. Low-confidence findings become "cheap tests that also confirm," not
  commands.
- **Recommendations must trace to a finding and a validated fix (19)** — the engine never invents
  advice (GUARD, 20). No fabricated certainty, no guarantees (21).
- Every recommendation carries its **confidence and evidence** into delivery (stage 12).

---

## 9. Worked example (condensed)

Pattern: *Review Density Gap* on a marketplace listing.
- Signal A: recent review velocity stalled — Tier 2, fresh, direct → high weight.
- Signal B: rank declining over 8 weeks — Tier 2, fresh, direct, *independent* of A → convergence
  bonus.
- Signal C: a competitor's recent-review advantage — Tier 3, fresh → supporting.
- Counter-evidence checked: "rank stable despite low recency?" → false (rank *is* falling) → ruled
  out → confidence boost.
- Tier-1/2 present (A, B), ≥2 independent converging signals, counter-evidence ruled out, fresh →
  **Very High confidence.**
- Recommendation: review-velocity engine (a validated fix, 19), high priority (fast, high
  recoverability), delivered with its evidence and confidence.

---

## 10. Why this is defensible (and hard to copy)

The engine's outputs are **explainable, tier-disciplined, convergence-aware, and counter-checked** —
the opposite of a black-box score. A customer asking "why are you confident?" gets a decomposable
answer: these signals, at these tiers, independently agreeing, with the innocent explanations ruled
out. Replicating this requires the *whole* upstream supply chain (taxonomy, tiers, verification) —
which is why an AI wrapper that skips to "the model is 92% confident" cannot match it. (See
`07_Output_Accuracy_Framework.md` and `10_Competitive_Advantage_of_the_Supply_Chain.md`.)
