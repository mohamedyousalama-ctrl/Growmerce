# Pattern → AI Agent Mapping

> Connects patterns to the **AI Agent Architecture (07)**. The principle: agents should
> **reason in patterns, not metrics**. A metrics agent says "conversion is 1.8%." A pattern
> agent says "you have *Traffic Arrives Through Discount Intent But Encounters Premium
> Positioning* — here's the evidence and the fix." Patterns are the reasoning unit of every
> agent.

---

## 1. Patterns are the agents' vocabulary

Without patterns, an AI agent can only summarise data. With patterns, it can **diagnose**.
Each pattern gives an agent:
- A hypothesis to test (the pattern itself).
- The signals to gather (Evidence Signals).
- The checks to run (Counter Evidence).
- The certainty maths (Confidence Model).
- The priority maths (Scoring Model).
- The actions to recommend (Quick/Strategic/Operational Fixes).

The pattern library is, in effect, the **knowledge base every agent reasons over**.

---

## 2. Agent roles mapped to patterns

(Agent roles align with the AI Agent Architecture in 07. Each agent owns a set of patterns it
specialises in detecting and acting on.)

| Agent | Pattern domains it owns |
|---|---|
| **Diagnostic / Detection Agent** | Runs the evidence → confidence → scoring pipeline across *all* pattern libraries; surfaces ranked patterns. |
| **Revenue Agent** | Revenue Leak + Conversion + Channel patterns |
| **Profit Agent** | Profit Leak + Pricing patterns |
| **Marketplace Agent** | Marketplace patterns (review recency, CTR, rank durability) |
| **Retention Agent** | Retention + Customer Journey (post-purchase) patterns |
| **Competitive Agent** | Competitor patterns (organic compounding, comparison frame, structural price) |
| **Offer/Pricing Agent** | Offer + Pricing patterns |
| **Occasion Agent** | Occasion patterns (calendar-driven, gifting, post-peak) |
| **Recommendation Agent** | Consumes detected patterns; sequences fixes using Scoring Model + dependencies |

Agents are not siloed: the Detection Agent finds patterns; specialist agents deepen, confirm,
and act. The Recommendation Agent orchestrates across them.

---

## 3. The agent reasoning loop (per pattern)

```
1. HYPOTHESISE  → load candidate pattern from library
2. GATHER       → pull Evidence Signals from integrations (13) [see Tool Mapping]
3. TIER         → classify each signal (Evidence Framework)
4. CONVERGE     → check for multiple converging signals
5. FALSIFY      → run the Counter-Evidence checks
6. SCORE        → Confidence Model → Scoring Model
7. EXPLAIN      → render finding (Report Mapping) in honest, banded language
8. RECOMMEND    → Quick/Strategic/Operational fixes, sequenced
9. LEARN        → record outcome → Intelligence Compounding
```

This is the same pipeline a human diagnostic runs (06) — patterns make it automatable.

---

## 4. What the "AI Detection Opportunities" field specifies

Every pattern's **AI Detection Opportunities** field is a mini-spec for the agent that detects
it: what to watch, what to compute, and what to alert on. Collected together, these fields are
the **agent backlog** — the roadmap for which patterns get automated detection first.

Prioritisation for automation:
1. Patterns whose signals are all **Tier 3 and integration-available** (cheapest to automate).
2. Patterns with **high priority scores** (most valuable to detect continuously).
3. Patterns with **strong track record** (detection logic already proven by humans).

---

## 5. Guardrails (agents must stay honest)

- An agent may not surface a pattern below the **confidence floor (60)** — same rule as the
  human diagnostic. No crying wolf.
- An agent must **always run the Counter-Evidence check** before raising a pattern; skipping
  it caps confidence at Possible.
- An agent must express confidence in the honest banded language, never false certainty.
- An agent's recommendations come *only* from the pattern's defined fixes — no improvised
  advice outside the validated library. (New fix ideas go to `Backlog.md` for human review.)

These guardrails keep the AI trustworthy and keep Growmerce's positioning intact: intelligent,
evidence-based, operator-grade — not a generic chatbot.

---

## 6. The path from human to automated

```
Pattern Hypothesis → human detects in diagnostic (06)
                  → fix validated in delivery
                  → detection logic proven (Track Record rises)
                  → signals instrumented via integrations (13)
                  → agent detects autonomously (07)
                  → continuous monitoring product (future SaaS)
```

Patterns are the unit that travels this whole path. That is why they, and not industries or
channels, are the asset everything is built on.
