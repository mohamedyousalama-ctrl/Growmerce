# 03 — Intelligence Source Hierarchy

> Not all sources are equal. A figure from a business's own verified accounting system is worth more
> than the same figure remembered by the founder, which is worth more than an AI's guess. This
> document defines the **five-tier source hierarchy** that determines how much any signal is allowed
> to influence a conclusion — the rule that, more than any other, stops Growmerce from being talked
> into a wrong answer.

This is the supply chain's version of a credit bureau's source discipline: the *origin* of a fact
governs its weight, no matter how confidently it's stated.

---

## The five tiers

```
TIER 1  Direct Verified Business Data        ████████████  strongest
TIER 2  Platform / System Data               █████████
TIER 3  Observed / Public / Market Data      ██████
TIER 4  User Claims / Self-Reported          ███
TIER 5  AI Assumptions / Human Intuition     █             weakest
```

### Tier 1 — Direct Verified Business Data
- **What:** the business's own first-party, verifiable records — orders, transactions, costs/COGS,
  stock levels, fully-loaded margins, audited financials — confirmed to be real and current.
- **Why strongest:** it is the ground truth of the business itself; it measures the exact thing,
  first-hand, with provenance.
- **Examples:** an order export, a verified P&L, a connected commerce platform's transaction data.

### Tier 2 — Platform / System Data
- **What:** data read from the platforms the business operates on — marketplace rank/reviews,
  analytics funnels, ad spend/ROAS, delivery-app menus — sourced from the platform/API, not the
  business's own ledger.
- **Why second:** measured and system-generated, highly reliable, but one step removed from the
  business's verified books and subject to platform definitions/attribution quirks.
- **Examples:** marketplace impressions/CTR, GA-style funnel data, ad-platform metrics.

### Tier 3 — Observed / Public / Market Data
- **What:** things we observe externally or that are publicly available — competitor pages,
  category demand/search data, public pricing, market benchmarks, a live URL read.
- **Why third:** real and useful, but external, observation-dependent, possibly stale/regional, and
  not first-party to the business.
- **Examples:** a competitor's listing prices, category search volume, a benchmark.

### Tier 4 — User Claims / Self-Reported
- **What:** what the user/founder/team tells us — "our checkout is fine," "if we pause ads sales
  stop," "returns are normal," diagnostic answers, recollections.
- **Why fourth:** valuable for *hypotheses* and context, and sometimes the only available source —
  but unverified, memory- and bias-prone, and frequently contradicted by Tier 1–2 data.
- **Examples:** a founder's estimate of their repeat rate; a self-described "bestseller."

### Tier 5 — AI Assumptions / Human Intuition
- **What:** inferences the AI makes without direct evidence, and human gut feel/experience-based
  guesses not yet grounded in data.
- **Why weakest:** it is *reasoning in the absence of evidence* — useful to form a hypothesis or
  fill a gap provisionally, never to assert a fact.
- **Examples:** an AI inferring likely competitors from a category; an operator's hunch about a
  cause before the data is in.

---

## The override rules (what outranks what)

These rules are absolute and run through the Evidence Scoring Engine (06), Verification (05), and
the Brain's GUARD (20):

### R1 — Higher tier outranks lower tier on the same fact
When sources disagree about the *same* fact, the higher tier wins and sets the conclusion; the
lower-tier source becomes a recorded counter-signal.
> *Founder says "checkout is fine" (Tier 4); analytics shows 60% drop at payment (Tier 2). Tier 2
> wins.* The Tier-4 belief is not discarded — the **belief-vs-data gap is itself surfaced** as a
> finding.

### R2 — Lower tier never overrides stronger evidence
A user claim or an AI assumption can **never** override Tier 1–2 measured data. No amount of
confidence in a Tier 4/5 source promotes it above verified data. This is the single most important
rule in the hierarchy — it is what makes Growmerce un-talk-into-able.

### R3 — Lower tiers *raise hypotheses*, higher tiers *confirm facts*
Tier 4–5 are first-class for *generating* what to check (hypotheses, context, candidate causes) and
for filling gaps **provisionally and labelled as such** — but a conclusion only becomes a *finding*
when higher-tier evidence supports it (or it stays explicitly low-confidence).

### R4 — Tier caps confidence
A conclusion resting entirely on Tier 4–5 evidence **cannot exceed Medium confidence**, no matter
how internally consistent (mirrors the Brain's Tier-1-anecdote cap, 20). To reach High/Very High,
Tier 1–2 evidence must be present. (Mechanics in `06_Evidence_Scoring_Engine.md`.)

### R5 — Unverifiable inputs are capped at the lowest applicable tier
A screenshot, an upload of unknown provenance, or an unconfirmable claim cannot be treated above
Tier 4 until verified, regardless of how detailed it looks (05). Detail is not provenance.

### R6 — Convergence across tiers strengthens; agreement *within* one weak tier does not
Independent signals across tiers agreeing raises confidence (R-convergence, 06). But many Tier-4/5
items agreeing among themselves is not corroboration — it may be one bias repeated. Convergence
requires *independent* sources, ideally at higher tiers.

### R7 — Recency interacts with tier
A stale Tier-1 figure can be outweighed by a fresh Tier-2 one for time-sensitive facts (rank,
price, stock). Tier sets the *ceiling* of trust; recency can lower the *effective* trust within it.

---

## Worked example

Question: *is this SKU profitable?*
- Founder: "it's our bestseller, doing great." → **Tier 4** (claim) → hypothesis only.
- Store shows healthy gross margin. → **Tier 2** (platform) → supports "looks profitable," but gross
  only.
- Connected order + cost data shows **negative fully-loaded contribution** across 6 months. →
  **Tier 1** (verified) → **this sets the conclusion** (R1, R2).
- AI's earlier assumption that "bestsellers are usually fine" → **Tier 5** → overridden (R2).

**Result:** the SKU is unprofitable after true costs (High/Very High confidence, R4 satisfied by
Tier 1). The founder's Tier-4 belief becomes a surfaced *belief-vs-data gap* — itself valuable.

---

## Why the hierarchy is a competitive advantage

Generic AI tools weight all inputs roughly equally — a confident user claim or an AI guess can drive
the answer, which is why they hallucinate and mislead. Growmerce's **tiered source discipline** is
exactly what a credit bureau or Bloomberg enforces: *the provenance of a fact governs its power.*
This is unglamorous and hard to retrofit, and it is a core reason Growmerce's conclusions can be
trusted and defended while a dashboard or AI wrapper's cannot. (Expanded in
`10_Competitive_Advantage_of_the_Supply_Chain.md`.)
