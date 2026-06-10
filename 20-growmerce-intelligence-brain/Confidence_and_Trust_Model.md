# Confidence & Trust Model

> Stage ASSESS of the cognition pipeline, and the layer that makes everything else credible.
> Every finding the brain produces carries a confidence level: **Low, Medium, High, or Very
> High.** This document defines those levels and — most importantly — the **exact conditions
> that move a finding between them.** It operationalises the Pattern Confidence Model (19) into
> the brain's four-band operator language.

---

## 1. Why confidence is a first-class output

An operator's credibility comes as much from *calibrated doubt* as from being right. Saying
"I'm certain" when you're not destroys trust the first time you're wrong; saying "I strongly
suspect, here's how we'd confirm" builds it (heuristic H10). So confidence is not metadata — it
is part of the finding, shown to the client, and it gates what may be claimed.

The brain reports confidence in **operator language**, backed by a 0–100 score:

| Band | Score | What it means | How it's said to a client |
|---|---|---|---|
| **Very High** | 85–100 | Proven; we'd stake the engagement on it | "The data clearly shows…" |
| **High** | 70–84 | Strongly evidenced; act on it | "The evidence strongly indicates…" |
| **Medium** | 50–69 | Probable; worth raising, confirm before betting big | "We strongly suspect… and here's how we'd confirm it" |
| **Low** | <50 | Suggestive; internal watchlist only | (not surfaced as a finding) |

**Client-facing floor: Medium (50).** Below it, a finding is investigated, not presented.

---

## 2. What confidence is built from

Confidence aggregates six factors (extending 19's model). Each contributes; **no single factor
can produce a high band alone.**

| Factor | Raises confidence when… |
|---|---|
| **Evidence strength** | Backed by Tier 3 hard data (vs. Tier 1 anecdote) |
| **Signal convergence** | Multiple *independent* signals agree (H4) |
| **Counter-evidence ruled out** | The innocent explanations were checked and failed (H5) |
| **Context fit** | The finding is plausible for this category/model/stage (H6) |
| **Pattern interaction support** | Reinforcing patterns present; no unresolved conflict |
| **Track record** | This finding's detection logic has been right before (Learning Loop) |

And it is **lowered** by an ambiguity penalty: noisy data, partial counter-evidence,
staleness, unresolved pattern conflict, or single-source reliance.

---

## 3. The exact conditions to move between levels

This is the heart of the document. A finding moves bands **only** when these conditions are met.

### → Move UP to **Very High** (from High)
ALL of:
- ≥1 **Tier 3** signal directly measuring the claim, **and**
- ≥2 **independent** converging signals (not derived from the same source), **and**
- Counter-evidence explicitly **checked and ruled out**, **and**
- Evidence is **fresh** (within its validity window), **and**
- **Context fit** is strong, **and**
- No unresolved pattern **conflict**.

### → Move UP to **High** (from Medium)
ALL of:
- ≥1 Tier 3 signal **or** ≥3 converging Tier 2 signals, **and**
- Counter-evidence **checked** (even if not every branch fully closed), **and**
- Context fit at least neutral, **and**
- Any pattern conflict **resolved** in this finding's favour by evidence.

### → Reach **Medium** (the surfacing floor)
ALL of:
- ≥2 converging signals (any tier), **and**
- Counter-evidence at least **considered**, **and**
- No higher-tier signal actively **contradicts** it.

### → Held at **Low** (not surfaced)
- Single signal, or Tier 1 only, or counter-evidence unchecked, or a higher-tier signal
  contradicts it, or context fit is poor.

### Forced DOWNGRADES (override the above)
A finding is moved **down** regardless of other factors when:
- A **higher-tier signal contradicts** it → cannot exceed Medium (and may drop to Low).
- Counter-evidence is **partially present** (an innocent explanation is plausibly true) →
  cap at Medium.
- Key evidence is **stale** → down one band.
- It rests **entirely on Tier 1** evidence → **hard cap at Medium**, no exceptions.
- An unresolved **pattern conflict** exists → down one band until resolved.
- Required **context is missing** → cannot be surfaced at all (GUARD: missing-context error).

> These downgrade rules are deliberately stricter than the upgrade rules. The brain is
> **asymmetric**: it is hard to become confident and easy to lose confidence. That asymmetry is
> what stops it behaving like generic AI, which is confident by default.

---

## 4. Worked example (band movement)

Finding: *Products That Lose Money After True Costs* for a high-volume SKU.

- Start: founder says "this is our bestseller, it's doing great" (Tier 1) → hypothesis, **Low**.
- Add: order data + gross margin (Tier 3) shows healthy gross margin → still not the true number;
  **Low/Medium**, counter-explanation (overhead mis-allocation) not yet ruled out.
- Add: fully-loaded contribution (Tier 3) is negative; shipping > margin confirmed; consistent
  over 6 months (historical, R2) → ≥1 Tier 3 + convergence → **High**.
- Rule out: checked the loss-leader/attach defence — no profitable attach exists → counter-
  evidence ruled out → **Very High**.
- Note the belief-vs-data gap (founder thought it was a winner) is recorded and itself surfaced.

Final: **Very High**, said as "the data clearly shows this bestseller loses money after true
costs," with the gross-vs-true waterfall as provenance.

---

## 5. Confidence and the two cognition modes

- **Fast judgement** (lead magnet / first call): mostly Tier 1–2 evidence → most findings cap at
  **Medium**, presented honestly as "strong suspicion, confirmable." This is correct, not a
  weakness — it sets up the deep diagnosis as the natural next step.
- **Deep diagnosis** (paid, instrumented): Tier 3 available → findings reach **High/Very High**.

Crucially, deep diagnosis **confirms and sharpens** what fast judgement suspected; it should not
contradict it without genuinely new evidence. Consistency across modes is itself a trust asset.

---

## 6. How confidence is expressed (never just a number)

- Always the **band + the reason** ("High, because fully-loaded contribution is negative across
  six months and there's no profitable attach").
- Medium findings are framed as **smart cheap tests** ("do this low-risk thing; it helps and it
  confirms the diagnosis").
- The brain states, per finding, **what would change its mind** (the live counter-evidence) —
  this is calibrated doubt made explicit, and it is a feature.

Confidence is the promise behind every Growmerce conclusion: we will tell you not just what we
think, but exactly how sure we are and why — and we will be harder on ourselves than a generic
tool would ever be.
