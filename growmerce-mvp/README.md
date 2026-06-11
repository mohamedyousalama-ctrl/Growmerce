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

### Configuration

- **WhatsApp number** — copy `.env.example` to `.env.local` and set
  `VITE_GROWMERCE_WHATSAPP_NUMBER` (digits + country code). If unset, the app runs in **demo mode**:
  the WhatsApp link opens the contact picker and a demo note is shown. Deep link only — no API.
- **Funnel events** — a lightweight internal logger (`src/lib/analytics.ts`) logs journey events to
  the console (dev) and a capped `localStorage` log (`growmerce_mvp_events`). No external analytics.
- **Leads** — captured leads are stored thinly in `localStorage` (`growmerce_mvp_leads`) for the
  handoff only — **not** a CRM.

### Deployment (controlled demo / pilot)

This slice is a **static single-page app** — there is no server, database, or backend.

```bash
npm install
npm run build      # → outputs the static site to growmerce-mvp/dist/
```

Serve the `dist/` folder from any static host (Netlify, Vercel, Cloudflare Pages, S3 +
CloudFront, Nginx, …).

- **Build command:** `npm run build` · **Publish / output directory:** `dist`
- **SPA history fallback (required):** the app uses client-side routing, so deep links such as
  `/diagnose` and `/handoff` must rewrite to `/index.html` (otherwise a refresh on those URLs 404s).
  - Netlify: a `_redirects` file with `/*  /index.html  200`.
  - Vercel: a rewrite of `/(.*)` → `/index.html`.
  - Nginx: `try_files $uri /index.html;`.
- **Environment variable:** set `VITE_GROWMERCE_WHATSAPP_NUMBER` (digits + country code) at
  **build time** so the WhatsApp handoff targets your number. If unset, the build runs in demo
  mode (the link opens WhatsApp's contact picker and a demo note is shown). No secrets are needed —
  it is a public deep-link number. WhatsApp is a **deep link only — there is no WhatsApp API**.
- **Demo-only data:** there is **no real lead sink** — captured leads live only in the visitor's
  browser `localStorage` (and so do funnel events). Clearing site data erases them. This is a demo,
  **not** a CRM. Do not treat collected leads as durable storage.

### QA

Manual QA checklist: [`QA.md`](./QA.md) (scenarios, journey, lead/handoff, edge cases, honesty,
mobile/RTL, a11y, build/runtime), plus a real-device manual pass and a dated sign-off.

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
