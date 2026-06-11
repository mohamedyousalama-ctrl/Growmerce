# 05 — Intelligence Runtime

> The most important runtime document. Step by step, what happens from the moment a user asks a
> question (or starts a diagnostic) to the moment a confidence-scored, evidence-backed recommendation
> is delivered. This is the Brain's cognition pipeline (20) realised as a concrete choreography of
> services (02), objects (24), and events (04).

---

## 1. The runtime in one line

> **Grounded retrieve → reason (bounded AI optional) → write grounded object → emit event → repeat,
> stage by stage, under GUARD gates, until a sequenced plan exists — or the system honestly
> abstains.**

The Reasoning Runtime (orchestrator, 02) owns the sequence; each intelligence service owns its object;
every step is auditable.

---

## 2. End-to-end walkthrough

A restaurant operator pastes their delivery-app link and asks "why aren't my orders growing?"

### Stage 0 — Request intake (Experience/Edge → Reasoning Runtime)
- Identity resolves the user + tenant; a `correlation_id` is created for the whole run.
- The Reasoning Runtime opens a **diagnostic session** and determines the question type → loads the
  relevant pattern families and knowledge scope (the *lens*, 23 §10). Knowledge tells it *what to look
  for* before any data is touched.

### Stage 1 — SENSE: capture signals (Signal Service)
- The pasted URL, profile answers, and any uploads are captured as `Signal` objects, each tagged with
  `source_tier` and capture metadata. The AI Gateway may **extract** structured signals from the page/
  screenshot (bounded; re-verified later). → `signal.created` events.
- Commerce Profile resolves subjects (this Business, its Channel=delivery app, its Products/menu).

### Stage 2 — GROUND: verify into evidence (Evidence Service + Retrieval + Knowledge)
- Each Signal is verified → `Evidence` (tiered, fresh, weighted). The Evidence Service **retrieves the
  relevant benchmark knowledge** (e.g. "expected menu-item visibility / availability impact") to
  interpret raw values into `claim`s. → `evidence.validated`.
- Coverage is assessed: what can we judge, what's missing? (e.g. "we can read menu/availability from
  the link; we can't judge profit without cost data"). Gaps are recorded honestly.

### Stage 3 — RECOGNISE: detect patterns (Pattern Service + Retrieval + Knowledge)
- The Pattern Service **retrieves candidate `pattern_def`s** for this context and tests their
  evidence-requirements/triggers against the business's Evidence. Matches become `Pattern` objects
  (HYPOTHESIS). e.g. "delivery menu hides hero items," "availability gaps on peak items." →
  `pattern.detected`.

### Stage 4 — INTERACT: relate patterns (Pattern Service)
- Interaction edges are written: do patterns reinforce, conflict, compound, or cause one another?
  Compound findings are formed; causal heads identified (the intervention point). e.g. availability
  gaps → lower velocity → worse menu ranking (a causal chain).

### Stage 5 — ASSESS: score confidence + GUARD (Confidence Service + Reasoning GUARD)
- The Confidence Service computes each Pattern's `Confidence` from the weighted evidence balance,
  convergence (independence-checked), knowledge certainty, and counter-checks.
