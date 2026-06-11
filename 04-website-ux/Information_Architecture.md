# Information Architecture

> The site's structure is itself a statement. Generic agency navigation (Home / Services / About
> / Contact) signals "generic agency." Growmerce's architecture must signal "commerce
> intelligence operating system" before a single word is read.

---

> **Note on primacy:** the IA below is the *container layer*. The **primary** organizing model of
> this workstream is the user-state journey (`User_State_Journey.md`) — Curiosity → Recognition →
> Diagnosis → Evidence → Trust → Action → Commitment. Pages and navigation exist to move visitors
> through those states. Read the IA as "which containers serve which state transitions," not as
> the structure itself.

## 1. The principle: navigate by the operator's problem, not by our org chart

A commerce operator doesn't think "I need a service." They think *"why aren't my sales growing?"*
or *"am I actually making money?"* or *"is my competitor beating me?"* The architecture is
organised around those questions and the outcomes that answer them — not around Growmerce's
internal structure.

```
❌ Agency IA                ✅ Commerce Intelligence IA
Home                        Home (Commerce Command Center)
Services                    Diagnose Sales Leaks
About                       Tools (by outcome)
Portfolio                   Intelligence Patterns
Blog                        Markets
Contact                     Growth Operations
                            Reports
                            Talk to Growmerce (WhatsApp)
```

---

## 2. Recommended primary navigation

| Nav item (Arabic Fusha) | Purpose | Primary action it drives |
|---|---|---|
| **Home** — الرئيسية | The command-center hook; 3-second value | Start a diagnostic |
| **Diagnose Sales Leaks** — شخّص تسرّب مبيعاتك | The flagship diagnostic entry | Run the diagnostic |
| **Tools** — الأدوات | Outcome-organised free tools | Use a tool → deeper audit |
| **Intelligence Patterns** — أنماط الذكاء التجاري | Proof of expertise; recognition library | Self-recognition → diagnostic |
| **Markets** — القطاعات | Per-market recognition pages | Market-specific diagnostic/tool |
| **Growth Operations** — عمليات نمو المبيعات | The paid service, clearly framed | Consultation / WhatsApp |
| **Reports** — التقارير | What the intelligence produces | Request/preview a report |
| **Talk to Growmerce** — تواصل عبر واتساب | The conversation channel (persistent) | WhatsApp |

**Notes:**
- "Diagnose Sales Leaks" is the **center of gravity** — visually primary, the default CTA across
  the site.
- "Growth Operations" is the **honest paid anchor** — present in nav so the business model is
  never hidden behind free tools (Strategy P9).
- "Talk to Growmerce / WhatsApp" is **persistent** (sticky), not buried in a contact page — it
  is the primary conversion channel (`WhatsApp_and_Consultation_CTA.md`).
- There is **no "About"** in the primary nav. Trust is earned by demonstrated intelligence
  (`Trust_and_Proof_System.md`), not by an about page. A lightweight "who we are" can live in the
  footer.

---

## 3. The architecture as a funnel (how the areas relate)

```
                         ┌─────────────── HOME (Command Center) ───────────────┐
                         │  names leaks · maps the ecosystem · entry to diagnose │
                         └───────────────┬───────────────┬──────────────────────┘
                                         │               │
                ┌────────────────────────┘               └───────────────┐
                ▼                                                          ▼
   DIAGNOSE SALES LEAKS  ◄──────────────  TOOLS (by outcome)              MARKETS
   (the Brain, guided)        feed into    find revenue/profit leaks…      (recognition by
        │                                          │                        sector → diagnostic)
        ▼                                          ▼                              │
   REPORT PREVIEW  ◄──── INTELLIGENCE PATTERNS (recognition + proof) ◄────────────┘
        │                         (cross-links everywhere)
        ▼
   LEAD CAPTURE  ──►  TALK TO GROWMERCE (WhatsApp / consultation)  ──►  GROWTH OPERATIONS
```

Every path bends toward the same two destinations: **a diagnostic start** and **a WhatsApp
conversation.** Tools, patterns, and market pages are all on-ramps to those.

---

## 4. Page-type taxonomy

| Page type | Examples | Doc |
|---|---|---|
| **Command pages** | Home | `Homepage_Experience.md` |
| **Diagnostic flow** | The guided diagnostic | `Commerce_Diagnostic_Experience.md` |
| **Input surface** | Structured intelligent input | `Structured_Input_Experience.md` |
| **Recognition pages** | Pattern library, individual pattern pages | `Pattern_Recognition_Experience.md` |
| **Outcome/tool pages** | One per outcome + per tool | `Tool_Ecosystem_Experience.md` |
| **Market pages** | Restaurants, ecommerce, marketplace, social… | `Market_Page_Experience.md` |
| **Output pages** | Report preview | `Report_Preview_Experience.md` |
| **Conversion surfaces** | Lead capture, WhatsApp, consultation | `Lead_Capture_Experience.md`, `WhatsApp_and_Consultation_CTA.md` |
| **Landing pages** | TikTok/mobile campaign landers | `Mobile_TikTok_Landing_Experience.md` |

---

## 5. Cross-linking rules (the intelligence web)

The site is not a tree; it is a **web of recognition** where every surface can hand off to the
most relevant next step:

- Every **pattern** links to the **tool** that detects it, the **markets** where it's common,
  and the **diagnostic** that confirms it.
- Every **tool** links to the **patterns** it surfaces and a **deeper audit** CTA.
- Every **market page** links to its common patterns, relevant tools, the matching diagnostic
  module, and the relevant Growth Operations package.
- Every surface exposes the **persistent WhatsApp** action.

This mirrors the Brain's Pattern Interaction Model (20): patterns, tools, and markets are
interconnected, and the IA lets the visitor traverse the web wherever their recognition lands.

---

## 6. URL & content structure (for SEO + clarity)

- `/` — home
- `/diagnose` — diagnostic entry
- `/tools` — outcome hub; `/tools/<outcome>` and `/tools/<tool>`
- `/patterns` — recognition hub; `/patterns/<pattern>` (SEO-rich, one per pattern, per 19)
- `/markets/<market>` — per-market recognition pages
- `/growth-operations` — the paid service
- `/reports` — report explanation + preview

Pattern and market pages are the **SEO surface** — they target the exact phrases operators
search ("my discount isn't making money," "marketplace sales dropped") and route that search
curiosity into recognition → diagnostic.

---

## 7. Persistent UI elements

- **Sticky WhatsApp / "Talk to Growmerce"** — always reachable.
- **Sticky "Diagnose" CTA** — the default forward action.
- **Confidence/honesty microcopy** — wherever insight appears, the evidence/confidence framing
  travels with it (Trust layer, 20).
- **Language: Arabic Fusha, RTL** — the entire IA is RTL-first (`Arabic_Content_UX.md`).

---

## 8. What the IA deliberately omits

- No "Services" list, no "About," no generic blog, no portfolio wall.
- No top-level "Pricing" page for Growth Operations (it's scoped in conversation — the service is
  operations, not a SKU); pricing of any productised tools is handled within tool/package pages.
- No dead-end "Contact" form as the only path — conversation is WhatsApp-first and everywhere.

The architecture itself should make a visitor pause and think: *"this is structured like a
commerce intelligence system, not like an agency."* That reaction is the IA doing its job.
