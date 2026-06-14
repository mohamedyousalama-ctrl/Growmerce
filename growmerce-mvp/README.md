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
  `VITE_GROWMERCE_WHATSAPP_NUMBER`. Format: **country code + number, digits only** (no `+`, spaces,
  dashes, or leading `00`) — e.g. `9665XXXXXXXX` (SA), `9715XXXXXXXX` (UAE), `201XXXXXXXXX` (EG).
  If unset, the app runs in **demo mode**: the WhatsApp link opens the contact picker and a demo
  note is shown. Deep link only — no API.
- **Lead sink** — set `VITE_GROWMERCE_LEAD_ENDPOINT` to an HTTPS endpoint that accepts a JSON POST
  (a form service, serverless function, Apps Script web app, or Supabase REST URL). When set, each
  submitted lead — **with its diagnostic context** — is POSTed there, and a localStorage copy is
  kept as a fallback. If unset, lead capture falls back to **localStorage-only** (clearly flagged in
  the UI). Not a CRM; no marketplace data is fetched.
- **Funnel events** — a lightweight internal logger (`src/lib/analytics.ts`) logs journey events to
  the console (dev) and a capped `localStorage` log (`growmerce_mvp_events`). No external analytics.

### Real Intelligence System — backend foundation (schema only, not wired)

The `supabase/` directory holds the **database schema foundation** for the upcoming Real
Intelligence System (real, evidence-backed, human-reviewed reports). **This is schema only:**

- It is **not wired into the UI**. The current MVP still produces the **deterministic/demo**
  diagnostic via `getDiagnostic`, and works fully **without** Supabase configured.
- `supabase/migrations/` defines core tables (`contacts`, `businesses`, `consent_records`,
  `report_requests`, `agent_runs`) with **Row Level Security enabled and deny-by-default** (no
  permissive policies yet — only the server-side `service_role` can read/write).
- Env vars `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and the flag `VITE_REAL_INTELLIGENCE`
  (default `false`) are placeholders for later phases — see `.env.example`.
- **No secrets are committed.** Never place the Supabase `service_role` key in a `VITE_` variable
  or the client bundle; it belongs only in server-side Edge Function config.

Applying migrations later (when a project exists): `supabase db push` (Supabase CLI) or run the
SQL files in order via the SQL editor.

#### Lead / report-request persistence (Phase 1 Sprint 2 — optional, off by default)

When Supabase is configured, a submitted lead is persisted to `contacts` + `businesses` +
`consent_records` + `report_requests` through the **`submit-report-request` Edge Function** (which
writes server-side with the service-role key, past deny-by-default RLS). **Nothing changes when
Supabase is unconfigured** — the app keeps its current behavior, and the report is still the
deterministic/demo finding (`getDiagnostic`). The persisted `report_request` is just stored as
`queued`; no intelligence is generated yet.

**Submission priority** (in `src/lib/leadSink.ts`): `localStorage` is always written first as a
fallback, then the first configured remote sink is used —
1. **Supabase Edge Function** (`VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` set), else
2. **Form endpoint** (`VITE_GROWMERCE_LEAD_ENDPOINT` set), else
3. **localStorage only** (clearly flagged in the UI).

A persistence failure never blocks the WhatsApp handoff.

**Configure & deploy the function:**
```bash
# from growmerce-mvp/
supabase link --project-ref <your-project-ref>
supabase db push                                   # apply the schema migrations
supabase functions deploy submit-report-request    # verify_jwt=false (public endpoint; see config.toml)
supabase secrets set \
  SUPABASE_SERVICE_ROLE_KEY=<service_role_key> \
  GROWMERCE_ALLOWED_ORIGINS=https://your-app.vercel.app
