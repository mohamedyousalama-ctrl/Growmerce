# Growmerce Intelligence OS — The Master Document

> If you read only one file in this workstream, read this one. It defines the complete
> cognition of Growmerce: the pipeline by which signals become trustworthy, prioritised
> conclusions, and the operator mindset that governs every step.

---

## 1. The cognition pipeline (the spine)

Growmerce thinks in ten stages. Every subsystem in this workstream is one stage of this
pipeline. Every Growmerce surface (diagnostic, report, agent, delivery, SaaS) is this pipeline
rendered for a different audience.

```
 1. SENSE        ingest raw signals                      → Signal & Evidence Hierarchy
 2. GROUND       turn signals into tiered evidence        → Signal & Evidence Hierarchy
 3. RECOGNISE    match evidence to patterns               → Patterns (19)
 4. INTERACT     let patterns reinforce / conflict         → Pattern Interaction Model
 5. ASSESS       score confidence per finding             → Confidence & Trust Model
 6. VALUE        rank opportunities, detect threats        → Opportunity Ranking / Risk & Threat
 7. DECIDE       generate prioritised recommendations      → Recommendation Generation
 8. GUARD        block weak / biased / context-poor output → False Positive & Bias Control
 9. ACT          wire conclusions to diagnostics→delivery  → Recommendation Generation
10. LEARN        feed outcomes back into every stage       → Intelligence Learning Loop
        ▲                                                            │
        └──────────────  HUMAN OVERRIDE can intervene at any gate ──┘
                         → Human Override & Expert Review
```

The pipeline is **gated**: a finding cannot advance from one stage to the next until it meets
that stage's bar. A signal with no evidence dies at GROUND. A pattern below confidence floor
dies at ASSESS. A recommendation that fails a bias check dies at GUARD. **Nothing reaches a
client that hasn't survived every gate.** This is what makes Growmerce trustworthy by
construction, not by luck.

---

## 2. The unit that flows through the pipeline: the Finding

The brain's atomic object is a **Finding** — a candidate conclusion travelling the pipeline.
A Finding accumulates structure as it advances:

```
Finding {
  id
  hypothesis            // e.g. "Review Density Gap is present"
  signals[]             // raw inputs that triggered it
  evidence[]            // tiered, sourced (Signal & Evidence Hierarchy)
  matched_patterns[]    // from the Pattern Engine (19)
  interactions[]        // reinforcing / conflicting patterns
  confidence            // Low / Medium / High / Very High + score
  counter_evidence[]    // what was checked and ruled out (or not)
  value {               // for opportunities
     revenue_impact, profit_impact, speed, ease, resources
  }
  severity {            // for threats
     likelihood, downside, urgency
  }
  recommendations[]     // generated at DECIDE
  guard_flags[]         // anything the GUARD stage raised
  status                // Hypothesis → Observed → Confirmed → Surfaced → Acted → Learned
  provenance            // full reasoning chain, for explainability
}
```

The `provenance` field is sacred: it is the complete, replayable chain from signal to
conclusion. **If a Finding cannot show its provenance, it cannot be surfaced.** Explainability
is not a feature bolted on at the end — it is a property maintained at every stage.

---

## 3. The operator mindset (what makes this not generic)

The pipeline is the skeleton. The **operator mindset** is the judgement that runs on it — the
heuristics a scarred commerce operator uses that a generic model does not. These heuristics are
applied across stages and are the single biggest reason Growmerce reasons differently.

### H1 — Revenue is vanity, profit is sanity, cash is reality
Never celebrate a number without its cost. A "bestseller" that loses money after fully-loaded
costs is a problem, not a win. The brain always asks "and what did that cost?" before
concluding anything is good. (Powers `Profit_Leakage_Intelligence.md`.)

### H2 — Look where the operator would look, not everywhere
An audit tool checks 200 things. An operator checks the handful that move the number:
availability of hero SKUs, true margin, discovery, conversion at the commitment step, repeat
rate, channel concentration. The brain triages to the vital few before the trivial many.

### H3 — A symptom is not a diagnosis
"Conversion is low" is where a generic tool stops. The operator asks *why* until it lands on a
fixable cause — discount-intent traffic meeting premium positioning, or trust missing at the
commitment step. The brain never reports a symptom as a conclusion; it resolves to a pattern.

### H4 — Demand the second signal
A single metric is a rumour. The operator trusts a conclusion when independent signals
converge (rank decline + review-recency stall + competitor recency advantage). One signal
raises a hypothesis; convergence makes a finding. (Powers the Evidence Hierarchy.)

### H5 — Always ask "what would make me wrong?"
Before asserting a problem, the operator names the innocent explanation and checks it. Stockouts
might be a deliberate drop model; a low repeat rate might be a one-time-purchase category. The
brain runs counter-evidence *before* concluding, not after a client objects. (Powers
`False_Positive_and_Bias_Control.md`.)

### H6 — Context changes the meaning of every number
A 3% conversion rate is great for furniture and terrible for impulse snacks. A number means
nothing without the business's category, model, stage, margin structure, and channel mix. The
brain refuses to judge a metric without its context. (A finding made without context is a
GUARD failure.)

