# Pattern Confidence Model

> How sure are we that a detected pattern is *actually present*? Confidence is what stops
> Growmerce from confidently telling a client they have a problem they don't have. A wrong
> diagnosis delivered with certainty destroys trust faster than no diagnosis at all.

Confidence is a **0–100 score per detected pattern**, built from named, auditable factors. It
feeds directly into the `Pattern_Scoring_Model.md` (as the 0.0–1.0 confidence multiplier) and
gates whether a pattern is shown to the client at all.

---

## 1. The confidence equation (conceptual)

```
Confidence = Evidence Strength
           + Signal Convergence
           + Counter-Evidence Check
           + Context Fit
           + Track Record
           − Ambiguity Penalty
```

Each factor contributes points toward 100. They are summed and clamped to 0–100. The factors
are designed so that **no single signal can produce high confidence** — patterns must clear
multiple independent checks.

---

## 2. The factors

### Evidence Strength (0–30)
How strong and direct is the evidence behind the pattern's signals? Scored using the tiers in
`Pattern_Evidence_Framework.md`:
- Confirmed hard data (Tier 3): up to 30
- Derived/inferred signal (Tier 2): up to 20
- Soft/anecdotal signal (Tier 1): up to 10

### Signal Convergence (0–25)
Do *multiple independent* evidence signals point to the same pattern? A pattern with three
converging signals is far more trustworthy than one resting on a single metric.
- 3+ independent converging signals: 25
- 2 converging signals: 15
- 1 signal only: 5

### Counter-Evidence Check (0–20)
Have we actively checked the pattern's listed **Counter Evidence** and found it absent?
- Counter-evidence explicitly checked and ruled out: 20
- Not yet checked: 0 (and the pattern is flagged "unverified")
- Counter-evidence partially present: negative — see Ambiguity Penalty

This factor operationalises the non-negotiable Counter Evidence field. **A pattern that
hasn't had its counter-evidence checked cannot exceed medium confidence.**

### Context Fit (0–15)
Does the pattern make sense given the business's context (category, model, stage, channel
mix)? A pattern can be statistically present but contextually implausible.
- Strong contextual fit: 15
- Neutral: 8
- Weak/implausible fit: 0

### Track Record (0–10)
How well has this pattern's detection logic predicted reality in past engagements? This is the
factor that **grows over time** and powers the `Intelligence_Compounding_Model.md`.
- Strong historical precision: 10
- Some history: 5
- New/unproven detection: 0

### Ambiguity Penalty (0 to −25)
Subtracted when the evidence is noisy, the counter-evidence is partially present, the data is
stale, or the pattern overlaps ambiguously with another. Forces honesty about uncertainty.

---

## 3. Confidence bands

| Band | Score | Meaning | Action |
|---|---|---|---|
| **Confirmed** | 80–100 | We're highly confident it's real. | Surface prominently; act. |
| **Probable** | 60–79 | Likely real; worth raising. | Surface with appropriate hedging. |
| **Possible** | 40–59 | Suggestive, not proven. | Internal watchlist; gather more evidence. |
| **Speculative** | <40 | Insufficient basis. | Do not surface to client. |

**Default confidence floor for client-facing surfacing: 60 (Probable).** Below that, the
pattern is investigated further, not presented as a finding.

---

## 4. How confidence is expressed to the client

Confidence is never hidden behind a number alone — it's translated into honest language:

| Band | Language in a report |
|---|---|
| Confirmed | "The data clearly shows…" |
| Probable | "The evidence strongly suggests…" |
| Possible | "We're seeing early signs of… and recommend confirming by…" |

This honesty is a feature. Telling a client *"we strongly suspect, and here's how we'd
confirm it"* builds more trust than false certainty — and sets up a natural next step
(deeper diagnostic / data access) that benefits both sides.

---

## 5. Worked example

Pattern: **Review Density Gap** detected for a marketplace seller.
- Evidence Strength: lifetime-vs-recent review data is hard data (Tier 3) → 28
- Signal Convergence: review recency gap + rank decline + competitor recency advantage = 3
  signals → 25
- Counter-Evidence Check: checked "rank stable despite low recency" — false; rank *is*
  declining → ruled out → 20
- Context Fit: competitive marketplace where recency is weighted → strong → 15
- Track Record: detection logic has been right before → 8
- Ambiguity Penalty: data is current, signals clean → 0

```
Confidence = 28 + 25 + 20 + 15 + 8 − 0 = 96 → Confirmed
```

This pattern is surfaced prominently and described with "the data clearly shows."

---

## 6. Why confidence and scoring are separate

A pattern can be **high confidence, low priority** (we're sure it's there, but it barely
matters) or **high priority, low confidence** (huge if true, but we're not sure). Collapsing
them into one number hides exactly the distinction an operator needs. Keeping them separate
lets the system say the most useful thing of all: *"This could be your biggest problem, but
we need one more piece of data to be sure — let's get it."*
