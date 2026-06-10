# Structured Input Experience

> The single most important UX differentiator. Growmerce asks for a lot — business type,
> products, channels, competitors, pricing, files, URLs — but it must never *feel* like a form.
> It must feel like an **intelligent command experience**: Apple Spotlight / Raycast, not Google
> Forms / Typeform. This is where the website stops resembling every other site and starts
> feeling like an intelligence operating system.

This is the website-facing rendering of the Structured Commerce Input Layer (13), driven by the
Brain's SENSE/GROUND stages and Signal & Evidence Hierarchy (20).

---

## 1. The core feeling

> "I'm not filling in a form. I'm *directing an intelligence* — and it's helping me as I go."

Forms interrogate. A command palette **collaborates**: you type a little, it suggests a lot, you
accept/edit/reject, and the picture builds itself. The visitor should feel momentum and
assistance, never the dread of a long form.

```
Form mindset                      Command mindset
"Fill all required fields"   →    "Tell me what you've got; I'll infer the rest"
empty boxes, validation      →    suggestions, editable chips, progressive reveal
all-or-nothing submit        →    value accrues with every input; stop anytime
```

---

## 2. What the visitor can provide

All optional, all additive (each input raises confidence; none gates):

- **Business shape:** business type, industry, brands, categories, branches/locations
- **Catalogue:** products, SKUs, meals, dishes, menus
- **Commercial:** offers, pricing, occasions, campaign results
- **Competitive:** competitor names / links
- **Channels:** stores, marketplaces, delivery apps, social, WhatsApp
- **Artifacts:** screenshots, URLs, Excel/CSV, PDFs, menus

The Brain tiers each input automatically (Signal & Evidence Hierarchy, 20): a connected order
export is Tier 3; a screenshot is Tier 1 until verified; a URL is observed-live Tier 2. The
visitor doesn't see the tiers, but they shape the confidence shown later.

---

## 3. The interaction model (Spotlight/Raycast pattern)

### Entry points
- A **command-style input** at the hero ("paste your store or listing link, or describe your
  business…").
- Inline within the diagnostic at each enrichment moment.
- From tool and market pages ("analyze my listing / menu / store").
The input is **one calm field**, not a grid of empty boxes.

### Progressive disclosure
Nothing is shown until it's relevant. The visitor gives one thing (say, a store URL); the system
reveals the *next* most valuable ask based on what it just learned — never a wall of fields. The
form "unfolds" in response to input, like a conversation with a sharp analyst.

### Suggestion cards
The heart of the experience. The Brain proposes, the visitor disposes:

```
┌──────────────────────────────────────────────┐
│  Detected: 3 likely competitors               │
│  • Brand A   • Brand B   • Brand C             │
│  [✓ accept]  [✎ edit]  [✗ reject]  [+ add]     │
└──────────────────────────────────────────────┘
```

Every suggestion supports four actions — **accept · reject · edit · add** — making the visitor
the editor of an intelligence that's already done most of the work. This is the human-in-the-loop
(20) turned into a delightful micro-interaction.

### Editable chips
Accepted inputs become **chips** (categories, competitors, channels, SKUs) that can be tweaked,
removed, or grouped at a glance. The visitor always sees the current "picture" as a tidy set of
chips, not a long answered form.

### File upload states
Uploads feel like *feeding the analysis*, with honest, legible states:
- `dropped → reading → understood (here's what I found) → using it`
- For a messy file: "I found columns I can use and some I can't — here's what I'll rely on."
- For sensitive data: an explicit reassurance + minimal-use note (`Lead_Capture_Experience.md`,
  privacy in `UX_Edge_Cases.md`).

### URL analysis states
Pasting a URL triggers a visible, honest "looking at your page…" → "here's what I can see
(discovery/conversion signals) and what I can't (your real costs/orders)." The visitor watches
the Brain *observe*, which is itself proof of capability.

### Confidence display
As inputs accrue, a quiet **confidence indicator** rises ("with this, I can speak to your
marketplace discovery with medium confidence; add cost data to assess profit"). This makes the
value of each input tangible and motivates richer input — without ever demanding it.

### Missing-data prompts
When something would materially help, the Brain asks *specifically and with a reason*: "to tell
whether your discounting is actually profitable, I'd need rough order volume or margin — optional,
but it unlocks the profit view." Honest, scoped, never nagging. (Maps to the Brain's calibrated
abstention, 20.)

---

## 4. The principles that keep it from becoming a form

| Principle | Implementation |
|---|---|
| **Infer, don't interrogate** | The Brain pre-fills/suggests from any signal; the visitor corrects |
| **One thing at a time** | Progressive disclosure; reveal the next ask based on the last answer |
| **Always optional** | Every input is skippable; confidence flexes, nothing blocks |
| **Value is visible** | Confidence indicator + "what this unlocks" on every input |
| **Editable, not final** | Chips and suggestion cards; the picture is always revisable |
| **Honest about limits** | URL/file states say what they can and can't see |

---

## 5. Mobile input (the default)

On a phone, the command experience adapts:
- One tap to paste a link or upload a screenshot from the camera roll.
- Suggestion cards become **swipeable** (swipe to accept/reject).
- Chips wrap compactly; the next ask appears as a single focused card.
- Voice/keyboard friendly; minimal typing — tapping and accepting do the work.
Friction is the enemy; on mobile, the system should let a visitor build a useful picture with
mostly taps. (See `Mobile_TikTok_Landing_Experience.md`.)

---

## 6. Why this matters strategically

The structured input is where the visitor's belief flips from *"another agency site"* to *"this
is genuinely intelligent."* A Typeform clone would undo every other good decision in this
workstream. The command-palette feel is not decoration — it is the **primary evidence** of the
Intelligence Brain, experienced directly by the visitor's own hands, before any report is shown.

---

## 7. User-State Transition (this surface)

| Lens | Structured Input |
|---|---|
| **State entering** | 3 Diagnosis — willing to be analysed, wary of forms |
| **State leaving** | 3 Diagnosis (deepened) → 4 Evidence — they've equipped the analysis and trust it more |
| **Friction** | form fatigue, upload/URL anxiety → removed by command-palette feel, suggestions, optional everything, honest file/URL states |
| **Trust gained** | "it figured that out from a link?" — the first tactile proof of intelligence |
| **Intelligence revealed** | inferred competitors/categories/patterns as editable suggestions; rising confidence indicator; withholds findings until enough signal |
| **Next action** | accept/enrich context → continue the diagnostic |

---

## 8. Input → Brain mapping (summary)

| Input element | Brain (20) | Patterns (19) |
|---|---|---|
| Command input / URL / file | SENSE | raw signals → evidence |
| Suggestion cards (accept/reject/edit/add) | RECOGNISE + human-in-loop | candidate patterns/competitors |
| Confidence display | Confidence & Trust Model | evidence sufficiency |
| Missing-data prompts | Evidence Hierarchy + abstention | required signals |
| Editable chips | the Finding's evolving context | — |

The structured input is the Brain's sensory cortex made tactile — the moment the visitor stops
reading about intelligence and starts operating it.