### H7 — Sequence beats completeness
Operators fix in order. Fixing conversion on traffic that doesn't exist is wasted; fix
discovery first. The brain orders recommendations by dependency, not by listing everything at
once. (Powers `Recommendation_Generation_Framework.md`.)

### H8 — Speed of trust matters
An operator earns the right to the big fix by landing a quick win first. The brain deliberately
surfaces a fast, visible, low-risk win early, even when a deeper issue scores marginally higher.

### H9 — Compounding beats one-off
Prefer fixes that build durable equity (owned audience, organic rank, retention) over those
that only lift today's number. The brain weights compounding value in ranking.

### H10 — Honesty is leverage, not weakness
Say "we strongly suspect, here's how we'd confirm" rather than fake certainty. Calibrated doubt
is what separates an operator from a salesman, and it converts better. (Powers the Confidence
Model.)

> These ten heuristics are the "house style" of Growmerce's thinking. Any conclusion that
> violates one of them is suspect and must be re-examined at GUARD.

---

## 4. How the pipeline answers the Core Questions

The workstream's core questions all resolve through the *same* pipeline; only the patterns and
evidence differ. (Each has a detailed treatment in its own file.)

| Question | SENSE/GROUND (key evidence) | RECOGNISE (pattern domain) | VALUE/DECIDE |
|---|---|---|---|
| How do we determine a **sales leak**? | demand vs visibility, funnel drop-off, availability | Revenue Leak + Conversion + Marketplace (19) | rank by recoverable revenue × confidence |
| How do we determine a **profit leak**? | fully-loaded contribution, discount penetration, returns cost | Profit Leak + Pricing (19) | rank by margin saved × confidence |
| How do we identify **growth opportunities**? | demand signals, untapped channels, WTP spread | Channel/Offer/Pricing/Occasion (19) | Opportunity Ranking Framework |
| How do we identify **competitor threats**? | competitor organic/price/frame trajectory | Competitor patterns (19) | Risk & Threat Framework |
| How do we identify **pricing problems**? | price-vs-value, anchoring, objection mismatch | Pricing patterns (19) | impact × confidence |
| How do we identify **occasion opportunities**? | demand curve vs readiness, gift intent | Occasion patterns (19) | timing-weighted ranking |
| How do we identify **channel opportunities**? | customer-channel fit, concentration, create-vs-capture | Channel patterns (19) | Opportunity Ranking |
| How do we identify **marketplace weaknesses**? | review recency, CTR, rank durability | Marketplace patterns (19) | impact × confidence × urgency |
| How do we determine **priorities**? | all of the above, scored | — | Opportunity Ranking + dependency + trust |

The `Intelligence_Decision_Framework.md` gives the explicit decision template for each.

---

## 5. Architecture: where the brain sits

```
   13 Structured Input Layer ─┐
   uploads / URLs / screenshots ├──►  SENSE
   competitor & market data ──┘
                                      │
   06 Commerce Diagnostic ──────────► GROUND + RECOGNISE   (sensing instrument)
                                      │
   19 Pattern Engine ───────────────► RECOGNISE + INTERACT (vocabulary + first trust stack)
                                      │
   07 AI Agent Architecture ────────► runs ASSESS→DECIDE   (execution substrate)
                                      │
   THE BRAIN (20) orchestrates all stages, maintains the Finding + provenance
                                      │
   ┌──────────────┬─────────────┬────┴────────┬──────────────┐
   ▼              ▼             ▼             ▼              ▼
 Reports     08 TikTok /   10 Sales /   11 Packages /   Future SaaS
 (explain)   09 LeadGen     conversation 12 Delivery     (productise)
```

The brain does not replace these systems — it is the reasoning that flows through them. 13 is
how it senses, 06 is how it probes, 19 is what it knows, 07 is where it runs, and everything to
the right is where its conclusions are spent.

---

## 6. The two modes of cognition

The same brain runs at two depths, switching by available evidence (not by changing its logic):

| Mode | Trigger | Evidence | Output |
|---|---|---|---|
| **Fast judgement** | Lead magnet / website self-diagnosis / first call | mostly Tier 1–2, partial | high-recognition findings at Medium confidence, honestly hedged |
| **Deep diagnosis** | Paid audit / retained engagement | full Tier 3 with integrations | full Finding set at High/Very High confidence with provenance |

Crucially, the *conclusions are consistent across modes* — deep diagnosis confirms and sharpens
what fast judgement suspected; it never contradicts it without new evidence. This consistency
is itself a trust asset.

---

## 7. What "done" looks like for the brain

The Intelligence OS is working when, given a real business, it can:

1. State the **top 3 findings** with evidence and confidence.
2. Show the **provenance** of each (signal → evidence → pattern → conclusion).
3. Name what it is **not** worried about (and why).
4. Produce a **prioritised, sequenced** set of recommendations wired to delivery.
5. Say honestly **how sure** it is and **what would change its mind**.
6. Get **measurably better** at all of the above after the engagement closes.

If it can do these six for any business in any context, Growmerce thinks like a world-class
commerce operator — which is the entire point of this workstream.
