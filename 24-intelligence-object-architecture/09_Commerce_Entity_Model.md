# 09 — Commerce Entity Model

> The schema form of the Commerce Ontology (23 §14). These are the **Layer-1 entities** — the
> real-world things intelligence objects describe. They are the subjects of Signals, the targets of
> Patterns, and the things Recommendations intervene on. Every entity inherits `BaseObject` (01) but,
> being real-world, carries **state** rather than `confidence`.

---

## 1. Purpose

To give every component one shared, resolvable model of "what exists in commerce," so Signals,
Evidence, Knowledge, Patterns, and Recommendations all refer to the same entities. Without this,
the system can't connect an observation about "a product" to a pattern about "a SKU."

---

## 2. The entities (schemas)

Each has a `natural_key` (for entity resolution) plus state attributes that Signals observe.

```
Business        { natural_key, name, model_type(ecom|marketplace|delivery|retail|social|omni),
                  category, stage, markets[], channels[], goals[] }

Product         { natural_key(sku), business_ref, title, category, attributes{}, content_quality,
                  state{ price, stock, velocity, rank?, role(hero|core|tail) } }

Offer           { natural_key, business_ref, product_refs[], structure(single|bundle|tier),
                  terms{ shipping, guarantee, urgency }, state{ effective_price, attach_rate } }

Channel         { natural_key, business_ref, type(store|search|social|whatsapp|...),
                  state{ traffic, conversion, revenue_share, source_mix } }

Marketplace     extends Channel  { platform, commission_struct, fulfilment_model,
                  state{ rank, buybox_status, impressions, ctr, review_count, review_recency } }

Customer        { natural_key, business_ref, segment, value_tier,
                  state{ first_seen, orders, repeat_status, ltv, last_order_at } }

Location        { natural_key, business_ref, type(branch|zone|region), geo, state{ demand, performance } }

Competitor      { natural_key, contested_with(business_ref), channels[],
                  state{ pricing, review_velocity, organic_footprint, assortment, trajectory } }

Occasion        { natural_key, type(season|event|gifting|payday), window(timerange),
                  demand_curve_ref, intent_profile(self|gift) }

Order           { natural_key, business_ref, customer_ref, items[], placed_at,
                  state{ status, value } }

Transaction     { natural_key, order_ref, revenue, costs{ cogs, shipping, fees, returns, acquisition },
                  derived{ gross_margin, fully_loaded_contribution } }

Promotion       { natural_key, business_ref, offer_refs[], mechanic(code|threshold|...), window,
                  state{ penetration, redemption, measured_incrementality? } }

Margin          { /* a derived view, not independently sourced */ scope_ref(Product|Offer|Order|Business),
                  gross, contribution_fully_loaded, basis: list<EdgeRef> }
```

Two schema choices encode core doctrine structurally:
- **`Transaction.derived.fully_loaded_contribution`** and the separate **`Margin`** view make the
  revenue-vs-profit distinction (H1) part of the model, not a convention.
- **`Offer` is separate from `Product`** — the same Product in a different Offer behaves differently
  (pricing/offer knowledge, 23 §05).
- **`Marketplace extends Channel`** — specialisation by inheritance, not duplication (23 §14).

---

## 3. Attributes — entity state vs. entity facts

- **Facts** (rarely change): `natural_key`, `category`, `model_type`, structure. Versioned on change.
- **State** (changes constantly): stock, rank, conversion, pricing, trajectory. **State is what
  Signals (02) observe** — a Signal is an observation of a state attribute at a time. Entity state is
  therefore not stored as a single mutable value but reconstructed from Signals/Evidence as a
  time-series (the entity's current state = latest verified Evidence per attribute).

This separation is important: the entity record holds identity and facts; its *state* lives in the
Signal/Evidence history. This is what makes the system auditable ("what was this Product's rank on
date T, and how did we know?").

---

## 4. Relationships (the ontology edges, see 10)

```
Business --sells-->        Product --packaged_into--> Offer --priced_by--> Price/Margin
Business --serves-->       Customer --places--> Order --realises--> Transaction --yields--> Margin
Business --operates_on-->  Channel / Marketplace <--competes_on-- Competitor
Product  --merchandised_on--> Channel / Marketplace
Offer    --modified_by-->  Promotion
Occasion --shapes-->       Demand --flows_through--> Channel --> Order
Customer --exhibits-->     Behaviour
Business --has-->          Location
```

These are the same relationships defined in 23 §14, now typed edges in the graph (14). Each edge type
is catalogued in `10_Intelligence_Relationship_Model.md`.

---

## 5. Lifecycle

Entities follow a simple lifecycle: `DISCOVERED → RESOLVED → ACTIVE → (MERGED | INACTIVE | ARCHIVED)`.
- **Entity resolution** (DISCOVERED→RESOLVED) maps observed references to a canonical entity via
  `natural_key` + resolution logic (one Product vs. its variants; the *real* Competitor). Resolution
  carries confidence; ambiguous resolutions are flagged (a known failure mode, 22).
- `MERGED` handles duplicate-entity resolution (two records → one), preserving both ids.

---

## 6. Confidence

Entities themselves don't carry finding-confidence (they're facts of the world), but:
- **Entity resolution** carries a confidence (did we correctly identify this as the same entity?).
- **Entity state** is only as trusted as the Evidence behind it (state is reconstructed from Evidence,
  03, which carries confidence and tier).

---

## 7. Versioning

- Entity **facts** are versioned on change (a category change, a model_type change) — append-only (12).
- Entity **state** is not versioned on the entity; it lives as immutable Signal/Evidence history
  (which is itself the version record of state).
- Merges/splits are recorded as version events with both ids retained.

---

## 8. Storage considerations

- Entities in a graph DB (nodes) with relational projections for state queries.
- `natural_key` indexed for resolution; entity state served from the Signal/Evidence time-series store
  (02/03), joined at read.
- Partition by `business_ref`/`tenant_scope`; competitors and marketplaces may be shared references.

---

## 9. Retrieval considerations

- The Brain retrieves an entity *with its current verified state* (latest fresh Evidence per
  attribute) — and can retrieve *historical* state by time (auditability).
- Relationship traversal ("this Business's Channels and their concentration") is a core graph query
  (14).
- Resolution is applied at retrieval so references collapse to canonical entities.

---

## 10. Brain interactions (20)

- The Brain reads entities + state to **GROUND** reasoning (what is true about this business now).
- Knowledge (04) attaches to entity *types* (pricing knowledge about `Offer`/`Margin`); the Brain
  fetches "knowledge about this entity type" to interpret its state.
- Patterns (05) are detected as **configurations of entities + state + Evidence**; Recommendations
  (06) `intervene_on` entities.

> The Commerce Entity Model is the ground truth schema everything else points at. By separating
> identity/facts (the entity) from state (the Signal/Evidence history) and wiring the revenue-vs-
> profit and offer-vs-product distinctions into the model itself, it makes the ontology of 23 buildable
> and auditable.
