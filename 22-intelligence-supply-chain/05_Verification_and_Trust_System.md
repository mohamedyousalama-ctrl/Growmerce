# 05 — Verification & Trust System

> How Growmerce avoids hallucinations, bad recommendations, and confident-but-wrong conclusions.
> Verification is stage 3 of the supply chain and the most important quality gate before evidence is
> allowed to influence anything. This is the system that lets Growmerce *defend* its output — the
> credit-bureau discipline of "verify before you rate."

It operationalises and extends the Intelligence Brain's GUARD and False-Positive controls (20) into
the production pipeline.

---

## 1. The verification mandate

> No signal influences a conclusion, and no conclusion ships, until it has passed the verification
> appropriate to its tier and stakes.

Verification answers six questions, each mapping to a failure the system must prevent:

| Question | Failure it prevents |
|---|---|
| Is it **real**? | hallucination / fabrication |
| Is it **current**? | stale-data errors |
| Is it **what it claims**? | mis-attribution / mis-classification |
| Is it **consistent** with other evidence? | contradictions slipping through |
| Is it **sufficient**? | weak-evidence / overclaiming |
| Is it **complete enough**? | missing-context decisions |

---

## 2. How Growmerce avoids hallucinations

Hallucination = asserting something not grounded in evidence. The supply chain blocks it
structurally, not by hoping the AI behaves:

- **Grounding requirement (GUARD G1, 20):** every claim must trace to a logged signal with
  provenance. No provenance → it cannot be stated as fact. Inference is allowed *and labelled as
  inference* (Tier 5); fabrication is not.
- **Tier ceiling (03):** the AI's own assumptions are Tier 5 — they can raise a hypothesis but can
  never assert a fact or override evidence. This is what stops "the AI sounded sure" from becoming a
  conclusion.
- **Extraction verification:** anything the AI *extracts* (from a screenshot, PDF, review text, URL)
  is treated as a *claim about the source*, re-checkable against the source, and flagged if it can't
  be confirmed. AI extraction is a known failure mode (08), so its outputs are verified, not trusted.
- **Abstention is allowed (and required):** when grounding is insufficient, the system says "we
  can't determine this yet" rather than inventing an answer (the Brain's calibrated abstention, 20).

> The result: the AI is used as an *instrument inside a verified pipeline*, never as an oracle whose
> word is taken. That single architectural choice is the difference between Growmerce and an "AI
> wrapper."

---

## 3. How Growmerce detects weak evidence

- **Tier check (03):** evidence is tagged by tier; the Evidence Scoring Engine (06) caps weak-tier
  influence and caps confidence for conclusions resting on Tier 4–5.
- **Sufficiency check (GUARD G2, 20):** a conclusion needs the minimum evidence for its confidence
  band (convergence + at least one adequate-tier signal for High+). Below threshold → it stays a
  hypothesis or abstains.
- **Independence check:** correlated signals from one source aren't counted as convergence (anti
  double-counting) — weak evidence wearing the costume of "multiple signals" is unmasked.
- **Coverage check (04):** the system knows which signal categories are thin/absent for this
  business and refuses to be confident about a dimension it can't see.

---

## 4. How Growmerce identifies contradictions

Contradictions are detected and *resolved by rule*, never by picking the convenient answer:

1. **Cross-signal consistency:** new evidence is checked against existing evidence for the same
   entity/fact. Disagreements are flagged, not averaged away.
2. **Resolution by hierarchy (03, R1):** the higher-tier / higher-precedence source wins; the loser
   becomes a recorded counter-signal.
3. **Belief-vs-data gaps:** when a Tier-4 claim contradicts Tier 1–2 data, the *gap itself* is
   promoted to a finding (often a valuable one — "you believe retention is healthy; the data
   disagrees").
4. **Unresolved contradictions lower confidence:** if two comparable-strength sources genuinely
   conflict, the conclusion is held at lower confidence and the conflict is disclosed — never hidden
   (GUARD G6, 20).

---

## 5. How Growmerce identifies missing information

- **Required-evidence map:** each pattern (19) declares the signals it needs; absent signals are an
  explicit gap, not a silent assumption.
- **Coverage tracking (04):** per business, the system maintains what's present/thin/absent by
  signal category and tier.
- **"What would change this" is mandatory:** every finding states the missing evidence that would
  raise (or overturn) it — turning a gap into a next step (the honesty-as-funnel mechanic, 21).
- **Absence-as-evidence (Evidence Hierarchy R7, 20):** if a pattern *should* produce a signal and it
  isn't there, that weakens the pattern — missing information is itself informative.

---

## 6. How Growmerce identifies low-confidence conclusions

Confidence is *computed* (06), not asserted, so low confidence is detected by construction:
- A conclusion below the **Medium floor** is not surfaced as a finding — it's an internal watchlist
  item or an abstention.
- Low confidence is **expressed honestly** in the four-band language ("an early signal worth
  checking," "we strongly suspect… here's how we'd confirm") — never dressed up as certainty.
- Low-confidence findings, when surfaced, are paired with the **cheap test** that would resolve them
  (act-to-learn) rather than presented as conclusions.

---

## 7. The bias controls (verification against the analyst's own mind)

Verification guards not just the data but the *reasoning* (the Brain's bias catalogue, 20):
- **Confirmation bias** → mandatory search for disconfirming evidence; counter-evidence is required
  before a finding.
- **Anecdote/recency bias** → tier + freshness rules; one vivid input can't drive a conclusion.
- **Double-counting** → independence checks on convergence.
- **Narrative bias** → provenance requirement; a tidy story must survive the evidence.
- **Severity inflation** → threats require a trajectory test + counter-check before being raised
  (calm, not alarmist — 20/21).

---

## 8. The verification ladder by stakes

Verification intensity scales with stakes (efficiency + safety):

| Stakes | Verification |
|---|---|
| Low-impact, high-confidence, well-trodden | automated checks; proceed |
| Medium confidence / high impact / novel context | deeper cross-checks + flagged for human review |
| Critical threat / large irreversible recommendation / sparse data | **human expert verification required** (20's Human Override) |
| AI extraction from messy/sensitive sources | re-verify against source before use |

---

## 9. The trust output

Every conclusion that exits verification carries a **trust record**:
- its evidence and tiers,
- its confidence (computed),
- the contradictions considered and how resolved,
- the missing information and what would change the conclusion,
- whether a human verified it.

This trust record is what makes the output *defensible* — when a customer asks "how do you know?",
the answer is the record, not "the AI said so." (Communicated visually per
`03-brand-identity/Trust_and_Confidence_Visual_Language.md` and verbally per
`21-brand-narrative-system/Trust_Language_Framework.md`.)

> Verification is why Growmerce can keep its central promise — *evidence first, and we tell you how
> sure we are* — at production scale. It is the difference between an intelligence firm and a
> confident guess.