```
Then set the client vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the host build env.

**Expected payload** (frontend → function): `{ source, submittedAt, pageUrl, demoDiagnostic:true,
consent:{granted,scope,textShown}, lead:{...}, context:{...}, structuredInput, currentDemoFinding }`.
The function validates (name, whatsapp, business name, consent all required), trims/normalizes, and
returns `{ ok, contact_id, business_id, report_request_id, status }`.

**Security:** the client uses only the public anon key. The **service-role key is never a `VITE_`
var or in the bundle** — it lives only in Supabase function secrets. No reviewer auth or agents yet.

#### Data source intake (Phase 2 Sprint 3 — capture only)

When persisting, the submission also carries a normalized `dataSources` array (built from the
existing structured input: website/store/menu URLs, competitor names, free-text notes; Google
Sheet URLs are detected and tagged `sheet_reference`). The Edge Function stores these into
`data_sources` (+ a `raw_observations` row each, provenance `user_provided`). **This is capture
only:** nothing is fetched, scraped, OCR'd, parsed, or analyzed — rows stay `status='submitted'`,
and the report is still the deterministic demo finding. **File uploads are not enabled yet:** the
`uploaded_files` table and a private `report-uploads` storage bucket exist for a later sprint
(metadata only; bucket is private, no public access, no object policies — service-role only). Real
evidence generation arrives in a later sprint (Evidence Builder).

#### Evidence Builder skeleton (Phase 3)

The `build-evidence` Edge Function converts already-captured **user-provided** `raw_observations`
into **draft** `evidence_items` (migration 0005). It **does not fetch URLs, parse files, run OCR,
use AI, or call any external service**, and it **does not produce a report**. Strength/tier are
conservative and rule-assigned (URLs/notes/competitors → weak/contextual; manual metrics →
moderate); nothing is treated as verified. It is idempotent (skips observations already converted)
and logs an `agent_runs` row (`evidence_builder_v1`). Call: `POST { "report_request_id": "<uuid>" }`.

### Deployment (controlled launch / pilot)

This slice is a **static single-page app** — there is no server, database, or backend bundled.
Build it and serve the `dist/` folder from any static host (Netlify, Vercel, Cloudflare Pages,
S3 + CloudFront, Nginx, …).

```bash
npm install
npm run build      # → outputs the static site to growmerce-mvp/dist/
```

- **Build command:** `npm run build` · **Publish / output directory:** `dist`

**Environment variables** (set at **build time** — Vite inlines `VITE_*` vars into the bundle):

| Variable | Required | Purpose | Format / example |
| --- | --- | --- | --- |
| `VITE_GROWMERCE_WHATSAPP_NUMBER` | Recommended | Real WhatsApp number for the handoff deep link | Country code + number, digits only: `9665XXXXXXXX` |
| `VITE_GROWMERCE_LEAD_ENDPOINT` | Optional | HTTPS endpoint that receives submitted leads (JSON POST) | `https://formspree.io/f/xxxxxxx` |

If a variable is unset, the app degrades gracefully: no WhatsApp number → demo contact-picker mode;
no lead endpoint → localStorage-only lead capture. Both states are clearly flagged in the UI. No
secrets belong in these vars — the WhatsApp number is public and the lead endpoint is a public URL.

**SPA history fallback (required):** the app uses client-side routing, so deep links such as
`/diagnose` and `/handoff` must rewrite to `/index.html` (otherwise a refresh on those URLs 404s).
  - Netlify: a `_redirects` file with `/*  /index.html  200`.
  - Vercel: a rewrite of `/(.*)` → `/index.html`.
  - Nginx: `try_files $uri /index.html;`.

**Lead sink configuration:** point `VITE_GROWMERCE_LEAD_ENDPOINT` at any endpoint that accepts a
JSON `POST` and allows CORS from your deployed origin. The app sends:

```jsonc
{
  "source": "mvp_vertical_slice_v1",
  "submittedAt": "<ISO timestamp>",
  "pageUrl": "<page URL>",
  "demoDiagnostic": true,          // the diagnosis is demo/illustrative in V1
  "lead":    { /* name, businessName, whatsapp, country, businessType, mainChannel, ... */ },
  "context": { /* finding, pattern, confidence, opportunity, verification, missing data */ }
}
```

Quick options: **Formspree / Web3Forms / Basin** (paste the form URL), a **serverless function**
on your host, or a **Google Apps Script web app** writing to a Sheet (deploy as “Anyone”, return
JSON, and allow CORS). No CRM, no marketplace data — just a durable place for the lead + context.

**Verify the deployed app:**
1. Open `/` — the recognition entry renders RTL.
2. Run the journey: enter business info → an **immediate demo diagnostic report** appears →
   Opportunity → `/handoff`.
3. Hard-refresh `/diagnose` and `/handoff` directly — they load (SPA fallback works), no 404.
4. Submit the lead form → a **success** note appears (or a clear fallback note if no endpoint is
   set); confirm the lead + context landed in your sink (e.g. the Formspree/Sheet inbox).
5. Tap the WhatsApp CTA → it opens **your** configured number with the Arabic context message.
6. Confirm the demo/consent labels are visible throughout.

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
