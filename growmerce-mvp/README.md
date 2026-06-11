# Growmerce — MVP Vertical Slice V1 (Sprint 1 skeleton)

This is **Sprint 1** of the Growmerce MVP Vertical Slice: the foundation and a navigable,
end-to-end **empty** journey. It is **not** a website, a dashboard, or a brochure — it is the
skeleton of the Commerce Intelligence experience:

> **Recognition → Input → Reasoning → Evidence → Confidence → Opportunity → Action**

Source of truth: the approved workstreams (`19`, `20`, `22`, `23`, `24`, `25`, `04`, `21`, `03`)
and `00-Claude-Design-Master-Brief.md`, Direction A — Commerce Intelligence OS. Arabic-first,
RTL-by-default, mobile-first, calm/light/premium, evidence-forward.

> **Honesty:** the intelligence in this slice is **mocked** and clearly flagged as demo data
> (`provenance: 'demo'`, demo banners, "تقدير" on impact). No real AI, integrations, benchmarks,
> or reasoning yet — those replace the single `getDiagnostic()` seam in Sprint 3.

## Run locally

```bash
cd growmerce-mvp
npm install
npm run dev      # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # type-check (tsc -b) + production build (vite build)
npm run preview  # preview the production build
npm run check    # type-check only
```

## The journey (click through)

1. `/` — **Recognition** entry (hero + recognition cards + CTA)
2. `/diagnose` — progressive flow: **Input → Reasoning → Result** (finding, reasoning trace,
   evidence, confidence, missing-data, ruled-out) **→ Opportunity**
3. `/handoff` — **Lead** capture (after value) **→ WhatsApp / Growth Operations** handoff

The `DiagnosticSession` state machine drives the seven journey states and persists across routes.

## Structure

```
growmerce-mvp/
├── index.html                 # lang="ar" dir="rtl"
├── src/
│   ├── styles/                # tokens.css (Direction A; confidence = calibration, not status), app.css
│   ├── types/                 # Core V1 data model (mirrors WS24 discipline)
│   ├── mock/                  # recognition cards + getDiagnostic() stub (the future-real seam)
│   ├── state/                 # DiagnosticSession state machine (context + reducer)
│   ├── lib/                   # whatsapp deep-link helper
│   ├── components/            # base component shells
│   └── routes/                # RecognitionPage, DiagnosePage, HandoffPage
└── (configs)
```

## Scope (Sprint 1)

Built: app shell, design tokens, core types, the `getDiagnostic()` mock seam, the session state
machine, the route skeleton, base component shells, and full navigation through the empty journey.

Not built (later sprints): real reasoning/AI, integrations, benchmarks, deterministic per-input
diagnosis (Sprint 3), lead persistence + booking (Sprint 4), final content, Arabic terminology
lock + full mobile/QA polish (Sprint 5).
