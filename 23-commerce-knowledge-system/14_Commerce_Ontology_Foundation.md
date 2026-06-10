# 14 — Commerce Ontology Foundation

> The fundamental entities of commerce and the relationships between them. The ontology is the shared
> schema that *everything* in the intelligence apparatus refers to — knowledge, signals, evidence,
> patterns, and recommendations all describe the same entities related in the same ways. It is, in the
> Palantir sense, the formal model of the domain on which all reasoning sits. This may be the most
> foundational document in the workstream.

---

## 1. Why an ontology

Without a shared model of *what exists* in commerce and *how it relates*, every other component speaks
a slightly different language: a signal about "a product," a pattern about "an item," a recommendation
about "a SKU" — and the system can't reliably connect them. An ontology fixes the entities and
relationships once, so:
- **Knowledge** attaches to entities (pricing knowledge is *about* Offers and Margin).
- **Signals/Evidence** (22) describe entity states ("this Product's stock is 0").
- **Patterns** (19) are recurring configurations of entities and relationships.
- **Recommendations** (20) are interventions on entities.
- **Everything connects** because everything refers to the same model.

The ontology is the spine that lets knowledge, evidence, patterns, and actions interoperate. It is the
foundation future intelligence systems are built on.

---

## 2. The core entities

Grouped by kind. (Each entity has attributes and a state that signals/evidence describe.)

### Commercial actors & structures
| Entity | What it is |
|---|---|
| **Business** | the commercial entity Growmerce serves (the subject of analysis) |
| **Customer** | a buyer or prospective buyer of the Business |
| **Competitor** | another Business contesting the same demand |
| **Channel** | a route to market (store, social, WhatsApp, search) |
| **Marketplace** | a Channel that is itself an economy with rules (a specialised Channel) |

### What is sold and how it's framed
| Entity | What it is |
|---|---|
| **Product** (SKU) | a sellable item/variant |
| **Offer** | how Products are packaged, priced, and framed for sale (bundle, tier, terms) |
| **Promotion** | a temporary modification of an Offer's price/terms to drive behaviour |
| **Price / Margin** | the value captured per unit; **Margin/Contribution** is value kept after costs |

### Commercial events
| Entity | What it is |
|---|---|
| **Order** | a customer's commitment to purchase |
| **Transaction** | the financial event of an Order (revenue, costs, contribution) |
| **Occasion** | a time-bound demand context (season, event, gifting moment) |

### Intelligence entities (the apparatus itself)
| Entity | What it is |
|---|---|
| **Signal** | a raw observation of an entity's state (22) |
| **Evidence** | a verified, tiered Signal (22) |
| **Knowledge** | standing understanding about entities and their relationships (23) |
| **Pattern** | a recurring, diagnosable configuration of entities/relationships (19) |
| **Opportunity** | a configuration where value can be gained |
| **Threat** | a configuration where value is at risk |
| **Recommendation** | a proposed intervention on entities to realise an Opportunity / avert a Threat (20) |

The inclusion of the **intelligence entities** in the same ontology is deliberate and important: it
means Growmerce's *reasoning about commerce* is modelled in the same schema as commerce itself —
knowledge, signals, patterns, and recommendations are first-class entities that relate to the
commercial entities they describe.

---

## 3. The relationships (how entities connect)

The ontology's power is in the relationships. The core ones:

```
BUSINESS ──sells──▶ PRODUCT ──packaged-into──▶ OFFER ──priced-by──▶ PRICE
   │                   │                          │
   │                   │                          └──modified-by──▶ PROMOTION
   │                   │
   │                   └──merchandised-on──▶ CHANNEL / MARKETPLACE ◀──competes-on── COMPETITOR
   │
   ├──serves──▶ CUSTOMER ──places──▶ ORDER ──realises──▶ TRANSACTION ──yields──▶ MARGIN/CONTRIBUTION
   │                │                                          ▲
   │                └──exhibits──▶ BEHAVIOUR                   │
   │                                                          influenced-by
   └──operates-on──▶ CHANNEL                                   │
                                                            OCCASION ──shapes──▶ DEMAND
```

