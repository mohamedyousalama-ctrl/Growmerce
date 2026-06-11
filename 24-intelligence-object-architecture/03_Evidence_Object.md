# 03 — Evidence Object

> A `Signal` (02) that has passed verification and is trusted to influence conclusions. Evidence is
> the software form of the Supply Chain's verified, tiered, fresh evidence (22). It is the unit the
> Brain reasons over and the Evidence Scoring Engine weighs.

Inherits `BaseObject` (01).

---

## 1. Purpose

To represent a *trusted, weighted, interpretable* observation. Evidence is the bridge between raw
Signals and meaning: it carries verification status, a computed weight, freshness, and the edges that
say which Patterns/Knowledge it supports or contradicts. Conclusions are built only from Evidence,
never from raw Signals.

---

## 2. Schema

```
Evidence extends BaseObject
  signal_ref        ObjectRef    # the Signal (02) this verifies (1:1 or 1:many for composed evidence)
  subject_ref       ObjectRef    # the Commerce Entity (09) it concerns (denormalized from Signal)
  claim             string       # the interpreted statement ("payment-step drop-off is abnormal")
  raw_value         typed_value  # carried from Signal
  # trust
  source_tier       enum(1..5)   # (22) — the cap on weight
  verification      Verification # nested object (see §3)
  weight            float        # computed evidentiary weight (Evidence Scoring Engine, 22/06-of-22)
  directness        enum         # measured | derived | inferred  (factor in weight)
  freshness         Freshness    # nested object (see §3)
  independence_key  hash         # provenance-cluster id, to prevent double-counting (22)
  # interpretation
  benchmark_ref     ObjectRef?   # the Knowledge benchmark (04) used to interpret raw → claim
  polarity          enum         # supports | contradicts | neutral (relative to a target object)
  # lifecycle
  status            enum         # VERIFIED | DISPUTED | SUPERSEDED | STALE | RETRACTED
  # (inherited) id, provenance, version, confidence, tenant_scope, metadata
```

Nested value objects:
```
Verification
  status      enum     # passed | failed | partial | unverifiable
  checks      list<{name, result, detail}>   # grounding, consistency, attribution, sufficiency...
  verified_by ref      # agent | human
  verified_at timestamp

Freshness
  observed_at      timestamp
  validity_window  duration    # per signal_category (22 §02)
  decay_curve      enum        # step | linear | exponential
  current_factor   float       # 0..1, recomputed at read time
```

---

## 3. Attributes (semantics)

- `weight = f(source_tier, freshness.current_factor, directness)` — the base weight from 22's
  Evidence Scoring Engine. Tier caps it; freshness and directness lower it within the cap.
- `independence_key` groups Evidence sharing provenance, so the scoring engine counts correlated
  Evidence once (anti double-counting, 22).
- `claim` is the *interpreted* form — produced by applying a Knowledge benchmark (`benchmark_ref`,
  04) to the `raw_value`. This is the moment a number becomes meaning (23 §09).
- `polarity` is relative to a target (a Pattern, 05); the same Evidence can support one pattern and
  contradict another (recorded as separate edges).

---

## 4. Relationships (edges, see 10)

```
Evidence  --verifies-->        Signal (02)
Evidence  --about-->           CommerceEntity (09)
Evidence  --supports-->        Pattern (05) | Knowledge (04)     # weighted, polarity=supports
Evidence  --contradicts-->     Pattern (05) | Knowledge (04)     # weighted, polarity=contradicts
Evidence  --interpreted_by-->  Knowledge.benchmark (04)
Evidence  --converges_with-->  Evidence                          # independent corroboration
Evidence  --correlated_with--> Evidence                          # shared independence_key (NOT convergence)
```

The `supports`/`contradicts` edges carry `weight` and feed Pattern confidence (05, 11).

---

## 5. Lifecycle

```
VERIFIED ──> (in use) ──> SUPERSEDED   (newer Evidence for same claim)
   │                  └──> STALE        (freshness.current_factor below threshold)
   ├──> DISPUTED      (a higher-tier contradiction appeared; resolution pending)
   └──> RETRACTED     (verification later failed; kept, archived)
```

Freshness is re-evaluated at every read; an item can transition VERIFIED→STALE without a write event
(computed), but the transition is logged when it crosses the threshold. Disputes are resolved by the
Source Hierarchy (22): the higher-tier Evidence wins; the loser becomes a recorded counter-edge.

---

## 6. Confidence

Evidence carries a `confidence` (11) reflecting `weight × verification status`. But Evidence
confidence is **not** finding confidence: many pieces of Evidence combine (via `supports`/
`contradicts` edges and convergence) to produce a Pattern's confidence. Evidence is *input* to
confidence computation, governed by the rules in 11 and 22's scoring engine.

---

## 7. Versioning

- New Evidence for the same claim **supersedes** the prior (append-only); the chain is preserved.
- Re-verification, re-tiering, or freshness threshold crossings produce new `version` entries.
- The `benchmark_ref` is version-pinned: Evidence records *which version* of the interpreting
  benchmark (04) it used, so a later benchmark change doesn't silently rewrite history (12).

---

## 8. Storage considerations

- Stored alongside Signals but in a queryable, edge-rich store (graph or relational+graph index),
  since Evidence is heavily traversed (supports/contradicts/converges).
- Index by `subject_ref`, `polarity`+target, `status`, `independence_key`, freshness.
- `weight` and `freshness.current_factor` are computed/materialized for fast scoring but always
  re-derivable from inputs (no opaque stored scores — auditability).

---

## 9. Retrieval considerations

- The Brain retrieves Evidence **for a target** (e.g. "all Evidence supporting/contradicting Pattern
  X for Business Y"), scoped and status-filtered (VERIFIED, fresh).
- Retrieval returns Evidence **with its provenance and weight**, never as bare values — the consumer
  must see tier, freshness, and verification (13).
- Convergence is computed at retrieval using `independence_key` so correlated Evidence isn't
  double-counted.
- Stale/disputed Evidence is returned **flagged**, not silently dropped (the Brain may need to know
  it exists and is stale).

---

## 10. Brain interactions (20)

- **GROUND:** the Brain reads Evidence (with benchmarks, 04) to assign meaning.
- **ASSESS:** the Brain aggregates Evidence weights (converging vs. contradicting) into Pattern
  confidence (11), running counter-evidence and independence checks (22 GUARD).
- The Brain **may not assert** beyond what Evidence supports (grounding rule); if Evidence is
  insufficient/stale/contradicted, confidence is capped or the Brain abstains.
- Belief-vs-data: when low-tier Evidence (e.g. a Tier-4 user claim) is contradicted by high-tier
  Evidence, the Brain emits the gap as its own object (often a Pattern/Opportunity), per 22.

> Evidence is the first object in the system permitted to *mean* something — and even then only with
> its tier, weight, freshness, and verification attached. That attachment is the architecture's
> promise that meaning never outruns proof.
