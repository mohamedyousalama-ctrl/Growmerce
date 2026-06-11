# Open Questions — Intelligence Object Architecture

Engineering questions to resolve during implementation. None block the architecture; all inform the
build. (Scoped to the object architecture — not strategy, brand, or UX.)

---

## Storage & graph

1. **Graph store vs. hybrid.** A native property-graph store fits the model (14), but Signals/Evidence
   are high-volume time-series. What is the right split (graph for knowledge/patterns/entities +
   time-series for signals/evidence + relational projections), and where are the join seams?
2. **Edge attribute storage.** Edges carry weight/confidence/provenance/version (10). At scale, how are
   attributed edges stored and indexed efficiently for traversal-heavy reasoning?
3. **Materialisation vs. recomputation.** Confidence/weight are materialised for speed but re-derivable
   (11). What is the invalidation/recomputation strategy when inputs version?

## Identity & resolution

4. **Entity resolution.** How are observed references resolved to canonical entities (one Product vs.
   variants; the "real" Competitor set) with confidence, and how are merges/splits handled (09)?
5. **Independence keys.** How is `independence_key` (03) computed to reliably detect shared provenance
   and prevent double-counting in convergence? (Shared with 22's open question.)

## Confidence & calibration

6. **Basis→score mapping.** The exact function from `ConfidenceBasis` to `score`/`band` (11), and the
   band-movement thresholds (20), need defining and calibrating against outcomes. Cadence and minimum
   sample?
7. **Edge confidence.** Which inferred edges (causal, interaction, resolution) carry confidence, and how
   is it computed and propagated through traversal?

## Knowledge encoding (the consequential one)

8. **Knowledge card encoding.** The concrete format for knowledge cards (04) so they are machine-
   retrievable *and* human-readable *and* version-pinnable — the single most important build decision
   for staying out of "AI wrapper" territory (shared with 23's open question). Structured payloads
   (RuleExpr, Benchmark, Playbook) need executable schemas.
9. **Scope/exception evaluation.** How are `scope` predicates and `exception` checks evaluated at
   retrieval (13) efficiently and correctly, so out-of-scope knowledge is reliably excluded?

## Retrieval & the AI boundary

10. **Citation enforcement.** How does GUARD verify that generated narrative cites its retrieved objects
    (13), mechanically, at scale? What is the rejection path for uncited assertions?
11. **Proposal lifecycle.** AI-proposed knowledge/patterns enter as PROPOSED and must be validated. What
    is the queue, the validation SLA, and the human-review routing (ties to 20 Human Override, 23 §12)?
12. **Retrieval ranking.** When many knowledge cards or evidence items match, how are they ranked for
    the Brain (relevance × certainty × freshness) without hiding minority/contradicting items?

## Scope, privacy, network

13. **Tenant scoping enforcement.** How is `tenant_scope` enforced so per-business data never leaks
    across businesses while shared knowledge and consented network aggregates flow (01/14)?
14. **Network-aggregate nodes.** Schema, anonymisation, consent, and tiering for network-aggregate
    knowledge nodes (14) — how they enter the graph as a high-tier source without contaminating
    per-business reasoning.

## Versioning at scale

15. **Time-travel cost.** Reconstructing "as of date T" via pinned inputs and version logs (12) is
    powerful but potentially expensive. What retention/snapshotting strategy keeps it feasible?
