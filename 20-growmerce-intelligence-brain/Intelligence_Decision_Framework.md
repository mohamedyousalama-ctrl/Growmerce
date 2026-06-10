# Intelligence Decision Framework

> How Growmerce reaches each kind of conclusion. The Intelligence OS defines the *pipeline*;
> this document defines the *decision templates* that run on it — the explicit reasoning chain
> for each core question, so a conclusion is reproducible, not improvised.

Every decision template has the same shape (a "reasoning chain"), instantiated per question:

```
TRIGGER → GATHER → GROUND → RECOGNISE → CORROBORATE → COUNTER-CHECK → SCORE → CONCLUDE → SEQUENCE
```

- **Trigger:** what makes the brain even ask this question.
- **Gather:** which signals to pull.
- **Ground:** tier the evidence (Signal & Evidence Hierarchy).
- **Recognise:** which pattern domain (19) this resolves to.
- **Corroborate:** find the second/third converging signal (heuristic H4).
- **Counter-check:** run the innocent explanations (heuristic H5).
- **Score:** confidence (Trust Model) and value/severity (Ranking / Threat).
- **Conclude:** only if it clears the floors; else park as watchlist.
- **Sequence:** place in the prioritised plan by dependency (H7).

---

## DT-1 — How do we determine a sales (revenue) leak?

| Step | Logic |
|---|---|
| Trigger | Revenue flat/declining, OR a funnel/availability anomaly, OR demand-vs-capture gap |
| Gather | Category demand, impressions/rank, funnel step conversion, hero-SKU availability, channel mix |
| Ground | Prefer transaction + analytics (Tier 3) over self-report |
| Recognise | Revenue Leak / Conversion / Marketplace patterns (19) |
| Corroborate | e.g. discovery leak = high category demand + low impression share + low organic session share (3 signals) |
| Counter-check | Is demand actually thin? Is the leak conversion not discovery? Is traffic low-intent? |
| Score | Confidence per Trust Model; value = recoverable revenue |
| Conclude | Name the *mechanism* (e.g. "Demand Exists But Discovery Fails"), never "low sales" |
| Sequence | Fix upstream leaks (discovery/availability) before downstream (conversion) |

Full treatment: `Revenue_Leakage_Intelligence.md`.

## DT-2 — How do we determine a profit (margin) leak?

| Step | Logic |
|---|---|
| Trigger | Margin trend down while revenue flat/up; "busy but not making money" |
| Gather | Fully-loaded contribution per SKU, discount penetration & incrementality, returns cost, shipping/fees |
| Ground | Finance/cost data (Tier 3) outweighs gross-margin assumptions |
| Recognise | Profit Leak / Pricing patterns (19) |
| Corroborate | e.g. discount bleed = high discount penetration + low measured incrementality + falling blended margin |
| Counter-check | Is the discount genuinely incremental? Is "negative" margin mis-allocated overhead? |
| Score | Confidence; value = margin recoverable |
| Conclude | Name the mechanism (e.g. "Products That Lose Money After True Costs") |
| Sequence | Stop active bleeds before chasing new margin |

Full treatment: `Profit_Leakage_Intelligence.md`.

## DT-3 — How do we identify growth opportunities?

| Step | Logic |
|---|---|
| Trigger | Headroom signals — unmet demand, untapped channel, WTP spread, missing tier/occasion |
| Gather | Demand vs presence, customer-channel data, price/WTP distribution, occasion calendar |
| Recognise | Channel / Offer / Pricing / Occasion patterns (19) |
| Corroborate | Opportunity is real only if demand evidence + feasible path both exist |
| Counter-check | Is the demand real or assumed? Can the business actually serve it profitably? |
| Score | Opportunity Ranking Framework (impact × speed × ease × confidence ÷ resources) |
| Conclude | A named, sized, sequenced opportunity — not "grow more" |
| Sequence | By ranking + dependency + compounding (H9) |

## DT-4 — How do we identify competitor threats?

→ `Risk_and_Threat_Framework.md` (DT for each threat type). Core logic: detect *trajectory*,
not snapshot — a competitor compounding organic equity is a threat even while currently behind.

## DT-5 — How do we identify pricing problems?

| Step | Logic |
|---|---|
| Trigger | Price objections inconsistent with market position; margin pressure; commodity framing |
| Gather | Price vs value attributes, anchoring/tiering presence, objection language, WTP spread |
| Recognise | Pricing patterns (19): value-communication, anchorless, single-price-for-mixed-WTP |
| Corroborate | Objection data + competitive value position + messaging audit |
| Counter-check | Is it genuinely a price-elasticity issue, not a communication one? |
| Conclude | The specific pricing *mechanism*, not "prices wrong" |

## DT-6 — How do we identify occasion opportunities?

Core logic: map historical demand curves to upcoming occasions; the opportunity is the gap
between **demand onset** and **readiness** (stock/creative/offer/experience). Timing-weighted:
value decays as the occasion approaches. → Occasion patterns (19).

## DT-7 — How do we identify channel opportunities?

Core logic: compare *where customers actually discover/buy* against *where effort goes*;
opportunity = high customer presence + low investment. Also: create-vs-capture imbalance, and
concentration that should be diversified. → Channel patterns (19).

## DT-8 — How do we identify marketplace weaknesses?

Core logic: decompose marketplace performance into **discovery (rank/impressions)**, **click
(thumbnail economics)**, **conversion (listing/page)**, and **durability (earned vs rented
rank)**; the weakness is the weakest stage relative to benchmark. → Marketplace patterns (19).

## DT-9 — How do we determine priorities?

This is the meta-decision that orders all other findings. Priority is **not** raw impact. It is:

```
Priority = Value (or Severity) × Confidence × Recoverability × Effort-ease, then re-ordered by:
   1. Dependencies   (fix enablers first — H7)
   2. Active bleeds   (stop losses before chasing gains)
   3. Trust win        (one quick visible win early — H8)
   4. Compounding      (durable equity over one-offs — H9)
```

Full mechanics: `Opportunity_Ranking_Framework.md`. The brain never hands a client a flat list;
it hands a **sequenced plan** with a stated reason for the order.

---

## Decision discipline rules (apply to every template)

1. **Resolve symptoms to mechanisms** (H3) — never conclude on a symptom.
2. **Require corroboration** (H4) — one signal is a hypothesis, not a finding.
3. **Run counter-evidence before concluding** (H5) — not after.
4. **Judge in context** (H6) — no number is good or bad in the abstract.
5. **Carry provenance** — every conclusion must be replayable signal→evidence→pattern→finding.
6. **Respect the floors** — below confidence/value floors, it's a watchlist item, not a finding.

These rules are what make the framework *Growmerce's* judgement rather than a generic checklist.
