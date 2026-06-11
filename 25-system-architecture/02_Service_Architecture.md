# 02 — Service Architecture

> The services that make up Growmerce, each owning a clear slice of the object model (24). For each:
> responsibilities, inputs, outputs, and dependencies. Services are bounded by object type — a
> direct realisation of the doctrine's separation of concerns (23 §09).

---

## 1. Service taxonomy

Services fall into four groups:

```
PLATFORM         Identity · Audit · Versioning · Tenant/Permission
INGESTION        Commerce Profile · Signal · Integration/Connector
INTELLIGENCE     Evidence · Knowledge · Pattern · Opportunity · Threat · Recommendation ·
                 Reasoning Runtime (orchestrator) · Retrieval · AI Gateway · Confidence
DELIVERY/LEARN   Reporting · Consultation · Execution · Memory/Outcome
```

Design principle: **one service owns one object type's lifecycle** (its writes, validation, and
versioning). Other services read via APIs/events but never write another's objects. This makes the
object boundaries (01 §3) enforceable.

---

## 2. Platform services

### Identity Service
- **Responsibility:** authenticate users; resolve tenant; issue scoped tokens.
- **Inputs:** credentials/session. **Outputs:** principal + tenant scope. **Depends on:** —.

### Audit Service
- **Responsibility:** record every object/edge write, retrieval, AI call, and human override as an
  immutable audit event; serve lineage queries (09).
- **Inputs:** events from all services. **Outputs:** audit log, lineage graph. **Depends on:** event bus.

### Versioning Service
- **Responsibility:** append-only version management; pinned lineage; time-travel reads (24 §12).
- **Inputs:** object writes. **Outputs:** version history, as-of reads. **Depends on:** data stores.

### Tenant / Permission Service
- **Responsibility:** enforce multi-tenant isolation, permission boundaries, and consent for network
  aggregation (08).
- **Inputs:** principal + resource. **Outputs:** allow/deny + scope filter. **Depends on:** Identity.

---

## 3. Ingestion services

### Commerce Profile Service
- **Responsibility:** own the business's structured Commerce Profile (entities 09: Business, Products,
  Offers, Channels, Competitors, etc.); entity resolution; the reusable, saved profile (07).
- **Inputs:** user inputs, integration data, uploads. **Outputs:** resolved `Entity` objects + state.
- **Depends on:** Identity/Tenant, Signal (for state), Audit.

### Signal Service
- **Responsibility:** capture observations from any source into `Signal` objects (24 §02); tag
  source-tier, capture metadata; emit `signal.created`.
- **Inputs:** user input, uploads, URLs, screenshots, integration feeds, outcome events. **Outputs:**
  `Signal`. **Depends on:** Integration, AI Gateway (extraction, bounded), Commerce Profile (subject
  resolution).

### Integration / Connector Service
- **Responsibility:** connect external platforms (marketplaces, store platforms, analytics, ads,
  delivery apps) and pull data as Signals; manage auth/refresh/rate limits.
- **Inputs:** tenant integration configs. **Outputs:** raw data → Signal Service. **Depends on:**
  Tenant, secrets management.

---

## 4. Intelligence services

### Evidence Service
- **Responsibility:** verify Signals into `Evidence` (24 §03): verification checks, tiering, freshness,
  normalization, weight computation, independence keys; emit `evidence.validated`/`evidence.rejected`.
- **Inputs:** `Signal` (verified path). **Outputs:** `Evidence` + `supports`/`contradicts` edges.
- **Depends on:** Knowledge (benchmarks to interpret), Confidence, Audit.

### Knowledge Service
- **Responsibility:** own `Knowledge` objects (24 §04) — cards/nodes/entities; the knowledge graph;
  validation, certainty, versioning, retirement (23 §11/12); serve benchmarks/models/rules/playbooks/
  pattern_defs; ingest outcomes as new knowledge (the learning loop).
- **Inputs:** retrieval queries; outcome lessons. **Outputs:** knowledge objects by reference.
- **Depends on:** graph + vector stores, Versioning, Audit, Human-review (for promotion).

### Pattern Service
- **Responsibility:** own `Pattern` objects (24 §05): instantiate pattern_defs against a business's
  evidence; evaluate triggers + counter-checks; compute confidence; write interaction edges; form
  compound findings; emit `pattern.detected`/`pattern.confirmed`/`pattern.ruled_out`.
- **Inputs:** `Evidence`, `Knowledge(pattern_def)`. **Outputs:** `Pattern` findings. **Depends on:**
  Evidence, Knowledge, Confidence, Retrieval.

### Opportunity Service / Threat Service
- **Responsibility:** own `Opportunity` (24 §07) / `Threat` (24 §08): derive from confirmed Patterns;
  size value / score severity + trajectory; flag compounds; emit `opportunity.identified` /
  `threat.identified`.
- **Inputs:** `Pattern`. **Outputs:** `Opportunity`/`Threat`. **Depends on:** Pattern, Knowledge
  (impact/severity models), Confidence.

### Recommendation Service
- **Responsibility:** own `Recommendation` (24 §06): select + contextualise playbooks for confirmed
  findings; compute priority; sequence the Plan; define success measures; manage lifecycle to outcome;
  emit `recommendation.generated`/`...accepted`/`...done`.
