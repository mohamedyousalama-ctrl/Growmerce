# Decisions — Commerce Intelligence Supply Chain

Locked decisions for this workstream. Build on these; do not re-litigate.

---

### D-22.1 — The answer to "why trust Growmerce" is the Intelligence Supply Chain
Not AI, models, algorithms, or dashboards. The defensible reason Growmerce's output can be trusted
is that it runs a verified, tiered, quality-gated intelligence supply chain from signal to
recommendation. This is an intelligence-production problem, solved the way Bloomberg / Moody's / a
credit bureau solve it.

### D-22.2 — Twelve-stage pipeline
Signal → Collection → Verification → Normalization → Classification → Storage → Pattern Detection →
Evidence Scoring → Intelligence Generation → Recommendation Generation → Human Review → Delivery.
Each stage has defined failure modes and quality controls. (`01`.)

### D-22.3 — Signals are a defined taxonomy
Every signal Growmerce consumes has a category, source, reliability, frequency, business value, and
typical mistakes (`02`). We collect, classify, and track coverage against this taxonomy. A signal we
can't name and rate is noise.

### D-22.4 — Five-tier source hierarchy governs influence
Tier 1 Direct Verified Business Data > Tier 2 Platform/System Data > Tier 3 Observed/Public/Market >
Tier 4 User Claims > Tier 5 AI Assumptions/Human Intuition. Higher tier outranks lower on the same
fact; **lower tiers never override stronger evidence**; tier caps confidence; unverifiable inputs are
capped at Tier 4. (`03`.)

### D-22.5 — AI inference is Tier 5 — an instrument, never an oracle
The AI's own assumptions can raise a hypothesis or fill a gap provisionally (labelled), but can never
assert a fact or override evidence. This is the architectural choice that prevents hallucination and
makes Growmerce "more than an AI wrapper."

### D-22.6 — Acquisition is tier-maximising, friction-aware, and coverage-tracked
Acquire the highest-tier evidence the situation allows at the lowest friction the user will bear, via
an acquisition ladder (cold answers → connected first-party data → exclusive execution outcomes →
network intelligence). Always know and surface what's missing. (`04`.)

### D-22.7 — Verification before influence; nothing ungrounded ships
Every signal is verified (real, current, correctly attributed, consistent, sufficient, complete-
enough) appropriate to its tier and stakes before influencing a conclusion. Every claim must trace to
a logged signal with provenance; abstention is a valid output. (`05`.)

### D-22.8 — Confidence is computed from evidence, never asserted
The Evidence Scoring Engine weights evidence by tier × recency × directness, rewards independent
convergence, subtracts counter-evidence, resolves contradictions by hierarchy, and maps net support
to the Brain's four confidence bands. Tier-4/5-only → max Medium. Confidence is asymmetric: hard to
raise, easy to lower. Outputs are explainable, not black-box. (`06`.)

### D-22.9 — Output accuracy is a modelled, emergent property of the supply chain
Determined by input quality, signal quality, coverage, evidence density, pattern confidence,
recommendation history, human validation, and execution outcomes. Accuracy is estimated per output,
surfaced honestly, and improves as a business climbs the acquisition ladder and as the system
learns. (`07`.)

### D-22.10 — Failure modes are catalogued with detection, mitigation, recovery
Missing/wrong/outdated/biased/sparse data; misleading patterns; false correlations; double-counting;
AI extraction errors; hallucination; mis-classification; market shifts; human input errors; reviewer
errors. The system is designed assuming failures will occur and to catch and recover. (`08`.)

### D-22.11 — Quality is gated before every output type
Explicit pass/fail checkpoints before pattern creation, recommendation creation, report generation,
consultation, and delivery. Provenance and tier discipline are enforced at every gate; failures are
logged and harden the controls; checks are stakes-proportional. (`09`.)

### D-22.12 — The competitive advantage is the supply chain, not the AI/UI/brand
Agencies, consultants, dashboards, generic AI tools, marketplace consultants, and SaaS companies each
run only a fragment of the chain. Growmerce runs all twelve stages with inspection. The advantage is
interlocking, unglamorous, compounding, pattern-transferable, and fed by exclusive outcome data —
therefore hard to replicate. (`10`.)

### D-22.13 — Scope: output accuracy only
This workstream defines the machinery that converts raw market signals into trusted intelligence. It
does not redesign prior workstreams, reposition Growmerce, or address UI, branding, marketing, sales,
website, or future vision. It builds on the Intelligence Brain (20) and Patterns (19); 04/21/03
communicate the output it produces. Category Narrative / Commerce Intelligence Network / Intelligence
Moat Architecture are approved conceptual context, referenced not depended upon.
