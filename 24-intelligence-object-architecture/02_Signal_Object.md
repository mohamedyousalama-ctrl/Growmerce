# 02 — Signal Object

> The atomic input of the intelligence system. A `Signal` is a single raw observation of a commerce
> entity's state. It is the software form of the Signal concept from the Supply Chain (22) and the
> Signal Taxonomy. Everything the system concludes is ultimately derived from Signals.

Inherits `BaseObject` (01). All ten facets follow.

---

## 1. Purpose

To record one observation — "this Product's stock is 0", "this listing's CTR is 1.1%" — with enough
metadata (source, tier, freshness, capture method) that it can be verified into Evidence (03) and
traced as provenance. A Signal is *raw*: it is what was observed, not yet what is trusted or what it
means.

---

## 2. Schema

```
Signal extends BaseObject
  # identity / typing
  signal_category   enum     # from the Signal Taxonomy (22): marketplace | pricing | offer |
                             #   competitor | customer | review | menu | product | operational |
                             #   traffic | conversion | retention | occasion | geographic |
                             #   behavioral | execution
  # the observation
  subject_ref       ObjectRef    # the Commerce Entity (09) this observes (Product, Channel, ...)
  attribute         string       # which entity-state attribute (e.g. "stock", "ctr", "rank")
  value             typed_value  # the observed value (number | money | rate | text | enum | ...)
  unit              enum?        # currency, %, count, days — explicit, never implied
  observed_window   timerange?   # the period the value pertains to (a day, a week)
  # trust metadata
  source_ref        ref          # the Source object (integration | upload | url | screenshot | input)
  source_tier       enum(1..5)   # (22) capture-time tier
  capture_method    enum         # api | export | ocr | parse | scrape | user_input | computed
  capture_confidence float       # 0..1 confidence that capture itself was correct (OCR/parse risk)
  observed_at       timestamp    # when the fact was true
  captured_at       timestamp    # when we acquired it
  # lifecycle
  status            enum         # CAPTURED | NORMALIZED | CLASSIFIED | VERIFIED | REJECTED | STALE
  # (inherited) id, provenance, version, confidence?, tenant_scope, metadata
```

Note: a raw Signal may carry a *provisional* `confidence` reflecting capture quality, but its
**evidentiary** confidence is only assigned when it becomes Evidence (03).

---

## 3. Attributes (semantics)

- `subject_ref` + `attribute` + `value` + `unit` together are the observation; none is meaningful
  alone (a `value` with no `unit` is invalid — a hard schema rule, preventing unit/currency errors).
- `source_tier` is assigned at capture and **caps downstream influence** (22 §03); it is not
  editable after the fact except by verification re-tiering.
- `capture_confidence` is distinct from evidentiary confidence: it measures "did we read it right?"
  (an OCR'd screenshot has low `capture_confidence` even if its source were high-tier).
- `observed_at` vs `captured_at` enables freshness/decay (03, 11).

---

## 4. Relationships (edges, see 10)

```
Signal  --observes-->        CommerceEntity (09)        # what it's about
Signal  --from-->            Source                     # where it came from
Signal  --verified_into-->   Evidence (03)              # its promoted form
Signal  --duplicate_of-->    Signal                     # entity/observation resolution
Signal  --contradicts-->     Signal                     # conflicting observations (resolved in 03/11)
Signal  --derived_from-->    Signal | Entity            # for computed signals
```

A Signal that is the *outcome* of a Recommendation (06) also carries `--outcome_of--> Recommendation`,
closing the learning loop (this is the `execution` category).

---

## 5. Lifecycle

```
CAPTURED → NORMALIZED → CLASSIFIED → VERIFIED ──> (becomes Evidence 03)
   │            │            │           │
   │            │            │           └─ REJECTED   (failed verification — kept, archived)
   └────────────┴────────────┴─────────── STALE        (past freshness window; eligible for refresh)
```

Maps directly to Supply-Chain stages 2–5 (22 §01): Collection→Verification→Normalization→
Classification. A Signal is never deleted; rejected/stale Signals are retained for audit and for
absence-as-evidence reasoning (22).

---

## 6. Confidence

A Signal's standing is governed by two numbers, both feeding the Evidence/Confidence model (03, 11):
- `capture_confidence` (0..1) — fidelity of capture.
- `source_tier` (1..5) — origin trust ceiling.
A Signal does not, by itself, assert a *finding-level* confidence; it contributes weight to Evidence,
which is where evidentiary confidence is computed.

---

## 7. Versioning

- Signals are largely **immutable observations** — a new observation is a *new* Signal, not an edit.
- What versions is the Signal's **status** and **classification/tier corrections** (e.g. verification
  re-tiers a screenshot from provisional to confirmed). These transitions are recorded in `version`
  (12), append-only.
- A correction to a mis-captured value is a new Signal `--supersedes-->` the old; the old is archived.

---

## 8. Storage considerations

- **High volume, append-heavy, immutable** → a time-series / append-only store keyed by
  `(subject_ref, attribute, observed_at)`; partition by `tenant_scope` and time.
- Index by `subject_ref`, `signal_category`, `observed_at`, `source_tier` for retrieval and freshness
  sweeps.
- Raw artifacts (the screenshot/file behind a Signal) are stored by reference (`source_ref`), not
  inline.
- Retain indefinitely (archive cold) — Signals are the provenance bedrock; deleting them breaks audit.

---

## 9. Retrieval considerations

- The Brain rarely retrieves raw Signals directly; it retrieves **Evidence** (03). Signals are
  retrieved for: verification, provenance walks, freshness checks, and absence checks ("is there a
  Signal for X?").
- Retrieval is always **scoped** (`tenant_scope`) and **filtered by status** (e.g. only VERIFIED for
  reasoning).
- Freshness is enforced at retrieval: STALE Signals are flagged, not silently used (13).

---

## 10. Brain interactions (20)

- **SENSE / GROUND:** the Brain (via the Supply Chain) *writes* Signals on observation and reads them
  for verification.
- The Brain **never treats a Signal as a conclusion** — a Signal is an input, not a finding (enforces
  "a signal is a rumour; convergence is a finding", 20 H4 / 22).
- Signals that contradict are surfaced to the Brain's conflict handling (resolved by tier in 03/11),
  never averaged.
- Outcome Signals (execution category) are read by the LEARN stage to update Knowledge (04).

> The Signal is deliberately humble: it asserts nothing, it only records. That humility is the
> foundation of the whole system's trustworthiness — every confident conclusion stands on a stack of
> honest, provenance-tagged Signals.
