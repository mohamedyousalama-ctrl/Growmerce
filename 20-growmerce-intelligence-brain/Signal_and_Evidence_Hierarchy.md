# Signal & Evidence Hierarchy

> Stages SENSE and GROUND of the cognition pipeline. This defines **what signals Growmerce
> consumes** and **which evidence wins when signals disagree** — with exact, ordered rules.
> It extends the Pattern Evidence Framework (19) from "evidence for one pattern" into the
> brain's full sensory and precedence system.

---

## Part 1 — The Signal System (what Growmerce senses)

A **signal** is any input that could inform a Finding. Signals arrive primarily through the
Structured Commerce Input Layer (13). The brain consumes these signal classes:

| # | Signal class | Examples | Default tier |
|---|---|---|---|
| S1 | **Structured profile** | Business model, category, stage, markets, goals, margins | Tier 2 (self-stated facts) |
| S2 | **Transaction & system data** | Orders, SKUs, AOV, repeat rate, cohorts, stock, costs | **Tier 3** |
| S3 | **Behavioural analytics** | Funnel steps, checkout drop-off, device, traffic source | **Tier 3** |
| S4 | **Channel & ad data** | Spend, ROAS, new-customer rate, impressions, CTR | **Tier 3** |
| S5 | **Marketplace data** | Rank, buy-box, reviews & recency, badges | **Tier 3** |
| S6 | **Pricing information** | Own prices, competitor prices, discounts, tiers | Tier 2–3 |
| S7 | **Competitor & market data** | Competitor organic footprint, content, assortment | Tier 2 |
| S8 | **Voice of customer** | Reviews text, support chats, return reasons, surveys | Tier 1→2 |
| S9 | **Uploaded files** | Spreadsheets, exports, P&Ls, catalogues | Tier 2–3 (per provenance) |
| S10 | **Screenshots** | Dashboards, listings, ad managers, competitor pages | Tier 1–2 (unverified capture) |
| S11 | **URLs** | The store, product pages, marketplace listings, competitors | Tier 2 (live but un-instrumented) |
| S12 | **Timing information** | Seasonality, occasion calendar, demand curves | Tier 2 |
| S13 | **User opinions / statements** | "If we pause ads, sales stop", "returns are normal" | **Tier 1** |
| S14 | **Pattern matches** | A pattern (19) firing is itself a (derived) signal to others | Tier 2 (derived) |

### Signal intake rules
- **Every signal is tagged** with: class, source, tier, timestamp, and confidence-of-capture.
- **A screenshot or upload is evidence of what it shows, not proof it is current or complete** —
  it is tiered by what can be verified, and flagged if unverifiable.
- **A URL is observed live** (we can read the page) but is not instrumented data — claims from
  it (e.g. "this listing converts poorly") remain hypotheses until S2–S5 confirm.
- **User statements (S13) are first-class for hypothesis generation** and for the recognition
  test, but cannot, alone, confirm a finding (see Part 2).

---

## Part 2 — The Evidence Hierarchy (which evidence wins)

When signals point different directions — and they will — the brain resolves conflicts by
**ordered, explicit rules**. This is the part that stops Growmerce from being talked into a
wrong conclusion by a confident founder or a single screenshot.

### Tier ladder (strength of a single piece of evidence)

```
Tier 3  Confirmed hard data        (measured: S2–S5, instrumented)        ← strongest
Tier 2  Derived / observed signal  (computed, or live-observed: S6,S7,S9,S11,S12,S14)
Tier 1  Soft / self-reported       (opinion, anecdote, unverified: S8 raw, S10, S13) ← weakest
```

### The precedence rules (apply in order)

**R1 — Hard data outweighs opinion.**
Real transaction/behavioural data (Tier 3) overrides a contradicting user opinion (Tier 1).
*If the founder says "our checkout is fine" but S3 shows 60% drop at the payment step, the data
wins.* The opinion is recorded as a counter-signal, not discarded — a large gap between belief
and data is itself a finding.

**R2 — Historical/repeated evidence outweighs a single observation.**
A trend across time (e.g. 6 months of cohort decay) outweighs one snapshot or one good/bad day.
A single screenshot of a great day does not refute a declining trend.

**R3 — Converging independent signals outweigh one strong signal.**
Three independent Tier-2 signals that agree can outweigh one Tier-3 signal that stands alone,
*because convergence is itself evidence of a real underlying cause* (heuristic H4). One metric
is a rumour; agreement is a fact.

**R4 — Recent evidence outweighs stale evidence (within validity windows).**
Each signal has a freshness window (operational: weekly; trend: monthly; structural:
per-engagement). Stale evidence is down-weighted, not trusted at face value.

**R5 — Specific, measured evidence outweighs general, modelled evidence.**
A measured SKU-level contribution beats a category-average estimate. The more directly the
evidence touches the exact claim, the more it counts.

**R6 — Context can veto a number.**
A metric that looks bad/good is overridden if context makes it irrelevant (a low conversion
rate on a high-consideration product is not a leak). Context (S1) gates interpretation of every
other signal (heuristic H6).

**R7 — Absence of expected evidence is evidence.**
If a pattern should produce a signal and that signal is absent, that *weakens* the pattern.
Not finding the corroboration is a result, not a null.

**R8 — Unverifiable evidence cannot exceed Tier 1.**
A screenshot, an uploaded file of unknown provenance, or an unconfirmed claim is capped at Tier
1 no matter how detailed, until it can be tied to a verifiable source.

### Conflict-resolution procedure

When two signals conflict, the brain:
1. Ranks each by tier, then by R1–R8.
2. If a higher-tier/higher-precedence signal clearly wins → it sets the conclusion; the loser
   becomes a recorded counter-signal.
3. If they are close in strength → **confidence is reduced** and the Finding is held at
   Medium/Low, with the conflict surfaced honestly (never hidden).
4. If the conflict is between belief and data → the *gap itself* may be promoted to a Finding
   (e.g. "the team believes retention is healthy; data shows it isn't").

> The brain never resolves a conflict by picking the more *convenient* answer. It resolves by
> the rules, and when the rules don't settle it, it lowers confidence and says so.

---

## Part 3 — From evidence to a finding (sufficiency)

Evidence sufficiency thresholds (mirrors and extends 19's Evidence Framework, mapped to the
brain's four-band confidence in `Confidence_and_Trust_Model.md`):

| To support a finding at… | Minimum evidence |
|---|---|
| **Very High** | ≥1 Tier 3 signal + ≥2 independent converging signals + counter-evidence ruled out + fresh + context-fit |
| **High** | ≥1 Tier 3 *or* ≥3 converging Tier 2 + counter-evidence checked + context-fit |
| **Medium** | ≥2 converging signals (any tier) + counter-evidence at least considered |
| **Low** | ≥1 signal; hypothesis stage |

**Hard rule (inherited and enforced):** a finding resting *entirely* on Tier 1 evidence cannot
exceed **Medium**, regardless of how compelling the story. Soft signals point; hard signals
prove. This single rule is the strongest structural defence against behaving like generic AI.

---

## Part 4 — Signal → evidence governance

- Every signal class maps to sources in the Structured Input Layer (13); gaps become "wished-for
  signals" in `Backlog.md`.
- New integrations are prioritised by how many Tier-1/Tier-2 signals they **upgrade to Tier 3**
  (e.g. connecting order data upgrades "if we pause ads sales stop" from anecdote to measured).
- The hierarchy is the same across fast-judgement and deep-diagnosis modes; only the *available
  tier* differs, which is exactly why confidence differs between them.
