# 06 — Retrieval & Reasoning Runtime

> Expands document 13 of Workstream 24 (Retrieval Architecture) into the exact runtime flow: how the
> Retrieval Service fetches grounding, how reasoning is bound to it, and how hallucination is
> prevented at every step. This is the engineering core of trust — the difference between an
> intelligence system and an AI wrapper, specified as a runtime.

---

## 1. The governing rule (restated as a runtime invariant)

> At every reasoning step, the inputs are **objects retrieved by reference** (with provenance,
> tier, and confidence). Anything not retrieved does not exist for that step. Generated text must
> **cite** the retrieved objects it rests on. If grounding is insufficient, the step **abstains.**

The AI model may *transform* retrieved grounding (extract, normalize, draft, propose) but may never
*originate* a fact, a benchmark, a confidence, or a recommendation. (Allow/forbid: doc 10.)

---

## 2. The retrieval flow (exact)

A reasoning step requests grounding via the Retrieval Service:

```
1. QUERY            the step issues a typed retrieval query
                    e.g. retrieveKnowledge(type=benchmark, about=Channel:delivery, scope=this business)
                         retrieveEvidence(target=Pattern:menu_merchandising, polarity=any, fresh=true)

2. SCOPE            Tenant/Permission filter applied → only this tenant's data + shared library +
                    consented network aggregates (08). Out-of-scope data is invisible.

3. FETCH            objects fetched from the systems of record (03):
                    - Knowledge: graph (B) + vector recall aid (C)  [recall aid ranks candidates; the
                      RETURNED objects are real cards by id+version, never generated text]
                    - Evidence: time-series (D) + graph edges (B)

4. FILTER           - status filter (VERIFIED / ACTIVE only for reasoning)
                    - scope/exception check on Knowledge (cards whose scope fails or whose exception
                      fires are EXCLUDED) (24 §04)
                    - freshness check on Evidence (stale flagged, not silently used)
                    - independence resolution (correlated evidence collapsed for convergence) (24 §03)

5. ATTACH           every returned object carries: id, version, provenance, source_tier, and (for
                    intel objects) confidence. There is NO API path that returns a bare value.

6. RETURN           a grounded result set + an explicit COVERAGE report ("what was found / what's
                    missing for this query")
```

**Vector store role (critical):** the semantic index is a **recall aid** — it helps *find candidate*
knowledge cards by similarity. The objects actually returned and reasoned over are the **real cards by
reference**, fetched from the graph by id+version. The model's embedding never *becomes* the answer;
it only helps locate the real, versioned object. This is the precise boundary that keeps semantic
retrieval from becoming hallucination.

---

## 3. The grounding flow (how reasoning binds to retrieval)

```
RETRIEVE grounded set + coverage report
   │
   ▼
REASON
   ├─ deterministic reasoning (rules, scoring, models) operates on the retrieved objects
   ├─ if AI is invoked (AI Gateway, 10):
   │     • it receives ONLY the retrieved objects as context
   │     • its task is bounded (extract / normalize / draft narrative / propose candidate)
   │     • its output is tagged either:
   │         - PROPOSAL  → enters lifecycle as PROPOSED, must be validated (never asserted)
   │         - RENDERING → must CITE the retrieved object ids it summarises/explains
   ▼
PRODUCE a candidate conclusion (object + edges + draft narrative)
```

The reasoning never has access to anything beyond the retrieved set + the request. It cannot "recall"
a benchmark or a fact that wasn't retrieved — because it was never given one.

---

## 4. The anti-hallucination flow (GUARD, exact)

Before any candidate conclusion is written/surfaced, GUARD runs as a sequence of hard gates (20/22):

```
G1 GROUNDING     every factual claim in the conclusion maps to a retrieved object (by id).
                 → any uncited assertion is STRIPPED or the conclusion is KILLED.
G2 SUFFICIENCY   enough independent, adequately-tiered evidence for the claimed confidence.
                 → else confidence capped (Tier-4-only → Medium) or held as hypothesis.
G3 COUNTER-EVID  the pattern's counter-evidence / innocent explanations were evaluated.
                 → unchecked → confidence capped; present → ruled out or down-banded.
G4 CONTEXT       required context present; scope holds; no exception fires.
                 → missing context → NOT surfaced (abstain).
G5 CONFLICT      contradictions resolved by source tier; unresolved → down-band + disclose.
G6 CITATION      generated narrative cites its grounding objects.
                 → uncited narrative REJECTED, regenerated from grounding or dropped.
   │
   ▼
PASS → WRITE grounded object (provenance + confidence + version) → emit event
FAIL → repair (more retrieval) | down-band | WATCHLIST | ABSTAIN (record what's missing)
```

GUARD is the **mandatory seam between reasoning and writing** (05 §3). Nothing reaches a store or a
client without passing it. The `guard.blocked` and `abstention.recorded` events (04) make every block/
abstention auditable.

---

## 5. The citation flow (how output stays traceable)

Every surfaced statement carries a **citation** to the objects that ground it:

```
Finding "your delivery menu hides hero items"
   ├─ cites Evidence e1 (hero item buried, Tier 2, fresh)
   ├─ cites Evidence e2 (hero item low impressions, Tier 2)
   ├─ cites Knowledge k1 (benchmark: menu position vs. velocity)
   └─ confidence: High — basis attached
```

Citations are **object references**, not prose footnotes — they resolve to the actual Evidence/
Knowledge with their provenance. This is what lets a user (or an auditor, 09) ask "how do you know?"
and get the real basis, and what lets the Reporting/UX layers (03/04) render the trust/confidence
visual language from real data. Uncited statements cannot exist (G6).

---

## 6. Abstention flow (the honest "we don't know yet")

When retrieval's coverage report shows a decisive gap, or GUARD can't be satisfied:
```
record ABSTENTION: { question, what's missing (knowledge gap or coverage gap), what would resolve it }
   → surfaced honestly ("we can't determine X yet; with your cost data we could")
   → NOT a fabricated answer
   → often becomes a next step (acquire the missing signal/knowledge) — the honesty-as-funnel mechanic
```
Abstention is a **first-class runtime outcome**, emitted as an event, never an error to be suppressed.

---

## 7. Why this prevents each hallucination failure mode (22 §08)

| Failure | Where it's stopped |
|---|---|
| Ungrounded assertion (hallucination) | G1 grounding + reference-only retrieval (§2) |
| AI extraction error | extractions are Signals, re-verified into Evidence before use (05 §2) |
| Fabricated benchmark/number | benchmarks are retrieved Knowledge cards, never generated (§2) |
| Confident wrong answer | tier caps + computed confidence + abstention (§4) |
| Stale data | freshness filter at retrieval (§2.4) |
| Misapplied knowledge | scope/exception check at retrieval (§2.4) |
| Uncited claim | G6 citation gate (§4/§5) |

---

## 8. Performance notes

- **Knowledge library is hot, small, read-mostly** → cached, version-pinned; retrieval is cheap.
- **Graph traversal** (supports/contradicts, interactions, provenance) is the core op → indexed edges
  + materialised projections.
- **Confidence is materialised but re-derivable** → grounding never trades correctness for speed.
- **Vector recall** is bounded (top-k candidates) and always followed by real-object fetch.

> This runtime is where "no hallucination" stops being a promise and becomes a property: reasoning can
> only consume retrieved, scoped, fresh, in-scope objects; GUARD sits between reasoning and writing;
> every surfaced statement cites its grounding; and the system abstains when grounding is absent. The
> AI is powerful *inside* this cage and powerless to break it. That is the architectural answer to
> "why should I trust the output?"
