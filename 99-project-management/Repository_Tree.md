# Repository Tree

_Last updated: 2026-06-10_

This document tracks the on-disk structure of the Growmerce repository. It reflects what is
physically present in the repo. Workstream status (including strategically-completed
workstreams) is tracked separately in `PROJECT_STATUS.md` and `ROADMAP.md`.

---

## Current tree

```
Growmerce/
├── PROJECT_STATUS.md
├── ROADMAP.md
│
├── 04-website-ux/                            # The Commerce Intelligence Experience (how it's experienced)
│   ├── README.md
│   ├── Purpose.md
│   ├── User_State_Journey.md                 # PRIMARY SPINE: 7 user states (pages are containers)
│   ├── Intelligence_Retention_and_Return_Loops.md  # PRIMARY SPINE: recurring intelligence users
│   ├── Website_UX_Strategy.md
│   ├── Information_Architecture.md
│   │
│   ├── Homepage_Experience.md                # Major surfaces (each w/ User-State Transition block)
│   ├── Commerce_Diagnostic_Experience.md
│   ├── Structured_Input_Experience.md
│   ├── Pattern_Recognition_Experience.md
│   ├── Report_Preview_Experience.md
│   ├── Tool_Ecosystem_Experience.md
│   ├── Market_Page_Experience.md
│   ├── Lead_Capture_Experience.md
│   ├── WhatsApp_and_Consultation_CTA.md
│   ├── Mobile_TikTok_Landing_Experience.md
│   │
│   ├── Trust_and_Proof_System.md             # Trust layer
│   ├── Arabic_Content_UX.md
│   ├── UX_Edge_Cases.md
│   │
│   ├── Website_to_Intelligence_Brain_Mapping.md  # Spine: every surface → Brain (20) + Patterns (19)
│   │
│   ├── Open_Questions.md                      # Governance
│   ├── Decisions.md
│   └── Backlog.md
│
├── 19-commerce-intelligence-patterns/        # The Pattern Engine (vocabulary)
│   ├── README.md
│   ├── Purpose.md
│   ├── Commerce_Intelligence_Patterns_Strategy.md
│   │
│   ├── Revenue_Leak_Patterns.md              # Pattern libraries
│   ├── Profit_Leak_Patterns.md
│   ├── Competitor_Patterns.md
│   ├── Customer_Journey_Patterns.md
│   ├── Marketplace_Patterns.md
│   ├── Channel_Patterns.md
│   ├── Occasion_Patterns.md
│   ├── Pricing_Patterns.md
│   ├── Offer_Patterns.md
│   ├── Retention_Patterns.md
│   ├── Conversion_Patterns.md
│   │
│   ├── Pattern_Scoring_Model.md              # Trust stack
│   ├── Pattern_Confidence_Model.md
│   ├── Pattern_Evidence_Framework.md
│   │
│   ├── Pattern_to_Diagnostic_Mapping.md      # Mappings to the system
│   ├── Pattern_to_Report_Mapping.md
│   ├── Pattern_to_AI_Agent_Mapping.md
│   ├── Pattern_to_Tool_Mapping.md
│   ├── Pattern_to_Service_Delivery_Mapping.md
│   │
│   ├── Intelligence_Compounding_Model.md     # Compounding + surfaces
│   ├── Website_Intelligence_Usage.md
│   │
│   ├── Open_Questions.md                      # Governance
│   ├── Decisions.md
│   └── Backlog.md
│
├── 20-growmerce-intelligence-brain/          # The Intelligence Brain (how Growmerce thinks)
│   ├── README.md
│   ├── Purpose.md
│   ├── Growmerce_Intelligence_OS.md          # Master doc: cognition pipeline + operator mindset
│   ├── Intelligence_Decision_Framework.md    # How each conclusion is reached
│   │
│   ├── Signal_and_Evidence_Hierarchy.md      # Reasoning subsystems
│   ├── Pattern_Interaction_Model.md
│   ├── Opportunity_Ranking_Framework.md
│   ├── Risk_and_Threat_Framework.md
│   ├── Revenue_Leakage_Intelligence.md
│   ├── Profit_Leakage_Intelligence.md
│   ├── Recommendation_Generation_Framework.md
│   │
│   ├── Confidence_and_Trust_Model.md         # Trust layer
│   ├── False_Positive_and_Bias_Control.md
│   │
│   ├── Intelligence_Learning_Loop.md         # Improvement layer
│   ├── Human_Override_and_Expert_Review.md
│   │
│   ├── Open_Questions.md                      # Governance
│   ├── Decisions.md
│   └── Backlog.md
│
├── 21-brand-narrative-system/                # How Growmerce SPEAKS (the voice, not the visuals)
│   ├── README.md
│   ├── Purpose.md
│   ├── Growmerce_Worldview.md                # Foundation — the worldview
│   ├── What_Growmerce_Believes.md            #   34 core beliefs
│   ├── What_Growmerce_Rejects.md             #   33 rejections
│   ├── Narrative_Pillars.md                  # The voice — 6 recurring messages
│   ├── Brand_Personality_Framework.md        #   personality (and what it's not)
│   ├── Vocabulary_System.md                  #   use / prefer / avoid / never
│   ├── Trust_Language_Framework.md           #   calibrated honesty (differentiator)
│   ├── Evidence_and_Confidence_Communication.md  # wired to the Brain (20)
│   ├── Narrative_by_User_State.md            # Applied — by state (Curiosity → Return)
│   ├── Narrative_for_Website.md              # Applied — by surface
│   ├── Narrative_for_Diagnostics.md
│   ├── Narrative_for_Reports.md
│   ├── Narrative_for_TikTok.md
│   ├── Narrative_for_Sales_Conversations.md
│   ├── Narrative_for_WhatsApp.md
│   ├── Narrative_for_Service_Delivery.md
│   ├── Messaging_Guardrails.md               # Governance — the "never say" bright lines
│   ├── Open_Questions.md
│   ├── Decisions.md
│   └── Backlog.md
│
└── 99-project-management/
    └── Repository_Tree.md                     # This file
```

