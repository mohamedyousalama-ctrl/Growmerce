# Recommendation Generation Framework

> Stages DECIDE and ACT of the cognition pipeline. A finding is a diagnosis; a recommendation
> is a prescription. This defines **how recommendations are generated, prioritised, and wired
> to execution** — so that the brain's thinking becomes work, not advice.

---

## 1. From finding to recommendation

Every recommendation is generated *from a finding*, never invented freely. This is the rule
that keeps Growmerce's advice grounded and non-generic: the brain may only recommend fixes that
trace to a confirmed pattern's validated fix set (19).

```
Finding (confirmed pattern + evidence + confidence)
   → pull the pattern's Quick Wins / Strategic Fixes / Operational Fixes (19)
   → contextualise to this business (its category, stage, constraints)
   → size the expected outcome (from the leak/opportunity sizing)
   → attach confidence + provenance
   = Recommendation
```

A recommendation that cannot point back to a finding and a validated fix is **blocked at GUARD**
as an ungrounded suggestion. New fix ideas that aren't yet in the pattern library go to
`Backlog.md` for human/expert review — they are not improvised at a client.

---

## 2. Anatomy of a recommendation

```
Recommendation {
  finding_ref            // the diagnosis it solves
  action                 // specific, concrete ("enable guest checkout", not "improve checkout")
  tier                   // Quick Win | Strategic | Operational
  expected_outcome       // sized, in a range, with the metric it moves
  confidence             // inherited from the finding (Trust Model)
  effort / resources     // time, spend, skill
  dependencies           // what must happen first
  sequence_position      // where it sits in the plan
  delivery_route         // Service Package (11) / Growth Ops motion (12)
  success_measure        // the signal that proves it worked (closes the learning loop)
  provenance             // signal → evidence → pattern → finding → this action
}
```

The `success_measure` is mandatory: every recommendation names the evidence signal that will
confirm it worked, which is what lets the Learning Loop later score whether the brain was right.

---

## 3. The three tiers (cadence)

| Tier | Purpose | Timeframe | Maps to |
|---|---|---|---|
| **Quick Win** | Fast, visible, low-risk — earn trust (H8) | Days | Pattern Quick Wins (19) |
| **Strategic** | The durable fix to the root cause | Weeks–quarter | Pattern Strategic Fixes (19) |
| **Operational** | Process/system change so it doesn't recur | Ongoing | Pattern Operational Fixes (19) |

Standard engagement shape: open with a Quick Win, deliver the Strategic fix as the core work,
install Operational fixes so the problem stays fixed after Growmerce leaves.

---

## 4. Prioritising recommendations

Recommendations inherit the sequencing of their findings (`Opportunity_Ranking_Framework.md` and
`Risk_and_Threat_Framework.md`) and are then ordered by the operator overrides:

```
1. Stop active bleeds & Critical threats first
2. Respect dependencies (enablers before dependents)
3. One Quick Win early for trust
4. Prefer compounding fixes on ties
```

The output is a **single sequenced plan** merging opportunities and threats — never two
disconnected lists. Each item states *why it's there and why now*. This sequenced plan is the
same object that becomes the report spine and the delivery backlog.

---

## 5. Wiring recommendations to the rest of Growmerce

The brain's recommendations are the connective tissue across workstreams:

| Recommendation connects to… | How |
|---|---|
| **Diagnostics (06)** | Each rec traces back to the diagnostic module that detected its finding; gaps in evidence become follow-up diagnostic asks |
| **Reports** | The sequenced recommendation plan *is* the report's action section; each rec renders as problem → cost → fix → confidence |
| **Service Packages (11)** | Each rec's tier + effort maps to a productised package (Quick-Win sprint, Strategic build, Operational install) with defensible scope/pricing |
| **Growth Operations (12)** | The Strategic/Operational recs become the delivery backlog, executed as the pattern's fix playbook; `success_measure` defines done |
| **Lead Gen / Sales / TikTok (08/09/10/12)** | Findings + Quick Wins fuel the recognition content and sales conversation ("here's exactly what's happening, here's what we'd do first") |
| **Future SaaS** | A recommendation is the human-readable form of what an automated agent will one day emit continuously |

---

## 6. Contextualisation (why recs aren't boilerplate)

A pattern's fix is generic by design (transferable). The brain *contextualises* it to the
specific business before recommending:

- Adjust for **stage** (a pre-scale store gets different sequencing than a scaled one).
- Adjust for **constraints** (budget, team skill, platform — don't recommend what they can't do).
- Adjust for **what's already true** (don't recommend a fix already in place).
- Adjust **expected outcome** to *this* business's sizing, not a benchmark.

This is heuristic H6 (context) applied to prescription. A recommendation that ignores the
business's reality is a GUARD failure (the "missing-context" error).

---

## 7. Honesty in recommendations

- Each carries its **confidence** — a Quick Win off a Medium-confidence finding is offered as
  "low-risk test that also confirms the diagnosis," not as a certainty.
- Expected outcomes are **ranges with assumptions**, never false precision.
- Where confidence is Medium, the recommendation is often *"do this cheap thing, which both
  helps and tells us if the deeper finding is real"* — turning uncertainty into a smart next
  step (H10). This is a distinctly operator move: act to learn, cheaply, when unsure.

---

## 8. Output

The DECIDE/ACT stages emit, per engagement:
1. A set of grounded recommendations, each with the full anatomy above.
2. A single **sequenced plan** (opportunities + threats merged, ordered with stated reasons).
3. **Delivery routing** for each (package + Growth Ops motion + success measure).
4. Full **provenance** per recommendation.

Outcomes against each `success_measure` feed the `Intelligence_Learning_Loop.md`, which is how
the brain learns which recommendations actually work, for which findings, in which contexts.
