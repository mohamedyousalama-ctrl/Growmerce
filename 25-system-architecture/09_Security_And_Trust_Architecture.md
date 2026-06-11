# 09 — Security & Trust Architecture

> The guarantees that make Growmerce's output defensible: auditability, lineage, versioning, evidence
> integrity, recommendation traceability, and human-override logging — plus conventional security. In
> an intelligence company, **trust is a security property**: the system must be able to *prove* how it
> reached every conclusion. This document defines those guarantees as architecture.

---

## 1. Two kinds of trust to engineer

1. **Conventional security** — protecting data and access (authn/authz, encryption, isolation,
   secrets, compliance). Necessary, table-stakes.
2. **Epistemic trust** — proving the *integrity of the intelligence*: that every conclusion is
   grounded, traceable, honestly scored, and reproducible. This is the differentiator, and most of
   this document.

Growmerce must be excellent at both; the second is what makes it an intelligence institution.

---

## 2. The trust guarantees (epistemic)

### G-AUDIT — Everything is recorded
Every object/edge write, retrieval, AI invocation, confidence computation, GUARD block, abstention,
and human override is an **immutable event** in the log (04), flowing to the Audit Service. The event
log *is* the audit trail. Nothing of consequence happens without a record.

### G-LINEAGE — Every conclusion is traceable to its origins
The **provenance DAG** (24 §01) links every intelligence object back through `derived_from` to the raw
Signals and Entities that produced it. Combined with `causation_id`/`correlation_id` on events (04),
the system can answer, for any recommendation: *which findings, which evidence, which signals, which
knowledge (at which versions) produced this — and when.* Lineage is a queryable graph, not a log to
grep.

### G-VERSION — Every conclusion is reproducible in time
Append-only versioning (24 §12) with pinned inputs means any past conclusion can be **reconstructed as
of the date it was made**, using the exact evidence and knowledge versions then in force. "Why did you
recommend X in March?" is answerable precisely, even after the knowledge evolved.

### G-EVIDENCE-INTEGRITY — Evidence cannot be silently forged or altered
- Signals/Evidence are **immutable** (corrections supersede, never overwrite) (24 §02/03).
- Raw artifacts carry **checksums**; the chain from artifact → Signal → Evidence is verifiable.
- **Source tier** is assigned at capture and only changed by audited verification — a low-tier input
  cannot be quietly promoted to look authoritative.
- The **independence key** prevents evidence from being double-counted to manufacture false confidence.

### G-TRACEABILITY — Every recommendation justifies itself
A Recommendation cannot exist without a `playbook_ref` (validated knowledge) and an `addresses` edge to
a finding (24 §06). So every recommendation *structurally* carries its justification: the problem it
solves, the evidence behind that problem, and the validated knowledge it applies. "On what basis?" is
always answerable.

### G-CITATION — Every surfaced statement cites its grounding
GUARD's citation gate (06) ensures no client-facing statement exists without object references to its
grounding. The trust/confidence the user sees is rendered from real, cited objects — not generated
prose.

### G-OVERRIDE-LOG — Human judgement is recorded, not hidden
Every human override (a reviewer changing a confidence, blocking/releasing a finding, editing a
recommendation) is logged with a **mandatory reason** and scored against the eventual outcome (20
Human Override, 04 `human.override`). The human-in-the-loop is itself auditable and calibrated.

### G-AI-BOUNDARY — The AI's role is enforced and logged
Every AI invocation is logged (`ai.invoked`) with its task, the retrieved inputs (by reference), its
outputs, and its citations. The allow/forbid contract (10) is enforced at the AI Gateway, so the AI
*cannot* originate facts/benchmarks/confidence — and there's a record proving it didn't.

---

## 3. Conventional security (table stakes, done right)

- **Authn/Authz:** strong identity; least-privilege roles; the Tenant/Permission Service gates every
  access (08); all access decisions audited.
- **Encryption:** in transit (TLS) and at rest; per-tenant keys for sensitive artifacts (08).
- **Tenant isolation:** logical-by-default, physical where warranted; no cross-tenant data flow except
  the consented anonymising valve (08).
- **Secrets management:** integration credentials in a vault; rotation; never in logs or events.
- **Input safety:** uploads/URLs/screenshots are untrusted input — sandboxed parsing, size/type limits,
  malware scanning; the AI never executes instructions found in ingested content (prompt-injection
  defence: ingested text is *data to extract from*, never *instructions to follow* — enforced at the
  AI Gateway, 10).
- **Compliance:** data-residency, retention, and erasure policies (03); consent records for network
  aggregation (08); auditable for regulators.

---

## 4. Prompt-injection & content-trust (an AI-specific security concern)

Because Growmerce ingests external content (reviews, competitor pages, uploads), it must defend against
**content that tries to manipulate the AI**:
- Ingested content is **always data, never instructions.** The AI Gateway (10) treats ingested text as
  material to *extract structured signals from*, with a fixed task contract — it does not follow
  instructions embedded in the content.
- Extracted claims are **Signals** (low tier until verified), not facts — so even a malicious
  extraction can't become a confident conclusion (it's tier-capped and GUARD-checked, 06).
- This is a direct benefit of the grounding architecture: the same discipline that prevents
  hallucination also blunts prompt injection.

---

## 5. How the guarantees compose (the audit story)

For any output, an auditor (internal, the client, or a regulator) can ask and be answered:
```
"Why did Growmerce conclude/recommend this?"
   → LINEAGE: walk the provenance DAG to the signals + knowledge
   → EVIDENCE-INTEGRITY: verify the signals' sources, tiers, checksums
   → VERSION: reconstruct the exact knowledge/evidence versions used
   → CITATION: see the references behind every surfaced statement
   → CONFIDENCE: see the basis and caps behind the stated certainty
   → OVERRIDE-LOG: see any human judgement applied, with reasons
   → AI-BOUNDARY: confirm the AI only extracted/drafted, never asserted
```
This composability is the architecture's promise: **trust is not claimed, it is provable** — the
defining property of a real intelligence institution (Bloomberg/Moody's-grade).

---

## 6. Threats to trust (and the controls)

| Threat | Control |
|---|---|
| Fabricated/altered evidence | immutability + checksums + tier discipline + audit (G-EVIDENCE) |
| Ungrounded conclusion | grounding + citation gates (06) + lineage (G-LINEAGE) |
| Silent knowledge change rewriting history | versioning + pinned inputs (G-VERSION) |
| Manipulated AI output | AI boundary + logging + tier-capped extractions (G-AI-BOUNDARY, §4) |
| Unaccountable human edits | mandatory-reason override logging (G-OVERRIDE) |
| Cross-tenant leakage | isolation + scope-enforced retrieval (08) |
| Inflated confidence | computed/capped confidence + independence keys (G-EVIDENCE/§2) |

---

## 7. Why security-as-trust is the differentiator

A dashboard or AI wrapper cannot offer these guarantees — they have no provenance DAG, no versioned
knowledge, no evidence integrity chain, no enforced AI boundary, no override log. Growmerce's
architecture makes **"how do you know?" answerable for every conclusion, reproducibly, in time.** For a
sceptical operator betting real money, that provable trust *is* the product. Security here is not just
protection; it is the substrate of the brand's central promise.

> Trust is engineered, not asserted: an immutable event log, a queryable provenance DAG, append-only
> versioning with time-travel, evidence integrity, structurally self-justifying recommendations,
> citation-gated output, logged human overrides, and a hard AI boundary — composed so that every
> conclusion can be proven, reproduced, and defended. That is the security architecture of an
> intelligence company.
