# Decisions — Commerce Intelligence Patterns

Locked decisions for this workstream. These are settled and should be built on, not
re-litigated. Changes require an explicit new decision entry.

---

### D-19.1 — Patterns are the core reusable asset
The Pattern Engine is the intelligence layer everything else is built on: diagnostics, AI
agents, reports, recommendations, website, TikTok, lead magnets, sales, delivery, and future
SaaS. Patterns are more reusable than industries, channels, or platforms because they are
context-independent.

### D-19.2 — Write patterns, not categories
A pattern is a named, causal, evidence-based, actionable commercial reality. A category is a
bucket. Anything that could be a dashboard column header is a category and must be rewritten
as a pattern. This rule governs the libraries, the diagnostic, the reports, and the website.

### D-19.3 — Depth over breadth
A smaller number of high-quality, instantly recognisable patterns beats a large number of
generic ones. v1 ships ~32 deep patterns across 11 libraries. New patterns must earn their
place by recurring in the real world, not by brainstorming.

### D-19.4 — One canonical pattern template
Every pattern uses the full template (Name, Category, Description, Symptoms, Evidence Signals,
Root Causes, Revenue Impact, Profit Impact, Risk Level, Confidence Factors, Counter Evidence,
Quick/Strategic/Operational Fixes, AI Detection, Diagnostic/Report/Service/SaaS Usage). A
half-filled template is not a pattern.

### D-19.5 — Counter Evidence is mandatory and first-class
Every pattern must state what evidence would prove it *wrong*. A pattern you cannot disprove
is dogma. The Confidence Model cannot exceed medium confidence until counter-evidence is
checked.

### D-19.6 — The trust stack: Evidence → Confidence → Scoring
Three separate models govern trust: the Evidence Framework (is the signal real?), the
Confidence Model (is the pattern present? 0–100), and the Scoring Model (how much do we care?
priority 0–100). Confidence and scoring are kept **separate** on purpose.

### D-19.7 — Client-facing surfacing requires clearing floors
A pattern is shown to a client only when it clears the confidence floor (default 60,
"Probable") and the scoring floor (default P2/25). Below those it is an internal watchlist
item. The system does not cry wolf.

### D-19.8 — Honesty is a feature
Confidence is always expressed in honest, banded language ("the data clearly shows" vs. "we
strongly suspect"). Overclaiming is forbidden across reports, agents, and the website. Honest
confidence framing is treated as a conversion and trust asset, not a hedge.

### D-19.9 — Patterns are context-free; playbooks reference patterns
Patterns must never hard-code an industry/channel/platform into their identity (context
*examples* inside fields are allowed). Playbooks (18) cite patterns; patterns do not depend on
playbooks. The moment a pattern hard-codes a context it has collapsed into a playbook.

### D-19.10 — Evidence tiers cap confidence
Tier 3 (hard data), Tier 2 (derived), Tier 1 (anecdote). A pattern resting entirely on Tier 1
anecdote cannot exceed "Possible" confidence, no matter how compelling. Soft signals point;
hard signals prove.

### D-19.11 — The pattern lifecycle
Hypothesis → Observed → Confirmed → Instrumented → Automated. v1 ships patterns at Hypothesis/
Observed. Promotion is governed by the Confidence Model and the Compounding Model. New
candidate patterns require recurrence across ≥2 contexts before promotion past Hypothesis.

### D-19.12 — Patterns power reusable delivery
Each pattern's fixes become a standard delivery playbook (Quick Win sprint → Strategic Fix →
Operational Fix). Delivery sequences multiple patterns by Scoring Model + dependencies, and
closes the loop by re-measuring the pattern's signals.

### D-19.13 — Intelligence compounds on patterns
Every engagement captures four data exhausts (confirmation, outcome, signal, language) that
feed back into detection accuracy, fix effectiveness, evidence quality, impact calibration,
and recognition copy. This compounding is Growmerce's moat and is only possible because the
unit of learning is the transferable pattern.

### D-19.14 — The website goal is recognition
Every pattern must eventually help a website visitor say "that is exactly what is happening in
my business." The symptoms field (visitor's own felt language) is the primary recognition
trigger. This is the brief handed to Website UX (04).

### D-19.15 — Builds on, does not redesign, prior workstreams
This workstream extends 02, 06, 07, 13, 16, 17, and 18 without redesigning them, without
changing Growmerce positioning, and without introducing a new business model. The Pattern
Engine sharpens existing systems; it does not replace them.
