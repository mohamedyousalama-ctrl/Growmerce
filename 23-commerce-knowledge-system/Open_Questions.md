# Open Questions — Commerce Knowledge System

Unresolved questions about the knowledge architecture. None block the framework; all inform how it is
built, maintained, and grown. (Scoped to knowledge — not UI, brand, reasoning mechanics, or roadmap.)

---

## Structure & objects

1. **Domain boundaries.** Some knowledge straddles domains (a discount touches Pricing, Promotion, and
   Profitability). What are the rules for primary vs. secondary domain ownership of a cross-domain
   object, to avoid duplication and drift?
2. **Object-type edge cases.** The line between a Rule and a Heuristic, or a Model and a Framework, is
   sometimes fuzzy. Do we need sharper typing tests, or is steward judgement sufficient?
3. **Granularity.** How granular should knowledge objects be (one broad principle vs. several specific
   rules)? Too granular fragments; too broad loses the exceptions that make it trustworthy.

## Ontology

4. **Ontology extensibility.** What is the governance for adding a new entity or relationship to the
   core ontology (14) vs. handling it at the edges? The core must stay stable while the edges grow.
5. **Entity-resolution standards.** How are real-world instances mapped to ontology entities reliably
   (one Product vs. variants; the "real" Competitor set)? Ties to the Supply Chain's normalization (22).

## Compounding & quality

6. **Promotion thresholds.** Exactly how many independent contexts / what outcome strength promotes an
   object up a type (case observation → lesson → pattern/rule)? Mirrors the Supply Chain calibration
   question; needs concrete thresholds.
7. **Independence at the knowledge level.** Confirming a lesson requires *independent* contexts. How is
   independence judged for knowledge (vs. the same situation repeated)? Shared with 22's
   double-counting problem.
8. **Retirement triggers.** What outcome-contradiction rate or market-shift signal triggers
   deprecation, and how fast? Too slow keeps stale doctrine; too fast discards good knowledge on noise.
9. **Steward model.** Who owns each domain's knowledge quality (per 12), and what's the review cadence
   and human-expert involvement at scale?

## Unknowns & confidence

10. **Gap quantification.** Can a domain's "edge" (where validated knowledge ends) be represented
    precisely enough to feed confidence automatically, or is it qualitative for now? (13)
11. **Assumption lifecycle.** How long can a provisional assumption persist before it must be either
    validated or retired, to prevent quiet reliance on unvalidated beliefs?

## Build & encoding

12. **Encoding format.** How is knowledge actually stored/encoded so the Brain (20) can retrieve the
    right object at the right reasoning stage — and so it stays human-readable and auditable (not
    buried in weights)? An engineering question that determines whether the system is truly auditable.
13. **Seeding vs. earning.** What is the right initial balance between imported external knowledge
    (Path C, fast but external) and earned knowledge (Path A, slow but proprietary) when bootstrapping
    a domain? (11)
14. **Network knowledge.** When aggregated cross-business knowledge becomes available (the network as a
    source, 22/04), how is it incorporated as knowledge objects with appropriate certainty and privacy?
