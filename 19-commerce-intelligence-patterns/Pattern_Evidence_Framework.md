# Pattern Evidence Framework

> Is the signal real? Before we ask "how sure are we the pattern is present" (Confidence) or
> "how much should we care" (Scoring), we have to know whether the underlying evidence can be
> trusted at all. This framework defines **what counts as evidence**, its tiers of strength,
> and how raw data becomes a detected pattern.

It is the foundation of the trust stack and wires directly to **13 Data Integrations** (the
sources of evidence) and **06 Commerce Diagnostic** (the structured collection of it).

---

## 1. Evidence tiers

Every evidence signal a pattern relies on is classified into one of three tiers. The tier
caps how much it can contribute to confidence.

### Tier 3 — Confirmed Hard Data
Direct, measured, system-of-record data. Highest trust.
- Examples: actual sales/order data, stock levels, fully-loaded cost figures, checkout-step
  drop-off from analytics, review counts/dates, ad spend and revenue, return rates.
- Source: integrated platforms (13) and the business's own systems.
- Use: can drive Confirmed-level confidence on its own *if* it converges and counter-evidence
  is ruled out.

### Tier 2 — Derived / Inferred Signal
A signal computed, estimated, or inferred from data rather than measured directly.
- Examples: estimated incrementality, share-of-search inference, attribution-modelled
  contribution, predicted churn risk, WTP spread inferred from behaviour.
- Source: models and calculations over Tier 3 data.
- Use: supports confidence but rarely confirms a pattern alone; needs corroboration.

### Tier 1 — Soft / Anecdotal Signal
Qualitative, self-reported, or observational input.
- Examples: founder statements ("if we turn off ads sales stop"), customer-service anecdotes,
  manual competitor observation, survey responses, support-chat impressions.
- Source: interviews, diagnostics questionnaire, qualitative review.
- Use: powerful for *generating hypotheses* and for the human-recognition test, but cannot
  drive high confidence without harder corroboration.

**Principle:** soft signals point; hard signals prove. The best diagnoses pair a Tier 1
signal that *names the felt problem* with Tier 3 data that *proves it*.

---

## 2. The evidence pipeline

```
RAW DATA (13)
   → normalised metric
   → EVIDENCE SIGNAL (a pattern's named indicator, tagged with tier)
   → SIGNAL CONVERGENCE (multiple signals → one pattern)
   → COUNTER-EVIDENCE CHECK
   → CONFIDENCE SCORE (Confidence Model)
   → PRIORITY SCORE (Scoring Model)
   → SURFACED PATTERN (diagnostic / report)
```

Each pattern in the library lists its **Evidence Signals** and **Counter Evidence**
explicitly. This framework defines how those fields are sourced, tiered, and combined.

---

## 3. What makes a good evidence signal

A signal earns its place in a pattern only if it is:

1. **Observable** — it can actually be measured or captured from a real source.
2. **Discriminating** — its presence meaningfully distinguishes this pattern from others
   (a signal present in every business is useless).
3. **Tier-tagged** — we know how much to trust it.
4. **Falsifiable** — it has a counterpart in the pattern's Counter Evidence that could
   disprove the pattern.
5. **Sourced** — we know which integration or diagnostic step provides it.

If a candidate signal fails any of these, it does not belong in the pattern — it goes to the
`Backlog.md` as a "wished-for signal" pending a data source.

---

## 4. Evidence sufficiency rules

To prevent false positives, the framework sets minimum-evidence rules per confidence band:

| To reach… | Requires… |
|---|---|
| **Confirmed (80+)** | ≥1 Tier 3 signal + ≥2 converging signals + counter-evidence ruled out |
| **Probable (60–79)** | ≥1 Tier 2 signal + ≥2 converging signals + counter-evidence at least checked |
| **Possible (40–59)** | ≥1 signal of any tier, not yet corroborated |
| **Speculative (<40)** | Hypothesis only |

A pattern resting entirely on Tier 1 anecdote **cannot** exceed Possible — no matter how
compelling the story. This is the rule that keeps Growmerce evidence-based rather than
opinion-based.

---

## 5. Evidence freshness

Stale evidence is weak evidence. Each signal carries a recency expectation:
- **Real-time / weekly** for operational signals (stock, ranking, checkout, ad performance).
- **Monthly** for trend signals (margin trend, cohort behaviour, share-of-search).
- **Per-engagement** for structural signals (cost structure, positioning).

Signals beyond their freshness window incur the Ambiguity Penalty in the Confidence Model.

---

## 6. Evidence and the path to SaaS

The Evidence Framework is also the **specification for automated detection**. When every
pattern's signals are observable, tiered, and sourced to an integration, an AI agent (07) can
collect them and run the same evidence → convergence → counter-check → confidence pipeline
without a human. The framework is therefore not just a quality gate today — it is the
blueprint for the future detection product. (See `Pattern_to_AI_Agent_Mapping.md` and
`Pattern_to_Tool_Mapping.md`.)

---

## 7. Evidence governance

- Every pattern's Evidence Signals are reviewed for tier accuracy before the pattern is
  promoted past Hypothesis.
- New data integrations (13) are evaluated by which pattern signals they unlock or upgrade
  (e.g. moving a signal from Tier 2 inferred to Tier 3 measured).
- Counter Evidence is treated as first-class: a pattern with weak counter-evidence definition
  is incomplete and stays in the backlog.
