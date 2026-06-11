# 06 — Recommendation Object

> The software form of a prioritised action (20). A `Recommendation` is knowledge (a playbook, 04)
> applied to a confirmed Pattern (05) / Opportunity (07) / Threat (08) in a specific business,
> carrying priority, impact, risk, dependencies, confidence, and links to execution.

Inherits `BaseObject` (01).

---

## 1. Purpose

To represent "do this, here, in this order, for this reason, at this confidence — and here's the
expected result and how we'll know it worked." It is the terminal output of reasoning and the input
to execution, and its outcome closes the learning loop (a new Signal → Knowledge).

---

## 2. Schema

```
Recommendation extends BaseObject
  subject_ref       ObjectRef    # the Business (09)
  addresses         list<EdgeRef>    # the Pattern(05)/Opportunity(07)/Threat(08) it resolves
  playbook_ref      ObjectRef    # the KnowledgeCard(playbook) it applies (04) — MANDATORY
  action            string       # concrete, contextualised ("enable guest checkout")
  tier              enum         # quick_win | strategic | operational (19/20)
  # prioritisation
  priority          Priority     # band + score (see §3)
  sequence_index    int          # position in the plan (dependency-aware)
  impact            ImpactEstimate   # revenue + profit ranges (separated), recoverability
  effort            Effort       # { size: low|med|high, resources, skills }
  risk              RiskEstimate # downside/likelihood of the action itself (see §3)
  confidence        Confidence   # (11) inherited from the finding it addresses
  # dependencies & execution
  depends_on        list<ObjectRef>  # other Recommendations that must precede
  blocks            list<ObjectRef>
  success_measure   SuccessMeasure   # the Signal/metric that proves it worked — MANDATORY
  execution_ref     ObjectRef?       # link to the execution/engagement record (12, ops)
  contextualisation list<{factor, adjustment}>  # how the generic playbook was adapted to this business
  # lifecycle
  status            enum         # DRAFT | VALIDATED | SURFACED | ACCEPTED | IN_EXECUTION | DONE | DISMISSED
  outcome           Outcome?     # populated post-execution (see §3)
  # (inherited) id, provenance, version, tenant_scope, metadata
```

```
Priority   { band: now|next|plan|watch, score: 0..100, rationale }
RiskEstimate { downside: enum, likelihood: 0..1, reversibility: enum, notes }
SuccessMeasure { signal_category, target_attribute, expected_direction, expected_magnitude_range, window }
Outcome    { measured_change, attributed_fraction, confounders[], verdict: worked|partial|no_effect|worse,
             measured_at, becomes_signal_ref }
```

---

## 3. Attributes (semantics)

- `playbook_ref` is **mandatory**: a Recommendation may only apply a validated playbook (Knowledge,
  04) — no improvised advice (the GUARD rule, 20/22). Novel ideas go to backlog as candidate
  knowledge, not to a client.
- `priority.score` = `(impact value or threat severity) × confidence × recoverability ÷ effort`,
  then re-ordered by the operator overrides (stop bleeds → dependencies → trust win → compounding)
  into `sequence_index` (20).
- `impact` separates revenue and profit (H1); `risk` is about the *action's* downside (distinct from
  a Threat object, which is a situation).
- `success_measure` is **mandatory** — it names the Signal (02) that will later confirm the outcome,
  enabling the learning loop (the field without which compounding stalls, 22/23).
- `contextualisation` records how the generic playbook was adapted (the H6 context discipline, 20).

---

## 4. Relationships (edges, see 10)

```
Recommendation --addresses-->     Pattern (05) | Opportunity (07) | Threat (08)
Recommendation --applies-->       KnowledgeCard(playbook) (04)
Recommendation --intervenes_on--> CommerceEntity (09)
Recommendation --depends_on-->    Recommendation
Recommendation --produces-->      Outcome --becomes--> Signal (02)   # closes the loop
Recommendation --part_of-->       Plan (the sequenced set for a business)
```

---

## 5. Lifecycle

```
DRAFT → VALIDATED → SURFACED → ACCEPTED → IN_EXECUTION → DONE ──> Outcome → Signal (02)
   │        │                                                  └─> (verdict feeds Knowledge 04)
   └────────┴──> DISMISSED   (out of scope / rejected — reason logged)
```

VALIDATED requires the quality checkpoint (22 §09): traces to a finding + a validated playbook,
feasible, confidence-appropriate framing, sequenced, success_measure defined. DONE triggers outcome
measurement → a new Signal → Knowledge update.

---

## 6. Confidence

`confidence` (11) is inherited from the finding it addresses (a Recommendation can't be more certain
than the diagnosis behind it). A Medium-confidence finding yields a Recommendation framed as a "cheap
test that also confirms," not a command (20/21). No outcome guarantees (a hard guardrail).

---

## 7. Versioning

- Versioned through its lifecycle (priority/sequence can change as the plan evolves or new findings
  arrive); each change recorded (12).
- Pins the **versions** of the `playbook_ref` and the finding it addressed — so a past Recommendation
  remains explainable in terms of the then-current knowledge and evidence.
- The `outcome` is an append-only addition, never an edit of the original recommendation.

---

## 8. Storage considerations

- Per-business, relational+graph; part of a `Plan` aggregate (the sequenced set).
- Index by `subject_ref`, `status`, `priority.band`, `addresses`.
- Outcomes are high-value, low-volume, and feed analytics/knowledge — replicate to the
  outcome/knowledge store.

---

## 9. Retrieval considerations

- Retrieved as a **sequenced plan** for a business (ordered by `sequence_index`, respecting
  `depends_on`), with each item's finding, evidence, confidence, and success_measure attached.
- Never retrieved as a bare action — the consumer sees *why* (the addressed finding) and *how sure*
  (confidence) (13).
- Outcome retrieval supports the learning loop and "did our recommendations work?" analytics.

---

## 10. Brain interactions (20)

- **DECIDE:** the Brain *creates* Recommendations by selecting playbooks for confirmed findings and
  contextualising them; computes priority and sequence.
- **GUARD:** the quality checkpoint validates before SURFACED (no ungrounded/guaranteed/infeasible
  advice).
- **ACT:** hands the sequenced plan to execution; records `execution_ref`.
- **LEARN:** reads `outcome` to update playbook effectiveness and pattern validation (Knowledge, 04)
  — the highest-value, exclusive learning signal (23 §11).

> The Recommendation is where the entire stack pays off: a validated playbook (knowledge) applied to a
> confirmed pattern (evidence + knowledge) at an honest confidence, sequenced by principle, with a
> defined success measure that turns its outcome back into knowledge. Every field exists to make the
> action trustworthy *and* to make the system learn from it.
