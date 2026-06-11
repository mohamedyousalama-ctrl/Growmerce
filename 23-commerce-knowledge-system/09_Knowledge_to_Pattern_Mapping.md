# 09 — Knowledge → Pattern Mapping

> A critical document. It draws the precise line between **knowledge, pattern, signal, evidence, and
> recommendation** — five concepts that are constantly confused, and whose confusion is the difference
> between an intelligence institution and an AI tool. It explains how knowledge *becomes* patterns and
> how patterns *depend on* knowledge.

---

## 1. The five concepts, precisely distinguished

| Concept | What it is | Scope | Example |
|---|---|---|---|
| **Knowledge** | what is generally true about commerce | universal (any business) | *"Customers buy on intent, trust, and friction"* (a principle, 03) |
| **Pattern** | a recurring, diagnosable commercial reality | recurring (a class of businesses) | *"Traffic arrives but trust isn't strong enough to buy"* (19) |
| **Signal** | a raw observation about one business | particular (this business) | *"checkout drop-off is 62%"* (22) |
| **Evidence** | a verified, tiered signal | particular, trusted | *"checkout drop-off is 62%, from analytics (Tier 2), fresh"* (22) |
| **Recommendation** | a prioritised action for one business | particular, actionable | *"add guest checkout this week"* (20) |

The relationships:

```
KNOWLEDGE        (general truth)
   │ crystallises into
PATTERN          (a recurring, diagnosable form of that truth)
   │ is detected from
EVIDENCE         (verified SIGNALS about a specific business)
   │ which, interpreted by KNOWLEDGE, produces
RECOMMENDATION   (the right action, from a validated playbook)
```

> **Knowledge is the prior. A signal is an observation. Evidence is a trusted observation. A pattern
> is knowledge meeting evidence. A recommendation is knowledge applied to a confirmed pattern.**

---

## 2. How knowledge becomes a pattern

A pattern is **knowledge crystallised into a recognisable, recurring, diagnosable form.** The path:

```
PRINCIPLE/MODEL (knowledge)
   → observed to recur across businesses (case observations → lessons, 03/11)
   → given an evidence definition (what signals reveal it) and counter-evidence
   → named, with causes and fixes
   = PATTERN (19)
```

**Worked example:**
- **Knowledge (principle):** *trust must be built before the ask; customers leave when trust is
  insufficient at the commitment moment* (06).
- **Recurs:** across many businesses, engaged traffic abandons at checkout despite interest.
- **Crystallises into the pattern:** *"The Journey Assumes A Confidence The Customer Hasn't Built
  Yet"* — with evidence signals (commitment-step drop-off + recurring trust objections), counter-
  evidence (is it price, not trust?), causes (proof placed late), and fixes (proof + risk-reversal at
  the commitment step).

The pattern is the *operational, diagnosable packaging* of the underlying knowledge. The knowledge is
*why* the pattern exists and is true; the pattern is *how* the system recognises and acts on it.

---

## 3. How patterns depend on knowledge

A pattern cannot stand without the knowledge beneath it. Knowledge supplies a pattern with four things
it could not have on its own:

| What the pattern needs | Supplied by knowledge object (03) |
|---|---|
| **Why it happens** (the causal account) | Principles, Models |
| **How to know it's present** (what to measure, and what's normal) | Benchmarks, Rules |
| **When it does *not* apply** | Exceptions |
| **What to do about it** | Playbooks |

Remove the knowledge and a "pattern" degrades into a correlation with no cause, no benchmark, no
exceptions, and no validated fix — which is exactly the brittle, hallucination-prone output of a
system that detects patterns without understanding them. **Knowledge is what makes a pattern
trustworthy and actionable rather than a coincidence with a name.**

---

## 4. How knowledge interprets evidence (the meaning step)

Evidence is meaningless until knowledge interprets it. This is the step generic tools skip:

```
EVIDENCE: "conversion is 1.4%, verified, fresh"          ← a trusted number, no meaning yet
   + KNOWLEDGE: benchmark — "1.4% is low for this category/AOV/consideration level"  (a benchmark, 03)
   + KNOWLEDGE: model — "low conversion at healthy traffic usually means trust or friction" (a model)
   = INTERPRETED EVIDENCE: "conversion is below expectation; suspect trust/friction"
   → supports the PATTERN: "trust gap at the commitment moment"
```

A benchmark (knowledge) converts a number (evidence) into a judgement (good/bad/normal). A model
(knowledge) converts a judgement into a likely cause (a candidate pattern). Without knowledge, the
Supply Chain (22) can verify that 1.4% is *true* but can say nothing about whether it's *a problem* —
that is entirely a knowledge act.

---

## 5. How it all produces a recommendation

```
KNOWLEDGE (principles, benchmarks, models)
   interprets EVIDENCE (verified signals)
   → confirms a PATTERN (with confidence)
   → selects the PLAYBOOK (knowledge) that fits this pattern in this context
   → contextualised by KNOWLEDGE (market maturity, constraints)
   = RECOMMENDATION
```

A recommendation is the terminal application of knowledge: the right playbook (a knowledge object) for
the confirmed pattern, adapted to the business's context using more knowledge (market, operations,
pricing domains). This is why recommendations must trace to a finding *and* a validated fix (20/22):
the validated fix is a knowledge object, and the trace is the knowledge provenance.

---

## 6. The worked end-to-end example

| Layer | Instance |
|---|---|
| **Signal** | "62% of carts abandon at the payment step" (observed) |
| **Evidence** | the same, verified from analytics (Tier 2), fresh (22) |
| **Knowledge (benchmark)** | "payment-step abandonment above ~X% is abnormal here" |
| **Knowledge (principle/model)** | "decided buyers are lost to checkout friction" (06) |
| **Pattern (19)** | "The Decision Is Easy But The Checkout Is Hard" |
| **Knowledge (playbook)** | the checkout-friction fix sequence (guest checkout, payments, transparency, mobile) |
| **Recommendation** | "enable guest checkout this week; then add expected payment methods; then fix mobile checkout" |
| **Lesson (back to knowledge, 11)** | outcome captured: "guest checkout recovered most of the loss here" → strengthens the playbook |

Every layer is distinct; every transition is a knowledge act. The same evidence with *worse*
knowledge yields a worse (or wrong) conclusion — which is the whole argument for the Knowledge System.

---

## 7. Why this distinction is the moat in miniature

A generic AI tool collapses these five into one move: signal → "recommendation," with the "knowledge"
implicit and unvalidated in a model's weights. That collapse is why it hallucinates (no explicit
knowledge to check against), can't explain itself (no knowledge provenance), and can't improve
specifically (no place to add a lesson). Growmerce keeps them **separate and explicit**: knowledge is
a maintained asset, patterns are validated crystallisations, evidence is verified, and recommendations
are traceable applications. That separation is what makes the output trustworthy *and* what makes the
system improvable — the heart of the moat (15).
