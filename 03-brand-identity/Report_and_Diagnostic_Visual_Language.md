# Report & Diagnostic Visual Language

> The visual requirements for the diagnostic flow and the report — the surfaces where Growmerce's
> intelligence is most directly experienced. The report must feel like an **executive decision
> brief**, never a dashboard, PDF, generic audit, or spreadsheet. This document defines the visual
> language for both. It implements `04-website-ux` (Diagnostic, Structured Input, Report Preview)
> in identity terms.

---

## 1. The governing standard

> The report feels like the clearest **executive decision document** a busy operator has ever
> received: decision-first, evidence-backed, honestly confidence-scored, calm, and obviously
> actionable. The diagnostic feels like a calm intelligence *interviewing and reasoning*, not a
> form or quiz.

---

## 2. The diagnostic flow — visual requirements

The diagnostic (`04-website-ux/Commerce_Diagnostic_Experience.md`) is the Brain reasoning in
public. Visually it must:

- **Feel like a command/console experience**, not a multi-step form (no "Step 3 of 8" progress
  bars, no form fields).
- **Show the system using the input** — each step visibly builds on the last (the intelligence is
  visible).
- **Reveal progressively** (`Layout_and_Spatial_Principles.md`) — one calm focus at a time.
- **Render honest reasoning states** (not fake spinners) during analysis
  (`Motion_and_Interaction_Principles.md`).
- **Surface confidence and missing-data** as it goes — the trust language is present throughout.

### Structured input — visual requirements
(`04-website-ux/Structured_Input_Experience.md`) — the Spotlight/Raycast command surface:
- A calm command field; **suggestion cards** with accept/reject/edit/add; **editable chips**;
  honest **file/URL states**; a quiet **confidence indicator** that rises with input.
- Feels like *operating an intelligent console*, never filling a form.

---

## 3. The report — the executive decision brief

The report (`04-website-ux/Report_Preview_Experience.md`) visual structure:

```
┌─────────────────────────────────────────────────────────┐
│  HEADLINE DIAGNOSIS        the one thing that matters most│  ← decision-first
│  SYSTEM NARRATIVE          how the findings connect       │
│                                                           │
│  PRIORITISED FINDINGS  (Now → Next → Plan)                │
│   ┌─────────────────────────────────────────────────┐    │
│   │ FINDING (operator words)                          │   │  ← one finding = one calm card
│   │ evidence · confidence · missing data              │   │
│   │ impact (revenue + profit, separated)              │   │
│   │ effort · priority · recommended action            │   │
│   │ what Growmerce can execute                         │   │
│   └─────────────────────────────────────────────────┘    │
│                                                           │
│  WHAT'S NOT WRONG (ruled-out)                             │  ← credibility through balance
│  NEXT STEP (deep diagnosis / WhatsApp)                    │
└─────────────────────────────────────────────────────────┘
```

### Visual requirements per element

| Element | Visual requirement |
|---|---|
| **Headline diagnosis** | visually dominant; the "if you do one thing" line, unmistakable |
| **System narrative** | calm connective text; how findings relate (compound findings, 20) |
| **Finding card** | one finding = one scannable card; decision-first; not a chart tile |
| **Evidence display** | provenance visible on demand (evidence panel); proof, not decoration |
| **Confidence level** | the calm confidence visual language (`Trust_and_Confidence_Visual_Language.md`) |
| **Missing data** | shown honestly as a state, with what it would unlock |
| **Impact** | revenue and profit **visually distinct** (the H1 distinction); ranges, not false precision |
| **Recommended action** | clear, single first action; priority visible |
| **Growmerce execution link** | the bridge to Growth Operations, present but not a hard sell |

---

## 4. What the report must NOT look like

| Not… | Because |
|---|---|
| **Dashboard** | metric/chart overload; no decision; "SaaS vendor" |
| **PDF** | static, document-dump feel; it's a living decision surface |
| **Generic audit** | a long list of undifferentiated flags; no priority/judgement |
| **Spreadsheet** | rows of data with no narrative or decision |

Charts appear **only** where they serve a specific decision (e.g. the gross-vs-true-margin
waterfall, demand-vs-visibility gap). Never charts for completeness or decoration.

---

## 5. Calm + decisive (the report's aesthetic)

- **Decision-first hierarchy:** the most important finding/action is visually primary; the eye goes
  to "what matters and what to do" immediately (personality: direct).
- **Generous, readable long-form rhythm:** room for nuance (ruled-out, missing data, confidence) —
  this is an executive read, not a metrics wall.
- **Restraint:** few elements per view; progressive disclosure for depth; calm space throughout.
- **Premium document feel:** it should feel like a serious, crafted brief — the kind a decision-
  maker keeps.

---

## 6. Arabic-first & mobile

- The report is **Arabic-first / RTL-native**, with excellent Arabic long-form readability
  (`Typography_Direction.md`).
- A considered **mobile report** (`Mobile_First_Brand_Experience.md`): headline + top finding
  above the fold; findings as expandable cards; impact as clear ranges; sticky next-step/WhatsApp.

---

## 7. Deliverables for Claude Design (report/diagnostic)

- The **diagnostic flow** visual language (command-console feel, progressive disclosure, honest
  reasoning states, structured input).
- The **report** visual language (executive decision brief: headline, narrative, finding cards,
  evidence panels, confidence, impact split, actions, ruled-out, next step).
- Mobile and Arabic-first variants.
- Clear "not a dashboard/PDF/audit/spreadsheet" do/don't examples.

---

## 8. The test

Does the report make a CEO think **"this is the clearest, most honest read of my business I've ever
received, and I know exactly what to do first"** — and does it look like a **decision brief**, never
a dashboard or a PDF? Does the diagnostic feel like a **calm intelligence reasoning about me**,
never a form? If so, the most important surfaces of the brand are right.
