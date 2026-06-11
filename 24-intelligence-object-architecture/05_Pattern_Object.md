# 05 — Pattern Object

> The software form of a Commerce Intelligence Pattern (19). A `Pattern` object is a recurring,
> diagnosable configuration of entities and Evidence, instantiated for a specific business. It is
> distinct from its **definition** (a `KnowledgeCard` of type `pattern_def`, 04): the definition is
> the reusable template; the Pattern object is a detected *instance*.

Inherits `BaseObject` (01).

---

## 1. Purpose

To represent "pattern X is present in business Y, with this evidence, at this confidence." A Pattern
object is the unit the Brain detects (RECOGNISE), scores (ASSESS), relates to other patterns
(INTERACT), and turns into Opportunities/Threats and Recommendations. It is the on-disk form of a
"finding."

---

## 2. Schema

```
Pattern extends BaseObject
  pattern_def_ref   ObjectRef    # the KnowledgeCard(pattern_def) this instantiates (04)
  pattern_key       string       # stable slug, e.g. "review_density_gap" (from 19)
  subject_ref       ObjectRef    # the Business (09) it was detected in
  scope_refs        list<ObjectRef>  # specific entities involved (Product, Channel, Offer...)
  # detection state
  status            enum         # HYPOTHESIS | OBSERVED | CONFIRMED | SURFACED | RULED_OUT | RESOLVED
  evidence_for      list<EdgeRef>    # Evidence (03) supporting, with weights
  evidence_against  list<EdgeRef>    # Evidence contradicting / counter-evidence
  counter_checks    list<{name, result}>   # the pattern_def's counter-evidence, evaluated (GUARD)
  triggers_fired    list<string>     # which detection triggers matched
  # scoring
  confidence        Confidence       # (11) computed from evidence balance + knowledge certainty
  impact            ImpactEstimate   # revenue + profit, sized (see §3)
  interactions      list<EdgeRef>    # reinforce/conflict/compound/causal edges to other Patterns
  # outputs
  opportunities     list<ObjectRef>  # Opportunity (07) objects derived
  threats           list<ObjectRef>  # Threat (08) objects derived
  # (inherited) id, provenance, version, tenant_scope, metadata
```

```
ImpactEstimate { revenue_range: money_range, profit_range: money_range,
                 recoverability: 0..1, basis: list<EdgeRef>, confidence: Confidence }
```

The `pattern_def` (in the KnowledgeCard, 04) supplies the template fields from 19:
```
PatternDef { evidence_requirements[], triggers[], counter_evidence[], common_causes[],
             quick_wins[], strategic_fixes[], operational_fixes[], required_signals[] }
```

---

## 3. Attributes (semantics)

- `pattern_def_ref` vs `Pattern`: the definition is shared library knowledge (one per pattern type);
  the Pattern object is per-business, per-detection. Many Pattern objects instantiate one def.
- `evidence_for/against` are weighted edges (03); the **balance** drives `confidence` (11) via the
  Evidence Scoring Engine (22).
- `counter_checks` materialise the def's `counter_evidence`: each must be evaluated before
  CONFIRMED (the GUARD discipline, 20). An unevaluated counter-check caps confidence at Medium.
- `impact` separates revenue and profit (the H1 doctrine, 19/23) — never a single number.
- `triggers_fired` records *why* the pattern was proposed (provenance of detection).

---

## 4. Relationships (edges, see 10)

```
Pattern --instantiates-->     KnowledgeCard(pattern_def) (04)
Pattern --detected_in-->      Business (09)
Pattern --involves-->         CommerceEntity (09)
Evidence (03) --supports/contradicts--> Pattern
Pattern --reinforces-->       Pattern     # +confidence (independent)        ┐
Pattern --conflicts_with-->   Pattern     # −confidence to weaker            │ Interaction Model
Pattern --compounds_with-->   Pattern     # forms compound finding           │ (20 §Pattern Interaction)
Pattern --causes-->           Pattern     # directed; head = intervention pt ┘
Pattern --yields-->           Opportunity (07) | Threat (08)
```

The interaction edges are how the Brain forms **compound findings** and identifies causal heads (20).

---

## 5. Lifecycle

```
HYPOTHESIS → OBSERVED → CONFIRMED → SURFACED ─┬─> RESOLVED  (fix executed, signals moved)
   │            │           │                 └─> (re-opened if signals regress)
   │            │           └─ requires: evidence sufficiency + counter-checks done + confidence ≥ floor
   └────────────┴────────────── RULED_OUT  (counter-evidence confirmed; archived as a learned negative)
```

Mirrors the pattern lifecycle of 19 (Hypothesis→Observed→Confirmed) plus runtime states (Surfaced to
client, Resolved by execution). RULED_OUT patterns are **kept** — "what's not wrong" is valuable (20)
and a learned negative feeds Knowledge (04).

---

## 6. Confidence

A Pattern's `confidence` (11) is computed, not asserted:
```
confidence = f( Σ weighted evidence_for − Σ weighted evidence_against,
                convergence(independent evidence),
                counter_checks ruled out?,
                knowledge certainty of the pattern_def,
                interaction adjustments (reinforce ↑ / conflict ↓) )
```
Subject to caps (Tier-4-only → Medium; unresolved conflict → down-band). This is the 22 scoring
engine + 20 confidence model, applied to the Pattern's edges.

---

## 7. Versioning

- A Pattern object is **mutable in confidence and status** as Evidence accrues — each material change
  is a version (12). The Evidence set at each version is preserved (you can see why confidence was X
  at time T).
- It pins the **version of the `pattern_def`** it instantiated, so a later change to the definition
  doesn't retroactively alter past findings.
- Re-detection after new evidence may create a new version or a fresh Pattern object linked via
  `supersedes`.

---

## 8. Storage considerations

- Per-business, graph-stored (edges to Evidence, Knowledge, other Patterns, Opportunities) →
  graph DB or relational+edge index, partitioned by `subject_ref`/`tenant_scope`.
- Index by `pattern_key`, `status`, `confidence.band`, `subject_ref`.
- Aggregate, anonymised pattern-frequency across businesses feeds network knowledge (04/14) — stored
  separately.

---

## 9. Retrieval considerations

- Retrieved per business: "all SURFACED/CONFIRMED patterns for business Y, by priority" → drives
  reports and recommendations.
- Retrieved with **full evidence + confidence + counter-checks** (never the bare claim) — the
  consumer must be able to see the basis (13).
- Interaction subgraphs are retrieved together (compound findings are reasoned as a unit).
- Only patterns ≥ confidence floor are retrievable for client-facing surfaces; below-floor are
  internal/watchlist (20).

---

## 10. Brain interactions (20)

- **RECOGNISE:** the Brain *creates* Pattern objects (HYPOTHESIS) when triggers fire from Evidence +
  pattern_def.
- **INTERACT:** writes interaction edges; forms compound findings; marks causal heads.
- **ASSESS / GUARD:** evaluates counter-checks, computes confidence, applies caps; promotes to
  CONFIRMED or RULES_OUT.
- **VALUE:** derives Opportunities/Threats (07/08) from confirmed Patterns.
- **LEARN:** a Pattern's resolution outcome updates the `pattern_def`'s validation and the
  effectiveness of its fixes (Knowledge, 04).

> A Pattern object is "knowledge meeting evidence in a specific business" made concrete: a definition
> (knowledge) + supporting/contradicting Evidence + computed confidence + interactions. It is the
> central diagnostic object — and every field exists so the finding can be trusted, explained, and
> acted on.