---

## Workstream folders (strategic record)

The following workstreams are **complete as strategic decisions** and form the canonical
context this repository builds on. As their documentation is committed to disk, add their
folders to the tree above:

```
01-company-strategy/
02-commerce-intelligence-architecture/
04-website-ux/                      (recommended next)
06-commerce-diagnostic/
07-ai-agent-architecture/
08-lead-generation-system/
09-sales-process/
10-service-packages/
11-operations-delivery/
12-tiktok-growth-engine/
13-data-integrations/
14-structured-commerce-input-layer/
16-growmerce-intelligence-system/
17-commerce-knowledge-assets/
18-industry-marketplace-playbooks/
```

> Status of every workstream is authoritative in `PROJECT_STATUS.md`. This tree is the
> physical-structure view; keep the two in sync as folders are committed.

---

## Workstream file counts

**04 — Website UX (23 documents)**
- Foundation / primary spines: 6 files (README, Purpose, User_State_Journey,
  Intelligence_Retention_and_Return_Loops, Website_UX_Strategy, Information_Architecture)
- Major surfaces: 10 files (homepage, diagnostic, structured input, pattern recognition, report
  preview, tools, market pages, lead capture, WhatsApp/consultation, mobile/TikTok) — each with a
  User-State Transition block
- Trust layer: 3 files (Trust & Proof, Arabic Content UX, UX Edge Cases)
- Spine: 1 file (Website → Intelligence Brain Mapping)
- Governance: 3 files (Open Questions, Decisions, Backlog)
- Organising principle: **user states primary, pages secondary**

**21 — Brand Narrative System (22 documents)**
- Worldview foundation: 4 files (README, Purpose, Worldview, Believes, Rejects — note: 5 incl.
  README/Purpose)
- The voice: 5 files (Pillars, Personality, Vocabulary, Trust-Language, Evidence & Confidence)
- Applied narrative: 8 files (by user state + 7 surfaces: website, diagnostics, reports, TikTok,
  sales, WhatsApp, service delivery)
- Governance: 4 files (Messaging Guardrails, Open Questions, Decisions, Backlog)
- Defines **how Growmerce speaks**, not how it looks (that is 03)

**19 — Commerce Intelligence Patterns (27 documents)**
- Foundation: 3 files (README, Purpose, Strategy)
- Pattern libraries: 11 files (~32 patterns)
- Trust-stack models: 3 files
- Mappings: 5 files
- Compounding + surfaces: 2 files
- Governance: 3 files

**20 — Growmerce Intelligence Brain (18 documents)**
- Foundation: 4 files (README, Purpose, Intelligence OS, Decision Framework)
- Reasoning subsystems: 7 files (Signal/Evidence, Pattern Interaction, Opportunity Ranking,
  Risk/Threat, Revenue Leakage, Profit Leakage, Recommendation Generation)
- Trust layer: 2 files (Confidence & Trust, False-Positive & Bias Control)
- Improvement layer: 2 files (Learning Loop, Human Override & Expert Review)
- Governance: 3 files (Open Questions, Decisions, Backlog)

Plus project-level: `PROJECT_STATUS.md`, `ROADMAP.md`, `99-project-management/Repository_Tree.md`.
