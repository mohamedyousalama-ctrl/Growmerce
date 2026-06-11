# 04 — Event Architecture

> Everything that happens in Growmerce is an **event**. The supply chain (22) and the cognition
> pipeline (20) are realised as an event-driven flow: each stage emits a domain event the next
> consumes. Events are also the audit spine (09) and the substrate of the learning loop (07). This
> document defines the events, their producers, consumers, and payloads.

---

## 1. Why event-driven

- **Decoupling.** Services communicate through events, so the pipeline can evolve and scale stage by
  stage (Stripe/Bloomberg-grade pipeline design).
- **Auditability.** The event log is an immutable, ordered record of everything that happened — the
  lineage and audit substrate (09), and replay/recovery mechanism.
- **The learning loop is just events.** Outcomes are events that trigger knowledge writes (07/23) —
  compounding becomes ordinary event processing.
- **Backpressure & async.** Verification, reasoning, and learning can run async with retries; the
  forward flow degrades gracefully under load.

The **event log (03 store F)** is the source of truth for "what happened"; read models and projections
are derived from it (event-sourcing for the pipeline).

---

## 2. Event envelope (every event)

```
Event
  event_id        UUID
  event_type      enum        # see catalogue (§3)
  occurred_at     timestamp
  tenant_scope    ref         # business | shared | network
  producer        service
  subject_ref     ObjectRef   # the object this is about
  payload         typed       # event-specific (§3)
  provenance      Provenance  # how this came about (24 §01)
  causation_id    UUID?       # the event that caused this one (chains)
  correlation_id  UUID        # the request/diagnostic this belongs to
  version         int
```

`correlation_id` ties all events of one request together (a diagnostic run is one correlation);
`causation_id` chains cause→effect (signal.created → evidence.validated → pattern.detected …). Together
they make the whole pipeline traceable and the provenance DAG reconstructable from the log alone.

---

## 3. The event catalogue

### Ingestion events
| Event | Producer | Consumers | Payload |
|---|---|---|---|
| `profile.updated` | Commerce Profile | Signal, Pattern, Reasoning | entity refs changed |
| `signal.created` | Signal | Evidence, Audit | the Signal (subject, attribute, value, source_tier, capture meta) |
| `integration.synced` | Integration | Signal | batch of raw observations |

### Evidence events
| Event | Producer | Consumers | Payload |
|---|---|---|---|
| `evidence.validated` | Evidence | Pattern, Confidence, Audit | Evidence (claim, weight, tier, freshness, edges) |
| `evidence.rejected` | Evidence | Audit, Signal | reason, the failed Signal |
| `evidence.stale` | Evidence (sweep) | Pattern, Confidence | which Evidence aged out |
| `evidence.disputed` | Evidence | Reasoning, Audit | conflicting evidence + tiers |

### Knowledge events
| Event | Producer | Consumers | Payload |
|---|---|---|---|
| `knowledge.proposed` | AI Gateway / Reasoning | Knowledge, Human-review | candidate card (PROPOSED) |
| `knowledge.validated` | Knowledge | Pattern, Confidence | card promoted (certainty change) |
| `knowledge.deprecated` | Knowledge | Reasoning, Audit | card retired + dependents to re-evaluate |
| `benchmark.rederived` | Knowledge | Evidence, Confidence | updated benchmark values |

### Pattern / value events
| Event | Producer | Consumers | Payload |
|---|---|---|---|
| `pattern.detected` | Pattern | Reasoning, Opportunity, Threat | Pattern (HYPOTHESIS) + triggering evidence |
| `pattern.confirmed` | Pattern | Opportunity, Threat, Reporting | Pattern (CONFIRMED) + confidence |
| `pattern.ruled_out` | Pattern | Audit, Knowledge | the learned negative |
| `opportunity.identified` | Opportunity | Recommendation, Reporting | Opportunity + value estimate |
| `threat.identified` | Threat | Recommendation, Reporting | Threat + severity + trajectory |

### Recommendation / action events
| Event | Producer | Consumers | Payload |
|---|---|---|---|
| `recommendation.generated` | Recommendation | Reporting, Reasoning(GUARD) | Recommendation + playbook ref + confidence |
| `recommendation.surfaced` | Reporting | Consultation, Memory | what reached the client |
| `recommendation.accepted` | Consultation/Execution | Execution, Memory | accepted rec |
| `action.completed` | Execution | Memory, Audit | what was done |
| `outcome.captured` | Memory/Outcome | Knowledge, Confidence, Signal | measured change, attribution, verdict |

### Trust / governance events
| Event | Producer | Consumers | Payload |
|---|---|---|---|
| `confidence.computed` | Confidence | (object owner), Audit | basis + band + caps |
| `human.override` | Consultation/Review | Audit, Knowledge, Confidence | finding, human decision, reason |
| `ai.invoked` | AI Gateway | Audit | task, inputs (refs), outputs, citations |
| `guard.blocked` | Reasoning | Audit | what was blocked + which gate |
| `abstention.recorded` | Reasoning | Audit, Reporting | what we couldn't determine + what's needed |

---

## 4. The forward-flow event chain (one diagnostic)

```
profile.updated
   → signal.created (×N)
      → evidence.validated (×M)   [evidence.rejected/disputed handled]
         → pattern.detected → pattern.confirmed   [or pattern.ruled_out]
            → opportunity.identified / threat.identified
               → recommendation.generated → recommendation.surfaced
   (throughout: confidence.computed, ai.invoked, guard.blocked, abstention.recorded)
```

All share one `correlation_id` (the diagnostic run). The chain *is* the audit trail of that diagnosis.

---

## 5. The feedback-flow event chain (learning)

```
recommendation.accepted → action.completed → outcome.captured
   → (Memory) becomes a new signal.created (execution category) AND a knowledge lesson
      → knowledge.validated (if it promotes) / benchmark.rederived
         → improves all future forward flows (better confidence, better playbooks)
```

This is the compounding moat (23/15) as an event loop: outcomes are events that write knowledge.

---

## 6. Delivery guarantees & semantics

- **At-least-once delivery** with **idempotent consumers** (events carry `event_id`; handlers
  dedupe). The append-only object model makes idempotency natural.
- **Ordered per subject** (events for one object/correlation are ordered) via partitioning on
  `subject_ref`/`correlation_id`.
- **Immutable log, replayable** — projections and read models can be rebuilt by replay; a new consumer
  can backfill from history.
- **Dead-letter + retry** for transient failures (e.g. an integration hiccup) without blocking the
  pipeline.

---

## 7. Events and the trust spine

Every event flows to the **Audit Service** (09): the event log *is* the audit log. Combined with
`causation_id`/`correlation_id`, this means **any conclusion can be explained by replaying the events
that produced it** — the architectural form of "every conclusion is traceable" (24 §13, 09). The trust
guarantees are not bolted on; they are a property of the event architecture.

> Events are the nervous system: they move the pipeline, record the truth, and drive the learning. The
> forward chain produces intelligence now; the feedback chain compounds it over time; the immutable log
> makes both auditable. Building the system as events is what makes the doctrine (supply chain,
> learning loop, auditability) hold under real load.
