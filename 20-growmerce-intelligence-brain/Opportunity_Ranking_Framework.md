# Opportunity Ranking Framework

> The opportunity half of stage VALUE. Once Findings exist, the brain must decide **what to do
> first**. An operator's superpower is not finding problems — it's knowing the order. This
> framework turns a set of opportunities into a **sequenced plan with a stated reason for the
> order**. It extends the Pattern Scoring Model (19) into the brain's full prioritisation logic.

---

## 1. What we rank on (the six dimensions)

Every opportunity Finding is scored on six dimensions an operator actually weighs:

| Dimension | Question | Scale |
|---|---|---|
| **Revenue Impact** | How much top-line could this unlock? | 0–5 |
| **Profit Impact** | How much margin could this add/protect? | 0–5 |
| **Speed** | How fast does value arrive after we act? | 0–5 (5 = days) |
| **Ease** | How simple is execution? | 0–5 (5 = trivial) |
| **Confidence** | How sure are we it's real? (Trust Model) | 0.0–1.0 |
| **Resources Required** | What does it cost to capture (effort/spend/skill)? | 1–5 (1 = cheap) |

Revenue and Profit are kept separate (heuristic H1) — an opportunity can lift revenue while
hurting margin, and the brain must see both.

---

## 2. The ranking formula

```
Opportunity Score = (Revenue Impact + Profit Impact) × Speed-weight × Ease-weight × Confidence
                    ÷ Resources Required
```

Where:
- `Speed-weight` and `Ease-weight` map the 0–5 scales to multipliers (e.g. 0.6–1.4) so fast,
  easy opportunities rise without letting them dominate genuine high-impact work.
- `Confidence` (0.0–1.0) multiplies — an uncertain opportunity is discounted, never hidden.
- `Resources Required` divides — expensive opportunities must clear a higher impact bar.

The result normalises to a 0–100 **raw priority**. But raw priority is *not* the final order.

---

## 3. From raw score to sequenced plan (the operator re-ordering)

Raw score gives magnitude. Sequence comes from four operator overrides, applied in order
(heuristics H7, H8, H9):

```
1. DEPENDENCIES   Move enablers ahead of dependents.
                  (Fix "Discovery Fails" before optimising conversion on absent traffic.)
2. ACTIVE BLEEDS  Stop ongoing losses before chasing new gains.
                  (A live profit leak outranks an equal-sized future opportunity.)
3. TRUST WIN      Place ONE fast, visible, low-risk win early to earn the right to the big play.
4. COMPOUNDING    Where scores tie, prefer fixes that build durable equity over one-offs.
```

The output is a **ranked, sequenced plan**, each item carrying *why it's there and why now*.
The brain never returns a flat sorted list; it returns a plan an operator would actually run.

---

## 4. Priority bands

| Band | Raw score | Meaning |
|---|---|---|
| **Now** | 70–100 | High value, fast/easy, confident — do immediately |
| **Next** | 45–69 | Strong, this quarter |
| **Plan** | 25–44 | Worthwhile, schedule it |
| **Watch** | <25 | Not yet worth acting; monitor |

A `Now`/`Next` opportunity that depends on a lower-scored enabler is sequenced *after* the
enabler regardless of band — sequence beats score.

---

## 5. Compound opportunities

A compound Finding (from `Pattern_Interaction_Model.md`) is ranked as **one play** using the
*combined* impact of its components and the *confidence of the weakest necessary component*
(the chain is only as strong as its weakest link). Compound opportunities frequently outrank
their parts because their combined impact is super-additive while their shared execution keeps
resources sub-additive. This is deliberately how the brain surfaces its highest-leverage moves.

---

## 6. Worked example

Three opportunities for a marketplace seller:

| Opportunity | Rev | Profit | Speed | Ease | Conf | Res | Raw |
|---|---|---|---|---|---|---|---|
| Fix hero-SKU stockouts | 4 | 4 | 4 | 3 | 0.85 | 2 | high |
| Add premium price tier | 3 | 4 | 2 | 2 | 0.6 | 3 | medium |
| Rework main-image CTR | 3 | 3 | 5 | 4 | 0.8 | 1 | high |

Raw scores rank stockouts and CTR near the top. **Sequencing overrides:**
- CTR fix is a **trust win** (fast, easy, cheap, visible) → placed first.
- Stockouts is an **active bleed** + enabler (more traffic is wasted if heroes are OOS) →
  second, immediately after.
- Premium tier is real but slower/less certain → `Next`.

Final plan: **1) CTR fix → 2) Stockout fix → 3) Premium tier**, each with its stated reason.
Note this is *not* the raw-score order — the operator logic produced a better plan.

---

## 7. Honesty in ranking

- Confidence is *in* the score, so a dazzling-but-uncertain opportunity correctly sits below a
  modest-but-certain one.
- Resource cost is *in* the score, so "huge but expensive" doesn't crowd out "small but free."
- The plan states, per item, the impact range (not false precision), the confidence band, and
  the reason for its position. The client sees the reasoning, not just the order.

This is the difference between a prioritisation an operator trusts and a ranked list a tool
spits out.

---

## 8. Wiring

Ranked opportunities flow into `Recommendation_Generation_Framework.md` (each becomes one or
more recommendations) and into reports (the sequenced plan *is* the report's spine). Resource
estimates connect to Service Packages (11) and Growth Operations (12). Outcomes feed the
`Intelligence_Learning_Loop.md`, which calibrates the impact/speed/ease estimates over time.