- **GUARD gates run:** grounding (every claim cites evidence), sufficiency (enough independent
  evidence), counter-evidence (the pattern_def's innocent explanations evaluated), context fit,
  conflict resolution. Caps applied (Tier-4-only → Medium; unresolved conflict → down-band).
- Patterns clearing the floor → `pattern.confirmed`; those failing → `pattern.ruled_out` (kept) or held
  as watchlist. If grounding is insufficient → **abstention recorded** for that question.

### Stage 6 — VALUE: opportunities & threats (Opportunity/Threat Services)
- Confirmed Patterns are valued: Opportunities (sized revenue+profit upside) and Threats (severity ×
  trajectory). Compounds escalate. e.g. Opportunity: "re-merchandise the menu to surface hero items";
  Threat: "availability gaps eroding rank (worsening)." → `opportunity.identified`/`threat.identified`.

### Stage 7 — DECIDE: recommendations + sequence (Recommendation Service + Knowledge)
- For each finding, the Recommendation Service **retrieves the validated `playbook`** (knowledge),
  contextualises it to this business, computes priority, and sequences the Plan (stop bleeds →
  dependencies → quick win → compounding). Each gets a `success_measure`. → `recommendation.generated`.
- **GUARD (recommendation checkpoint):** traces to a finding + a validated playbook, feasible,
  confidence-appropriate framing, no guarantees. Failing recs are reworked/dropped.

### Stage 8 — GUARD + deliver (Reporting Service)
- The report checkpoint runs (only ≥ Medium surfaced; provenance complete; evidence+confidence
  attached; revenue/profit separated; ruled-out present; guardrail scan). The Reporting Service
  renders the **executive decision brief**: headline diagnosis, system narrative, prioritised findings
  (each with evidence + confidence + impact + action), what's-not-wrong, next step. →
  `recommendation.surfaced`.

### Stage 9 — Human review (Consultation/Review, stakes-gated)
- High-stakes / low-confidence / novel findings are routed for expert sign-off before client surfacing
  (or before a consultation). Overrides are logged with reasons. → `human.override` if any.

### Stage 10 — ACT + LEARN (Execution + Memory, async)
- If the user proceeds, accepted Recommendations go to Execution; `action.completed` → Memory captures
  the `outcome.captured` (did the success_measure move?), attributes it, and writes an outcome Signal +
  Lesson → Knowledge. The system is now smarter for the next run (the feedback flow, 04 §5).

---

## 3. The per-stage micro-pattern (every stage is the same shape)

```
   ┌─ RETRIEVE (grounded, scoped, provenance+confidence attached) ─ Retrieval Service (06)
   │
   ├─ REASON   (rules/models/scoring; optionally the bounded AI Gateway for extract/draft) (10)
   │
   ├─ GUARD    (the relevant gate: grounding/sufficiency/counter-evidence/context/conflict) (20)
   │
   └─ WRITE    (new object + edges, with provenance + computed confidence + version) → emit EVENT (04)
```

This uniform micro-pattern is what makes the runtime auditable and the AI containable: at every stage
the inputs are retrieved objects, the output is a grounded object, and GUARD sits between reasoning and
writing.

---

## 4. How confidence is computed (runtime view)

At ASSESS (and recomputed whenever inputs change):
```
gather supports/contradicts edges for the target
  → weight each (tier × freshness × directness)
  → sum, with convergence bonus for INDEPENDENT evidence (independence_key)
  → subtract counter-evidence; check counter-checks ruled out
  → factor knowledge certainty + track record (from Memory)
  → apply caps (tier, conflict, context, unverified)
  → map basis → band (Low/Med/High/Very High)  [recorded as a Confidence object, 24 §11]
```
The Confidence Service does this; the result, with its `basis`, travels with the object — never a bare
score.

---

## 5. How a recommendation is created (runtime view)

```
confirmed Pattern → Opportunity/Threat (sized/scored)
  → retrieve the validated playbook (Knowledge) for this pattern
  → contextualise (stage, constraints, what's already true)
  → priority = (value/severity × confidence × recoverability ÷ effort)
  → sequence into the Plan (operator overrides)
  → attach success_measure (the Signal that will confirm it)
  → GUARD checkpoint → surface
```
No playbook → no recommendation (a hard rule). Novel ideas become `knowledge.proposed`, not client
advice.

---

## 6. How output is delivered

- The Reporting Service assembles only floor-clearing findings into the executive brief, each carrying
  its evidence and confidence, with the honesty elements (missing data, ruled-out). Presentation is
  03/04; the Reporting Service produces the *content object*.
- The Consultation Service can carry the same findings into WhatsApp/human dialogue, where deeper
  evidence (more data) raises confidence — the fast-judgement → deep-diagnosis bridge.

---

## 7. Latency & modes

- **Fast-judgement mode** (lander/homepage/first scan): limited evidence; mostly Medium confidence;
  runs the pipeline quickly with whatever Signals exist; abstains where it must. Sub-second to seconds.
- **Deep-diagnosis mode** (connected data/engagement): full evidence; High/Very-High confidence; may
  run async with the feedback loop over time.
- The runtime is the same; only the evidence depth and the resulting confidence differ (consistency
  across modes is a trust property, 20).

---

## 8. What this runtime guarantees

- **Every conclusion is grounded** (retrieved objects, cited) and **confidence-scored** (computed,
  capped).
- **GUARD sits before every write** — no ungrounded/overclaimed/unsafe object is created.
- **Abstention is a valid terminal state** — "we can't determine this yet" is produced, not faked.
- **The whole run is one correlation** — fully traceable via events (04) and lineage (09).
- **Outcomes feed back** — the runtime makes the system smarter each time it runs.

> The Intelligence Runtime is the Brain (20) operating as software: a disciplined loop of grounded
> retrieval, bounded reasoning, GUARD, and grounded writes — producing trustworthy intelligence now and
> compounding knowledge over time. It is where the entire doctrine becomes an executing system.
