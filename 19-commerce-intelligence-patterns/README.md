# 19 — Commerce Intelligence Patterns

> The reusable intelligence layer of Growmerce. Patterns describe **recurring commercial
> realities** — not industries, not channels, not platforms. They are the most reusable
> asset in the entire system because the same pattern shows up across a fashion brand on
> a marketplace, a restaurant on a delivery app, and a DTC skincare store on its own site.

---

## What this workstream is

This is the **Growmerce Pattern Engine** — a library of diagnosable, evidence-based
commerce patterns that power everything downstream:

- Diagnostics (what we look for)
- AI agents (what they reason about)
- Reports (what we tell the client)
- Recommendations (what we tell them to do)
- Website experiences (the "that is exactly my business" moment)
- TikTok content (pattern → hook → story)
- Lead magnets (pattern self-diagnosis tools)
- Sales conversations (naming the pain precisely)
- Growth Operations delivery (the fix playbooks)
- Future SaaS (automated pattern detection)

A pattern is not a category. A category is a bucket ("Low Reviews"). A pattern is a
**named commercial reality with cause, evidence, and consequence** ("Review Density Gap —
the listing has enough reviews to look credible but too few recent ones to win the
'social proof freshness' filter buyers subconsciously apply").

---

## The rule that governs this workstream

> **Write patterns, not categories.**

| ❌ Category (banned) | ✅ Pattern (required) |
|---|---|
| Low Reviews | Review Density Gap |
| Weak Pricing | Price Advantage Exists But Value Communication Fails |
| Low Conversion | Traffic Arrives Through Discount Intent But Encounters Premium Positioning |
| High CAC | Acquisition Is Paid While Competitors Compound Organic |
| Bad Retention | First Order Is Treated As A Win Instead Of A Trial |

If a "pattern" could be a column header in a dashboard, it is a category. Rewrite it.

---

## Library structure

### Foundation
| File | Role |
|---|---|
| `Purpose.md` | Why patterns are the core asset |
| `Commerce_Intelligence_Patterns_Strategy.md` | How the Pattern Engine works and compounds |

### Pattern libraries (the patterns themselves)
| File | Domain |
|---|---|
| `Revenue_Leak_Patterns.md` | Where revenue silently escapes |
| `Profit_Leak_Patterns.md` | Where margin escapes even when revenue looks fine |
| `Competitor_Patterns.md` | Recurring competitive-dynamics realities |
| `Customer_Journey_Patterns.md` | Where the journey breaks between intent and purchase |
| `Marketplace_Patterns.md` | Realities specific to marketplace ranking/economics |
| `Channel_Patterns.md` | Cross-channel acquisition and attribution realities |
| `Occasion_Patterns.md` | Seasonal/occasion-driven demand realities |
| `Pricing_Patterns.md` | How price is set, framed, and perceived |
| `Offer_Patterns.md` | How the offer is constructed and bundled |
| `Retention_Patterns.md` | Why customers do or don't come back |
| `Conversion_Patterns.md` | Why qualified intent fails to convert |

### Intelligence models (how we trust a pattern)
| File | Role |
|---|---|
| `Pattern_Scoring_Model.md` | How a detected pattern is scored for impact + priority |
| `Pattern_Confidence_Model.md` | How sure we are the pattern is real |
| `Pattern_Evidence_Framework.md` | What counts as evidence, and evidence tiers |

### Mappings (how patterns power the system)
| File | Connects patterns to… |
|---|---|
| `Pattern_to_Diagnostic_Mapping.md` | The Commerce Diagnostic (06) |
| `Pattern_to_Report_Mapping.md` | Client-facing reports |
| `Pattern_to_AI_Agent_Mapping.md` | The AI agents (07) |
| `Pattern_to_Tool_Mapping.md` | Tools / data integrations (13) |
| `Pattern_to_Service_Delivery_Mapping.md` | Growth Operations delivery |

### Compounding + surfaces
| File | Role |
|---|---|
| `Intelligence_Compounding_Model.md` | How patterns get smarter with every engagement |
| `Website_Intelligence_Usage.md` | How patterns drive the "that's exactly my business" website moment |

### Governance
| File | Role |
|---|---|
| `Open_Questions.md` | Unresolved design questions |
| `Decisions.md` | Locked decisions for this workstream |
| `Backlog.md` | Future patterns + future engine work |

---

## How to read a pattern

Every pattern in this library uses one template. Read it top to bottom and you should be
able to (a) recognise the pattern in a real business, (b) prove it with evidence, and
(c) act on it the same week.

```
Pattern Name
Category
Description
Business Symptoms        → what the operator feels
Evidence Signals         → what the data shows
Common Root Causes       → why it happens
Revenue Impact           → effect on top line
Profit Impact            → effect on margin
Risk Level               → urgency / downside
Confidence Factors       → what makes us sure
Counter Evidence         → what would mean we're wrong
Quick Wins               → fixes this week
Strategic Fixes          → fixes this quarter
Operational Fixes        → process/system fixes
AI Detection Opportunities → how an agent finds it automatically
Diagnostic Usage         → where it lives in the diagnostic
Report Usage             → how it's framed to the client
Service Delivery Usage   → how Growth Ops delivers the fix
Future SaaS Usage        → how this becomes automated product
```

---

## Relationship to existing workstreams

This workstream **builds on** — and does not replace — prior decisions:

- **02 Commerce Intelligence Architecture** — patterns are the content that flows through
  the architecture's intelligence pipeline.
- **06 Commerce Diagnostic** — every diagnostic question now traces to a pattern it is
  trying to confirm or rule out.
- **07 AI Agent Architecture** — agents reason in patterns, not raw metrics.
- **13 Data Integrations** — integrations supply the evidence signals patterns require.
- **16 Growmerce Intelligence System** — patterns are the unit the intelligence system
  stores, scores, and compounds.
- **17 Commerce Knowledge Assets** — patterns are the highest-leverage knowledge asset.
- **18 Industry / Marketplace / Channel / Occasion Playbooks** — playbooks describe
  *contexts*; patterns describe *what recurs across contexts*. Playbooks reference
  patterns; patterns do not depend on playbooks.

---

## Design principle

> **Depth over breadth.** A smaller number of highly practical patterns that an operator
> recognises instantly beats a long list of generic patterns nobody acts on.

We would rather ship 30 patterns that make a business owner say *"that is exactly what is
happening in my business"* than 300 that read like a consulting deck.
