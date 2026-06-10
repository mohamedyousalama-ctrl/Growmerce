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
├── 19-commerce-intelligence-patterns/        # The Pattern Engine (this workstream)
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

## Workstream 19 file count

- Foundation: 3 files (README, Purpose, Strategy)
- Pattern libraries: 11 files (~32 patterns)
- Trust-stack models: 3 files
- Mappings: 5 files
- Compounding + surfaces: 2 files
- Governance: 3 files

**Total: 27 documents** in `19-commerce-intelligence-patterns/`.
