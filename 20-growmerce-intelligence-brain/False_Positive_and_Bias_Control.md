# False Positive & Bias Control

> Stage GUARD of the cognition pipeline — and, per the brief, **extremely important.** This is
> the immune system of the brain: the set of controls that stop Growmerce from hallucinating,
> assuming, over-claiming, or concluding without context. It is what makes the difference
> between an intelligence company and a confident chatbot.

A finding that has survived every prior stage still must pass GUARD before it can be surfaced.
GUARD's job is to **actively try to disprove the brain's own conclusion** before a client ever
sees it.

---

## 1. The five failure modes GUARD exists to prevent

| Failure mode | What it looks like | Why it's fatal |
|---|---|---|
| **Hallucination** | Asserting a fact not grounded in any signal | Destroys trust instantly; the generic-AI cardinal sin |
| **Weak assumption** | Concluding from one signal or an unverified input | Confident-but-wrong; the audit-tool sin |
| **Bad recommendation** | Advising a fix that doesn't fit the business or the finding | Wastes the client's resources; the consultant sin |
| **Incorrect conclusion** | Right symptom, wrong cause | Sends effort at the wrong target |
| **Missing-context decision** | Judging a number without the context that gives it meaning | "3% conversion is bad" — for what? |

GUARD has a specific control for each.

---

## 2. The GUARD gates (every finding must pass all)

### G1 — Grounding gate (anti-hallucination)
- **Rule:** every claim in the finding must trace to ≥1 logged signal with provenance. No
  provenance → not surfaced.
- **Check:** replay the `provenance` chain; if any link asserts something no signal supports,
  the claim is stripped or the finding is killed.
- **Hard line:** the brain may never state as fact anything it cannot point to. Inference is
  allowed *and labelled as inference*; fabrication is not.

### G2 — Sufficiency gate (anti-weak-assumption)
- **Rule:** enforce the Evidence Hierarchy sufficiency thresholds — no finding above Medium on a
  single signal; no finding at all on Tier 1 alone above Medium.
- **Check:** count independent converging signals (H4); verify they are genuinely independent
  (see double-counting control below).

### G3 — Counter-evidence gate (anti-incorrect-conclusion)
- **Rule:** the finding's innocent explanations must have been **explicitly checked** (H5). An
  unchecked counter-explanation caps confidence and, for threats, blocks surfacing.
- **Check:** for each pattern, was its "Counter Evidence" (19) tested against the data? Record
  the result. "Not checked" is treated as a failure, not a pass.

### G4 — Context gate (anti-missing-context)
- **Rule:** required context (category, model, stage, margin structure, channel mix, strategy)
  must be present for any metric-based judgement (H6). Missing required context → not surfaced.
- **Check:** is this number being judged against the *right* benchmark for *this* business?
  A conversion rate, return rate, or margin is meaningless without its context.

### G5 — Fit gate (anti-bad-recommendation)
- **Rule:** every recommendation must fit the business's constraints (budget, skill, platform,
  stage) and trace to a validated pattern fix. Generic or infeasible advice is blocked.
- **Check:** is the fix already in place? Can they actually execute it? Does it match the finding?

### G6 — Conflict gate
- **Rule:** unresolved pattern conflicts (Interaction Model) must be resolved or the finding is
  down-banded and the conflict disclosed. The brain never presents two contradictory findings as
  both confident.

A finding that passes G1–G6 may be surfaced at its (possibly reduced) confidence. A finding that
fails any gate is either repaired (more evidence), down-banded, parked on the watchlist, or
killed — and the reason is logged.

---

## 3. The cognitive-bias catalogue (and its control)

The brain is explicitly defended against the biases that corrupt commercial reasoning — both
human biases (from inputs) and model biases (from generative reasoning):

| Bias | How it creeps in | Control |
|---|---|---|
| **Confirmation bias** | Seeking signals that fit the first hypothesis | Mandatory counter-evidence (G3); the brain must look for disconfirming signals, not just confirming |
| **Anecdote bias** | Over-weighting a vivid founder story or one screenshot | Evidence Hierarchy R1/R8; Tier 1 cap at Medium |
| **Recency/snapshot bias** | Trusting one day/one view | R2 (historical > single), trajectory tests for threats |
| **Double-counting** | Two patterns from the *same* signal treated as convergence | Independence check in G2 — shared-source signals count once |
| **Narrative bias** | Preferring a tidy story over a messy truth | Provenance requirement (G1); the story must survive the evidence, not replace it |
| **Severity inflation** | Making threats scarier for effect | Threat trajectory + counter-check (Risk framework); honest bands only |
| **Availability bias** | Over-detecting patterns we've seen most recently | Track-record weighting is per-pattern and calibrated, not "what we saw last" |
| **Optimism/pessimism transfer** | Inheriting the founder's mood as fact | Belief is a Tier 1 signal, not a conclusion; belief-vs-data gaps are surfaced separately |
| **Anchoring on the ask** | Concluding what the client wants to hear | Recommendations must trace to findings, not to the client's preferred answer |

---

## 4. The "what would make me wrong?" discipline (the master control)

Above all gates sits one habit, applied to every significant finding (heuristic H5):

> Before surfacing, the brain writes down **what evidence would prove this finding wrong**, then
> checks whether that evidence is present. If it is, the finding is wrong or weaker than thought.

This single discipline prevents the majority of false positives, because it forces the brain to
argue *against* itself before speaking. It is the operationalisation of intellectual honesty,
and it is mandatory, not optional. The result of the check is stored on the finding and shown to
the client as "what would change our mind."

---

## 5. Calibrated abstention (the courage to say "we don't know yet")

A generic tool always produces an answer. The brain is allowed — and required — to **abstain**
when evidence is insufficient:

- "We can't determine this without [specific data]; here's how we'd get it."
- "Two explanations are equally supported; we won't guess — here's the test that distinguishes
  them."

Abstention is treated as a *correct* output, not a failure. An operator who says "I'd need to
see your numbers before I tell you" is more trustworthy than one who guesses. The brain's
willingness to not-conclude is one of its strongest credibility signals.

---

## 6. Surfacing thresholds (the final filter)

A finding reaches a client only if:
1. It passes G1–G6.
2. Confidence ≥ **Medium** (Trust Model floor).
3. Value/severity ≥ the relevant floor (Ranking / Threat framework).
4. Its provenance is complete and replayable.
5. Its counter-evidence record is attached.

Everything else stays internal (watchlist) or triggers a request for more evidence. The brain
shows the client its **considered-but-ruled-out** list too — naming what it checked and
dismissed is itself proof of rigour.

---

## 7. Governance and learning

- Every GUARD failure is **logged** with its reason; recurring failure types feed the
  `Intelligence_Learning_Loop.md` (e.g. a pattern that repeatedly produces false positives gets
  its evidence requirements tightened).
- **Human/expert review** (`Human_Override_and_Expert_Review.md`) samples surfaced findings and
  abstentions to catch failure modes the gates missed — the human is GUARD's backstop and trainer.
- New biases or failure modes discovered in the field are added to this catalogue; the immune
  system itself learns.

> GUARD is why a Growmerce conclusion can be trusted: not because the brain is never uncertain,
> but because it refuses to *sound* certain when it isn't, refuses to speak without evidence, and
> tries to prove itself wrong before it ever speaks to you.
