# 11 — Deployment Architecture

> Cloud and production architecture: how the system is deployed, scaled, observed, and grown. This is
> the operational envelope around the services (02), stores (03), and events (04) — the part that keeps
> a trust-critical intelligence platform reliable in production.

---

## 1. Deployment principles

- **Cloud-native, managed-first.** Prefer managed data services (managed Postgres, managed graph,
  managed Kafka/stream, managed object store, managed vector) — the differentiator is the intelligence,
  not running databases. Buy the undifferentiated, build the doctrine.
- **Stateless compute, stateful stores.** Services (02) are stateless and horizontally scalable; all
  state lives in the stores (03). Scale = more service instances + scaled stores.
- **Event-driven backbone.** The event bus (04) is the production backbone; services scale independently
  behind it; async stages absorb load.
- **Region-aware for residency.** Deployable per region for Arabic-first markets' data-residency needs
  (09); tenant data can be pinned to a region.
- **Trust-critical reliability.** Auditability and lineage must survive failures — the event log and
  versioned stores are the durable spine and are replicated/backed up first.

---

## 2. Topology

```
                         ┌──────────────── Edge / CDN / WAF ────────────────┐
                         │   web · mobile · WhatsApp webhook · TikTok lander │
                         └───────────────────────┬──────────────────────────┘
                                                 │
                                        API Gateway + AuthN
                                                 │
        ┌────────────────────────────────────────┼────────────────────────────────────────┐
        │                        STATELESS SERVICE TIER (autoscaled)                         │
        │  Ingestion: Profile · Signal · Integration                                         │
        │  Intelligence: Evidence · Knowledge · Pattern · Opp · Threat · Recommendation ·     │
        │                Reasoning Runtime · Retrieval · Confidence · AI Gateway              │
        │  Delivery/Learn: Reporting · Consultation · Execution · Memory                      │
        │  Platform: Identity · Tenant · Audit · Versioning                                   │
        └───────────────┬───────────────────────────────────────────────┬────────────────────┘
                        │                                               │
              ┌─────────▼──────────┐                          ┌─────────▼─────────┐
              │   EVENT BUS (04)    │◄────── all services ─────►│   AI PROVIDERS    │
              │  (stream platform)  │                          │ (via AI Gateway,  │
              └─────────┬──────────┘                          │  bounded, 10)     │
                        │                                      └───────────────────┘
   ┌────────────────────┼─────────────────────────────────────────────────────────┐
   │  DATA TIER (managed, replicated, backed up):                                   │
   │  Relational(A) · Graph(B) · Vector(C) · Time-series(D) · Object(E) ·            │
   │  Event log(F) · Version store(G)                                                │
   └────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Scalability assumptions & strategy

| Dimension | Assumption | Strategy |
|---|---|---|
| **Tenants** | thousands → tens of thousands | stateless services + per-tenant partitioning (08); shared library cached once |
| **Signals/Evidence** | very high volume, append-heavy | time-series store (D) scales horizontally; hot/cold tiering by age (03) |
| **Reasoning load** | bursty (diagnostics), async (learning) | autoscale the service tier; async stages via the event bus absorb spikes |
| **Knowledge library** | small, hot, read-mostly | aggressively cached, version-pinned; cheap to serve at any scale |
| **Graph traversal** | core operation | indexed edges + materialised projections; read replicas |
| **AI calls** | metered, costly, rate-limited | batched/cached where possible; bounded tasks only (10); fallbacks for provider limits |

The cost/scale shape is favourable: the *expensive shared asset* (knowledge) is small and cached; the
*high-volume data* (signals) is in a cheap append store; reasoning scales with stateless compute.
Onboarding a tenant is cheap because knowledge is already shared (08).

---

## 4. Observability

Trust-critical systems need observability of **both system health and intelligence quality**:

### System observability (standard)
- **Metrics:** latency, throughput, error rates per service; queue depths; store health.
- **Tracing:** distributed traces keyed by `correlation_id` (04) — one diagnostic run is one trace.
- **Logging:** structured logs; the event log (04) doubles as a domain-level audit/replay source.

### Intelligence observability (Growmerce-specific — the differentiator)
- **Confidence calibration:** are "High"-confidence findings actually accurate (vs. outcomes)? (24
  §11/22 §07). Drift in calibration is an alert.
- **Abstention rate:** per mode/coverage — too high (useless) or too low (reckless) is an alert (22).
- **GUARD block rate:** how often outputs are blocked, and why — spikes signal data/AI problems.
- **Coverage:** what evidence is missing across tenants — drives integration priorities.
- **Knowledge health:** drift in patterns/benchmarks (outcomes contradicting knowledge) → review (23
  §12).
- **AI boundary monitoring:** every `ai.invoked` audited; uncited/over-reaching outputs flagged (10).

This second class of observability is how Growmerce *operates its own trustworthiness* — monitoring not
just "is it up?" but "is it right, and honest?"

---

## 5. Reliability & continuity

- **Durable spine first.** Event log (F) and version store (G) are replicated across zones and backed
  up; they are the reconstruction source for everything else (projections can be rebuilt by replay).
- **Graceful degradation.** If a downstream stage (e.g. an integration or the AI provider) is
  unavailable, the pipeline degrades — fewer signals, lower confidence, honest abstention — rather than
  fabricating. *Degradation lowers confidence; it never lowers honesty.*
- **Idempotent, replayable** pipeline (04) tolerates failures and supports recovery by replay.
- **No-silent-failure:** a failed verification/retrieval surfaces as reduced confidence/abstention,
  never as a confident guess.

---

## 6. Environments & delivery

- **Environments:** dev → staging → production; knowledge and confidence *policies* are versioned
  config (24 §12) promoted like code.
- **Progressive rollout:** new pattern_defs, playbooks, and confidence-policy changes are rolled out
  behind flags and validated against outcomes before full activation (mirrors knowledge promotion, 23).
- **Schema evolution:** additive, versioned (24); the object model's stable-core/extensible-edge design
  (24 §14) supports evolution without breakage.

---

## 7. Future growth path

- **More integrations** (Connector Service) → raise input tier and lower friction, improving accuracy
  per tenant (22).
- **Network intelligence** scales as a separate, consented aggregate tier (08) — more tenants → richer
  aggregates → better priors for all.
- **More automation** of detection as patterns earn track record (the path from human-led to automated
  detection, 19/20) — the graph + grounding (06) make this safe to expand.
- **Productisation surfaces** (self-serve) plug into the same services/object model — no re-architecture.

---

## 8. Why this deployment serves the doctrine

- **Managed-first** keeps focus on the intelligence moat, not infrastructure.
- **Durable event log + versioned stores** make auditability and time-travel (09) survive production
  reality.
- **Intelligence observability** lets Growmerce *prove and maintain* its trustworthiness operationally,
  not just claim it.
- **Graceful degradation that lowers confidence, never honesty** is the production expression of the
  brand's central promise.

> The deployment architecture wraps the intelligence in production-grade reliability and, uniquely,
> in *observability of its own correctness and honesty.* It scales cheaply where it must (tenants,
> signals) and protects the durable spine (events, versions) that makes trust reproducible — built to
> grow toward more integrations, network intelligence, and automation without re-architecting.
