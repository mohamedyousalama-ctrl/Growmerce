# Pattern Interaction Model

> Stage INTERACT of the cognition pipeline. Patterns are never reasoned about in isolation. A
> real business exhibits several patterns at once, and the *relationships between them* carry
> more intelligence than any single pattern. This is where Growmerce stops being a pattern
> *detector* and becomes a pattern *reasoner*.

The Pattern Engine (19) defines individual patterns. This model defines how they **reinforce,
conflict, compound, and move confidence** when they co-occur.

---

## 1. Why interactions matter

A generic tool reports patterns as a flat list. An operator sees the *system*:
*"You're renting attention AND treating the first purchase as a win AND depending on one
channel — these aren't three problems, they're one fragile growth model."* The interaction is
the insight. The brain models four interaction types.

---

## 2. The four interaction types

### 2.1 Reinforcement (patterns that confirm each other)
Two patterns whose co-presence makes *both* more likely to be real, because each explains or
predicts the other.

- **Mechanism:** if Pattern A's root cause naturally produces Pattern B's symptoms, observing B
  corroborates A (and vice-versa).
- **Effect on confidence:** **increases** both, as independent convergence (heuristic H4).
- **Example:** *Revenue Is Renting Attention* reinforces *First Purchase Treated As A Win* —
  paid-only acquisition with no retention engine is the same fragility seen from two angles.
  Seeing both raises confidence in each.

### 2.2 Conflict (patterns that contradict each other)
Two patterns that should not both be strongly true; one being present is evidence *against* the
other.

- **Mechanism:** their root causes or required conditions are mutually exclusive.
- **Effect on confidence:** **decreases** the weaker; forces re-examination.
- **Example:** *Discounting Is Buying Sales The Business Would Have Made Anyway* conflicts with
  *The Offer Has No Reason To Buy Now*. If the business is heavily discount-driven, it is not
  also failing for lack of urgency in the same offer — the brain must resolve which is real
  (usually via evidence tier) rather than report both.

### 2.3 Compounding (patterns that combine into a bigger opportunity/threat)
Two or more patterns that individually are moderate but together create an effect — or a fix —
larger than their sum.

- **Mechanism:** fixing them together unlocks value neither unlocks alone; or together they
  threaten the business more than separately.
- **Effect:** creates a **compound Finding** ranked above its components.
- **Example (opportunity):** *Demand Exists But Discovery Fails* + *Winning Impressions But
  Losing The Click* compound — fixing discovery alone just sends more traffic into a leaky
  listing; fixing both turns latent demand into sales. The compound fix is sequenced as one play.
- **Example (threat):** *One Channel Carries The Business* + *Revenue Is Renting Attention* +
  *Acquisition Is Paid While Competitors Compound Organic* = a compound existential threat
  (single-point, rented, and losing the long game), escalated above any one alone.

### 2.4 Causal chains (patterns that cause one another)
A directed relationship: Pattern A drives Pattern B drives Pattern C. Distinct from
reinforcement because it has *direction* and implies *where to intervene*.

- **Mechanism:** A is upstream; fixing A may dissolve B and C; fixing C alone is symptomatic.
- **Effect:** sets **sequence** (heuristic H7) — always aim at the head of the chain.
- **Example:** *Demand Exists But Discovery Fails* → low sales velocity → *Review Density Gap*
  (stalled review recency) → rank decline. The head is discovery; fixing reviews without fixing
  velocity is bailing a leaking boat.

---

## 3. How interactions move confidence (exact rules)

| Situation | Confidence effect | Rule |
|---|---|---|
| Pattern B reinforces Pattern A (independent evidence) | Both **+** | Treat as convergence under Evidence Hierarchy R3 |
| Pattern B conflicts with Pattern A | Weaker pattern **−**, may drop below floor | Resolve by evidence tier; if unresolved, both held at lower confidence |
| Expected reinforcing pattern is **absent** | A **−** | Absence of expected evidence (Hierarchy R7) |
| Compound of corroborating patterns | Compound Finding confidence ≥ max(components) | Only if components individually clear Medium |
| Causal chain confirmed by ordered evidence | Head pattern **+**, downstream explained | Downstream patterns inherit partial support from the head |

**Guardrail:** reinforcement only raises confidence when the evidence streams are
*independent*. Two patterns derived from the *same* underlying signal are not convergence —
counting them twice is a bias the brain explicitly blocks (see `False_Positive_and_Bias_Control.md`,
double-counting control).

---

## 4. The interaction graph

The brain maintains, per engagement, a graph:

```
nodes  = detected patterns (with confidence + evidence)
edges  = interactions { type: reinforce|conflict|compound|causal, strength, direction }
```

From this graph it derives:
- **Confidence adjustments** (propagate reinforcement/conflict).
- **Compound findings** (connected subgraphs of compounding patterns).
- **Intervention points** (heads of causal chains — highest leverage).
- **The system narrative** (the "here's what's really going on" story that names the model,
  not just the parts).

A curated library of known interaction edges (which patterns commonly reinforce/conflict/cause)
is maintained and **grows through the Learning Loop** — every engagement that reveals a new
interaction edge strengthens the graph for all future reasoning.

---

## 5. Compound opportunity & threat emergence

Compound Findings are where Growmerce's intelligence visibly exceeds the sum of patterns:

- **Compound opportunity:** a connected set of patterns whose *combined* fix produces outsized,
  often compounding value (H9). Ranked as one play in `Opportunity_Ranking_Framework.md`.
- **Compound threat:** a connected set whose combined severity is escalated (e.g. fragility
  patterns stacking into existential risk). Escalated in `Risk_and_Threat_Framework.md`.

The brain actively *looks for* these subgraphs rather than reporting isolated nodes — because
the operator's most valuable insight is almost always a compound one.

---

## 6. Output of the INTERACT stage

For each engagement the stage emits:
1. The pattern graph (nodes + edges).
2. Confidence-adjusted patterns.
3. A list of compound Findings (opportunities and threats).
4. Identified causal heads (where to intervene first).
5. The one-paragraph **system narrative** that turns the graph into operator language.

This is what makes a Growmerce diagnosis read like *"here is your business's underlying
dynamic"* rather than *"here are twelve issues we found."*
