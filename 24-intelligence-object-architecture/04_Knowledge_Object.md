# 04 — Knowledge Object

> The software form of the Commerce Knowledge System (23). A `Knowledge` object is a typed, validated,
> versioned unit of standing commercial understanding. It exists as three related shapes — the
> **knowledge card** (the unit), the **knowledge node** (its place in the graph), and the **knowledge
> entity** (what it is about) — which together make knowledge both human-readable and graph-reason-able.

Inherits `BaseObject` (01).

---

## 1. Purpose

To represent what Growmerce *knows* in a form the Brain can retrieve and reason with: a benchmark to
interpret Evidence, a model to explain it, a pattern definition to detect, a playbook to recommend.
Knowledge is the prior the whole system reasons against (23 §10). It is the most reused, most
slowly-changing, and most defensible object class.

---

## 2. Schema

### 2a. Knowledge Card (the unit)
```
KnowledgeCard extends BaseObject
  knowledge_type   enum     # (23 §03) fact | principle | model | framework | rule | heuristic |
                            #   playbook | benchmark | pattern_def | anti_pattern | assumption |
                            #   exception | lesson | case_observation
  title            string
  statement        text         # the knowledge itself, human-readable
  domains          list<enum>   # (23 §02) the 16 domains it belongs to (primary first)
  about            list<ObjectRef>  # which ontology entities/relationships (09) it concerns
  scope            Scope        # where it applies (conditions) — bounds generality
  certainty        Certainty    # validation-derived strength (see §6)
  support          list<EdgeRef>    # case_observations / lessons / external sources backing it
  exceptions       list<ObjectRef>  # KnowledgeCards of type 'exception' that bound this one
  supersedes       ObjectRef?       # prior card this replaces
  # type-specific payloads (one populated per knowledge_type)
  benchmark        Benchmark?       # for type=benchmark (values, ranges, segmentation)
  rule_logic       RuleExpr?        # for type=rule (if-then, machine-evaluable)
  pattern_def      PatternDef?      # for type=pattern_def → instantiated as Pattern objects (05)
  playbook         Playbook?        # for type=playbook → referenced by Recommendations (06)
  model_spec       ModelSpec?       # for type=model (variables + relationships)
  # (inherited) id, provenance, version, confidence, tenant_scope, status, metadata
```

Selected payloads:
```
Benchmark   { metric, segment_keys, expected_range, distribution?, derived_from, last_rederived_at }
RuleExpr    { when: predicate over entity-state/evidence, then: implication, scope }
PatternDef  { evidence_requirements, triggers, counter_evidence, causes, fixes }  # see Pattern (05)
Playbook    { steps[], expected_outcome, success_measure, applies_to_pattern, validation_outcomes }
Scope       { domains, entity_types, market_maturity?, channel?, conditions[] }
Certainty   { level: enum(provisional|emerging|established|core), score: 0..1, basis }
```

### 2b. Knowledge Node (graph placement)
Every card is a **node** in the knowledge graph (14). The node is the card's identity within the
graph plus its typed edges to other knowledge and to entities. (Nodes are not a separate store; they
are the card seen as a graph vertex.)

### 2c. Knowledge Entity (what it's about)
The `about` edges point to **Commerce Entities** (09). Knowledge is always *about* something in the
ontology — pricing knowledge is about `Offer`/`Margin`; marketplace knowledge is about
`Marketplace`/`Product`. This is what lets the Brain fetch "knowledge relevant to this entity."

---

## 3. Attributes (semantics)

- `knowledge_type` governs how the Brain *uses* the card (a benchmark interprets, a playbook
  recommends) — the type is the retrieval and application contract.
- `scope` + `exceptions` bound the card: the Brain applies it only where scope holds and no exception
  fires — the structural guard against over-application (23 §13).
- `certainty` (validation-derived) governs authority in conflicts: a `core` principle outranks a
  `provisional` assumption (23 §11/12). Distinct from `confidence` (which an applied card lends to a
  conclusion).
- A `pattern_def` card is the *definition*; runtime `Pattern` objects (05) are its *instances*
  detected in specific businesses.

---

## 4. Relationships (edges, see 10)

