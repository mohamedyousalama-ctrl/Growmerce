# Repository Tree

_Last updated: 2026-06-10_

This document tracks the on-disk structure of the Growmerce repository. It reflects what is
physically present in the repo. Workstream status (including strategically-completed
workstreams) is tracked separately in `PROJECT_STATUS.md` and `ROADMAP.md`.

---

## Current tree

```
Growmerce/
├── 00-Claude-Design-Master-Brief.md          # THE SOURCE OF TRUTH for Claude Design (synthesis of all workstreams)
├── PROJECT_STATUS.md
├── ROADMAP.md
│
├── 03-brand-identity/                        # How Growmerce LOOKS — the strategic identity brief
│   ├── README.md
│   ├── Purpose.md
│   ├── Brand_Identity_Strategy.md            # Foundation
│   ├── Brand_Positioning_Summary.md          #   the design north star
│   ├── Brand_Personality_to_Visual_Principles.md  # voice (21) → visual principles
│   ├── Visual_Direction_Principles.md        # Visual direction — Commerce Intelligence OS
│   ├── Logo_Direction_Brief.md
│   ├── Arabic_Name_and_Naming_System.md      #   جرومرس
│   ├── Typography_Direction.md
│   ├── Color_Direction.md
│   ├── Layout_and_Spatial_Principles.md
│   ├── Iconography_and_Illustration_Principles.md
│   ├── Motion_and_Interaction_Principles.md
│   ├── Intelligence_OS_Visual_Metaphor.md    # Intelligence visual systems
│   ├── Platform_Ecosystem_Visualization.md   #   (never a logo wall)
│   ├── Report_and_Diagnostic_Visual_Language.md
│   ├── Trust_and_Confidence_Visual_Language.md  # (core differentiator)
│   ├── Mobile_First_Brand_Experience.md
│   ├── Claude_Design_Brief.md                # THE HANDOFF to Claude Design
│   ├── Open_Questions.md                      # Governance
│   ├── Decisions.md
│   └── Backlog.md
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
├── 25-system-architecture/                   # HOW GROWMERCE WORKS AS SOFTWARE (services → deployment)
│   ├── README.md
│   ├── 01_System_Architecture_Overview.md    # the layered architecture, end to end
│   ├── 02_Service_Architecture.md            # the services
│   ├── 03_Data_Architecture.md               # the polyglot data stores
│   ├── 04_Event_Architecture.md              # events: producers/consumers/payloads
│   ├── 05_Intelligence_Runtime.md            # end-to-end request runtime
│   ├── 06_Retrieval_And_Reasoning_Runtime.md # grounded retrieval / anti-hallucination
│   ├── 07_Memory_Architecture.md             # how Growmerce remembers + learns
│   ├── 08_Multi_Tenant_Architecture.md       # private data, shared knowledge, network
│   ├── 09_Security_And_Trust_Architecture.md # auditability, lineage, integrity
│   ├── 10_AI_Role_Definition.md              # strict allow/forbid for the AI
│   ├── 11_Deployment_Architecture.md         # cloud, scale, observability
│   ├── 12_MVP_Architecture.md                # smallest doctrine-preserving system (build v1)
│   ├── 13_Architecture_Decisions.md          # ADRs + rejected alternatives
│   ├── 14_Architecture_Risks.md              # failure modes + mitigations
│   ├── 15_Why_This_Architecture_Wins.md      # the architectural moat
│   ├── Open_Questions.md                      # Governance
│   └── Backlog.md
│
├── 24-intelligence-object-architecture/      # SOFTWARE-READY ARCHITECTURE (objects → engines)
│   ├── README.md
│   ├── 01_Intelligence_Object_Architecture.md     # base object, provenance DAG, invariants
│   ├── 02_Signal_Object.md                   # the intelligence objects (10 facets each)
│   ├── 03_Evidence_Object.md
│   ├── 04_Knowledge_Object.md
│   ├── 05_Pattern_Object.md
│   ├── 06_Recommendation_Object.md
│   ├── 07_Opportunity_Object.md
│   ├── 08_Threat_Object.md
│   ├── 09_Commerce_Entity_Model.md           # the ontology as schemas
│   ├── 10_Intelligence_Relationship_Model.md # the full edge catalogue
│   ├── 11_Confidence_Object_Model.md         # confidence as a value object
│   ├── 12_Intelligence_Versioning_Model.md   # append-only, pinned lineage, time-travel
│   ├── 13_Retrieval_Architecture.md          # CRITICAL — grounded retrieval (no hallucination)
│   ├── 14_Future_Knowledge_Graph_Foundation.md
│   ├── 15_Why_This_Architecture_Scales.md    # engine→object mapping; scales in trust
│   ├── Decisions.md                           # Governance
│   ├── Open_Questions.md
│   └── Backlog.md
│
├── 23-commerce-knowledge-system/             # WHAT GROWMERCE KNOWS (the institutional understanding)
│   ├── README.md
│   ├── 01_Commerce_Knowledge_System_Overview.md   # what it is + how it connects to everything
│   ├── 02_Commerce_Knowledge_Domains.md      # the 16 knowledge domains
│   ├── 03_Knowledge_Objects_Framework.md     # the 14 building blocks of knowledge
│   ├── 04_Marketplace_Knowledge_System.md    # domain doctrine (transferable)
│   ├── 05_Pricing_and_Promotion_Knowledge.md
│   ├── 06_Customer_Behavior_Knowledge.md
│   ├── 07_Occasion_and_Demand_Knowledge.md
│   ├── 08_Competitor_and_Market_Knowledge.md
│   ├── 09_Knowledge_to_Pattern_Mapping.md    # knowledge vs pattern vs signal vs evidence vs rec
│   ├── 10_Knowledge_to_Brain_Mapping.md      # where knowledge enters reasoning
│   ├── 11_Knowledge_Compounding_Model.md     # how knowledge grows / strengthens / retires
│   ├── 12_Knowledge_Quality_Framework.md     # validation / trust / versioning
│   ├── 13_Knowledge_Gaps_and_Unknowns.md     # preventing false certainty
│   ├── 14_Commerce_Ontology_Foundation.md    # the entities & relationships of commerce
│   ├── 15_Why_Growmerce_Knows_More.md        # the executive case (the knowledge moat)
│   ├── Decisions.md                           # Governance
│   ├── Open_Questions.md
│   └── Backlog.md
│
├── 22-intelligence-supply-chain/             # How Growmerce PRODUCES OUTPUT ACCURACY
│   ├── README.md
│   ├── 01_Intelligence_Supply_Chain_Overview.md   # the 12-stage pipeline
│   ├── 02_Signal_Taxonomy.md                 # every signal category, rated
│   ├── 03_Intelligence_Source_Hierarchy.md   # 5 tiers; what outranks/overrides what
│   ├── 04_Intelligence_Acquisition_Strategy.md    # where intelligence comes from
│   ├── 05_Verification_and_Trust_System.md   # how hallucinations are avoided
│   ├── 06_Evidence_Scoring_Engine.md         # evidence → computed confidence
│   ├── 07_Output_Accuracy_Framework.md       # THE CORE — what determines accuracy
│   ├── 08_Intelligence_Failure_Modes.md      # detection / mitigation / recovery
│   ├── 09_Intelligence_Quality_Control.md    # checkpoints before every output
│   ├── 10_Competitive_Advantage_of_the_Supply_Chain.md  # why competitors conclude worse
│   ├── Decisions.md                           # Governance
│   ├── Open_Questions.md
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

## Synthesis artifacts (not workstreams)

**`00-Claude-Design-Master-Brief.md`** (repository root) — the single, designer-facing source of truth.
Synthesises all eight workstreams (03, 04, 19, 20, 21, 22, 23, 24) into one document so Claude Design
can understand Growmerce fully without reading the repository. 18 sections (Growmerce in one sentence →
design north star) + a final-test self-check.

---

## Workstream file counts

**03 — Brand Identity (22 documents)**
- Foundation: 5 files (README, Purpose, Strategy, Positioning Summary, Personality→Visual)
- Visual direction: 8 files (Direction, Logo, Arabic Naming, Typography, Colour, Layout,
  Iconography, Motion)
- Intelligence visual systems: 5 files (Intelligence-OS metaphor, Platform ecosystem, Report/
  Diagnostic language, Trust/Confidence language, Mobile-first)
- Handoff + governance: 4 files (Claude Design Brief, Open Questions, Decisions, Backlog)
- Defines **how Growmerce looks** (a strategic brief for Claude Design — not the design itself)

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

**25 — Growmerce System Architecture (18 documents)**
- System: 4 files (overview, services, data, events)
- Runtimes: 2 files (intelligence runtime, retrieval & reasoning / anti-hallucination)
- Hard problems: 5 files (memory, multi-tenant, security & trust, AI role, deployment)
- Build & governance: 4 files (MVP, ADRs, risks, why-it-wins) + README + Open Questions + Backlog
- Converts the intelligence doctrine (19/20/22/23/24) into a buildable software system

**24 — Intelligence Object Architecture (19 documents)**
- Architecture: 1 file (base object, provenance DAG, invariants)
- Intelligence objects: 7 files (Signal, Evidence, Knowledge, Pattern, Recommendation, Opportunity,
  Threat — each across 10 facets)
- Model: 4 files (entity model, relationship/edge catalogue, confidence value object, versioning)
- Critical + foundation + proof: 3 files (grounded retrieval, knowledge-graph foundation, why it scales)
- README + governance: 4 files
- Software-ready architecture: turns 19/20/22/23 into buildable objects → the four engines

**23 — Commerce Knowledge System (19 documents)**
- Foundation: 4 files (overview, domains, objects framework, commerce ontology)
- Domain doctrine: 5 files (marketplace, pricing/promotion, customer behaviour, occasion/demand,
  competitor/market)
- Connections: 2 files (knowledge→pattern, knowledge→brain)
- Trust & growth: 3 files (compounding, quality, gaps & unknowns)
- Executive case: 1 file (why Growmerce knows more)
- README + governance: 4 files
- Defines **what Growmerce knows** — the institutional understanding beneath patterns/brain/supply chain

**22 — Commerce Intelligence Supply Chain (14 documents)**
- Overview: 1 file (README)
- The 10 required core documents: pipeline overview, signal taxonomy, source hierarchy, acquisition
  strategy, verification & trust, evidence scoring, output accuracy framework, failure modes, quality
  control, competitive advantage
- Governance: 3 files (Decisions, Open Questions, Backlog)
- Defines **how Growmerce produces output accuracy** — the production discipline beneath the Brain (20)

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
