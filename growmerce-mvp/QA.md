# Growmerce MVP Vertical Slice V1 — QA Checklist

Manual QA for the vertical slice. The MVP is the journey, not a website:

> Recognition → Input → Reasoning → Evidence → Confidence → Opportunity → Action

Run: `npm run build` then `npm run preview` (or `npm run dev`). Test on a desktop width and a
mobile width (~375px). Demo intelligence is mocked and must stay clearly flagged.

## Scenarios (engine branches on business type → channel)

- [ ] **Restaurant / delivery** — business type "مطعم/توصيل" + channel "تطبيقات التوصيل" + a problem →
      finding = menu merchandising/availability; Growth Ops = menu order / offers / pricing&commission / higher-value items / item visibility.
- [ ] **Marketplace seller** — "بائع في سوق إلكتروني" + Amazon/Noon + problem →
      finding = review density / visibility; Growth Ops = product page / images-title-desc / reviews&trust / price-vs-value / prioritisation.
- [ ] **Ecommerce store** — "متجر إلكتروني" + "متجري الإلكتروني" + problem →
      finding = checkout trust gap; Growth Ops = product page / pre-checkout trust / cart-checkout / first offer / follow-up.
- [ ] **Unclear / generic** — e.g. "تجارة عبر التواصل" with only a social channel →
      finding = "تسرّب غير محدّد بعد", confidence **low**, more missing data, fewer evidence items.

## Journey

- [ ] Recognition `/`: hero + recognition cards render RTL; CTA "شخّص تسرّب مبيعاتك" enters `/diagnose`.
- [ ] Clicking a recognition card seeds business type (when specific) + main problem.
- [ ] Structured input: business type, channels (primary selectable), products/competitors chips,
      market, problem, optional context; accept/edit/reject suggestions work.
- [ ] "وضوح السياق" updates with input (NOT red/amber/green; not a grade of the business).
- [ ] Minimum gate: "شخّص الآن" enabled only with business type + ≥1 channel + main problem.
- [ ] Result surface order: finding → reasoning trace → pattern match → evidence → confidence →
      missing data → ruled-out → verification → continue.
- [ ] Evidence / missing / ruled-out / verification are collapsible; headers (+counts) always visible.
- [ ] Confidence shows band + score + raised/reduced/cap; labelled "مستوى الثقة في التشخيص" and
      distinct from "وضوح السياق". Calibration styling, not status colours.
- [ ] Ruled-out shows ≥2 alternatives with reason + basis.
- [ ] Opportunity: exactly one, with "مبني على" linkback (finding + confidence + evidence count).
- [ ] Bridge → "/handoff"; lead form appears only after the opportunity.

## Lead / Handoff

- [ ] Lead form: required (name, business, WhatsApp, country, business type, channel, permission)
      enforced; optional (email, role, link, note); business type + channel prefilled from session.
- [ ] On submit: lead persisted to localStorage (`growmerce_mvp_leads`), context attached.
- [ ] Handoff summary shows business context, finding, confidence, opportunity, what-to-verify.
- [ ] Growth Operations examples are scenario-aware.
- [ ] WhatsApp deep link opens with a concise Arabic message containing business/type/channel/
      problem/finding/opportunity/confidence.
- [ ] If `VITE_GROWMERCE_WHATSAPP_NUMBER` unset → demo-mode note shown; link still opens safely.

## Edge cases

- [ ] Direct visit to `/diagnose` (cold) → starts at input, no crash.
- [ ] Direct visit to `/handoff` (no diagnosis) → gentle empty state + "ابدأ التشخيص"; no crash.
- [ ] Incomplete input → cannot diagnose; clear hint about the minimum.

## Honesty / provenance

- [ ] Demo banner on result; provenance tags on evidence (user/inferred/benchmark/demo).
- [ ] Impact shown as estimate ("تقدير"); illustrative-evidence note present.
- [ ] No phrase implies guaranteed results, real integrations, real AI, or a CRM.
- [ ] Footer demo note present site-wide.

## Cross-cutting

- [ ] Arabic/RTL correct across all screens; numerals/tags read correctly.
- [ ] Mobile (~375px): one idea per block, comfortable taps, no compressed-desktop feel,
      WhatsApp CTA prominent, collapsibles reduce density.
