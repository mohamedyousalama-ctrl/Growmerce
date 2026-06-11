# Open Questions — Commerce Intelligence Patterns

Unresolved design questions for the Pattern Engine. These are deliberately surfaced, not
hidden — resolving them sharpens the engine. None block v1; all inform v2.

---

## On the patterns themselves

1. **Pattern granularity.** Where exactly is the line between "too granular" (two patterns
   that share a fix — should be merged) and "too broad" (one pattern hiding two distinct
   realities)? The distinctness test helps, but edge cases will need judgement. Should we
   define a hard rule (e.g. distinct fix *and* distinct evidence) or keep it a review call?

2. **Pattern interactions.** Patterns rarely occur alone — *Renting Attention* often co-occurs
   with *One Channel Carries The Business* and *First Purchase Treated As A Win*. Should we
   formally model **pattern clusters / causal chains** (this pattern tends to cause that one)
   as a first-class concept in v2?

3. **Conflicting patterns.** Can two detected patterns recommend opposing fixes (e.g. add
   urgency vs. the category needs long consideration)? How does the Recommendation Agent
   arbitrate? Do we need an explicit conflict-resolution rule set?

---

## On the models

4. **Scoring weights.** The Scoring Model's component weights and the multiplicative form are
   a sensible v1 hypothesis. They need calibration against real engagement outcomes — what's
   the feedback mechanism and how often do we re-tune?

5. **Confidence floor.** Is 60 the right client-facing floor for every surface? A free website
   self-diagnosis might tolerate a lower floor (with heavier hedging) to maximise recognition;
   a paid deep audit might demand higher. Should the floor be **surface-specific**?

6. **Cold-start Track Record.** New patterns have zero track record, capping their confidence.
   How do we responsibly surface a high-impact but unproven pattern without overclaiming —
   and without burying a real problem? Is there a "provisional" presentation mode?

---

## On evidence and tooling

7. **Tier-1 reliance for the website.** The website self-diagnosis runs largely on Tier 1
   (self-reported) evidence. How do we keep recognition high while being honest that
   confidence is limited at that depth? Is the answer purely in framing, or do we need a
   richer light-touch evidence step?

8. **Integration sequencing.** The Tool Mapping proposes a pattern-leverage prioritisation for
   workstream 13. Does 13's existing roadmap agree, or is there tension to resolve between
   "easiest to integrate" and "highest pattern leverage"?

9. **Signal staleness handling.** The freshness windows are first-pass. What's the right
   behaviour when a key signal is stale — suppress the pattern, surface with a penalty, or
   prompt a refresh? Probably context-dependent; needs a rule.

---

## On compounding

10. **Overfitting risk.** How do we update pattern intelligence from outcomes without
    overfitting to a few loud engagements? The "≥2 contexts" rule for new patterns is a start
    — do we need a similar rule for *updating* existing patterns' fixes/weights?

11. **Capture discipline.** Compounding depends on capturing the four data exhausts every
    engagement. What's the lightest-weight capture that delivery teams will actually sustain?
    If capture is burdensome it won't happen and the loop stalls.

---

## On scope and positioning

12. **Library size for v1.** We shipped ~32 patterns across 11 libraries (depth over breadth).
    Is that the right v1 footprint, or should v1 be even narrower (a "core 12") to prove the
    engine before expanding?

13. **B2B vs. B2C / services.** The v1 patterns lean commerce/retail/marketplace/DTC. How much
    do they transfer to services, B2B commerce, or subscription-first models — and should
    those get dedicated patterns or do the existing ones largely cover them?

14. **Localisation.** Recognition copy ("that's my business") is language- and market-specific.
    How do patterns' symptoms/recognition fields adapt across the markets Growmerce serves
    without diluting the transferable core?