And the **intelligence overlay** (how the apparatus relates to the commerce):

```
SIGNAL ──observes──▶ (any commercial entity's state)
EVIDENCE ──verifies──▶ SIGNAL
KNOWLEDGE ──describes/explains──▶ (entities & relationships, in general)
PATTERN ──is a recurring configuration of──▶ (entities & relationships)
   └──detected-from──▶ EVIDENCE   └──explained-by──▶ KNOWLEDGE
OPPORTUNITY / THREAT ──is a valued/at-risk──▶ PATTERN-configuration
RECOMMENDATION ──intervenes-on──▶ (entities)   └──realises──▶ OPPORTUNITY / ──averts──▶ THREAT
   └──applies──▶ KNOWLEDGE (a playbook)         └──produces──▶ OUTCOME ──becomes──▶ KNOWLEDGE (lesson)
```

Key relationship facts the ontology encodes (each is also a piece of commerce knowledge):
- An **Offer** is distinct from a **Product** — the same Product in a different Offer behaves
  differently (the basis of offer/pricing knowledge, 05).
- **Margin/Contribution** derives from **Transaction**, not from **Price** alone — the revenue-vs-
  profit distinction is built into the schema (the H1 doctrine made structural).
- A **Marketplace** is a **Channel** with its own rules — marketplace knowledge (04) attaches here.
- **Occasion** shapes **Demand**, which flows through **Channel** to **Order** — the time dimension
  (07) is wired in.
- A **Pattern** is *literally defined* as a recurring configuration of these entities/relationships —
  which is the precise, ontological statement of what workstream 19's patterns are.

---

## 4. Entity states (what signals describe)

Each entity has a **state** that the Supply Chain observes:
- *Product*: stock, velocity, price, content quality, rank.
- *Offer*: structure, tier mix, discount depth, attach.
- *Customer*: new/returning, cohort, value, repeat status.
- *Channel/Marketplace*: traffic, impressions, rank, concentration.
- *Transaction*: revenue, fully-loaded contribution.
- *Competitor*: price, reviews, organic footprint, trajectory.

A **Signal** is an observation of one of these states; **Evidence** is that observation verified (22);
a **Pattern** is a recognisable configuration of states across entities; **Knowledge** is what those
configurations *mean*. The ontology is what lets these refer to the same thing.

---

## 5. Why the ontology is foundational

- **It unifies the system.** Knowledge (23), evidence (22), patterns (19), and recommendations (20)
  all speak one schema, so they interoperate without translation.
- **It makes patterns precise.** "A pattern is a recurring configuration of entities and
  relationships" is a *definition*, not a metaphor — which is why patterns can be detected, validated,
  and reasoned about.
- **It encodes core doctrine structurally.** The revenue-vs-profit distinction, the offer-vs-product
  distinction, the marketplace-as-channel relationship — these aren't just principles in a document;
  they are wired into the model the whole system reasons over.
- **It is the foundation for future systems.** Any future capability (new integrations, automation,
  network intelligence) plugs into the same entities and relationships — the ontology is the stable
  base that lets the apparatus grow without fragmenting.

---

## 6. The doctrine of the ontology

- **One model, referred to by all.** Knowledge, evidence, patterns, recommendations share it.
- **Offer ≠ Product; Contribution ≠ Price.** The most important distinctions are structural.
- **A Marketplace is a kind of Channel.** Specialisation by inheritance, not duplication.
- **The intelligence apparatus is in the ontology.** Reasoning about commerce is modelled alongside
  commerce.
- **Stable at the core, extensible at the edges.** New entities/relationships are added carefully;
  the core is the foundation everything stands on.

> The ontology is the bedrock: the formal answer to "what exists in commerce and how does it relate?"
> Everything Growmerce knows, observes, recognises, and recommends is expressed over this model — which
> is what makes the whole intelligence system coherent rather than a pile of disconnected parts.
