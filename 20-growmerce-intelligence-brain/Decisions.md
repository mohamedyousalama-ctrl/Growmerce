# Decisions — Growmerce Intelligence Brain

Locked decisions for this workstream. Build on these; do not re-litigate. Changes require a new
decision entry.

---

### D-20.1 — The brain is the central intelligence operating system
Workstream 20 defines *how Growmerce thinks*. It is the reasoning OS that every surface
(diagnostics, AI tools, reports, service delivery, future SaaS) inherits. A future engineer
should be able to answer "How does Growmerce think?" from this workstream alone.

### D-20.2 — Cognition is a gated ten-stage pipeline
SENSE → GROUND → RECOGNISE → INTERACT → ASSESS → VALUE → DECIDE → GUARD → ACT → LEARN, with
human override available at every gate. Nothing reaches a client that hasn't survived every gate.

### D-20.3 — The Finding is the atomic unit, and it carries provenance
The brain reasons over Findings. Every Finding maintains a complete, replayable provenance chain
(signal → evidence → pattern → conclusion). **No provenance, no surfacing.** Explainability is a
maintained property, not an afterthought.

### D-20.4 — Reason like a commerce operator, never like generic AI
The brain must behave like a highly experienced commerce operator, not generic ChatGPT, a
generic consultant, a generic audit tool, or a generic dashboard. The ten operator heuristics
(H1–H10) in the Intelligence OS are the house style of its thinking.

### D-20.5 — Every conclusion must be all five: evidence-backed, confidence-scored, explainable, practical, actionable
A conclusion missing any of the five is, by definition, not a Growmerce conclusion and may not
be surfaced. This is enforced structurally by the trust layer.

### D-20.6 — Patterns are the vocabulary; the brain is the mind
The brain reasons *over* the Pattern Engine (19) and extends its trust stack (Evidence,
Confidence, Scoring) into a full OS. It does not duplicate or redesign 19.

### D-20.7 — The Evidence Hierarchy resolves conflicts by explicit rules
Hard data > opinion; historical > single observation; converging independent signals > one
signal; recent > stale; specific > general; context can veto a number; absence of expected
evidence is evidence; unverifiable inputs cap at Tier 1. Conflicts are resolved by these rules,
never by convenience; unresolved conflicts lower confidence.

### D-20.8 — Tier-1-only findings are hard-capped at Medium confidence
No matter how compelling, a finding resting entirely on self-reported/anecdotal/unverified
evidence cannot exceed Medium. Soft signals point; hard signals prove.

### D-20.9 — Patterns are reasoned over as an interacting system
Patterns reinforce, conflict, compound, and form causal chains. Reinforcement raises confidence
only when evidence streams are independent. The brain surfaces compound findings and causal
heads, not isolated flags.

### D-20.10 — Confidence has four operator bands with exact movement conditions
Low / Medium / High / Very High. Upgrades require accumulating evidence, convergence, ruled-out
counter-evidence, freshness, and context fit. Downgrades are stricter than upgrades — the brain
is asymmetric: hard to convince, easy to make doubt. **Client-facing floor: Medium.**

### D-20.11 — Opportunities and threats merge into one sequenced plan
Ranking is value/severity × confidence × recoverability ÷ resources, then re-ordered by operator
overrides: dependencies first, stop active bleeds/Critical threats, one early trust win, prefer
compounding. The client receives a sequenced plan with stated reasons, never a flat list.

### D-20.12 — Recommendations must trace to a finding and a validated fix
The brain may only recommend fixes that trace to a confirmed pattern's validated fixes (19),
contextualised to the business. Ungrounded or infeasible advice is blocked at GUARD. New fix
ideas go to Backlog for expert review, not improvised at a client.

### D-20.13 — GUARD is mandatory and must try to disprove the brain's own conclusions
Six gates (grounding, sufficiency, counter-evidence, context, fit, conflict) plus a bias
catalogue defend against hallucination, weak assumptions, bad recommendations, incorrect
conclusions, and missing-context decisions. The "what would make me wrong?" check is mandatory.

### D-20.14 — Calibrated abstention is a correct output
The brain is required to say "we can't determine this without X" when evidence is insufficient.
Abstention is a credibility feature, not a failure.

### D-20.15 — The brain learns from every engagement via four exhausts
Confirmation, outcome, signal, and language exhausts feed detection accuracy, fix effectiveness,
evidence weighting, and recognition framing. Learning is versioned, corroborated across ≥2
contexts before encoding, and reviewed for significant changes — no overfitting to one engagement.

### D-20.16 — Humans supervise, override (with reasons), and train the brain
Review intensity scales with stakes (auto-surface → expert-required). Every override is reasoned,
logged, and scored against outcomes. The brain checks the human and the human checks the brain.
Patterns earn autonomy only through track record.

### D-20.17 — Builds on prior workstreams as conceptual dependencies only
02, 06, 07, 08, 09, 10, 11, 12, 13, and 19 are approved strategic context, referenced not
rebuilt. This workstream changes neither Growmerce's positioning nor its business model; it
sharpens the operations by defining the intelligence beneath them.

### D-20.18 — This is "how Growmerce thinks," not "how Growmerce looks"
No visual design, no landing pages, no Website UX here. The brain is the foundation that the
later Website UX (04), AI tools, diagnostics, reports, delivery, and future SaaS will be built on.