- [ ] Desktop width: calm, premium, evidence-forward; not a dashboard/agency/SaaS-onboarding look.
- [ ] Keyboard focus visible on buttons/links/inputs; form labels present.
- [ ] Funnel events logged (DevTools console in dev, or `localStorage.growmerce_mvp_events`):
      recognition_card_clicked, diagnostic_started, business_type_selected, minimum_input_completed,
      diagnostic_result_viewed, evidence_opened, opportunity_viewed, lead_submitted, whatsapp_clicked.

## Build / runtime

- [ ] `npm run build` passes (tsc -b + vite build).
- [ ] `npm run preview` serves; `/`, `/diagnose`, `/handoff` return 200.

## Real-device manual pass (do before any demo/pilot)

The automated/preview checks above run in a headless environment — **no real phones were tested
there.** Before showing the slice to anyone, walk the full journey on actual devices and tick these:

- [ ] **iPhone — Safari:** full journey `/` → diagnose → opportunity → `/handoff`; layout RTL,
      no clipped text, no horizontal scroll.
- [ ] **Android — Chrome:** same full journey; layout and fonts render, Arabic shapes correctly.
- [ ] **WhatsApp deep link on a real phone:** tapping the handoff CTA opens the WhatsApp app
      (configured number, or the contact picker in demo mode) with the Arabic message intact.
- [ ] **Keyboard / form on mobile:** focusing inputs raises the soft keyboard without breaking
      layout; the lead form is usable; the Arabic keyboard works in text fields.
- [ ] **Scroll rhythm:** scrolling the long result surface is smooth; sticky/topbar elements
      don't overlap content; momentum scrolling feels native.
- [ ] **Touch targets:** buttons, chips, collapsible headers, and the WhatsApp CTA are easy to
      tap (no mis-taps, ~44px min); accept/edit/reject on suggestions is comfortable.
- [ ] **Collapsibles:** evidence / missing-data / ruled-out / verification expand and collapse on
      touch; headers + counts stay visible when collapsed.
- [ ] **Lead form submission:** required-field validation triggers on mobile; a valid submit
      advances to the handoff summary; the lead is written to `localStorage`.
- [ ] **Arabic text wrapping:** long Arabic strings (finding titles, narrative, opportunity) wrap
      cleanly at narrow widths — no overflow, no broken bidi, numerals read correctly inline.

> Tested on real devices: _not yet_ — record device/OS/browser, date, and tester here when done.

## Sign-off

### 2026-06-11 — Demo Readiness Fix Pass (automated checks in CI/headless env)

Run by Claude in the remote build environment (Node 22, headless — **no real phones**).

Verified ✅

- [x] `npm run build` passes (tsc -b + vite build; 71 modules, clean).
- [x] `npm run preview` serves; `/`, `/diagnose`, `/handoff` all return **200**.
- [x] Scenario engine deterministic branches correct:
      restaurant → `delivery_menu_merchandising` (medium/58),
      marketplace → `review_density_gap` (medium/60),
      ecommerce → `checkout_trust_gap` (medium/56),
      generic → `undetermined_leak` (low/38). Each: ≥2 ruled-out, ≥1 evidence with honest
      per-item provenance, ≥3 verification steps, opportunity impact marked as estimate.
- [x] Direct `/handoff` (no diagnosis) → gentle empty state, no crash.
- [x] WhatsApp config (`src/lib/whatsapp.ts`, `.env.example`): env-based, no secrets, deep link
      only (no API); unset number → safe demo mode (contact picker + demo note).
- [x] Honesty copy audit (visible strings): demo banner on result, site-wide footer demo note,
      provenance tags (incl. "بيانات تجريبية"), impact shown as "تقدير", localStorage/no-CRM and
      no-WhatsApp-API notes present. No phrase implies guaranteed results, real AI, live
      marketplace data, a CRM, or real integrations. No copy changes required.

Known risks / not yet covered

