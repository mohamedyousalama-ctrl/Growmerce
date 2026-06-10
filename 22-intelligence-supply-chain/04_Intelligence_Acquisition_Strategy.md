# 04 — Intelligence Acquisition Strategy

> Where does Growmerce's intelligence actually come from? This document maps every source the supply
> chain draws on — today and as it grows — and the strategy for acquiring intelligence cheaply,
> verifiably, and increasingly. Acquisition is the front of the supply chain: everything downstream
> is bounded by what enters here.

A Bloomberg or a credit bureau is, fundamentally, an *acquisition machine* — its moat is the breadth
and verifiability of what it ingests. This document is Growmerce's acquisition machine, mapped.

---

## 1. The acquisition principle

> Acquire the **highest-tier evidence the situation allows, at the lowest friction the user will
> bear** — and always know what you're *missing*.

Two corollaries:
- **Tier-maximising:** prefer Tier 1–2 sources (verified/platform) wherever obtainable; treat Tier
  4–5 (claims/assumptions) as starting points to be upgraded, not endpoints.
- **Friction-aware:** the best source is worthless if the user won't provide it. Acquisition is
  staged so value is delivered at low friction first, and richer sources are earned over time (ties
  to the Website UX value-before-capture and the Retention loops, 04).

---

## 2. The acquisition map (today)

### Direct from the user (the primary channel today)
| Source | Typical tier | What it yields | Notes |
|---|---|---|---|
| **User inputs / diagnostic answers** | Tier 4 | context, hypotheses, the felt problem | first-class for *what to check*; not for facts |
| **Structured commerce profile** | Tier 2–4 | the business's shape, channels, catalogue | the reusable spine (saved profile, 04/13); upgrades as data connects |
| **Uploads (CSV/Excel/PDF)** | Tier 1–3 | orders, costs, catalogues, P&Ls, menus | tier depends on verifiability of provenance |
| **Screenshots** | Tier 4 (capped) | dashboards, listings, competitor pages | unverified capture → low tier until confirmed; OCR risk |
| **Menus** | Tier 2–3 | delivery merchandising, availability, hero items | from the live app (higher) or an upload (lower) |
| **Reports / campaign results** | Tier 2–3 | ad performance, prior results | depends on source system |

### Observed externally (read by the system)
| Source | Typical tier | What it yields |
|---|---|---|
| **The business's own website/store** | Tier 2–3 | live conversion/listing/offer signals (observed) |
| **Marketplace pages** | Tier 2–3 | rank, reviews, price, buy-box (read live) |
| **Competitor observations** | Tier 3 | competitor pricing, reviews, content, assortment, trajectory |
| **Public / market data** | Tier 3 | category demand, search/benchmarks, seasonality |

### Produced inside the engagement (the most valuable, most underrated)
| Source | Typical tier | What it yields |
|---|---|---|
| **Execution outcomes** | Tier 1 | what was done and what moved — the only proof a fix worked |
| **Human-operator review** | adds verification | expert confirmation/correction (20's Human Override) |

> Execution outcomes are a *strategic* acquisition target: they are Tier-1, exclusive to Growmerce
> (no competitor sees them), and they feed the learning loop. Every engagement should be designed to
> *capture* them (the Brain's four data exhausts, 20).

---

## 3. The acquisition ladder (how a business's evidence deepens over time)

Acquisition is not one-shot; it climbs as the relationship deepens (mirrors the website's
fast-judgement → deep-diagnosis bridge and the retention loops):

```
Stage 0  cold visitor      → answers + a URL/screenshot         (Tier 3–4)  → fast judgement, Medium confidence
Stage 1  engaged           → structured profile + an upload      (Tier 2–3) → fuller findings
Stage 2  connected         → order/cost/analytics data connected (Tier 1–2) → High/Very-High confidence, sized
Stage 3  operating client  → execution outcomes captured         (Tier 1)   → proven fixes; the loop closes
Stage 4  ongoing           → continuous fresh data + outcomes     (Tier 1–2) → compounding accuracy
```

Output accuracy (07) rises as a business climbs this ladder — and the ladder is the honest reason
deep engagements produce better intelligence than a free scan. Acquisition strategy = move
businesses up the ladder by always making the next rung worth the friction.

---

## 4. The acquisition map (future — as the network grows)

These are *sources*, scoped here only as acquisition inputs (not a product roadmap — "future vision"
is out of scope; this is supply-chain plumbing):

| Future source | Tier it would add | What it would yield |
|---|---|---|
| **Direct integrations / APIs** | Tier 1–2 | automated, fresh, verified platform & commerce data (less friction than uploads) |
| **Partner feeds** | Tier 2–3 | platform/category data via partnerships |
| **Network intelligence** | Tier 1–2 (aggregated) | anonymised, cross-business benchmarks and pattern frequencies from Growmerce's own engagement base (the Commerce Intelligence Network as a *source*) |

The most strategically important future source is **network intelligence**: as Growmerce runs more
engagements, the *aggregate* of confirmed patterns, fix outcomes, and benchmarks becomes a
proprietary, high-tier source no competitor can buy. (Its product/moat implications belong to the
Network and Moat workstreams; here it is simply the highest-value future acquisition input.)

---

## 5. Coverage as a first-class concept

Acquisition isn't only about what we *have* — it's about knowing what we **lack**. For every
business, the supply chain tracks **coverage**: which signal categories (02) and which tiers are
present, thin, or absent.

- Coverage gaps are surfaced honestly (e.g. "we can read your discovery and conversion; we can't
  judge profit without cost data") — the Brain's calibrated abstention (20), made operational.
- Coverage directly bounds output accuracy (07): you cannot be highly confident about a dimension
  you have no evidence for.
- Closing the highest-value coverage gap is the standing acquisition priority for any engagement.

---

## 6. Acquisition quality controls

Even acquisition is inspected (it's stage 2 of the chain, 01):
- **Provenance captured at intake** — source, tier, timestamp, method, confidence-of-capture.
- **Tier assigned at intake** (03) — nothing enters untiered.
- **Verification queued** (05) — especially for uploads/screenshots/claims before they influence
  conclusions.
- **Selection-bias watch** — we deliberately seek the evidence that would *disconfirm* a hypothesis,
  not only the easy confirming signals (anti-confirmation-bias, ties to 05/08).

---

## 7. Why acquisition is a moat, not a feature

Anyone can build a form. Few build an acquisition machine that (a) tiers every input, (b) climbs a
ladder toward verified data, (c) captures exclusive execution outcomes, and (d) compounds into
network intelligence. The breadth and *verifiability* of what Growmerce ingests — and the exclusive
outcome data it alone sees — is a structural advantage that widens over time. Acquisition is where
the supply chain's superiority begins. (Full comparison in
`10_Competitive_Advantage_of_the_Supply_Chain.md`.)

---

## The answer to "where does Growmerce intelligence come from?"

> From a tiered, verifiable acquisition machine: the business's own verified data (Tier 1) and the
> platforms it runs on (Tier 2) wherever obtainable; observed market and competitor data (Tier 3);
> user context and claims (Tier 4) used as hypotheses; AI inference (Tier 5) used only to fill gaps
> provisionally — climbing a ladder from cold-visit answers to connected first-party data to
> exclusive execution outcomes, and ultimately compounding into proprietary network intelligence.
> Always knowing, and honestly stating, what it does not yet have.
