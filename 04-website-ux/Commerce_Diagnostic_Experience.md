# Commerce Diagnostic Experience

> The diagnostic is the Intelligence Brain (20), running on the visitor's own business, in
> public. It must feel like an intelligent operator interviewing you — not a quiz, not a form,
> not a lead-gen funnel wearing a diagnostic costume. It is the website's flagship proof of
> expertise and its primary conversion engine.

This is the website-facing rendering of the Commerce Diagnostic (06) in the Brain's
**fast-judgement mode** (20, §6): real conclusions at honest, mostly-Medium confidence, with the
deep diagnosis positioned as the natural next step.

---

## 1. The feeling we are engineering

> "It's asking me the things a really sharp commerce operator would ask — and it already seems
> to know where this is going."

Not: "answer 20 questions to get your score." A quiz extracts; an operator *reasons*. Every step
should feel like the Brain narrowing toward a real conclusion, visibly using what the visitor
just told it.

---

## 2. The flow (eleven moments)

The diagnostic is one continuous, progressively-disclosed experience, not a multi-page form. The
eleven moments map to the cognition pipeline (20).

### 1. Entry
Multiple entry points (homepage hero, a pattern, a tool, a market page, a TikTok lander), each
**pre-loading context** so the visitor never starts cold. Entry framing: fast, free, genuinely
useful — *"let's find where your sales are leaking."* (Maps to SENSE.)

### 2. Business context
A few high-signal questions an operator would actually open with: what do you sell, where do you
sell it (channels), roughly what stage/size. Rendered as **selectable chips + smart defaults**,
not text fields (see `Structured_Input_Experience.md`). (Maps to GROUND/context — heuristic H6.)

### 3. Sales problem selection
The visitor names the felt pain — "sales flat," "busy but not profitable," "competitor winning,"
"traffic but no orders," "marketplace rank dropped," "WhatsApp leads not converting." Each is the
*entry to a pattern family* (19). This focuses the Brain and respects the operator's own framing.

### 4. Structured input
The visitor enriches context with whatever they have — a store/listing **URL**, a **screenshot**,
a **menu**, a **CSV**, competitor names, pricing, an offer. All optional, all value-additive,
none gating. The Spotlight-style input makes this feel like *equipping the analysis*, not filling
a form. (Maps to SENSE; tiers per Signal & Evidence Hierarchy.)

### 5. AI suggestions
The Brain proposes — competitors it inferred, likely categories, probable channels, patterns to
check — as **suggestion cards** the visitor can **accept / reject / edit / add.** This is the
moment the visitor first feels the intelligence: *"it figured that out from a link?"* (Maps to
RECOGNISE; the human-in-the-loop made delightful.)

### 6. Evidence collection
The Brain shows what it's drawing on and, crucially, **what it's missing** — honestly. "With your
store link I can assess discovery and conversion signals; to judge profit I'd need cost or order
data." This is the Evidence Hierarchy (20) made visible, and it sets accurate expectations.
(Maps to GROUND.)

### 7. Pattern matching
The Brain surfaces the **patterns** it's recognising in *this* business, in the operator's
language, each with a plain "why I think so." This is the recognition payoff — the "that's
exactly my business" moment (`Pattern_Recognition_Experience.md`). (Maps to RECOGNISE + INTERACT,
including compound findings: "these two are connected.")

### 8. Analysis progress
A brief, *honest* working state that narrates real reasoning steps ("checking discovery vs.
demand… separating revenue from profit… ruling out the innocent explanation…") rather than a
fake spinner. It reinforces that genuine cognition is happening. Kept short; never theatrical
delay. (See `UX_Edge_Cases.md` for slow-generation handling.)

### 9. Report preview
The executive decision document: top findings with evidence, confidence, impact, effort,
priority, and the recommended action — plus "what Growmerce can execute." This is the payload.
Full spec in `Report_Preview_Experience.md`. (Maps to VALUE/DECIDE; filtered by GUARD.)

### 10. Lead capture
Asked **after** value is delivered, framed as "where should we send the full report / how should
we continue." Minimal, permissioned, honest. Full spec in `Lead_Capture_Experience.md`. (Strategy
P1: value before capture.)

