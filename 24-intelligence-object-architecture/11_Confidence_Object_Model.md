# 11 — Confidence Object Model

> Confidence is a **first-class value object**, attached to every intelligence object (Evidence,
> Pattern, Opportunity, Threat, Recommendation) and to inferred edges. It is the schema form of the
> Brain's four-band Confidence Model (20) and the Supply Chain's computed confidence (22). It is never
> a bare number — it is a structured, explainable, recomputable object.

---

## 1. Purpose

To make "how sure are we" a uniform, auditable, recomputable property across the whole system — so
every conclusion carries its certainty *and its basis*, and so the honesty doctrine (21/22/23 §13) is
enforced structurally rather than by convention.

---

## 2. Schema

```
Confidence (value object)
  band            enum     # very_high | high | medium | low   (20)
  score           float    # 0..100, maps to band
  basis           ConfidenceBasis    # the decomposition that produced it (see §3)
  computed_at     timestamp
  inputs_version  hash     # fingerprint of the evidence/knowledge versions used (recompute key)
  caps_applied    list<enum>   # which caps fired (tier_cap | unverified_cap | conflict_cap | context_cap)
  abstained       bool     # true ⇒ "we can't determine yet" (below surfacing or coverage gap)
  what_would_change text   # the missing evidence/knowledge that would move it (13/23 §13)
```

```
ConfidenceBasis
  evidence_strength   float   # from tiers + verification (22)
  convergence         float   # independent corroboration count/quality
  counter_evidence    enum    # ruled_out | checked | unchecked | partially_present
  context_fit         enum    # strong | neutral | weak
  knowledge_certainty enum    # certainty of the knowledge applied (04)
  track_record        float   # historical accuracy of this conclusion type (learning loop, 20)
  ambiguity_penalty   float   # staleness / noise / unresolved conflict
```

---

## 3. Attributes (semantics)

- `score`/`band` are **computed** from `basis`, never set directly. The decomposition is stored so any
  consumer can see *why* the confidence is what it is (no black-box scores — auditability).
- `caps_applied` records the hard caps from the Source Hierarchy (22 §03) and GUARD (20): Tier-4/5-only
  → max Medium; unverified → capped; unresolved conflict / missing context → down-band. Caps override
  the computed score.
- `abstained = true` is a valid, first-class output ("we don't know yet") — not a failure (20/23 §13).
- `what_would_change` turns uncertainty into a next step (the honesty-as-funnel mechanic, 21).
- `inputs_version` lets the system **detect when confidence is stale** (its inputs changed) and
  recompute.

---

## 4. Relationships

- Confidence is **embedded** in its parent object (not a separate node), but its `basis` references the
  Evidence/Knowledge edges that produced it (so it's traceable into the graph, 10).
- The band maps to the narrative trust-language registers (21) and the visual confidence language (03)
  at presentation — but those are downstream; the object itself is presentation-agnostic.

---

## 5. Lifecycle

Confidence is **recomputed**, not edited. It is re-derived whenever its inputs change (new Evidence,
re-tiering, freshness decay, knowledge version change, new counter-check). Each recomputation is a new
value with a new `computed_at`/`inputs_version`; the parent object's version (12) captures the change.

```
inputs change → recompute → new Confidence value → parent object version++
```

---

## 6. Confidence of confidence (calibration)

The `track_record` factor is itself learned: as outcomes confirm or contradict past conclusions (the
learning loop, 20), the mapping from `basis` to `score` is **calibrated** — so a "High" actually means
~the historical accuracy of Highs. This calibration is governed by the Output Accuracy Framework (22
§07) and the Knowledge Quality Framework (23 §12). Calibration data is itself versioned.

---

## 7. Versioning

- Confidence values are append-only with their parent's version history — you can see the confidence
  *at every point in the object's life* and what evidence justified it then.
- The **band-movement conditions** (20: exact rules to move between bands) are themselves versioned
  configuration, so changes to the confidence policy are auditable.

---

## 8. Storage considerations

- Embedded in the parent object's record; `basis` stored alongside for explainability.
- `inputs_version` indexed to support staleness sweeps ("which confidences are based on now-changed
  inputs?").
- Cheap to recompute by design (the basis factors are materialised from edges) — so confidence is
  never trusted as a stale stored number.

---

## 9. Retrieval considerations

- Confidence is **always retrieved with its object** — there is no path that returns a conclusion
  without its confidence (a retrieval invariant, 13).
- On retrieval, freshness is checked: if `inputs_version` no longer matches current inputs, confidence
  is recomputed (or flagged stale) before use.
- Below-floor / abstained confidences gate client-facing retrieval (only ≥ Medium surface, 20/22).

---

## 10. Brain interactions (20)

- **ASSESS:** the Brain computes Confidence from the evidence/knowledge graph for every Pattern/
  Opportunity/Threat/Recommendation.
- **GUARD:** applies caps and the band-movement rules; sets `abstained` when warranted.
- **LEARN:** calibrates the basis→score mapping from outcomes.
- Confidence is the Brain's honesty made structural: the Brain *cannot* express more confidence than
  the basis supports, because the score is derived from the basis, capped by tier, and recomputed when
  inputs change.

> The Confidence object is where the entire trust doctrine becomes enforceable code: a decomposable,
> capped, recomputable, calibrated value attached to every conclusion, carrying its own basis and the
> honest statement of what would change it. It is the difference between "the AI is 92% sure" and "here
> is exactly why we are this sure, and what would make us surer."
