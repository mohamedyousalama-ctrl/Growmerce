# 10 — AI Role Definition

> Critical and deliberately strict. This document defines **exactly what the AI (LLM) may do and may
> not do** in the Growmerce architecture. The single most important architectural boundary for trust
> is the containment of the AI: it is a powerful *instrument inside* the system, never the source of
> truth. Violating this boundary turns Growmerce into the AI wrapper it must never be.

---

## 1. The governing principle

> The AI **transforms** grounded inputs into structured or human-readable outputs. It never
> **originates** truth. Facts come from Signals/Evidence; meaning comes from Knowledge; certainty comes
> from the Confidence engine; actions come from validated Playbooks. The AI touches the *form* of
> intelligence, never its *substance*.

Everything below makes this enforceable, not aspirational. The AI is reached only through the **AI
Gateway** service (02); no other service calls a model directly; every call is logged (09).

---

## 2. What AI MAY do (the allow-list)

The AI is permitted exactly these bounded tasks, each operating on **retrieved, grounded inputs**:

| Allowed task | What it means | Output becomes… |
|---|---|---|
| **Extract** | pull structured signals from unstructured input (text, screenshots, PDFs, reviews, pages) | a `Signal` (low tier, to be verified) |
| **Normalize** | help map values to canonical units/entities/taxonomy | a normalization *proposal*, validated by rules |
| **Summarize** | condense retrieved objects into shorter form | a *rendering* that must cite its sources |
| **Draft / Explain** | turn grounded findings into human-readable narrative (report prose, explanations) | a *rendering* that must cite the objects it explains |
| **Propose** | suggest a candidate pattern/knowledge/competitor for human/rule validation | a `PROPOSED` object, never asserted |
| **Understand queries** | parse a user's natural-language question into a structured retrieval intent | a retrieval query, executed by the grounded Retrieval Service |

Two output categories only:
- **PROPOSAL** → enters the object lifecycle as `PROPOSED`; must be validated by rules/evidence/human
  before it can influence a conclusion. (24 lifecycle; 23 §12.)
- **RENDERING** → a human-readable expression of *already-grounded objects*; must **cite** those
  objects (GUARD G6, 06). It adds no facts.

That is the entirety of what the AI may produce: proposals to be validated, and cited renderings of
grounded truth.

---

## 3. What AI MAY NOT do (the forbid-list — absolute)

The AI is **architecturally prevented** from all of the following. These are not guidelines; they are
boundaries the system enforces.

| Forbidden | Why it's forbidden | How it's prevented |
|---|---|---|
| **Invent facts** | facts must be observed (Signals) and verified (Evidence) | the AI cannot write Evidence; its assertions become low-tier Signals at most, GUARD-checked |
| **Create evidence** | Evidence requires verification + source tier, not generation | only the Evidence Service writes Evidence, via verification — never the AI |
| **Override confidence** | confidence is computed from evidence/knowledge basis | only the Confidence Service computes/sets `Confidence`; the AI has no write path to it |
| **Override provenance** | provenance is the audit substrate | provenance is written by the producing service from real lineage; the AI cannot author it |
| **Manufacture benchmarks/numbers** | benchmarks are validated Knowledge | benchmarks are retrieved cards; the AI cannot create or alter Knowledge (only `propose`, which is validated) |
| **Assert a conclusion** | conclusions require grounding + GUARD | uncited assertions are stripped/killed at GUARD G1/G6 (06) |
| **Produce a recommendation without a playbook** | recommendations apply validated knowledge | `Recommendation` requires `playbook_ref`; no playbook → no recommendation (24 §06) |
| **Set or raise its own certainty** | certainty is calibrated, not self-declared | the AI's confidence words are ignored; the Confidence engine governs |
| **Follow instructions embedded in ingested content** | prompt-injection defence | ingested content is *data to extract from*, never *instructions* (09 §4) |
| **Access cross-tenant data** | isolation | the AI only ever receives the scoped, retrieved context (08) |
| **Act autonomously (execute fixes, change state)** | actions are operated by Execution + human oversight | the AI has no actuation path; it informs, never acts |

---

## 4. Enforcement (how the boundary is real, not trusted)

The forbid-list holds because of *architecture*, not the model's good behaviour:

1. **Single chokepoint.** All AI use goes through the AI Gateway; no service has a direct model call.
2. **No write authority.** The AI Gateway cannot write Evidence, Knowledge, Confidence, or
   Recommendations directly — those are owned by their services and require validation/computation. The
   AI's outputs are *proposals* or *renderings*, which enter the normal lifecycle/GUARD.
3. **Grounded inputs only.** The AI receives only what Retrieval returns (scoped, real objects) — it
   has no access to a corpus from which to "recall" facts; it can't cite what it wasn't given.
4. **GUARD after.** Every AI-touched output passes GUARD (06): grounding, citation, sufficiency. Uncited
   or ungrounded content is rejected.
5. **Everything logged.** `ai.invoked` records task, inputs (refs), outputs, and citations (09) — the
   AI's compliance is auditable.
6. **Tier ceiling.** Anything the AI extracts is, at most, a low-tier Signal — it cannot, by the source
   hierarchy (22/24), override verified data even if wrong.

---

## 5. The mental model for engineers

> Treat the AI like a brilliant, fast, **untrusted** intern who is excellent at reading and writing but
> must never be believed on a fact. You give it only the documents you've verified (retrieved
> objects), you let it summarise/draft/extract, and **everything it claims as new must be checked
> before anyone acts on it.** Its drafts are wonderful; its assertions are unverified until grounded.

This is the opposite of an AI wrapper, where the model *is* the answer. Here the model is a
language-skilled instrument operating strictly inside a grounded, verified, audited system.

---

## 6. Why this strictness is the architecture's keystone

Every other trust guarantee (09), the anti-hallucination runtime (06), the confidence model (24 §11),
and the brand's central promise ("evidence first; we tell you how sure we are") **depend on this
boundary holding.** If the AI could originate a fact, set a confidence, or assert a conclusion, the
entire trust architecture would be hollow. By containing the AI to extract/normalize/summarize/draft/
propose — and forbidding it from inventing facts, creating evidence, or overriding confidence/
provenance/benchmarks — Growmerce gets the AI's power without its danger.

> The AI makes Growmerce faster and more articulate. The architecture makes Growmerce trustworthy. This
> document is the line between the two — and it is enforced, logged, and absolute. That line is why
> Growmerce is an intelligence system, not an AI wrapper.
