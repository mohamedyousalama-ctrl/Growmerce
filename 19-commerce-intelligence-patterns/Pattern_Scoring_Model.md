# Pattern Scoring Model

> Once a pattern is *detected*, how much should we care? Scoring turns a list of detected
> patterns into a **prioritised action queue**. A diagnostic that flags ten patterns is
> noise; a diagnostic that says "fix this one first, here's why" is intelligence.

This model is deliberately simple, transparent, and explainable — every score can be read
back to the client in plain language. It pairs with `Pattern_Confidence_Model.md` (how sure
we are it's real) and `Pattern_Evidence_Framework.md` (whether the signal is trustworthy).

---

## 1. The scoring formula

```
Priority Score = (Revenue Impact + Profit Impact) × Risk Multiplier × Confidence × Recoverability × Effort Factor
```

Each component is scored on a defined scale below. The result is a single 0–100 priority
number used to rank patterns. The formula is intentionally multiplicative on confidence and
recoverability so that a high-impact pattern we're unsure about, or can't actually fix,
correctly sinks below a smaller, certain, fixable one.

---

## 2. Component scales

### Impact (Revenue + Profit), 0–5 each
| Score | Meaning |
|---|---|
| 5 | Existential / business-defining (caps or threatens the whole P&L) |
| 4 | Major (a large, material share of revenue or margin) |
| 3 | Significant (a clear, measurable chunk) |
| 2 | Moderate (worth doing, not urgent) |
| 1 | Minor (marginal) |
| 0 | Negligible |

Revenue and Profit are scored separately and summed (0–10) because some patterns grow
revenue while destroying profit (e.g. *Discounting Is Buying Sales The Business Would Have
Made Anyway*) — the model must see both.

### Risk Multiplier, 0.5–2.0
| Risk Level | Multiplier | Rationale |
|---|---|---|
| Critical | 2.0 | Could break the business; urgency dominates |
| High | 1.5 | Compounding or fast-moving downside |
| Medium | 1.0 | Steady-state |
| Low | 0.7 | Opportunity cost, no real downside |

### Confidence, 0.0–1.0
Taken directly from the `Pattern_Confidence_Model.md` output (0–100 → 0.0–1.0). An unsure
pattern is discounted, not hidden.

### Recoverability, 0.3–1.0
How much of the impact we can realistically recover.
| Score | Meaning |
|---|---|
| 1.0 | Fully recoverable (e.g. checkout friction) |
| 0.7 | Largely recoverable |
| 0.5 | Partially recoverable |
| 0.3 | Mostly structural / hard to recover |

### Effort Factor, 0.7–1.2
A gentle nudge for ease of fix (so quick wins surface, without letting effort dominate impact).
| Effort | Factor |
|---|---|
| Quick win (this week) | 1.2 |
| Moderate (this quarter) | 1.0 |
| Heavy (structural project) | 0.7 |

---

## 3. Worked example

Pattern: **Winning Revenue On Products That Lose Money After True Costs**
- Revenue Impact: 3 (volume is fine) · Profit Impact: 5 (scaling losses) → Impact = 8
- Risk: Critical → ×2.0
- Confidence: 0.8 (strong SKU cost data)
- Recoverability: 0.7 (pricing/range fixable)
- Effort: 1.0 (moderate)

```
Score = 8 × 2.0 × 0.8 × 0.7 × 1.0 = 8.96  → normalised to band
```

Normalisation: raw scores are scaled against the theoretical max (10 × 2.0 × 1.0 × 1.0 × 1.2
= 24) to a 0–100 number. Here 8.96 / 24 ≈ **37 → Medium-High priority**, elevated by the
critical risk despite moderate recoverability — exactly the triage we want.

---

## 4. Priority bands

| Band | Score | Meaning in a report |
|---|---|---|
| **P0 — Stop the bleeding** | 70–100 | Address now; material and urgent. |
| **P1 — High leverage** | 45–69 | This quarter; big upside. |
| **P2 — Worthwhile** | 25–44 | Plan it in; solid return. |
| **P3 — Monitor** | <25 | Watch; not yet worth acting. |

A diagnostic surfaces P0/P1 prominently, lists P2, and parks P3 on a watchlist.

---

## 5. Tie-breaking and sequencing

When scores are close, sequence by:
1. **Dependencies** — fix patterns that unblock others first (e.g. fix *Demand Exists But
   Discovery Fails* before optimising conversion on traffic that doesn't exist yet).
2. **Quick wins for trust** — front-load one or two fast, visible wins early in an engagement
   to build client confidence, even if a deeper pattern scores marginally higher.
3. **Compounding** — prefer patterns whose fix builds durable equity (owned audience, organic
   rank) over one-off lifts.

---

## 6. Why this stays explainable

Every score decomposes into named components a client understands: *"This is your top
priority because it's a large profit hit (Profit 5), it's critical risk (×2), we're confident
it's real (0.8), and you can recover most of it (0.7)."* No black boxes. The scoring model is
a communication tool as much as a maths one — which is exactly what makes patterns persuasive
on the website, in reports, and in sales conversations.

---

## 7. Relationship to the other models

```
Evidence Framework → is the signal real?      (data quality)
        ↓
Confidence Model   → is the pattern present?  (detection certainty, 0–100)
        ↓
Scoring Model      → how much should we care?  (priority, 0–100)
        ↓
Report / Diagnostic → ranked action queue
```

A pattern only enters the client-facing action queue when it clears a **confidence floor**
(default 60) and a **scoring floor** (default P2/25). Below those, it's an internal watchlist
item — the system does not cry wolf.