- Real-device manual pass above is **outstanding** — must be completed before the demo.
- Intelligence is **mocked** (deterministic demo), not real reasoning/AI/benchmarks.
- Leads + funnel events persist only in the visitor's `localStorage` — no durable lead sink/CRM.
- Cross-cutting a11y, fine RTL polish, and visual review were exercised in build/preview only,
  not on assistive tech or physical devices.

Status: **Ready for a controlled demo/pilot** once the real-device manual pass is signed off.
**Not** ready for real production traffic or durable lead capture.

## Launch readiness checklist (V1)

Run against the **deployed** build (not just local). Configure `VITE_GROWMERCE_WHATSAPP_NUMBER`
and `VITE_GROWMERCE_LEAD_ENDPOINT` first; then walk the full journey.

- [ ] **Lead submission reaches the real sink:** with `VITE_GROWMERCE_LEAD_ENDPOINT` set, submitting
      the lead form shows the **success** note and the payload appears in the sink (Formspree/Sheet/
      function inbox).
- [ ] **Lead payload includes diagnostic context:** the received record contains `lead` + `context`
      (finding, pattern, confidence, opportunity, verification, missing data) and `demoDiagnostic: true`.
- [ ] **Fallback is safe & clear:** with the endpoint **unset**, submitting still advances to the
      handoff, shows the localStorage-only note, and does not error.
- [ ] **Submission states:** submitting shows "جارٍ الإرسال…"; success/partial-failure/fallback each
      render a distinct, honest note.
- [ ] **WhatsApp opens the correct number:** the handoff CTA opens **the configured** number (not the
      demo picker) with the Arabic context message intact.
- [ ] **Immediate demo diagnostic:** after entering business info the diagnostic report appears
      immediately (no waiting on real intelligence) and stays clearly flagged as demo.
- [ ] **Demo labels visible:** demo banner on the result, provenance tags, footer demo note, "تقدير"
      on impact — all present.
- [ ] **Privacy / consent visible:** the lead form consent checkbox + fineprint state that the user
      shares business/contact info, that Growmerce may contact them about this diagnosis, that the
      diagnosis is demo/illustrative, no guaranteed results, and no real marketplace data is fetched.
- [ ] **Mobile journey works:** full journey on a real phone (iPhone Safari + Android Chrome) — input,
      report, lead form, WhatsApp deep link.
- [ ] **Routing after deployment:** `/`, `/diagnose`, `/handoff` all load on direct visit / refresh
      (SPA history fallback configured); no 404.
- [ ] **No secrets in the bundle:** only the public WhatsApp number and the public lead-endpoint URL
      are present; nothing sensitive inlined.

### 2026-06-11 — Launch Readiness Sprint V1 (automated checks in CI/headless env)

Run by Claude in the remote build environment (Node 22, headless — **no real phones, no live sink**).

Verified ✅

- [x] `npm run build` passes (tsc -b + vite build; 72 modules incl. `src/lib/leadSink.ts`).
- [x] `npm run preview` serves; `/`, `/diagnose`, `/handoff` all return **200**.
- [x] Lead sink wiring: `submitLead()` always writes localStorage first, POSTs JSON (lead + context
      + `demoDiagnostic: true`) only when `VITE_GROWMERCE_LEAD_ENDPOINT` is an HTTPS URL, and never
      throws — returns `{ ok, storedLocally, sentRemote, configured, error }` for the UI.
- [x] Fallback path (endpoint unset): journey completes, localStorage-only note shown, no error.
- [x] Consent copy updated: shares business/contact info, contact-about-this-diagnosis, demo/
      illustrative, no guaranteed results, no real marketplace data fetched.
- [x] WhatsApp remains env-based deep link (no API); real number used when configured.

Known risks / not yet covered

- **Live sink + real WhatsApp number + real devices were not exercised here** — must be verified on
  the deployed build before opening to the public (see the checklist above).
- Lead delivery depends on the endpoint's CORS allowing the deployed origin — verify post-deploy.
- Intelligence is still **mocked** (demo); no marketplace data, no WhatsApp API, no CRM, no dashboard.

Status: **Ready to deploy for a controlled launch** once the deployed-build checklist above is
signed off (live sink delivery, real WhatsApp number, real-device journey). Scope unchanged — no new
product features.
