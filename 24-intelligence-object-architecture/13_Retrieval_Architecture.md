# 13 — Retrieval Architecture

> Critical. How the Brain (20) retrieves Knowledge, Patterns, Evidence, and Recommendations **without
> hallucinating.** Retrieval is where an AI wrapper fails — it "recalls" from model weights and
> invents. Growmerce's retrieval is **grounded**: the Brain fetches real objects by reference, with
> provenance and confidence, and is forbidden from asserting beyond what was retrieved. This document
> is the engineering heart of the trust doctrine (22).

---

## 1. The principle: grounded retrieval, not generative recall

> The Brain never "remembers" a fact, a benchmark, a pattern, or a fix from a model's parameters. It
> **retrieves the actual object** — a `KnowledgeCard` with an `id` and version, an `Evidence` with a
> tier and weight — and reasons over the retrieved set. Anything not retrieved does not exist for the
> reasoning step.

This single rule is what makes the system more than an AI wrapper. The AI (a language model) may be
used to *parse, extract, summarise, and draft* — but the *facts and knowledge it reasons with are
retrieved objects*, not generated text. Generation operates on retrieved, grounded inputs and its
outputs are themselves grounded back to those inputs (provenance).

```
AI WRAPPER:   question → model recalls/invents an answer        → hallucination risk
GROUNDED:     question → retrieve real objects (by ref, scoped) → reason over them → answer cites them
```

---

## 2. The four retrieval services (one per engine)

| Service | Retrieves | For engine | Grounding rule |
|---|---|---|---|
| **Knowledge retrieval** | KnowledgeCards (04) by entity/type/scope | Knowledge Engine | returns real cards by `id`+version; scope-checked |
| **Evidence retrieval** | Evidence (03) for a target, with tier/weight/freshness | (all) | verified+fresh only; flagged if stale/disputed |
| **Pattern retrieval** | Pattern objects/defs (05) | Pattern Engine | only ≥ confidence floor for client surfaces |
| **Recommendation retrieval** | Recommendations/Plans (06) | Recommendation Engine | sequenced, with finding+confidence attached |

Each returns objects **with their provenance and confidence**, never bare values (a retrieval
invariant).

---

## 3. How each is retrieved (and grounded)

