# 07 — Memory Architecture

> How Growmerce remembers. Memory is what turns a stateless reasoning engine into a compounding
> institution (23/15). This document defines the kinds of memory, what each stores, how they're
> written and read, and how they make the system smarter over time.

---

## 1. Principle: memory is structured, typed, and versioned — not a transcript

Growmerce does not "remember" as an LLM context window or a chat history. It remembers as
**structured, queryable objects** (24) persisted across the data stores (03) and versioned (24 §12).
Memory is the accumulated graph of Signals, Evidence, Patterns, Recommendations, Outcomes, and
Knowledge — each retrievable by reference. This is why its memory is auditable and compounding rather
than fuzzy and lossy.

---

## 2. The kinds of memory

```
PER-BUSINESS MEMORY (tenant-scoped)        INSTITUTIONAL MEMORY (shared)
  Business memory                            Pattern memory (defs + frequencies)
  Profile memory                             Learning history (lessons)
  Pattern memory (instances)                 Knowledge (the corpus)
  Recommendation history                     Network memory (anonymised aggregates)
  Outcome memory
```

### Business memory
- **What:** everything known about one business over time — its entities and state history, its
  diagnoses, its plan, its trajectory.
- **Store:** relational (entities/plans) + time-series (state) + graph (relationships).
- **Read:** "what do we know about this business, and how has it changed?" Drives returning-user
  intelligence ("what changed since last time," the retention loop, 04).

### Profile memory
- **What:** the saved, reusable Commerce Profile (channels, SKUs, competitors, pricing, occasions).
- **Store:** relational + graph (Commerce Profile Service, 02).
- **Read:** pre-loaded on return so the user never rebuilds it; each visit starts from a richer
  baseline (the acquisition ladder, 22).

### Pattern memory
- **Per-business (instances):** which Patterns were detected/confirmed/ruled-out for this business,
  with evidence and confidence over time. (Graph + relational.)
- **Institutional (defs + frequencies):** the pattern_def library and anonymised cross-business
  frequencies ("how often does this pattern occur, in what contexts"). (Graph + network store.)
- **Read:** detection (does this pattern recur here?), and calibration (how reliable is this pattern?).

### Recommendation history
- **What:** every recommendation made, its basis, whether it was accepted, and its outcome.
- **Store:** relational (Plans) + event log (lifecycle) + graph (edges to findings/playbooks).
- **Read:** "what did we recommend, did it work?" — drives the track-record factor in confidence (11)
  and playbook effectiveness (Knowledge).

### Outcome memory
- **What:** the measured results of executed fixes (did the success_measure move, attributed, verdict).
- **Store:** time-series + event log + knowledge (as lessons).
- **Read:** the highest-value, exclusive learning signal — calibrates confidence, validates playbooks,
  sizes future impact estimates (22 §07).

### Learning history
- **What:** the lessons and case observations earned over time, and how knowledge evolved (promotions,
  refinements, retirements).
- **Store:** knowledge graph + version store.
- **Read:** the audit trail of *how Growmerce came to know what it knows* (23 §11/12).

### Network memory
- **What:** anonymised, consented aggregates across businesses — benchmark distributions, pattern
  frequencies, fix-outcome rates.
- **Store:** separate network-aggregate store with consent metadata (08).
- **Read:** a high-tier source for benchmarks and priors (a new business benefits from all prior
  learning), strictly scoped and privacy-governed.

---

## 3. How memory is written (the learning loop)

Memory accrues through the **feedback flow** (04 §5), entirely via events:
```
outcome.captured → Memory/Outcome Service:
   1. writes an outcome Signal (execution category)            → Business + Pattern memory
   2. computes attribution (vs. confounders)                   → Recommendation history
   3. emits a Lesson (case observation)                        → Learning history / Knowledge
   4. updates the pattern_def's validation + playbook efficacy → Pattern + institutional memory
   5. recalibrates confidence's track-record factor            → Confidence Service
   6. (if consented/anonymisable) updates network aggregates   → Network memory
```
Every write is versioned and audited. Knowledge promotion/retirement (23 §11) runs over this.

---

## 4. How memory is read (grounded, like everything)

Memory is read through the **Retrieval Service** (06) — scoped, provenance-attached, by reference. The
Brain doesn't "recall" from a model; it *retrieves* the relevant memory objects:
- Business/profile memory → to ground a new diagnosis in what's known.
- Pattern + recommendation + outcome memory → to calibrate confidence and select proven playbooks.
- Network memory → as a high-tier benchmark source (scoped, consented).

Returning-user experiences ("what changed," "you haven't acted on these," "how you compare") are
memory reads rendered for the user (the retention loops, 04).

---

## 5. Memory and confidence (the compounding link)

The **track-record** factor in the Confidence object (24 §11) is a *direct function of memory*: the
more outcomes recorded for a finding/recommendation type, the better-calibrated its confidence. This
is the precise mechanism by which **memory makes the system more accurate over time** (22 §07): memory
→ calibration → trust. No memory, no compounding.

---

## 6. Memory governance

- **Versioned, append-only** — memory is never destructively rewritten; history is preserved (24 §12).
- **Tenant-scoped** — per-business memory is isolated; institutional memory is shared; network memory
  is consented + anonymised (08).
- **Auditable** — every memory write is an event in the log (04/09); "how did we learn this?" is
  answerable.
- **Privacy-bounded** — raw personal artifacts (E) have shorter retention than derived, anonymised
  memory; erasure of raw data preserves anonymised provenance (03/09).

---

## 7. Why this memory architecture is the moat in motion

Agencies and consultants have *personal* memory (in people, lost on departure). Dashboards and AI
wrappers have *no* memory of outcomes (they never see whether advice worked). Growmerce has
**structured, versioned, transferable institutional memory fed by exclusive outcome data** — so it
understands more every engagement, and that understanding is owned by the company and applies across
all businesses (23/15). Memory is where the architecture stops being a tool and becomes a learning
institution.

> Growmerce remembers as a graph of typed, versioned, auditable objects — business by business and
> across all businesses — and it turns memory into calibration and proven playbooks. That is how the
> system gets smarter every time it is used, and why the advantage compounds.
