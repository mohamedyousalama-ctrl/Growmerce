# Human Override & Expert Review

> The brain is intelligent, not autonomous-by-default. A human commerce expert can intervene at
> any gate, override any conclusion, and every override trains the brain. This defines **where
> humans sit in the loop, what authority they have, and how their judgement becomes durable
> intelligence.** It is the backstop that keeps Growmerce operator-grade and the trainer that
> keeps it improving.

---

## 1. Why humans stay in the loop

Three reasons the brain is human-supervised, not human-replacing:

1. **Trust** — clients are betting real money on conclusions; an expert's sign-off is part of
   the product, especially early.
2. **Edge cases** — novel situations, sparse data, and genuinely ambiguous findings need
   judgement the brain hasn't yet learned.
3. **Training** — expert corrections are the highest-quality learning signal the brain can get
   (Learning Loop). The human is not overhead; the human is how the brain gets smart.

The long-run trajectory (Learning Loop §5) moves *routine* detection toward automation while
*keeping* humans on the edge cases and the high-stakes calls. Automation handles the patterns it
has earned the right to; humans handle the rest and supervise the whole.

---

## 2. Where humans can intervene (override points)

A human expert can act at every pipeline gate:

| Gate | Human override action |
|---|---|
| SENSE/GROUND | Add a signal the brain couldn't access; re-tier an input; flag an upload as unreliable |
| RECOGNISE | Add/remove a pattern match the brain missed or over-fired |
| INTERACT | Assert or veto an interaction edge (reinforce/conflict/causal) |
| ASSESS | Raise or lower a finding's confidence band, **with a reason** |
| VALUE | Re-rank an opportunity/threat; escalate or de-escalate severity |
| DECIDE | Edit, add, or remove a recommendation; change sequence |
| GUARD | Force-block a finding, or release one the gates over-blocked |
| ACT | Approve/hold the client-facing output |

**Every override is reasoned and logged.** An override without a recorded reason is not allowed —
because the reason is what the brain learns from.

---

## 3. Override authority and review tiers

Not every finding needs the same human touch. Review intensity scales with stakes:

| Tier | What it covers | Human role |
|---|---|---|
| **Auto-surface** | High/Very High confidence, well-trodden patterns, low stakes | Spot-check sample; brain proceeds |
| **Review-before-surface** | Medium confidence, high-impact findings, threats, novel context | Expert reviews and signs off before client sees it |
| **Expert-required** | Critical threats, large irreversible recommendations, sparse-data calls, conflicts | Expert must actively decide; brain advises only |
| **Abstention review** | The brain abstained (calibrated "we don't know yet") | Expert decides whether to investigate, gather data, or close |

The tiering is itself governed: a pattern earns *Auto-surface* status only after a strong track
record (Learning Loop) — the brain is trusted to act alone only where it has proven itself.

---

## 4. The override as a first-class training signal

When a human overrides the brain, the disagreement is gold. Each override records:

```
Override {
  finding_ref
  gate                 // where the human intervened
  brain_conclusion     // what the brain thought
  human_conclusion     // what the expert decided
  reason               // WHY (mandatory, structured)
  evidence_added       // any signal the human brought
  outcome (later)      // who turned out to be right, measured
}
```

This feeds the Learning Loop directly:
- If the **human was right**, the brain learns where its logic, evidence thresholds, or pattern
  matching failed → tighten that path.
- If the **brain was right** (human over-corrected), that's recorded too → avoid over-deferring,
  and build the case that this pattern can move toward Auto-surface.
- Patterns of override (e.g. experts consistently lowering confidence on a certain finding type)
  trigger a systematic fix, not a one-off correction.

> The brain treats every expert disagreement as a lesson, and every resolved disagreement as a
> permanent upgrade. Over time, the things experts used to override become things the brain gets
> right on its own.

---

## 5. Guardrails on the humans (override discipline)

Human-in-the-loop is not human-does-whatever. To keep overrides high-quality:

- **Reason required** — no silent overrides; the structured reason is mandatory.
- **Evidence-based** — an override should cite a signal or a context the brain lacked, not a
  hunch; "I just think so" is flagged for follow-up measurement.
- **Outcome-tracked** — overrides are scored against reality later, so chronically-wrong
  overrides surface just as chronically-wrong brain logic does. Experts are calibrated too.
- **No quiet overclaiming** — a human may not push a finding above its evidence to please a
  client; the Confidence Model and GUARD still apply to human-edited findings.

This symmetry — the brain checks the human, the human checks the brain — is what keeps the whole
system honest.

---

## 6. Client-facing transparency

- Where an expert has reviewed/signed off a high-stakes finding, that is a **trust signal** worth
  surfacing ("reviewed by a commerce specialist").
- Where the brain abstained or flagged low confidence, the human decision about next steps is
  shown honestly (gather data / test / proceed).
- The client never sees the internal override log, but they benefit from its result: conclusions
  that have passed both machine rigour and human judgement.

---

## 7. The end state

The target operating model:

```
Brain proposes  →  GUARD filters  →  Human supervises (tiered by stakes)  →  Client receives
        ▲                                      │
        └──────────  every override trains the brain  ◄─────────────────────┘
```

The brain does the breadth, speed, and consistency. The human does the judgement, the edge
cases, and the high-stakes calls — and teaches the brain as they go. Neither alone is
operator-grade; together they are. That is the design.
