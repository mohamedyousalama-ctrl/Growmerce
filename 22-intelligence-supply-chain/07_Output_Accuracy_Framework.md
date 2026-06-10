# 07 — Output Accuracy Framework

> The core document. It answers the question the whole workstream exists for: **what determines
> whether a Growmerce output is accurate — and why are some outputs more accurate than others?**
> It is a formal model of output quality, built on everything upstream (signals, tiers, acquisition,
> verification, scoring) and connected to the Brain (20).

If the customer's real question is *"why should I trust this recommendation?"*, this framework is
the structured answer: trust scales with the factors below, and Growmerce can tell you, for any
given output, *how it scores on each.*

---

## 1. The accuracy thesis

> Output accuracy is not a property of "the AI." It is an **emergent property of the supply chain** —
> determined by the quality and coverage of inputs, the strength and convergence of evidence, the
> rigour of verification, the calibration of the engine, and the validation of outcomes. Improve any
> link and accuracy rises; starve any link and it falls.

This is why Growmerce reasons about *its own output quality* explicitly — the same way a credit
bureau rates the confidence of a rating, not just the rating.

---

## 2. The accuracy model (the formal version)

Output accuracy for a given conclusion is a function of eight factors:

```
Output Accuracy = f(
   Input Quality,        # are the inputs real, fresh, high-tier?
   Signal Quality,       # are the signals direct, clean, well-classified?
   Coverage,             # do we have the signal categories this conclusion needs?
   Evidence Density,     # how much independent, converging evidence supports it?
   Pattern Confidence,   # how well-established and counter-checked is the pattern?
   Recommendation History,# how have recommendations like this performed before?
   Human Validation,     # has an expert reviewed it where stakes warrant?
   Execution Outcomes    # have past fixes of this kind actually moved the number?
)
```

Each factor is something the supply chain *measures*, so accuracy is estimable per output, not just
asserted. They fall into three groups: **inputs** (1–3), **reasoning** (4–5), and **validation**
(6–8).

---

## 3. The eight factors

### Input factors (what enters the chain)

**1. Input quality** — are the inputs real, current, and high-tier (03)?
- High when first-party verified data (Tier 1–2) is present and fresh; low when resting on claims or
  stale screenshots. *Garbage in, garbage out — the chain can verify and tier, but it can't conjure
  evidence that isn't there.*

**2. Signal quality** — are the signals direct, clean, correctly extracted and classified (02, 05)?
- High when measured directly and verified; lowered by extraction errors, ambiguity, mis-
  classification.

**3. Coverage** — do we have the signal categories this conclusion *requires* (02, 04)?
- A profit conclusion needs cost data; a conversion conclusion needs funnel data. **Coverage is a
  hard ceiling**: you cannot be accurate about a dimension you have no evidence for. Gaps are
  surfaced, not papered over.

### Reasoning factors (how the chain reasons)

**4. Evidence density** — how much *independent, converging* evidence supports the conclusion (06)?
- The convergence principle: dense, independent, agreeing evidence → high accuracy; a single thin
  signal → low. Density of *kind* (independent, higher-tier), not raw count.

**5. Pattern confidence** — how well-established is the pattern, and was its counter-evidence checked
  (19, 20)?
- A confirmed, frequently-validated pattern with ruled-out counter-evidence yields more accurate
  findings than a novel, unproven one.

### Validation factors (what proves the chain right)

**6. Recommendation history** — how have similar recommendations performed across past engagements
  (20's learning loop)?
- Calibration from real history. A recommendation type with a strong track record is more
  trustworthy than an untested one.

**7. Human validation** — has an operator verified it where stakes warrant (20's Human Override)?
- Expert review on high-stakes/low-confidence/novel cases raises accuracy and catches what the
  automated chain missed.

**8. Execution outcomes** — have fixes of this kind actually *moved the number* before (02 execution
  signals)?
- The ultimate accuracy signal: outcomes that proved the conclusion-to-fix chain works. Exclusive to
  Growmerce, and the strongest possible validation.

---

## 4. Why some outputs are more accurate than others

Accuracy varies because the eight factors vary per output. Concretely:

| A *more* accurate output has… | A *less* accurate output has… |
|---|---|
| Tier 1–2 fresh inputs | only claims / stale screenshots |
| Full coverage of needed signals | missing key signal categories |
| Dense, independent, converging evidence | a single thin signal |
| A confirmed, counter-checked pattern | a novel, unproven pattern |
| Strong recommendation track record | an untested recommendation type |
| Human-validated (high stakes) | unreviewed |
| Backed by real execution outcomes | no outcome history |

This is also why **the same business gets more accurate output as it climbs the acquisition ladder
(04)** — a cold-visit scan (claims + a URL, partial coverage) honestly yields Medium-confidence,
lower-accuracy output; a connected, operating engagement (Tier-1 data, full coverage, outcome
history) yields High/Very-High, higher-accuracy output. The framework makes this honest and
explainable rather than hidden.

---

## 5. Accuracy is communicated, never hidden

Because accuracy is *modelled*, it is *surfaced*:
- Every output carries its **confidence** (06) and its **evidence/coverage basis** (05) — the
  customer sees how strong this particular conclusion is.
- Low-coverage or low-tier outputs are honestly framed ("we strongly suspect; here's what would
  confirm it") rather than overstated (21).
- This honesty is the trust mechanism: Growmerce doesn't claim uniform accuracy — it tells you, per
  output, how accurate it is and why. (Credit-bureau discipline: rate your own confidence.)

---

## 6. Why output quality improves over time

Accuracy compounds because several factors *strengthen with every engagement* (the supply chain is a
learning system, per 20):

```
each engagement →
   + more Tier-1 data connected            (Input Quality ↑)
   + better coverage across categories     (Coverage ↑)
   + more confirmed patterns + interactions(Pattern Confidence ↑)
   + recommendation track record grows     (Recommendation History ↑)
   + execution outcomes captured           (Execution Outcomes ↑)
   + engine recalibrated on outcomes        (Evidence Scoring better)
→ every future output is more accurate
```

Crucially, because Growmerce reasons in **transferable patterns (19)**, outcome learning from one
business improves accuracy for *all* businesses with the same pattern — accuracy compounds across the
whole base, not one client at a time. This is the mechanism behind "why does Growmerce get better
over time," and it is structural, not aspirational.

---

## 7. The accuracy guarantee (what Growmerce can honestly promise)

Growmerce does **not** promise that every output is certain — that would be the fabricated certainty
it rejects (21). It promises something more credible:

> Every output is scored on input quality, coverage, evidence density, pattern confidence, history,
> validation, and outcomes — and we tell you, honestly, how strong this particular conclusion is and
> what would make it stronger. The system is built so that accuracy is *visible, defensible, and
> improving* — not assumed.

That is the answer to "why should I trust your recommendation?": **not because it's AI, but because
it comes out of a supply chain that measures and proves its own accuracy.**