### Retrieving Knowledge (04)
- **Query:** "knowledge of type T about entity-type E within scope S" (e.g. "conversion benchmark for
  this category"; "playbooks for pattern P").
- **Grounding:** returns actual `KnowledgeCard`s by `id`+`version`. The Brain applies a card **only
  if** its `scope` holds for this business and no `exception` fires — checked at retrieval, not left to
  the model. A card that doesn't match scope is excluded (prevents misapplication).
- **Anti-hallucination:** the Brain cannot use knowledge it didn't retrieve; if no card exists for the
  needed interpretation (a coverage/knowledge gap, 23 §13), it **abstains** rather than inventing a
  benchmark.

### Retrieving Evidence (03)
- **Query:** "all Evidence supporting/contradicting target X for business Y, verified and fresh."
- **Grounding:** every Evidence comes with `source_tier`, `weight`, `freshness`, `verification`.
  Convergence is computed via `independence_key` (no double-counting). Stale/disputed Evidence is
  returned **flagged**, not dropped (the Brain may need to know it exists).
- **Anti-hallucination:** the Brain may assert a finding only to the extent the retrieved Evidence
  supports it (the grounding gate, 22). Missing Evidence → capped confidence or abstention, never a
  filled-in guess.

### Retrieving Patterns (05)
- **Query:** "confirmed/surfaced patterns for business Y, by priority" or "does pattern P's evidence
  requirement match this business's Evidence?"
- **Grounding:** patterns are retrieved with their supporting/contradicting Evidence, counter-check
  results, and confidence. Only ≥ floor surface to clients; below-floor are watchlist.
- **Anti-hallucination:** a pattern is "present" only if real Evidence instantiates its definition and
  counter-checks were evaluated — never because it "seems likely."

### Retrieving Recommendations (06)
- **Query:** "the plan for business Y" — the sequenced set.
- **Grounding:** each Recommendation is retrieved with the finding it `addresses`, the `playbook` it
  `applies`, its confidence, and its `success_measure`. A recommendation with no `playbook_ref` (no
  validated knowledge) cannot exist — so retrieval can never return ungrounded advice.

---

## 4. The grounding invariants (enforced at the retrieval layer)

These are hard rules the retrieval layer enforces so the Brain *cannot* hallucinate even if the AI
component tries to:

1. **Reference-only.** Reasoning inputs are objects with `id`s, not generated strings. Every fact in a
   conclusion traces to a retrieved object (the provenance DAG, 01/10).
2. **Provenance-attached.** No object is returned without its provenance and (for intel objects)
   confidence. There is no API that returns a bare claim.
3. **Tier-capped.** Retrieved Evidence carries its tier; the scoring/confidence layer caps influence
   accordingly (22 §03). A confident Tier-5 inference cannot outrank Tier-1 data even if retrieved.
4. **Scope-checked.** Knowledge is filtered by `scope`/`exception` at retrieval; out-of-scope
   knowledge is never handed to the Brain.
5. **Freshness-checked.** Stale Evidence/Confidence is flagged or recomputed; the Brain is told when
   its inputs are old (12/11).
6. **Abstention-enabled.** When retrieval returns insufficient grounding, "we can't determine this
   yet" is the correct output (20/23 §13) — the layer never fabricates to fill a gap.
7. **Cited output.** Generated text (a finding narrative, a recommendation) must cite the retrieved
   objects it rests on; uncited assertions are rejected by GUARD (20/22).

---

## 5. The role of the AI model (bounded)

The language model is used **inside** this architecture, never as the source of truth:
- **Allowed:** extraction (Signal capture from text/screenshots, re-verified, 22 failure mode 9),
  normalisation help, drafting human-readable narratives from retrieved objects, proposing candidate
  knowledge/patterns *for validation*, natural-language query understanding.
- **Forbidden:** asserting a fact not in a retrieved object; generating a benchmark/number from
  parameters; producing a recommendation with no `playbook_ref`; expressing confidence not computed
  from `basis`.

Every AI output is either (a) a *proposal* that enters the lifecycle as PROPOSED and must be validated,
or (b) a *rendering* of already-grounded objects (and must cite them). The model amplifies the
architecture; it never bypasses it.

---

## 6. Retrieval performance & scale

- **Hot paths cached:** the Knowledge library (04) is small, read-mostly, and hot → aggressively
  cached and version-pinned.
- **Graph traversal** (10) is the core operation; indexed edges + materialised projections keep it
  fast.
- **Scoping** (`tenant_scope`) partitions retrieval so a business's reasoning touches its own data +
  shared library + (consented) network aggregates only.
- Freshness/confidence recomputation is cheap by design (basis materialised, 11) so grounding never
  costs correctness for speed.

---

## 7. How this prevents the specific hallucination failure modes (22 §08)

| Failure mode | Retrieval defence |
|---|---|
| Hallucination (ungrounded assertion) | reference-only + cited-output invariants |
| AI extraction error | extractions are Signals, re-verified before becoming Evidence |
| Confident wrong answer | tier cap + computed confidence + abstention |
| Stale data | freshness-checked retrieval |
| Misapplied knowledge | scope/exception checks at retrieval |
| Fabricated number/benchmark | benchmarks are retrieved cards, never generated |

---

## 8–10. Lifecycle / storage / Brain interactions

- **Lifecycle:** retrieval is read-only over objects in `ACTIVE`/`VERIFIED` states (plus flagged
  stale); it never mutates (writes go through the lifecycle, 01).
- **Storage:** served from the graph + time-series stores (02/03/04) with caches; provenance and
  confidence travel with every result.
- **Brain interactions:** *every* Brain stage (20) begins with a grounded retrieval and ends with a
  grounded write; GUARD verifies that outputs cite retrieved inputs. The Brain is, operationally, a
  loop of *retrieve grounded objects → reason → write grounded objects with provenance and
  confidence.*

> Grounded retrieval is the line between an intelligence system and an AI wrapper. By making the Brain
> reason only over real, referenced, provenance- and confidence-bearing objects — and by allowing
> honest abstention when grounding is absent — this layer turns the trust doctrine of 22 into an
> enforced engineering property. It is, arguably, the single most important document for the engineers
> who build the four engines.