```
KnowledgeCard --about-->            CommerceEntity/Relationship (09)
KnowledgeCard --in_domain-->        Domain (23 §02)
KnowledgeCard --explains-->         KnowledgeCard (e.g. principle explains a rule/pattern_def)
KnowledgeCard --bounds-->           KnowledgeCard (exception bounds a rule)
KnowledgeCard --supersedes-->       KnowledgeCard
KnowledgeCard --contradicts-->      KnowledgeCard (resolved by certainty/scope, 23 §11)
KnowledgeCard --supported_by-->     Lesson | CaseObservation | ExternalSource
Evidence (03) --interpreted_by-->   KnowledgeCard(benchmark)
PatternDef    --instantiated_as-->  Pattern (05)
Playbook      --applied_by-->       Recommendation (06)
```

---

## 5. Lifecycle

```
PROPOSED → UNDER_VALIDATION → ACTIVE(certainty rises with support) ─┬─> UNDER_REVIEW (drift)
                                                                    ├─> DEPRECATED (outdated)
                                                                    └─> SUPERSEDED (replaced)
```

Promotion up `knowledge_type`/`certainty` (case_observation → lesson → rule/pattern_def → explained
by principle/model) follows the compounding model (23 §11), gated by the quality framework (23 §12).
Deprecation is managed (drift → review → deprecate → version), never silent deletion.

---

## 6. Confidence vs. certainty

Two distinct numbers (a deliberate separation):
- **`certainty`** (on the card) — how validated the knowledge *itself* is (23 §12). Earned by
  recurrence across independent contexts + outcome confirmation + explanatory backing.
- **`confidence`** (lent to a conclusion) — when a card is *applied* to a business, the certainty of
  the card flows into the confidence (11) of the resulting Pattern/Recommendation, combined with the
  Evidence weight.

A `provisional`/assumption card caps the confidence of anything built on it (23 §13 → 11).

---

## 7. Versioning

- Knowledge is **versioned heavily** (it's long-lived and authoritative). Every change to
  `statement`, `scope`, `benchmark` values, `certainty`, or `status` is a new version (12),
  append-only, with rationale.
- Evidence and Patterns **pin the version** of the Knowledge they used, so historical conclusions
  remain explainable in light of then-current knowledge (12).
- Benchmarks carry `last_rederived_at`; re-derivation is a normal, expected version event (markets
  move).

---

## 8. Storage considerations

- The **library** (`tenant_scope = shared/library`): relatively small, high-value, read-mostly →
  store in a graph DB (nodes + edges) with full version history; cache aggressively (it's hot on
  every reasoning call).
- Network-aggregate knowledge (`tenant_scope = network-aggregate`) is stored separately with
  anonymisation/consent metadata (23 backlog).
- Human-readable `statement` is first-class (not derived) — auditability and steward review (23 §12)
  require it. Knowledge must **not** live only in model weights (the core anti-AI-wrapper rule).

---

## 9. Retrieval considerations

- The dominant retrieval pattern: "give me the knowledge relevant to *this entity/situation* of
  *this type*" — e.g. "the conversion benchmark for this category", "playbooks for this pattern".
  Served via `about` + `in_domain` + `knowledge_type` + `scope` filters.
- Retrieval is **scope-checked**: a card whose `scope` doesn't hold (or whose `exception` fires) is
  excluded, preventing misapplication.
- Grounded retrieval (13): the Brain retrieves *actual cards by reference*, never "recalls" knowledge
  from a model's parameters — every applied piece of knowledge has an `id` and version.

---

## 10. Brain interactions (20)

Knowledge enters the Brain at every stage (23 §10), as concrete object reads:
- **GROUND:** read `benchmark` cards to interpret Evidence.
- **RECOGNISE:** read `pattern_def` + `model` + `rule` cards to detect Patterns (05).
- **ASSESS:** read `exception` + `anti_pattern` cards to rule out / guard.
- **DECIDE:** read `playbook` cards to build Recommendations (06).
- **LEARN:** *write* new `case_observation`/`lesson` cards from outcomes; trigger promotion/retirement
  (23 §11).

> The Knowledge object is what keeps Growmerce from being an AI wrapper: understanding lives in
> explicit, typed, versioned, human-readable cards the Brain retrieves *by reference* — auditable,
> improvable, and owned — not in the opaque weights of a model.
