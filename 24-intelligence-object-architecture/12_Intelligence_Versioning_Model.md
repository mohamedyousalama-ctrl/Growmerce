# 12 — Intelligence Versioning Model

> How every object changes over time without losing history. Versioning is the schema form of the
> Knowledge Quality Framework's versioning (23 §12) and the Supply Chain's provenance discipline (22):
> an append-only, auditable record of how each object evolved, so any past conclusion can be explained
> in terms of the exact objects (at their then-current versions) that produced it.

---

## 1. Purpose

To make the system **auditable across time** and **safe to evolve**: nothing is silently mutated or
deleted; every change is recorded with rationale; and every conclusion pins the versions of its
inputs, so history is reconstructable. This is what separates an institution (memory) from a tool (a
mutable database).

---

## 2. Schema

```
Version (value object, on every BaseObject)
  version_no      int          # monotonically increasing per object
  status          enum         # current | superseded | deprecated | archived
  changed_at      timestamp
  changed_by      ref          # agent | human | system process
  change_type     enum         # create | refine | re-tier | re-score | scope_change | deprecate | merge | retract
  rationale       text         # WHY (mandatory for material changes)
  diff            object        # what changed (field-level)
  supersedes      ObjectRef?   # prior version/object
  pinned_inputs   list<{ref, version_no}>   # the input objects+versions this version relied on
```

Two storage patterns coexist:
- **Append-only version log** per object (the history).
- **Pinned references**: when object A is derived from object B, A records *B's version_no*, not just
  B's id (so B changing later doesn't silently alter A).

---

## 3. Attributes (semantics)

- `change_type` distinguishes a *correction* (re-tier, retract) from an *evolution* (refine,
  re-score) from a *retirement* (deprecate) — each handled differently by retrieval and learning.
- `rationale` is **mandatory** for material changes (a knowledge refinement, a confidence policy
  change) — the institution never changes its mind without recording why (23 §12).
- `pinned_inputs` is the mechanism that makes historical conclusions explainable: a Recommendation
  from last quarter pins the playbook version and evidence versions it used, so it remains coherent
  even after those evolved.

---

## 4. Versioning behaviour by object type

| Object | What versions, and how often |
|---|---|
| **Signal (02)** | mostly immutable; versions on status/tier correction; corrections supersede |
| **Evidence (03)** | versions on re-verification, re-tier, freshness threshold, supersession |
| **Knowledge (04)** | versions heavily (long-lived, authoritative); statement/scope/benchmark/certainty changes; pinned by consumers |
| **Pattern (05)** | versions on confidence/status change as evidence accrues; pins pattern_def version |
| **Recommendation (06)** | versions on priority/sequence/status; pins playbook + finding versions; outcome appended |
| **Opportunity/Threat (07/08)** | versions on value/severity/trajectory/status; pin source patterns |
| **Confidence (11)** | recomputed values appended with `inputs_version` |
| **Edges (10)** | versioned; retracted edges archived with reason |
| **Entities (09)** | facts versioned on change; state lives as Signal/Evidence history |

---

## 5. The three guarantees

1. **No destructive edits.** Every change creates a new version; prior versions are retained
   (`archived`), never overwritten or deleted. (Auditability + the ability to reconstruct any past
   state.)
2. **Pinned lineage.** Every derived object records the versions of its inputs, so the exact basis of
   any historical conclusion is recoverable even after inputs evolve.
3. **Reasoned change.** Material changes carry a mandatory rationale; configuration that governs
   reasoning (confidence policy, tier rules, pattern defs) is itself versioned.

---

## 6. Confidence & versioning interplay

- A confidence value (11) is tied to a specific `inputs_version`; when inputs change, confidence is
  recomputed and the object versions. This is how the system avoids trusting a stale confidence: the
  version chain reveals that the basis moved.
- The **band-movement rules** and **scoring weights** (20/22) are versioned configuration — so if the
  policy that produces confidence changes, every conclusion's confidence can be understood relative to
  the policy version in force when it was computed.

---

## 7. Storage considerations

- Append-only version logs (event-sourcing friendly): the current object is a materialised view over
  its version events; history is the event log.
- Archive cold storage for old versions; keep current + recent hot.
- `pinned_inputs` indexed to answer "what conclusions relied on version X of this knowledge?" (crucial
  when knowledge is deprecated — find and re-evaluate dependents).

---

## 8. Retrieval considerations

- Default retrieval returns **current** versions.
- **Time-travel retrieval** ("as of date T") returns the versions in force then, reconstructing a past
  conclusion exactly — the auditability payoff.
- When knowledge is deprecated, retrieval can find dependent conclusions (via `pinned_inputs`) and flag
  them for re-evaluation.

---

## 9. Lifecycle (of a version)

`created(current) → superseded(by a newer version) → [if knowledge] deprecated → archived`. Versions
never leave the system; they change status. This mirrors the knowledge lifecycle (23 §11/12) and the
universal object lifecycle (01 §5).

---

## 10. Brain interactions (20)

- **All write stages** of the Brain create versions (with rationale) rather than mutating in place.
- **LEARN:** knowledge evolution/retirement (23 §11) is executed as versioning events; drift detection
  finds objects whose outcomes contradict them and triggers a `deprecate`/`refine` version.
- **Explainability:** when asked "why did you recommend X back then?", the Brain time-travels via
  `pinned_inputs` to reconstruct the exact evidence + knowledge versions used.

> Versioning is what gives the intelligence system a memory and a conscience: it remembers everything
> it ever concluded and the exact basis, it changes its mind only with recorded reason, and it never
> destroys the record. That is the difference between a database that forgets and an institution that
> learns.