### 11. WhatsApp / consultation CTA
The forward step: continue the conversation with a human operator, or go deeper. Framed as a
substantive next move ("we'll pressure-test these findings against your real numbers"), not a
vague call. Full spec in `WhatsApp_and_Consultation_CTA.md`. (Maps to ACT → Growth Operations.)

---

## 3. Principles specific to the diagnostic

- **Reasoning is visible.** At each step the Brain shows it's *using* the prior input — the
  opposite of a static questionnaire.
- **Every step is skippable where honest.** Missing input lowers confidence, it doesn't block
  (the Brain abstains gracefully — 20). "Skip" is always available; the report just says what it
  couldn't assess and why.
- **Confidence is shown, never faked.** Findings carry Low/Medium/High/Very High with a reason
  (20). Fast-mode findings are mostly Medium, framed as "strong suspicion, confirmable."
- **Profit is separated from revenue.** The diagnostic always distinguishes "more sales" from
  "more profit" (heuristic H1) — a signature of operator-grade thinking.
- **It never crosses into fabrication.** No invented numbers. If it can't know, it says so and
  shows how it *would* know. (GUARD, 20.)

---

## 4. Two depths, one diagnostic

| Depth | Trigger | Evidence | Output |
|---|---|---|---|
| **Quick diagnose** | Homepage / TikTok / no data | Tier 1–2 (answers, a URL/screenshot) | 2–3 high-recognition findings at Medium confidence + the offer to go deeper |
| **Deep diagnose** | Connected data / uploads / engaged user | Tier 2–3 | Fuller finding set at higher confidence, with sizing |

The quick path is the public magnet; the deep path is the bridge to a paid engagement. The
findings are **consistent** across depths — deep confirms and sizes what quick suspected (20, §6).

---

## 5. What the diagnostic must never feel like

- A personality quiz or "what kind of seller are you" gimmick.
- A scored questionnaire that spits a number with no reasoning.
- A form marathon that withholds all value until the end.
- A lead funnel that asks for email before giving anything.
- A generic AI audit that confidently fabricates findings.

---

## 6. User-State Transition (this surface)

| Lens | Commerce Diagnostic |
|---|---|
| **State entering** | 3 Diagnosis — "show me where the leak is" |
| **State leaving** | 4 Evidence — "prove it" (the report preview begins to) |
| **Friction** | form fatigue, upload anxiety, time fear → removed by Spotlight-style input, value-first flow, everything optional |
| **Trust gained** | watching the Brain reason on *their* business; visible diagnostic logic; honest missing-data |
| **Intelligence revealed** | matched + compound patterns on their inputs, with confidence; withholds full sizing/execution for deep diagnosis |
| **Next action** | view the report preview → capture / WhatsApp |

---

## 7. Diagnostic → Brain mapping (summary)

| Diagnostic moment | Brain stage (20) | Patterns (19) |
|---|---|---|
| Business context | SENSE / context gate | — |
| Problem selection | hypothesis seeding | pattern families |
| Structured input | SENSE | evidence signals |
| AI suggestions | RECOGNISE + human-in-loop | candidate patterns |
| Evidence collection | GROUND + Evidence Hierarchy | tiered signals |
| Pattern matching | RECOGNISE + INTERACT | matched + compound patterns |
| Analysis progress | ASSESS + GUARD | confidence + counter-checks |
| Report preview | VALUE + DECIDE | ranked findings + recommendations |
| Lead capture / CTA | ACT | route to Growth Ops |

This is the website's clearest demonstration that it is the **user-facing interface of the
Intelligence Brain** — the visitor doesn't read about Growmerce's thinking; they watch it think
about their business, and want more of it.
