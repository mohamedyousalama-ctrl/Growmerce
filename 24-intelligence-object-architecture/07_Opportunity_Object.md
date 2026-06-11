# 07 — Opportunity Object

> A configuration where value can be **gained**. An `Opportunity` is derived from one or more
> confirmed Patterns (05) and represents upside — sized, prioritised, and ready to become
> Recommendations (06). It is the "value" half of the Brain's VALUE stage (20); `Threat` (08) is the
> downside half.

Inherits `BaseObject` (01).

---

## 1. Purpose

To represent "here is value the business can capture, of this size, at this confidence, fixable with
this effort." Opportunities decouple *the upside* (a durable, rankable thing) from *the action*
(Recommendations), so the same opportunity can be addressed by alternative recommendations and
tracked over time (the retention/opportunity-tracking concept).

---

## 2. Schema

```
Opportunity extends BaseObject
  subject_ref     ObjectRef        # the Business (09)
  derived_from    list<EdgeRef>    # the Pattern(s) (05) that reveal it (compound = several)
  title           string
  description     text             # the upside, in operator terms
  scope_refs      list<ObjectRef>  # entities involved (Product, Channel, Offer...)
  value           ValueEstimate    # revenue + profit upside (separated), ranges
  confidence      Confidence       # (11) inherited from the source pattern(s) (weakest-link for compounds)
  recoverability  float            # 0..1 — how much of the value is realistically capturable
  speed           enum             # how fast value arrives (days|weeks|quarter)
  ease            enum             # execution ease
  resources       enum             # cost to capture
  priority        Priority         # ranking output (band+score) — see Recommendation §3 / 20
  is_compound     bool             # formed from multiple interacting patterns
  status          enum             # IDENTIFIED | SURFACED | ADDRESSED | CAPTURED | EXPIRED | DISMISSED
  recommendations list<ObjectRef>  # Recommendation (06) objects addressing it
  # (inherited) id, provenance, version, tenant_scope, metadata
```

```
ValueEstimate { revenue_range: money_range, profit_range: money_range, basis: list<EdgeRef>,
                assumptions[], confidence: Confidence }
```

---

## 3. Attributes (semantics)

- `value` separates revenue and profit upside (H1). Ranges with stated `assumptions`, never false
  precision (22/23).
- `priority.score ≈ (revenue+profit value) × speed × ease × confidence ÷ resources`, then operator
  re-ordering (20 Opportunity Ranking).
- `is_compound`: a compound Opportunity uses combined impact of its patterns and the **weakest
  necessary component's confidence** (a chain is as strong as its weakest link, 20).
- Decoupled from Recommendations: the Opportunity persists even as different recommendations are tried
  against it; it is `CAPTURED` only when outcomes confirm the value was realised.

---

## 4. Relationships (edges, see 10)

```
Opportunity --derived_from--> Pattern (05)
Opportunity --about-->        CommerceEntity (09)
Opportunity --addressed_by--> Recommendation (06)
Opportunity --competes_with-> Opportunity   # for shared resources/sequencing (prioritisation)
Opportunity --part_of-->      Plan
```

---

## 5. Lifecycle

```
IDENTIFIED → SURFACED → ADDRESSED → CAPTURED  (outcome confirms value realised)
   │                                 └─ or EXPIRED (window closed, esp. occasion-driven)
   └──> DISMISSED (declined / out of scope)
```

Occasion-driven opportunities (07-domain knowledge) carry an implicit window and can `EXPIRE`;
`CAPTURED` requires outcome confirmation (the success_measure of its Recommendations, 06).

---

## 6. Confidence

`confidence` (11) flows from the source Pattern(s); for compounds, the weakest necessary component
governs. An Opportunity below the confidence floor is internal/watchlist, not surfaced (20).

---

## 7. Versioning

- Versioned as `value`/`priority`/`status` change with new evidence; pins the source Pattern versions.
- `CAPTURED`/`EXPIRED` are terminal additions; the value-realised record is append-only and feeds
  Knowledge (did opportunities of this type pay off?).

---

## 8. Storage considerations

- Per-business; part of the `Plan` aggregate alongside Threats and Recommendations.
- Index by `subject_ref`, `status`, `priority.band`, `is_compound`.
- Aggregate opportunity types/outcomes (anonymised) feed network knowledge (value benchmarks).

---

## 9. Retrieval considerations

- Retrieved with Threats into one **prioritised plan** (a common urgency-adjusted scale, 20).
- Carries its source patterns, value basis, and confidence (never a bare "opportunity").
- Compound opportunities retrieved with their constituent pattern subgraph.

---

## 10. Brain interactions (20)

- **VALUE:** the Brain *creates* Opportunities from confirmed Patterns, sizing and ranking them.
- **DECIDE:** generates Recommendations addressing them.
- **LEARN:** capture/expiry outcomes calibrate the value-estimation knowledge (were our sizings
  right?) — improving future `ValueEstimate` accuracy (07 accuracy framework, 22).

> The Opportunity object makes upside a first-class, trackable, rankable thing — decoupled from the
> action — so Growmerce can prioritise across a business's whole opportunity set and prove, via
> outcomes, which value it actually captured.
