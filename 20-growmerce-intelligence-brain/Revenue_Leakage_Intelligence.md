# Revenue Leakage Intelligence

> A complete worked subsystem: **how Growmerce determines that a business is leaking revenue** —
> end to end, from signal to sequenced fix. This is decision template DT-1 expanded into the
> full operator reasoning, and a model for how every "how do we determine X" question is
> answered with rigour rather than guesswork.

---

## 1. What a revenue leak actually is

A revenue leak is **demand that already exists failing to become revenue.** It is *not* "low
sales" (a symptom/category). The operator distinction: low sales could be low demand (not a
leak — a market problem) or it could be existing demand escaping through a hole (a leak — a
fixable execution problem). The brain's first job is to tell these apart, because the fixes are
opposite.

```
Low sales
 ├── because demand is genuinely thin          → NOT a leak (market/positioning question)
 └── because existing demand is escaping        → REVENUE LEAK (find the hole, plug it)
```

---

## 2. The five places revenue leaks (the operator's mental map)

An experienced operator knows revenue escapes at five points along the path from demand to cash.
The brain checks each, in order, because they are a causal chain (upstream leaks make
downstream optimisation pointless — heuristic H7).

```
DEMAND → DISCOVERY → CLICK → CONVERSION → AVAILABILITY → (revenue)
            │          │          │            │
          leak 1     leak 2     leak 3       leak 4 / 5
```

| # | Leak point | The hole | Primary patterns (19) |
|---|---|---|---|
| 1 | **Discovery** | Demand exists but the business is invisible at intent | Demand Exists But Discovery Fails; Review Density Gap |
| 2 | **Click** | Visible but loses the click on the results page | Winning Impressions But Losing The Click |
| 3 | **Conversion** | Clicks arrive but don't buy | Trust gap; Discount-intent-meets-premium; Hard checkout; Page answers wrong questions |
| 4 | **Availability** | Buyers ready but hero is out of stock | Out-of-Stock On The Hero |
| 5 | **Durability** | Revenue exists but rented/fragile | Renting Attention; Rank Can Be Pulled; One Channel |

---

## 3. The reasoning chain (how the brain concludes "leak here")

For each leak point the brain runs the standard chain. Worked for **leak 1 (Discovery):**

1. **Trigger** — flat new-customer growth despite a good product / strong repeat rate.
2. **Gather** — category search/demand (S12/S7), impression share & rank (S5), organic session
   share (S3), review velocity (S5).
3. **Ground** — these are Tier 3 where instrumented; founder's "nobody finds us" (S13/Tier 1)
   is the *hypothesis*, not the proof.
4. **Recognise** — matches *Demand Exists But Discovery Fails*.
5. **Corroborate (H4)** — require ≥2 independent signals: high category demand **and** low
   impression share **and** low organic-session share. One alone is a rumour.
6. **Counter-check (H5)** — rule out the innocent explanations:
   - Is category demand actually thin? (then it's not a discovery leak)
   - Is the business visible but failing to convert? (then it's leak 3, not 1)
   - Is traffic low-intent? (upstream targeting issue)
7. **Context (H6)** — is this a niche where low search volume is normal? Adjust interpretation.
8. **Score** — confidence (Trust Model) + recoverable revenue (the size of the demand the
   business is missing).
9. **Conclude** — name the mechanism, with provenance, at a stated confidence.
10. **Sequence** — discovery is upstream; fix it before conversion work on traffic that isn't
    arriving yet.

The same chain runs for leaks 2–5, each with its own signals, patterns, and counter-checks.

---

## 4. Sizing the leak (what makes it credible and rankable)

A leak is only actionable if sized. The brain estimates **recoverable revenue** per leak,
honestly and in ranges:

- **Discovery:** (category demand the business could plausibly capture − current capture) ×
  conversion × AOV. Bounded by realistic share, not theoretical maximum.
- **Click:** impressions × (benchmark CTR − actual CTR) × conversion × AOV.
- **Conversion:** qualified sessions × (benchmark CR − actual CR) × AOV, segmented by the
  specific failing step.
- **Availability:** hero stockout-days × normal daily velocity × AOV (+ ranking knock-on).
- **Durability:** not a current leak but a *future* one — modelled as revenue-at-risk if the
  prop (spend/rank) is removed.

Sizing uses ranges and states its assumptions (heuristic H10, honesty). A leak that can't be
sized credibly is held at lower confidence, not inflated.

---

## 5. The compound revenue leak

Per the Pattern Interaction Model, leaks compound along the chain. The brain's signature
insight here:

> *"You don't have a traffic problem and a conversion problem — you have one leaking funnel.
> Sending more traffic into a listing that loses the click just wastes more demand. Fix the
> click and the page first, then open the discovery tap."*

The compound leak is sequenced as one play (fix the chain head-first), and ranked above the
individual leaks because the combined fix is super-additive.

---

## 6. What the brain refuses to do (anti-generic guardrails)

- It will **not** call low sales a "revenue leak" without ruling out thin demand (R6 / H5).
- It will **not** conclude a leak from a single metric (H4) — convergence required.
- It will **not** optimise a downstream leak while an upstream leak starves it (H7).
- It will **not** size a leak with false precision — ranges with stated assumptions only.
- It will **not** override hard funnel/availability data with the founder's optimistic belief
  (Evidence Hierarchy R1) — but it *will* surface the belief-vs-data gap as its own finding.

---

## 7. Output

For a real business, the subsystem produces:
1. A **leak map** — which of the five points are leaking, with evidence and confidence.
2. A **sized estimate** of recoverable revenue per leak (ranges).
3. The **compound leak narrative** (the funnel as one system).
4. A **sequenced fix plan** (head-first), each item wired to patterns (19) → Service Packages
   (11) → Growth Ops (12) via `Recommendation_Generation_Framework.md`.
5. A **confidence statement** and **counter-evidence record** per leak.

This is how Growmerce determines a sales leak: not by spotting a low number, but by proving
where existing demand is escaping, how much, how sure it is, and what to do first.
