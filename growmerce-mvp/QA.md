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
