# 09 — Intelligence Quality Control

> How Growmerce protects quality at the gates where it matters most. Verification (05) guards the
> *inputs*; this document defines the **checkpoints before each major output** — pattern creation,
> recommendation creation, report generation, consultation, and delivery. Nothing of consequence
> ships without passing the checkpoint for its stage.

This is the factory's **inspection regime**: quality is not hoped for at the end, it is enforced at
every station. It implements the Brain's GUARD (20) as production checkpoints.

---

## 1. The quality principle

> Quality is controlled *before* output, at defined checkpoints, by explicit pass/fail criteria —
> not reviewed *after* a customer complains. A failing item is repaired, down-banded, abstained, or
> escalated to a human — never shipped as-is.

Each checkpoint is a gate with criteria; an item must pass to advance.

---

## 2. Checkpoint: before Pattern creation
*(Stage 7 — before a detected pattern is accepted as present)*

| Check | Pass criterion |
|---|---|
| **Required signals present** | the pattern's declared evidence signals (19) are actually present |
| **Tier sufficiency** | at least the minimum tier for the claimed confidence (03/06) |
| **Independence** | converging signals are genuinely independent (no double-counting) |
| **Counter-evidence checked** | the pattern's innocent explanations were tested (19/20) |
| **Context fit** | the pattern is plausible for this business's category/model/stage |
| **No unresolved conflict** | conflicting patterns resolved or confidence reduced |

**Fail →** the pattern is held as a hypothesis (not a finding), abstained, or sent for more evidence.

---

## 3. Checkpoint: before Recommendation creation
*(Stage 10 — before a finding becomes advice)*

| Check | Pass criterion |
|---|---|
| **Traces to a finding** | the recommendation solves a specific, surfaced finding |
| **Validated fix** | it maps to a pattern's validated fix (19) — no improvised advice |
| **Feasibility** | it fits the business's constraints (budget, skill, platform, stage) |
| **Confidence-appropriate framing** | framed by confidence/leverage; Medium-confidence → "test it"; no guarantees (21) |
| **Sequencing** | placed correctly (stop bleeds → dependencies → quick win → compounding) |
| **Success measure defined** | the signal that will prove it worked is specified (feeds the loop) |

**Fail →** the recommendation is reworked, down-prioritised, or dropped; novel fix ideas go to
backlog for human review (not shipped to a client).

---

## 4. Checkpoint: before Report generation
*(Stage 12 prep — before findings become a customer-facing report)*

| Check | Pass criterion |
|---|---|
| **Confidence floor** | only findings ≥ Medium are surfaced; below → watchlist/abstain |
| **Provenance complete** | every finding is replayable signal → evidence → conclusion |
| **Evidence + confidence attached** | nothing is a bare claim; each carries how-we-know + how-sure |
| **Missing data stated** | gaps and "what would change this" are present |
| **Revenue/profit separated** | impact distinguishes top-line from margin (Pillar 2, 21) |
| **Ruled-out present** | what's *not* wrong is named (credibility + GUARD) |
| **Guardrail scan** | no hype, fake certainty, AI-magic, guarantees, manipulation (21) |
| **Prioritised, not dumped** | decision-first; the few that matter, sequenced — not 25 flags |

**Fail →** the report is corrected before it can be delivered.

---

## 5. Checkpoint: before Consultation
*(Before a human operator speaks to the customer)*

| Check | Pass criterion |
|---|---|
| **Briefed on provenance** | the operator has the evidence/confidence behind each finding |
| **Knows the gaps** | what's confirmed vs. suspected vs. missing is clear |
| **Calibrated language ready** | the operator will speak in the trust-language register (21) — confidence stated honestly |
| **High-stakes items human-verified** | critical threats / large recommendations reviewed (20) |
| **No overclaiming setup** | nothing primes the operator to promise outcomes or fake certainty |

**Fail →** the consultation is not booked until the operator is properly briefed; this keeps the
human voice consistent with the machine output.

---

## 6. Checkpoint: before Delivery
*(Stage 12 — the final gate before anything reaches the customer, in any channel)*

| Check | Pass criterion |
|---|---|
| **Freshness** | time-sensitive evidence is still current (the world hasn't moved) |
| **Confidence intact** | the confidence/evidence travels *with* the conclusion (not stripped) |
| **Channel-appropriate** | report/WhatsApp/consultation framing obeys its surface narrative (21) |
| **Human gate cleared** | required reviews completed (per stakes) |
| **Trust record present** | the defensible "how we know" record is attached/available |

**Fail →** delivery is held until the item is current and complete.

---

## 7. Cross-cutting quality controls

Running across all checkpoints:
- **Provenance is mandatory** at every gate — no provenance, no pass.
- **Tier discipline** is enforced at every gate (weak sources can't sneak into strong claims).
- **Abstention is a valid pass** — "we can't determine this yet" is an acceptable, quality-preserving
  output, not a failure to be forced into an answer.
- **Every gate failure is logged** — recurring failures at a checkpoint trigger a systemic fix (the
  control that should have caught it earlier is tightened), and feed the learning loop (20).
- **Sampling audit** — even auto-passed (high-confidence, low-stakes) items are spot-checked by
  humans to catch what the automated gates miss (20's Human Override backstop).

---

## 8. Quality control vs. speed

The checkpoints are designed to be **stakes-proportional** so quality doesn't kill throughput:
- Low-stakes, high-confidence, well-trodden output passes automated gates quickly.
- Medium-confidence / high-impact / novel output gets deeper checks + human review.
- Critical / irreversible output requires expert sign-off.

This is the same tiered logic as verification (05) and human review (20): rigour where it matters,
speed where it's safe. Quality control is not a bottleneck applied uniformly — it is a graduated
inspection regime.

---

## 9. Why the checkpoints are a competitive advantage

A dashboard has no checkpoints — it shows whatever the data says. A generic AI tool has one weak
gate (the model's own confidence) and ships. Growmerce has **explicit, auditable quality gates
before every output type**, each with pass/fail criteria tied to evidence, tier, and confidence.
This is what lets Growmerce stand behind its output the way a rated institution stands behind a
rating — and it is precisely the unglamorous discipline that competitors skip and customers feel the
absence of. (See `10_Competitive_Advantage_of_the_Supply_Chain.md`.)
