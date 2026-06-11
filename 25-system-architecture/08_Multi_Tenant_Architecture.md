# 08 — Multi-Tenant Architecture

> How thousands of customers coexist on one platform — isolated where it matters, sharing where it
> helps. This is the hardest tension in the system: per-business data must be strictly private, yet
> the institutional knowledge (and consented network intelligence) must be shared to deliver the moat
> (23/15). This document resolves that tension.

---

## 1. The three data scopes

Every object carries a `tenant_scope` (24 §01). There are exactly three:

```
business         private to one tenant — never visible to any other tenant
shared/library   the institutional Knowledge corpus — readable by all tenants, writable only by
                 governed knowledge processes
network-aggregate anonymised, consented aggregates across tenants — a high-tier benchmark source,
                 derived so no single business is identifiable
```

The entire multi-tenant design is the disciplined management of these three scopes and the flows
between them.

---

## 2. Isolation (per-business data)

- **Logical isolation by default:** every per-business object/edge/event is tagged `tenant_scope =
  business:<id>`; the Tenant/Permission Service (02) injects a scope filter on every retrieval and
  query. No query can return another tenant's data — enforced at the Retrieval Service, not by caller
  discipline.
- **Physical isolation where warranted:** sensitive data (raw uploads, financials) can be partitioned/
  encrypted per tenant; large or regulated tenants can be isolated to dedicated partitions/clusters.
- **Per-tenant encryption keys** for raw artifacts (E) so isolation holds even at the storage layer.
- **No cross-tenant joins** in the forward flow — a business's diagnosis touches only its own data +
  shared library + (consented) network aggregates.

---

## 3. Privacy

- **Data minimisation:** the system reasons from the least sensitive data that suffices; sensitive
  inputs are optional (the diagnostic degrades gracefully, 22).
- **Raw vs. derived:** raw personal artifacts (E) have shorter retention and per-tenant encryption;
  derived intelligence is anonymisable. Erasure of raw data preserves anonymised provenance (03/09) —
  honouring privacy without destroying auditability.
- **Consent-gated aggregation:** a business's data contributes to network-aggregate memory **only with
  consent**, and only after anonymisation/aggregation that prevents re-identification.
- **Purpose binding:** a tenant's data is used to serve that tenant; cross-tenant use is limited to
  consented, anonymised aggregates.

---

## 4. Knowledge sharing (the shared library)

The institutional **Knowledge corpus (23, 24 §04)** is `shared/library`: one copy, read by every
tenant. This is the architectural realisation of *transferable knowledge* (23 §02):
- A benchmark, model, or playbook learned anywhere is available to every business immediately.
- Onboarding a new tenant gives them the full benefit of all prior learning from day one.
- Crucially, the shared library contains **general commercial knowledge** (principles, models,
  benchmarks, playbooks, pattern_defs) — **not** any business's private data. It's the *understanding*
  that's shared, never the *data*.

Writes to the library are governed (validation, human review, versioning — 23 §12), not open to tenant
processes.

---

## 5. Network intelligence (the consented bridge)

Network-aggregate memory (07) is how cross-business *signal* becomes shared *knowledge* without
violating isolation:
```
many businesses' private outcomes/patterns
   → anonymise + aggregate (k-anonymity-style thresholds; no single business identifiable)
   → consent check
   → network-aggregate nodes (benchmark distributions, pattern frequencies, fix-outcome rates)
   → usable as a HIGH-TIER source in any business's reasoning (a benchmark prior)
```
This is the moat's compounding made multi-tenant: every engagement makes the *aggregate* smarter, and
every business benefits — but no business's private data is ever exposed to another. The aggregation
boundary (anonymisation + consent + thresholds) is the critical control.

---

## 6. Permission boundaries

Permissions operate at three levels:
- **Tenant boundary:** a principal can only access their tenant's `business` scope (+ shared library +
  consented aggregates). Enforced on every retrieval/query.
- **Role within a tenant:** owner / manager / analyst roles gate who sees/edits what (e.g. financials,
  integrations).
- **System processes:** knowledge-writing, aggregation, and human-review processes have elevated,
  audited, narrowly-scoped permissions — they can write the library or aggregates but are themselves
  logged (09).

Every access decision is made by the Tenant/Permission Service and **audited** (09) — permission
checks are events too.

---

## 7. How the scopes flow (the one-way valve)

```
business data  ──(reasoning, private)──►  business intelligence (private)
      │
      └──(consent + anonymise + aggregate)──►  network-aggregate  ──►  used as a shared prior
                                                                          │
shared/library  ◄──(governed validation of cross-business lessons)───────┘
```

The critical invariant: **data flows from private to aggregate only through an anonymising, consented
valve; it never flows business-to-business directly.** Knowledge (general understanding) flows freely
to all; data (specific facts) never crosses tenant lines except as anonymised aggregate.

---

## 8. Scaling thousands of tenants

- **Stateless services** (02) scale horizontally; tenant scope is a request parameter, not a
  deployment.
- **Shared library cached** once, served to all — cheap at scale (it's small and read-mostly).
- **Per-tenant data partitioned** by `tenant_scope` across the stores (03); hot tenants can be sharded.
- **Noisy-neighbour control:** per-tenant rate limits and quotas on ingestion/reasoning so one tenant
  can't degrade others.
- **Onboarding is cheap** because the expensive asset (knowledge) is already shared — the marginal
  tenant mostly adds their own (isolated) data.

---

## 9. Why this design serves the doctrine

- **Isolation** protects the trust relationship with each operator (privacy is part of trust, 04/09).
- **Shared knowledge** delivers the compounding moat to every tenant immediately (23/15).
- **Consented network intelligence** lets the aggregate get smarter without exposing anyone — the
  multi-tenant form of "the system understands more over time."
- **One-way anonymising valve** is the structural guarantee that compounding never costs privacy.

> Multi-tenancy here is not just isolation; it is the architecture of a *shared brain with private
> memories.* Each business's data stays its own; the understanding learned across all of them is shared
> with all of them. That combination — private data, shared knowledge, consented aggregates — is what
> lets Growmerce scale to thousands of customers while making each one smarter because of the others.
