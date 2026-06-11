# Open Questions — Commerce Intelligence Supply Chain

Unresolved questions about the intelligence-production machinery. None block the framework; all
inform its engineering and calibration. (Scoped to output accuracy — not UI, brand, or roadmap.)

---

## Signals & sources

1. **Tier boundaries in edge cases.** Some sources straddle tiers (a verified upload vs. a connected
   feed; a live URL read vs. platform API). What are the precise rules for assigning tier when a
   source is ambiguous?
2. **Tier-1 verification at intake.** How do we confirm that "verified business data" is genuinely
   accurate and complete (not just present)? A confidently-wrong Tier-1 input is the most dangerous
   failure — what's the integrity check, and how heavy can it be without killing acquisition?
3. **Coverage scoring.** How is "coverage" quantified per business (which categories × tiers, weighted
   how) so it can bound accuracy (07) concretely rather than qualitatively?

## Verification & scoring

4. **Independence detection at scale.** Double-counting control needs reliable detection of shared
   provenance between signals. How robust must this be for v1, and how is it computed?
5. **Scoring-weight calibration.** The tier/recency/directness weights and convergence bonuses are a
   principled v1 hypothesis. What's the calibration mechanism and cadence against real outcomes, and
   the minimum data before track-record weighting is trusted? (Shared with the Brain, 20.)
6. **Freshness windows.** The per-signal validity windows (02) need empirical tuning — which signals
   decay fast (rank, price, stock) vs. slow (positioning, cost structure), and exact thresholds.

## Accuracy & outcomes

7. **Outcome attribution.** Execution outcomes are the strongest accuracy signal but are confounded
   (seasonality, market shifts). What's the honest attribution method that avoids over-crediting the
   fix?
8. **Accuracy estimation.** Can the eight-factor accuracy model (07) produce a usable per-output
   accuracy/confidence estimate, and how is it validated against realised correctness?
9. **Abstention rate.** What's the healthy abstention rate (too high = useless, too low = reckless),
   and how is it monitored per cognition mode and coverage level?

## Quality control & humans

10. **Human-review thresholds.** Exact stakes/confidence thresholds that route an item to
    review-required vs. expert-required vs. auto-pass — and the track record that promotes a pattern
    to auto-pass (shared with 20).
11. **Reviewer calibration.** How are human reviewers scored against outcomes and recalibrated
    without undermining the human-backstop principle?
12. **Gate-failure analytics.** How are recurring checkpoint failures (09) detected and converted into
    systemic control improvements?

## Network & scale

13. **Network intelligence as a source.** When the engagement base is large enough to aggregate into a
    high-tier benchmark source, what's the privacy/consent model, the anonymisation standard, and the
    tier such aggregated signals earn?
14. **Cross-business contamination.** How do we ensure one business's data/learnings improve general
    accuracy (via transferable patterns) without leaking specifics across clients?