- **Inputs:** `Opportunity`/`Threat`/`Pattern`, `Knowledge(playbook)`. **Outputs:** `Recommendation`,
  `Plan`. **Depends on:** Opportunity/Threat, Knowledge, Confidence, Execution (links).

### Reasoning Runtime (Orchestrator)
- **Responsibility:** drive the cognition pipeline (20) across the intelligence services — the
  choreography of *grounded retrieve → reason → write* with GUARD gates and abstention; own the
  end-to-end request (05).
- **Inputs:** a request/diagnostic trigger. **Outputs:** orchestrated findings + plan. **Depends on:**
  all intelligence services, Retrieval, AI Gateway, Confidence.

### Retrieval Service
- **Responsibility:** grounded retrieval (06, 24 §13): fetch Knowledge/Evidence/Patterns/
  Recommendations by reference, scoped, status- and freshness-filtered, provenance- and
  confidence-attached. Enforces the grounding invariants.
- **Inputs:** typed retrieval queries. **Outputs:** referenced objects with provenance + confidence.
- **Depends on:** all object stores, Tenant (scoping), vector index.

### AI Gateway
- **Responsibility:** the single, bounded entry point to LLM capabilities (10): extraction,
  normalization help, narrative drafting from retrieved objects, candidate-knowledge/pattern
  proposals, NL query understanding. Enforces the allow/forbid contract and citation requirements.
- **Inputs:** task + retrieved context. **Outputs:** proposals (PROPOSED state) or grounded renderings
  (cited). **Depends on:** Retrieval (for grounding), Audit (every call logged).

### Confidence Service
- **Responsibility:** compute the `Confidence` value object (24 §11) from evidence/knowledge basis;
  apply caps (tier, conflict, context); recompute on input change; calibrate from outcomes.
- **Inputs:** evidence/knowledge edges + basis. **Outputs:** `Confidence`. **Depends on:** Evidence,
  Knowledge, Memory (track record).

---

## 5. Delivery & learning services

### Reporting Service
- **Responsibility:** render the executive decision brief from surfaced findings + recommendations
  (decision-first, evidence- and confidence-attached). Applies the report quality checkpoint (22 §09).
- **Inputs:** `Pattern`/`Opportunity`/`Threat`/`Recommendation` (≥ floor). **Outputs:** reports.
- **Depends on:** Recommendation, Pattern, Confidence. (Presentation is 03/04; this serves the content.)

### Consultation Service
- **Responsibility:** manage the human/WhatsApp handoff; carry findings into the conversation; bridge
  fast-judgement → deep-diagnosis; capture human input as Signals.
- **Inputs:** surfaced plan + user. **Outputs:** conversation context, new Signals. **Depends on:**
  Reporting, Signal, Identity.

### Execution Service
- **Responsibility:** track Growth Operations execution of Recommendations; record what was done; emit
  `action.completed`.
- **Inputs:** accepted `Recommendation`. **Outputs:** execution records → outcome events. **Depends
  on:** Recommendation.

### Memory / Outcome Service
- **Responsibility:** capture outcomes (24 §06 Outcome), attribute results, convert to outcome Signals
  and Lessons; own the various memories (07); emit `outcome.captured`.
- **Inputs:** execution results + post-change Signals. **Outputs:** outcome Signals, Lessons →
  Knowledge. **Depends on:** Execution, Signal, Knowledge, Confidence (calibration).

---

## 6. Service dependency map (high level)

```
Identity ─┬─ Tenant ─┬─ (scopes everything)
          │          │
Commerce Profile ◄── Signal ◄── Integration / AI Gateway(extract)
          │            │
          ▼            ▼
        Evidence ──► Pattern ──► Opportunity/Threat ──► Recommendation ──► Reporting ──► Consultation
          ▲   ▲         ▲              ▲                     ▲                                │
          │   └──── Knowledge ◄────────┴─────────────────────┘ (benchmarks/models/playbooks)  │
          │            ▲                                                                       │
       Confidence      │                                                                       ▼
          ▲            └──────────────── Memory/Outcome ◄──── Execution ◄──── (accepted recs) ─┘
          │                                   │  (outcomes → Knowledge: the learning loop)
   Retrieval (used by all intelligence services) · AI Gateway (bounded) · Audit/Versioning (record all)
```

---

## 7. Service design principles

- **Object ownership = service boundary.** One writer per object type; everyone else reads.
- **Communicate by events for the pipeline; by API for queries.** The forward/feedback flows are
  event-driven (04); synchronous reads go through Retrieval.
- **Stateless compute, stateful stores.** Services are horizontally scalable; state lives in the data
  stores (03).
- **Every write is audited and versioned** (cross-cutting, via the spine).
- **The AI Gateway is the only path to an LLM** — no service calls a model directly (10).
- **Confidence and Retrieval are shared, central services** — they encode the trust invariants once,
  for everyone.

> Services are deliberately aligned to the object model so the doctrine's separations become
> enforceable software boundaries. This is what lets the four engines (Knowledge, Pattern, Reasoning,
> Recommendation — 24 §15) be built, scaled, and evolved independently over a shared core.
