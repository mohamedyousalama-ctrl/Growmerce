# Open Questions — Growmerce Intelligence Brain

Unresolved design questions for the intelligence OS. Surfaced deliberately. None block v1; all
inform v2 and the eventual engineering build.

---

## Cognition & decision

1. **Pipeline implementation boundary.** The cognition pipeline (SENSE→LEARN) is defined
   conceptually. Where is the line between what an AI agent (07) executes autonomously vs. what
   is orchestrated logic vs. what is human-run? Needs an explicit responsibility split before
   engineering.

2. **Compound finding explosion.** The Interaction Model can, in principle, generate many
   compound findings from a dense pattern graph. What caps complexity so the brain surfaces the
   2–3 compounds that matter, not every connected subgraph?

3. **Cross-engagement vs. single-engagement reasoning.** Within one engagement the brain reasons
   over one business. Should it also reason *across* its client base in real time (e.g. "this
   competitor threat is hitting many of our clients at once")? Powerful, but raises data-boundary
   and confidentiality questions.

## Evidence & confidence

4. **Tier-3 verification.** How do we verify that an "uploaded P&L" or a connected data source is
   accurate and complete, not just present? A confidently wrong Tier-3 input is more dangerous
   than a Tier-1 anecdote. What's the data-integrity check?

5. **Confidence calibration source.** The Confidence Model's bands and the move-between
   conditions are a strong v1 hypothesis. They need calibration against real outcomes — what is
   the minimum engagement volume before track-record weighting is trustworthy, and how do we
   avoid over-trusting early, small samples?

6. **Score weights ownership.** Opportunity/threat formulas have weights. Who owns tuning them,
   on what cadence, and against what outcome metric? (Shared with 19's open questions.)

## False-positive control

7. **Abstention rate target.** Calibrated abstention is correct, but too much abstention makes
   the brain useless and too little makes it reckless. Is there a target abstention rate per
   cognition mode, and how do we monitor it?

8. **Independence detection.** The double-counting control requires knowing when two signals are
   genuinely independent vs. derived from the same source. Detecting shared provenance
   automatically is non-trivial — how robust does this need to be for v1?

## Human-in-the-loop

9. **Auto-surface promotion bar.** What exact track record promotes a pattern from
   "review-before-surface" to "auto-surface"? Too low risks unsupervised errors; too high keeps
   humans as a bottleneck forever.

10. **Expert calibration.** Experts are tracked against outcomes too. How do we handle a
    consistently-miscalibrated expert without undermining the human-backstop principle?

## Scope & productisation

11. **Brain vs. SaaS boundary.** This workstream defines how Growmerce thinks. When does the
    brain become a *product* the client operates themselves vs. an internal engine powering
    services? The Learning Loop assumes engagement data flows back — does a self-serve SaaS
    user's data feed the same loop, and under what consent model?

12. **Mode-switch transparency.** Fast judgement (Medium-capped) vs. deep diagnosis (High/Very
    High). How explicitly do we show clients the mode they're in, so the confidence ceiling is
    understood and not mistaken for the brain's best?

13. **Domain transfer limits.** The brain's heuristics and patterns lean
    commerce/retail/marketplace/DTC/delivery. How far do they transfer to services, B2B, or
    subscription-first models before they need brain-level (not just pattern-level) adaptation?

14. **Provenance storage cost.** Mandatory full provenance per finding is essential for
    explainability but has a storage/retrieval cost at scale. What's the retention policy and the
    minimum provenance needed to stay defensible?
