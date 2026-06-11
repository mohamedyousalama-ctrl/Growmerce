# Risk & Threat Framework

> The threat half of stage VALUE. Opportunities are about upside; threats are about protecting
> the business from downside an operator sees coming. A generic tool reports the present; an
> operator reads the *trajectory*. This framework defines how Growmerce detects, scores, and
> escalates threats.

---

## 1. Threats vs. opportunities (why they're scored differently)

An opportunity is ranked on value to gain. A threat is ranked on **severity** = how bad, how
likely, how soon. The crucial operator instinct: **a threat is often invisible in a snapshot
and obvious in a trajectory.** A competitor currently behind but compounding organic equity is
a bigger threat than one currently ahead but static. The brain detects *direction and
fragility*, not just current state.

```
Severity = Likelihood × Downside × Urgency
```
- **Likelihood** — how probable the threat materialises (0–5).
- **Downside** — how much damage if it does (0–5; existential = 5).
- **Urgency** — how soon / how fast-moving (0–5; compounding threats score high).

Severity bands: **Critical (escalate now) · High · Medium · Watch.** A Critical threat can
outrank every opportunity in the plan — you fix the leak before decorating the boat.

---

## 2. The threat-detection engine (per threat type)

Each threat type has a detection template (Trigger → Signals → Trajectory test → Counter-check →
Severity). All resolve to Competitor / Channel / Marketplace / Pricing / Profit patterns (19).

### T1 — Competitor threat
- **Signals:** competitor organic footprint, review/rank velocity, pricing, content cadence,
  assortment, comparison-frame dominance.
- **Trajectory test:** is the competitor's advantage *compounding* (organic equity, frame
  ownership) or static? Compounding = high urgency even if currently behind.
- **Counter-check:** is their "organic" actually funded? Is the gap tactical not structural?
- **Patterns:** *Paid While Competitors Compound Organic*, *Structural Cost Advantage*,
  *Category Leader Owns The Frame*.

### T2 — Margin threat
- **Signals:** blended-margin trend, fully-loaded contribution, rising input/shipping/fee costs,
  discount penetration trend.
- **Trajectory test:** is margin eroding while revenue holds? Is the bleed scaling with volume?
- **Counter-check:** is erosion a deliberate funded land-grab with healthy payback?
- **Patterns:** *Products That Lose Money After True Costs*, *Discounting Buys Sales Anyway*,
  *Returns Silent Tax*. Detail in `Profit_Leakage_Intelligence.md`.

### T3 — Marketplace dependency
- **Signals:** revenue concentration on one marketplace, rank durability (earned vs rented),
  policy/fee exposure, own-catalogue buy-box control.
- **Trajectory test:** would a platform policy/fee/algorithm change materially hit revenue?
- **Counter-check:** is the platform genuinely durable and the concentration a stage choice
  with diversification roadmapped?
- **Patterns:** *Ranking Built On A Foundation That Can Be Pulled*, *One Channel Carries The
  Business*.

### T4 — Pricing risk
- **Signals:** price-vs-structural-cost gap, price-war behaviour, price objections vs position,
  thin anchoring.
- **Trajectory test:** is the business being drawn into a margin-eroding price fight it can't win?
- **Counter-check:** does it actually hold the cost advantage?
- **Patterns:** *Competing On Price Against A Structural Cost Advantage*, *Anchorless Pricing*.

### T5 — Channel concentration risk
- **Signals:** % revenue from a single channel, owned-audience share, history of channel
  volatility, secondary-channel independence.
- **Trajectory test:** model the revenue impact of a shock to the dominant channel.
- **Counter-check:** is there under-attributed secondary demand?
- **Patterns:** *One Channel Carries The Business*, *Revenue Is Renting Attention*.

### T6 — Operational bottleneck
- **Signals:** hero-SKU stockout frequency, fulfilment speed promise vs reality, returns
  processing load, lead-time vs demand variance, support backlog.
- **Trajectory test:** is an operational constraint capping growth or eroding reviews/retention?
- **Counter-check:** is the constraint a deliberate, managed trade-off?
- **Patterns:** *Out-of-Stock On The Hero*, *Returns Are A Silent Tax*, plus operations signals.

---

## 3. Compound threats (escalation)

Per the `Pattern_Interaction_Model.md`, fragility patterns **stack**. The engine actively looks
for compound threats and escalates their severity above any component:

> **Existential-fragility stack:** *One Channel Carries The Business* + *Revenue Is Renting
> Attention* + *Paid While Competitors Compound Organic* → a single-point, rented, long-game-
> losing model. Any one is "High"; together they are **Critical**, because a single platform
> change could end the business and the trajectory is worsening.

The brain names the compound threat as one reality ("your growth model is structurally
fragile"), not three separate flags — this is the operator's most valuable warning.

---

## 4. Severity scoring example

Marketplace dependency for a seller with 75% of revenue on one platform and rented rank:

- Likelihood 4 (platform changes are common; rank is rented, not earned)
- Downside 5 (most of revenue at risk → existential)
- Urgency 4 (rented rank can collapse the moment support pauses)

```
Severity = 4 × 5 × 4 → normalised → Critical
```

This threat is escalated to the top of the plan, ahead of opportunities, with the stop-loss
actions (build organic rank, diversify, build owned audience) sequenced first.

---

## 5. How threats enter the plan

- Threats and opportunities are merged into **one** prioritised plan; severity and value are
  placed on a common urgency-adjusted scale so the client gets a single ordered list, not two.
- **Active bleeds and Critical threats are sequenced before equal-value opportunities** (the
  stop-the-bleeding rule, heuristic from Opportunity Ranking).
- Each threat carries: severity band, the trajectory evidence (why it's getting worse), the
  counter-check result (why it's real), and the stop-loss actions.

---

## 6. Honesty and false-alarm control

Threat detection is the easiest place to cry wolf, so it is tightly governed by
`False_Positive_and_Bias_Control.md`:
- A threat must pass its **trajectory test** (direction, not just snapshot) and **counter-check**
  before being raised — otherwise it's a watchlist item.
- Severity is expressed in honest bands with the evidence; never alarmism for effect.
- The brain explicitly states the threats it considered and **ruled out**, which is itself a
  credibility signal (an operator who says "your margin is fine, here's why" is more trusted
  than one who flags everything).

Outcomes (did the threat materialise? did the stop-loss work?) feed the
`Intelligence_Learning_Loop.md`, calibrating likelihood/urgency estimates over time.
