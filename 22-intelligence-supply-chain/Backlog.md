# Backlog — Commerce Intelligence Supply Chain

Supply-chain *hardening* work — engineering and calibration tasks that make the machinery real and
sharper. Scoped to output accuracy (not UI, brand, marketing, or product vision). Candidates, not
commitments.

---

## Taxonomy & sources

- **Signal taxonomy schema** — formal field definitions, validation rules, and capture metadata per
  signal category (02).
- **Tier-assignment rule set** — deterministic, auditable rules for assigning source tier at intake,
  including the ambiguous-source edge cases (Open Question #1).
- **Tier-1 integrity layer** — verify connected/uploaded "verified" data is accurate and complete,
  not just present (Open Question #2).
- **Coverage model** — quantified per-business coverage scoring across categories × tiers (Open
  Question #3).

## Verification & scoring

- **Independence/shared-provenance detector** — prevent double-counting in convergence (Open
  Question #4).
- **Extraction-verification harness** — re-check AI extractions (screenshots/PDF/reviews/URLs)
  against source; measure and reduce extraction error (failure mode 9).
- **Scoring-weight calibration harness** — tune tier/recency/directness weights and convergence
  bonuses against realised outcomes (Open Question #5).
- **Freshness/decay engine** — per-signal validity windows enforced with decay (Open Question #6).
- **Contradiction-resolution engine** — automated detection + hierarchy-based resolution + belief-
  vs-data gap promotion (05/06).

## Accuracy & outcomes

- **Execution-outcome capture** — lightweight, sustained capture of what was done and what moved
  (the Tier-1 outcome signal; the loop's fuel).
- **Outcome attribution method** — honest attribution vs. confounders (Open Question #7).
- **Per-output accuracy estimator** — operationalise the eight-factor model into a usable estimate;
  validate against correctness (Open Question #8).
- **Abstention-rate monitor** — track and target abstention by mode/coverage (Open Question #9).

## Quality control

- **Checkpoint engine** — implement the pass/fail gates before pattern/recommendation/report/
  consultation/delivery (09) with logging.
- **Gate-failure analytics** — recurring-failure detection → systemic control hardening (Open
  Question #12).
- **Sampling-audit workflow** — human spot-checks of auto-passed output (09/20).

## Human-in-the-loop

- **Review-routing thresholds** — stakes/confidence routing + auto-pass promotion bar (Open Question
  #10).
- **Reviewer-calibration tracking** — score overrides against outcomes (Open Question #11).

## Network

- **Network-intelligence source design** — aggregation, anonymisation, consent, and tiering of
  cross-business benchmark signals (Open Questions #13, #14).

## Cross-workstream handoffs

- **→ 20 Intelligence Brain:** the supply chain feeds and guards the Brain; calibration is shared.
- **→ 19 Patterns:** patterns declare required signals; coverage maps to pattern detectability.
- **→ 13 / future integrations:** acquisition automation to raise input tier and lower friction.
- **→ Commerce Intelligence Network / Moat (context):** network intelligence as a future high-tier
  source; the supply chain reinforces the moat.
