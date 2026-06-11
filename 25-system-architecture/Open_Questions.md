# Open Questions — System Architecture

Engineering questions to resolve during build. None block the architecture; all inform implementation.
(Architectural *decisions* are logged in `13_Architecture_Decisions.md`; these are the unresolved ones.)

---

## Stores & consistency

1. **Graph technology choice.** Native graph DB vs. graph-on-relational (modeled edges) vs. a hybrid —
   weighed against operational maturity, traversal performance, and the MVP's "collapse to Postgres"
   path (12). What's the v1 vs. scale answer?
2. **Vector store necessity & boundary.** Where does semantic recall genuinely help vs. structured
   retrieval (06)? How do we keep it strictly a *recall aid* and never a source of truth, in code?
3. **System-of-record vs. projection seams.** Exact boundaries of which store is authoritative for each
   object, and the rebuild/reconciliation strategy when projections drift (03/14 T1).

## Pipeline & runtime

4. **Sync vs. async per stage.** Which cognition stages run synchronously in a request vs. async via the
   bus (fast-judgement latency vs. completeness)? The mode-switching policy (05 §7).
5. **GUARD performance.** Running grounding/citation/counter-evidence checks on every write at scale —
   cost and latency budget; what's cached vs. recomputed (06).
6. **Confidence recomputation triggers.** Exactly when confidence is recomputed (input version change,
   freshness crossing) without thrashing; the invalidation strategy (24 §11).

## AI boundary

7. **Citation enforcement mechanics.** How GUARD verifies that AI-drafted narrative actually cites its
   grounding objects, reliably and at scale (06/10). The rejection/regeneration loop.
8. **Extraction verification.** The concrete re-verification of AI-extracted Signals against their
   source before they become Evidence (10/22 failure mode 9).
9. **Provider abstraction.** How model-portable the bounded tasks are; fallback behaviour under provider
   outage/limits (14 A3).

## Knowledge & calibration

10. **Knowledge encoding format.** The retrievable, human-readable, version-pinnable card format with
    executable payloads (RuleExpr/Benchmark/Playbook) — the consequential decision shared with 23/24.
11. **Calibration harness.** How confidence calibration is measured against outcomes, the minimum sample
    before trust, and the cadence (24 §11, 22 §07).
12. **Drift detection thresholds.** What outcome-contradiction rate triggers knowledge review/deprecation
    (23 §12 / 14 Tr4).

## Multi-tenant & privacy

13. **Anonymisation thresholds.** The exact k-anonymity-style thresholds and method for network
    aggregation that guarantee non-identifiability (08).
14. **Tenant isolation level by data class.** Which data classes get logical vs. physical isolation and
    per-tenant keys (08/09); cost vs. assurance trade-off.
15. **Erasure vs. provenance.** The precise mechanism for honouring data-erasure requests while
    preserving anonymised provenance/auditability (03/09).

## Scale & ops

16. **Cost model.** AI-call and storage cost envelopes at 1k / 10k tenants; where caching/batching is
    mandatory (11/14 S3).
17. **Intelligence-observability SLOs.** Target ranges for calibration error, abstention rate, and GUARD
    block rate — and the alerting policy (11/ADR-11).
