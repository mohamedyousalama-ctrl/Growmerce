# Intelligence Learning Loop

> Stage LEARN of the cognition pipeline. The brain is not static — it gets measurably better
> with every engagement. This defines **how Growmerce becomes smarter over time**, and how
> delivery learnings flow back to improve diagnostics, patterns, recommendations, reports, and
> tools. It extends the Pattern Engine's Intelligence Compounding Model (19) into the full
> brain's learning architecture.

---

## 1. Why the brain must learn (and why it *can*)

A consultant's knowledge stays in their head and dies with the engagement. A generic AI's
knowledge is frozen at training time. The brain's knowledge **compounds**, because its unit of
learning is the **pattern** — a context-independent commercial reality (19). A lesson learned
about *Review Density Gap* in a beauty brand improves detection of the same pattern in an
electronics brand. Industry knowledge is siloed; pattern knowledge transfers. That transfer is
what makes learning compound across the entire client base rather than helping one client.

---

## 2. The closed loop

```
   SENSE→…→ACT  (an engagement runs the pipeline, produces findings + recommendations)
        │
        ▼
   MEASURE   did the recommendation's success_measure move? did the finding hold?
        │
        ▼
   ATTRIBUTE which part of the brain was right/wrong? (detection, sizing, sequencing, fix)
        │
        ▼
   UPDATE    write calibrated learning back into each subsystem
        │
        ▼
   ENCODE    version the change; it now improves every future engagement
        └────────────────────────────────────────────────────────► (next engagement is smarter)
```

The loop is only as good as MEASURE, which is why every recommendation carries a mandatory
`success_measure` (Recommendation framework) — without it, the brain can't tell if it was right.

---

## 3. The four learning exhausts (captured every engagement)

| Exhaust | Question it answers | Improves |
|---|---|---|
| **Confirmation** | Was the finding actually true? | Detection accuracy → Confidence Model (track record) |
| **Outcome** | Did the fix work (success_measure moved)? | Fix effectiveness → Patterns (19) + Recommendation framework |
| **Signal** | Which evidence signals were most predictive? | Evidence Hierarchy weights + diagnostic design (06) |
| **Language** | Which framings drove client action/recognition? | Report + website framing (the "that's my business" copy) |

Capturing these is a **delivery requirement** (12), not an afterthought — a lightweight,
sustainable capture at the close of each diagnostic and delivery cycle. If capture lapses, the
loop stalls; so the capture is designed to be minimal and built into the workflow.

---

## 4. What each subsystem learns

### Diagnostics (06)
- Which questions/modules actually discriminated patterns vs. added noise → prune and sharpen.
- Which signals were missing when needed → drives new diagnostic asks and integration priorities.

### Patterns (19)
- New **interaction edges** (which patterns reinforce/conflict/cause — Interaction Model).
- New **candidate patterns** (recurring un-named realities across ≥2 contexts → Backlog → library).
- Refined **fix effectiveness** (which Quick Win / Strategic fix moved the number, by context).

### Recommendations
- Calibrated **impact/speed/ease** estimates (predicted vs. actual) → better ranking.
- Which **sequences** worked (did fixing the enabler first actually unlock the dependent?).

### Reports / framing
- Which **renderings** produced recognition and action → sharpened recognition copy (feeds the
  website brief in 19's Website Intelligence Usage and the future 04).

### Tools / detection
- Which signals are reliably available and predictive → prioritised for instrumentation and for
  the move from human detection toward automated agent detection (07) and future SaaS.

### Confidence & GUARD
- **Track record** per finding type updates the Confidence Model.
- Recurring **GUARD failure types** tighten evidence requirements where false positives cluster.

---

## 5. The pattern lifecycle, driven by learning

Learning is what moves a pattern rightward through its lifecycle (19):

```
Hypothesis → Observed → Confirmed → Instrumented → Automated
     │           │           │            │             │
   written    seen w/      proven     signals wired   agent detects
   from        evidence    across     to integrations  autonomously
   experience  once        ≥2 contexts (13)            (07 → SaaS)
```

Each engagement provides the evidence that promotes patterns along this path — and the further
right a pattern moves, the cheaper and faster it is to detect next time. This is the mechanism
by which the brain trends, over time, from human-led diagnosis toward automated intelligence.

---

## 6. Guardrails on learning (don't learn the wrong thing)

Learning can corrupt as well as improve, so it is itself governed:

- **No overfitting to one loud engagement.** Updates to a pattern's fixes/weights require
  corroboration across **≥2 contexts** before they're encoded (mirrors the new-pattern rule).
- **Confirmed evidence only.** Track record updates on measured outcomes, not anecdote.
- **Versioned + reversible.** Every encoded change is versioned, so a regression can be rolled
  back and learning is auditable.
- **Human review of significant updates.** Material changes to detection logic or fix libraries
  pass expert review (`Human_Override_and_Expert_Review.md`) before encoding — the human keeps
  the brain from learning a plausible-but-wrong lesson.
- **Drift monitoring.** If a previously reliable pattern starts producing GUARD failures or
  missed predictions, it's flagged for review rather than silently trusted.

---

## 7. The moat this creates

The loop is Growmerce's durable advantage. Competitors can copy a service or a framework; they
cannot copy **accumulated, calibrated pattern intelligence** built from hundreds of engagements
— the proven fixes, the calibrated confidence, the interaction graph, the recognition language.
Because the unit is the transferable pattern, the moat widens across *all* contexts at once, and
it widens faster the more Growmerce operates.

```
time + engagements → more confirmed patterns + richer interaction graph
                   → better-calibrated confidence + tighter false-positive control
                   → more proven fixes + sharper recognition
                   → a compounding intelligence moat no competitor can shortcut
```

---

## 8. Output of the LEARN stage

After every engagement, the loop produces:
1. A measured scorecard (which findings held, which fixes worked).
2. Encoded, versioned updates to the affected subsystems.
3. New backlog items (candidate patterns, missing signals, framing improvements).
4. Any drift/regression flags for human review.

This is how Growmerce becomes, engagement by engagement, a better commerce operator than it was
the day before — automatically, and across every business it will ever help.
