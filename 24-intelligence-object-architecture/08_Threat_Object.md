# 08 — Threat Object

> A configuration where value is **at risk**. A `Threat` is derived from confirmed Patterns (05) and
> represents downside — scored by severity (likelihood × downside × urgency), with an emphasis on
> *trajectory*, not snapshot. It is the downside half of the Brain's VALUE stage (20, Risk & Threat
> Framework); `Opportunity` (07) is the upside half.

Inherits `BaseObject` (01).

---

## 1. Purpose

To represent "here is value at risk, this likely, this damaging, this soon — and worsening or not."
Threats exist so the system can place protection ahead of gains (stop the bleeding before chasing
upside, 20) and so it can detect *compounding fragility* a snapshot would miss.

---

## 2. Schema

```
Threat extends BaseObject
  subject_ref     ObjectRef        # the Business (09)
  derived_from    list<EdgeRef>    # the Pattern(s) (05) revealing it
  threat_type     enum             # competitor | margin | marketplace_dependency | pricing_risk |
                                   #   channel_concentration | operational_bottleneck   (20 §Risk&Threat)
  title           string
  description     text
  scope_refs      list<ObjectRef>
  severity        Severity         # likelihood × downside × urgency → band (see §3)
  trajectory      Trajectory       # direction + rate (worsening/stable/improving) — KEY (see §3)
  confidence      Confidence       # (11) inherited from source pattern(s)
  value_at_risk   money_range      # revenue and/or profit exposed
  is_compound     bool             # fragility-stack (multiple patterns → escalated severity)
  status          enum             # IDENTIFIED | SURFACED | MITIGATING | AVERTED | MATERIALISED | DISMISSED
  mitigations     list<ObjectRef>  # Recommendation (06) objects (stop-loss actions)
  ruled_out_note  text?            # for threats considered and dismissed (credibility, 20)
  # (inherited) id, provenance, version, tenant_scope, metadata
```

```
Severity   { likelihood: 0..1, downside: enum(low..existential), urgency: enum, band: critical|high|medium|watch }
Trajectory { direction: worsening|stable|improving, rate: enum, evidence: list<EdgeRef> }
```

---

## 3. Attributes (semantics)

- `severity.band` from `likelihood × downside × urgency` (20). A Critical threat can outrank every
  Opportunity in the plan (fix the leak before decorating the boat).
- `trajectory` is the distinctive field: threat detection emphasises *direction*, not snapshot — a
  competitor currently behind but compounding is a worse threat than one ahead but static (20/08-of-23).
  A threat must pass a **trajectory test** before being raised.
- `is_compound`: fragility patterns *stack* (e.g. one-channel + renting-attention + competitors-
  compounding-organic = existential), escalated above any single component (20).
- `ruled_out_note`: threats *considered and dismissed* are recorded — naming what's safe is a
  credibility signal and prevents alarmism (20).

---

## 4. Relationships (edges, see 10)

```
Threat --derived_from-->  Pattern (05)
Threat --about-->         CommerceEntity (09)   # e.g. the Channel / Marketplace / Margin at risk
Threat --mitigated_by-->  Recommendation (06)
Threat --escalates_with-> Threat                # compound fragility stack
Threat --part_of-->       Plan
```

---

## 5. Lifecycle

```
IDENTIFIED → SURFACED → MITIGATING ─┬─> AVERTED      (stop-loss worked; exposure reduced)
   │                                └─> MATERIALISED  (threat occurred — captured as a lesson)
   └──> DISMISSED (ruled out; ruled_out_note retained)
```

`MATERIALISED` is not only a loss — it's a high-value learning event (our likelihood/urgency estimate
is calibrated against it, feeding Knowledge 04 and the Risk framework, 20).

---

## 6. Confidence

`confidence` (11) from the source Pattern(s); a threat below the confidence floor (or failing its
trajectory test / counter-check) is watchlist, not surfaced (20 GUARD). Severity is distinct from
confidence: we can be highly confident about a low-severity threat and vice versa.

---

## 7. Versioning

- Versioned as `severity`/`trajectory`/`status` change with new evidence (trajectory especially is
  re-evaluated over time); pins source pattern versions.
- `AVERTED`/`MATERIALISED` are append-only terminal records feeding calibration.

---

## 8. Storage considerations

- Per-business, in the `Plan` aggregate; index by `subject_ref`, `threat_type`, `severity.band`,
  `status`, `trajectory.direction`.
- Materialised threats (and averted ones) are high-value for calibration → replicate to knowledge/
  analytics store.

---

## 9. Retrieval considerations

- Retrieved into the unified prioritised plan with Opportunities; **Critical/active-bleed threats sort
  ahead of equal-value opportunities** (20).
- Carries trajectory evidence and counter-check results (why it's real and worsening), never a bare
  alarm (13).
- Ruled-out threats retrievable for the "what we're not worried about" section (20).

---

## 10. Brain interactions (20)

- **VALUE:** the Brain *creates* Threats from confirmed Patterns, running the trajectory test and
  counter-checks, scoring severity, detecting compound fragility.
- **DECIDE:** generates stop-loss Recommendations; sequences them ahead of gains.
- **LEARN:** averted/materialised outcomes calibrate likelihood/urgency estimates (Risk framework, 20;
  Knowledge, 04).

> The Threat object encodes the operator instinct that a snapshot hides the danger and a trajectory
> reveals it. By making severity, trajectory, compounding, and ruled-out first-class, it lets the
> system protect the business calmly and credibly — and learn from every threat that does or doesn't
> materialise.
