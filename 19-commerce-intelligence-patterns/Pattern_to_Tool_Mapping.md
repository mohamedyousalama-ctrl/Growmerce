# Pattern → Tool Mapping

> Connects patterns to **tools and Data Integrations (13)**. Patterns define *what evidence we
> need*; tools and integrations *supply it*. This mapping is what makes patterns detectable
> in the real world rather than just describable on paper.

---

## 1. The relationship

```
Pattern's Evidence Signals  →  require data
Data Integrations (13)      →  supply data
Tools                       →  compute signals from data
Evidence Framework          →  tiers the result
```

A pattern is only as detectable as the tools that feed it. This mapping makes each pattern's
data dependencies explicit, and reveals which integrations unlock the most patterns (a
prioritisation input for workstream 13).

---

## 2. Evidence-source categories

| Source category | Example data | Patterns it powers |
|---|---|---|
| **Commerce platform / orders** | Sales, SKUs, AOV, repeat rate, cohorts | Hero/tail stock, true-margin, first-purchase-as-trial, churn timing, value segmentation |
| **Inventory system** | Stock levels, velocity, days-of-cover | Out-of-Stock On The Hero; replenishment patterns |
| **Cost / finance data** | COGS, shipping, fees, returns cost | Winning Revenue On Products That Lose Money; Returns Silent Tax |
| **Marketplace data** | Rank, impressions, CTR, reviews/recency, buy-box | Review Density Gap; Thumbnail Economics; Ranking Durability |
| **Web/app analytics** | Funnel steps, checkout drop-off, device, source | Checkout friction; journey/trust gaps; channel-to-conversion; objection coverage |
| **Ad platforms** | Spend, revenue, ROAS, new-customer rate | Renting Attention; Paid-vs-Organic; Last-Click Defunding; Intent mismatch |
| **Search / demand data** | Category search volume, share-of-search, keywords | Demand Exists But Discovery Fails; comparison frame |
| **Email/SMS/CRM** | List size, owned revenue, lifecycle engagement | Renting Attention; retention/loyalty patterns; VIP treatment |
| **Reviews / VoC** | Review text, ratings, support chats, return reasons | Returns causes; objection coverage; outcome-vs-feature; loyalty quality |
| **Promotion data** | Discount penetration, code usage, baseline periods | Discounting Buys Sales Anyway; incrementality |
| **Competitor/market data** | Competitor pricing, organic footprint, content | Competitor patterns; structural price; comparison frame |

---

## 3. Signal → source → tier table (illustrative)

| Evidence Signal | Source | Achievable Tier |
|---|---|---|
| Hero SKU stockout days | Inventory system | Tier 3 |
| Fully-loaded contribution per SKU | Orders + finance/cost data | Tier 3 |
| Review recency vs. competitors | Marketplace data | Tier 3 |
| Checkout-step drop-off | Web/app analytics | Tier 3 |
| Promo incrementality | Promotion data + baseline modelling | Tier 2 (derived) |
| Share-of-search gap | Search/demand data | Tier 2 (inferred) |
| WTP spread | Orders/behaviour modelling | Tier 2 (derived) |
| "Sales stop when ads pause" | Founder interview | Tier 1 (anecdote) → upgrade via ad+revenue data to Tier 3 |
| Recurring buyer objections | Support chat / review mining | Tier 1→2 (as it's structured) |

The right-hand column shows the upgrade path: many Tier 1 anecdotes become Tier 3 once the
matching integration is connected — directly raising achievable confidence.

---

## 4. Integration prioritisation (which tools to build/connect first)

Score each candidate integration by **pattern leverage** = number of patterns it unlocks or
upgrades × those patterns' average priority score. High-leverage integrations:

1. **Commerce platform / orders** — underpins the most patterns (foundational).
2. **Marketplace data** — unlocks the entire Marketplace library (high-value, hard to get otherwise).
3. **Web/app analytics** — unlocks Conversion + Journey patterns (high recognition, fast wins).
4. **Cost/finance data** — unlocks the highest-risk Profit Leak patterns.
5. **Reviews/VoC** — unlocks objection, returns, and loyalty-quality patterns and feeds the
   "that's exactly my business" recognition copy.

This gives workstream 13 a pattern-driven integration roadmap instead of an arbitrary one.

---

## 5. The minimum viable evidence stack

For a credible standard audit, the minimum integration set is: **orders + web/app analytics +
ad platforms + reviews/VoC**. This combination reaches Probable confidence on a large share of
the library. Marketplace and cost/finance data are added for marketplace sellers and
margin-critical businesses respectively.

---

## 6. Tools as products

Several patterns' tooling becomes standalone product surface later (see each pattern's Future
SaaS Usage). The tool mapping is therefore also a **product backlog**: the most-requested,
highest-leverage signal computations (review-recency monitor, true-contribution engine,
checkout-friction analyser, share-of-search monitor) are the natural first SaaS features. The
order in which we build *tools* should track the order in which we want to build *product*.
