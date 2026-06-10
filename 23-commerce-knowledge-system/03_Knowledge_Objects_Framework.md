# 03 — Knowledge Objects Framework

> The building blocks of knowledge. A domain (02) is made of knowledge *objects* — discrete,
> typed units of understanding. This document defines the official object types, their hierarchy,
> how they relate, and how each is used. It is the grammar of the Knowledge System: everything
> Growmerce knows is expressed as one of these objects.

---

## 1. Why type knowledge at all

"We know about pricing" is useless. *What kind* of knowledge, how certain, how general, how it's used
— those determine whether the Brain can reason with it. Typing knowledge into objects lets the system
treat a stable fact differently from a provisional assumption, a universal principle differently from
a context-bound benchmark, a validated playbook differently from a single case observation. Without
typed objects, knowledge cannot be validated (12), compounded (11), or reasoned with reliably.

---

## 2. The fourteen object types

### Certain & general (the bedrock)

**Facts** — verifiable, stable truths about commerce.
- *e.g.* "On most marketplaces, review recency influences ranking." Used to ground reasoning;
  changes rarely.

**Principles** — durable causal truths about how commerce works.
- *e.g.* "Customers buy on intent, trust, and friction." "Revenue and profit are different." The most
  general, most stable, highest-leverage objects; they explain *why* lower objects hold.

### Explanatory (the structures that make sense of things)

**Models** — explanatory or causal structures that describe how parts of commerce relate.
- *e.g.* the demand→discovery→conversion→retention funnel; the fully-loaded contribution model. Used
  to interpret signals and predict effects.

**Frameworks** — structured ways to analyse a situation (a method, not a claim).
- *e.g.* "the five places revenue leaks"; good/better/best price architecture. Used to organise
  inquiry and analysis.

### Actionable (the applied objects)

**Rules** — conditional if-then logic.
- *e.g.* "If a hero SKU stocks out, marketplace rank decays." Used for inference and detection.

**Heuristics** — operator rules-of-thumb: useful, fast, not universally true.
- *e.g.* "Revenue is vanity, profit is sanity." "Look at the vital few SKUs first." Used for triage
  and judgement; explicitly fallible.

**Playbooks** — sequences of actions that resolve a known situation.
- *e.g.* the review-velocity engine; the checkout-friction fix sequence. Used by recommendations and
  execution; the most directly action-bearing object.

**Benchmarks** — reference values for interpreting a signal in context.
- *e.g.* expected conversion ranges by category/AOV; healthy return-rate ranges. Used to judge whether
  a measured signal is good, bad, or normal — the bridge between evidence and meaning.

### Recurring realities (the diagnostic objects)

**Patterns** — recurring, diagnosable commercial realities (the full subject of workstream 19).
- *e.g.* "Review Density Gap." A pattern is a knowledge object: a recurring situation with evidence,
  causes, and fixes. Patterns are *where several lower objects combine into a recognisable whole.*

**Anti-patterns** — recurring mistakes, or things that look right but reliably fail.
- *e.g.* "discounting to fix a non-price problem"; "judging a SKU on gross margin." The inverse of
  patterns; used to catch errors and warn against common traps.

### Provisional & contextual (the careful objects)

**Assumptions** — provisional beliefs held until verified.
- *e.g.* "this category's customers are price-sensitive" before the data confirms it. Explicitly
  flagged as provisional; never treated as fact (ties to the Source Hierarchy, 22, and Unknowns, 13).

**Exceptions** — known cases where a rule, principle, or pattern does *not* hold.
- *e.g.* "stockouts are not a leak when the business runs a deliberate drop model." Exceptions are
  what make knowledge trustworthy — they prevent over-application.

### Earned & raw (the inputs to compounding)

**Lessons** — knowledge earned from outcomes (a fix worked / didn't, here, in this context).
- *e.g.* "review-velocity fixes recover rank fastest in low-density categories." The product of
  execution; the fuel of compounding (11).

**Case observations** — specific, raw instances seen in real engagements.
- *e.g.* "Business X's discount was 80% non-incremental." The most granular object; many case
  observations generalise into lessons, then patterns, then rules.

---

## 3. The hierarchy (certainty × generality)

Objects can be arranged on two axes that govern how they're used:

```
         GENERAL ▲
                 │   Principles ───────── Facts
                 │       │                  │
                 │    Models           Benchmarks
                 │       │                  │
                 │  Frameworks   Rules   Patterns / Anti-patterns
                 │       │          │          │
                 │   Heuristics  Playbooks  Exceptions
                 │                              │
                 │                  Lessons     Assumptions
                 │                     │            │
        SPECIFIC │             Case observations
                 └───────────────────────────────────────►
                   CERTAIN                         PROVISIONAL
```

- **Upper-left (general + certain): Principles, Facts** — the bedrock; widely applicable, rarely
  wrong; highest authority in reasoning.
- **Lower-right (specific + provisional): Case observations, Assumptions** — the raw material; useful
  but weak; never override higher objects (mirrors the Source Hierarchy, 22).

This hierarchy is the knowledge analogue of the Supply Chain's source tiers: just as a Tier-1 verified
fact outranks a Tier-5 AI guess, a Principle outranks an Assumption. When knowledge objects conflict,
the higher object on the certainty axis governs — unless an Exception explicitly applies.

---

## 4. How objects flow into one another (the lifecycle)

Knowledge objects are not static; they form a pipeline of generalisation (induction) and application
(deduction):

```
INDUCTION (knowledge is created):
  Case observations → (recur across contexts) → Lessons → (validated) → Patterns / Rules
                                                              → (explained) → Principles / Models

DEDUCTION (knowledge is used):
  Principles / Models → Frameworks → Heuristics & Playbooks → applied to a business → Recommendations
  Benchmarks → interpret Signals/Evidence → confirm Patterns
```

- **Going up** (induction) is how knowledge *compounds* (11): specifics become generalities as they
  recur and are validated.
- **Going down** (deduction) is how knowledge is *used*: generalities become specific actions for a
  business.

Validation (12) governs promotion up the hierarchy; an object earns a higher, more certain type only
when it has been confirmed across enough independent contexts.

---

## 5. Every object carries metadata

For knowledge to be validated, versioned, and trusted, each object carries:

| Field | Purpose |
|---|---|
| **type** | which of the fourteen (governs how it's used) |
| **domain(s)** | where it lives (02) |
| **certainty** | how confident we are it's true (feeds confidence, 22/13) |
| **scope / context** | where it applies (and, via Exceptions, where it doesn't) |
| **provenance** | how we know it (derived, observed, literature, earned from outcomes) |
| **version / status** | current, deprecated, under review (12) |
| **evidence / support** | what backs it (case observations, lessons, external knowledge) |

This metadata is what makes the Knowledge System an *institution* rather than a notebook — every piece
of understanding is typed, sourced, scoped, and versioned.

---

## 6. The doctrine of objects

- **Right type for the job.** The Brain retrieves a *benchmark* to interpret a signal, a *model* to
  explain it, a *playbook* to fix it — never a vague "insight."
- **Higher objects govern.** Principles and facts outrank assumptions and case observations in
  conflict.
- **Exceptions are first-class.** Knowing where a rule fails is as valuable as the rule.
- **Assumptions are labelled, never laundered into facts.** (Prevents false certainty, 13.)
- **Everything is typed, sourced, scoped, versioned.** No anonymous knowledge.

> The Knowledge Objects Framework is what turns "things Growmerce believes about commerce" into a
> reason-able, maintainable, compounding institutional asset. It is the grammar beneath every domain.
