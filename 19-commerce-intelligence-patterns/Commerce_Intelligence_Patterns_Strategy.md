# Commerce Intelligence Patterns — Strategy

This document defines **how the Pattern Engine works**: the anatomy of a pattern, the
lifecycle of a pattern from hypothesis to confirmed intelligence, how patterns relate to
playbooks, and how the engine stays practical instead of drifting into taxonomy.

---

## 1. What a pattern is (precise definition)

A **commerce intelligence pattern** is a named, recurring commercial reality that:

1. Appears across multiple industries, channels, or platforms (it is **transferable**).
2. Has a **causal structure** — symptoms caused by root causes, producing commercial
   consequences.
3. Can be **detected from evidence** — specific signals confirm or deny it.
4. Is **actionable** — it implies concrete fixes with expected outcomes.

If a candidate lacks any of these four properties it is not a pattern:
- No transfer → it's a one-off observation.
- No causal structure → it's a symptom (a category).
- No detectable evidence → it's an opinion.
- No action → it's trivia.

---

## 2. The pattern template (canonical)

Every pattern in every library file uses these fields, in this order:

| Field | What it answers | Why it matters |
|---|---|---|
| **Pattern Name** | What do we call this reality? | Naming is the product. A precise name is half the diagnosis. |
| **Category** | Which library does it live in? | Lets the engine group and route. |
| **Description** | What is actually happening? | The plain-language reality. |
| **Business Symptoms** | What does the operator *feel*? | How they'd describe it in their words. |
| **Evidence Signals** | What does the *data* show? | What we measure to detect it. |
| **Common Root Causes** | Why does it happen? | Where the fix must aim. |
| **Revenue Impact** | Effect on top line | Sizing the prize. |
| **Profit Impact** | Effect on margin | Some patterns grow revenue but kill profit. |
| **Risk Level** | Urgency / downside | Triage priority. |
| **Confidence Factors** | What makes us sure? | Feeds the Confidence Model. |
| **Counter Evidence** | What would mean we're wrong? | Forces falsifiability. |
| **Quick Wins** | Fixes this week | Earns trust fast. |
| **Strategic Fixes** | Fixes this quarter | The durable solution. |
| **Operational Fixes** | Process/system fixes | Stops it recurring. |
| **AI Detection Opportunities** | How an agent finds it automatically | The path to SaaS. |
| **Diagnostic Usage** | Where it lives in the diagnostic | Wires to workstream 06. |
| **Report Usage** | How it's framed to the client | Wires to reporting. |
| **Service Delivery Usage** | How Growth Ops delivers the fix | Wires to delivery. |
| **Future SaaS Usage** | How it becomes automated product | Wires to future product. |

The **Counter Evidence** field is deliberate and non-negotiable. A pattern you cannot
disprove is dogma. Every pattern must state what evidence would make us abandon the
diagnosis. This is what separates intelligence from astrology.

---

## 3. The pattern lifecycle

```
HYPOTHESIS → OBSERVED → CONFIRMED → INSTRUMENTED → AUTOMATED
```

| Stage | Meaning | Owner |
|---|---|---|
| **Hypothesis** | We believe this reality recurs; written from operator experience. | Strategy |
| **Observed** | Seen in ≥1 real engagement with evidence. | Diagnostic |
| **Confirmed** | Seen across ≥3 engagements in ≥2 contexts; fixes validated. | Delivery |
| **Instrumented** | Evidence signals are wired to data integrations (13). | Engineering |
| **Automated** | An AI agent (07) detects it without a human. | Product |

The library ships patterns mostly at **Hypothesis** and **Observed**. The
`Pattern_Confidence_Model.md` governs promotion between stages. The whole point of the
`Intelligence_Compounding_Model.md` is to move patterns rightward over time.

---

## 4. Patterns vs. playbooks (the boundary that keeps us out of taxonomy hell)

| | Playbook (18) | Pattern (19) |
|---|---|---|
| Organised by | Context (industry/channel/platform/occasion) | Recurring commercial reality |
| Answers | "How do I operate *here*?" | "What is *actually* going wrong, anywhere?" |
| Transfers across contexts | No | Yes |
| References the other | Playbooks **cite** patterns | Patterns are **context-free** |
| Count over time | Grows linearly with contexts | Stays small and deep |

**Rule:** A playbook may say *"In fashion marketplaces, watch for the Review Density Gap
pattern (see 19)."* A pattern must never say *"In fashion…"* — the moment a pattern hard-codes
a context, it has collapsed into a playbook and lost its leverage. Patterns may give
*context examples* inside fields (e.g. "in delivery apps this looks like…") but their
identity is context-free.

---

## 5. How the engine stays practical (anti-bloat rules)

The failure mode of any pattern library is **bloat into a taxonomy nobody uses**. Guardrails:

1. **Depth gate.** A pattern enters the library only with all template fields filled
   credibly. Half a pattern is not a pattern.
2. **Recognition test.** If a target operator would not say *"that's exactly my business,"*
   the pattern is too generic — merge or sharpen it.
3. **Action test.** If the Quick Wins are vague ("improve your pricing"), the pattern is a
   category in disguise.
4. **Distinctness test.** Two patterns that share the same fix are one pattern.
5. **Evidence test.** If we cannot name the signals that detect it, it is not yet a
   pattern — it goes to `Backlog.md`.

We cap each library file to a **small set of deep, high-leverage patterns** (typically
3–5) for v1. Breadth is a backlog problem, not a v1 problem.

---

## 6. How patterns power every surface (the spine)

```
                 ┌──────────────────────────────────────────────┐
                 │            PATTERN ENGINE (19)               │
                 │  patterns + scoring + confidence + evidence  │
                 └──────────────────────────────────────────────┘
                                     │
   ┌───────────┬───────────┬────────┼────────┬───────────┬───────────┐
   ▼           ▼           ▼        ▼         ▼           ▼           ▼
Diagnostic  AI Agents   Reports  Website   TikTok /   Sales /    Growth Ops
  (06)        (07)               (04)      Lead Gen   Service     Delivery
```

Each connection has a dedicated mapping file. The principle is constant: **the pattern is
the unit; every surface is a different rendering of the same pattern.** A TikTok video is a
pattern rendered as a 30-second story. A report section is the same pattern rendered as a
diagnosis. A delivery sprint is the same pattern rendered as work.

---

## 7. Scoring, confidence, evidence (the trust stack)

Three models govern how much we trust and prioritise a detected pattern:

- **Evidence Framework** — *Is the signal real?* Tiers raw data → derived signal → confirmed pattern.
- **Confidence Model** — *How sure are we the pattern is present?* 0–100 with named factors.
- **Scoring Model** — *How much should we care?* Impact × confidence × urgency → priority.

A pattern is only surfaced to a client when it clears confidence and scoring thresholds.
This is what stops the system crying wolf. (See the three model files.)

---

## 8. Success criteria for v1

The first version of the Pattern Engine succeeds if:

- An operator reading any single pattern says *"that's exactly my business."*
- Each pattern maps cleanly to the diagnostic, a report section, an agent, a tool, and a
  delivery motion.
- A salesperson can name a buyer's pain using a pattern, with evidence, in one sentence.
- Growth Ops can pull a fix playbook from the pattern without reinventing it.
- We can see, on paper, how each pattern becomes an automated detection rule later.

If those five hold, the engine is real — even before a single line of detection code exists.
