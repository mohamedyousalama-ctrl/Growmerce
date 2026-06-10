# Customer Journey Patterns

> Where the journey breaks between intent and purchase, and between first purchase and
> loyalty. Not "bad funnel" — that's a category. These are the specific, recurring breaks
> in the path a real customer walks.

Each pattern uses the canonical template.

---

## Pattern: The Journey Assumes A Confidence The Customer Hasn't Built Yet

**Category:** Customer Journey

**Description:** The path asks the customer to commit (buy, sign up, pay) before it has given
them enough to *trust* — proof, reassurance, answers to the obvious objection. The business
designed the journey from the seller's confidence, not the buyer's uncertainty. High-intent
visitors arrive, hit the trust gap, and leave to "think about it" (i.e. to a competitor).

**Business Symptoms:**
- "People are clearly interested but they don't pull the trigger."
- High add-to-cart or page engagement, low completion.
- Lots of "let me think about it" / abandoned carts.
- Customers ask the same reassurance questions over and over.

**Evidence Signals:**
- Drop-off concentrated at the commitment step (checkout, signup, payment).
- High engagement upstream (time on page, product views) but low conversion.
- Repeated pre-purchase questions in chat/DMs about trust (returns, authenticity, quality).
- Thin or buried proof (reviews, guarantees, social proof) at the decision point.

**Common Root Causes:**
- Proof and reassurance placed late or not at all.
- No guarantee/risk-reversal at the moment of commitment.
- Unanswered top objection left for the customer to resolve alone.
- Journey designed around the product, not the customer's anxiety.

**Revenue Impact:** High — these are *already-interested* visitors; recovering them is the
cheapest revenue available.

**Profit Impact:** Favourable — recovered conversions arrive without new acquisition cost.

**Risk Level:** Medium-High — silent and easy to misread as "weak demand."

**Confidence Factors:**
- Drop-off localised at the trust/commitment step.
- Recurring trust-related pre-purchase questions.
- Demonstrable absence of proof at the decision point.

**Counter Evidence:**
- Drop-off is price-driven, not trust-driven (different pattern).
- The traffic is genuinely low-intent (then it's an upstream targeting issue).

**Quick Wins:**
- Put the strongest proof (reviews, ratings, guarantee) directly at the commitment step.
- Add a risk-reversal (easy returns, guarantee) visibly at checkout.
- Answer the single most-asked objection on the product/checkout page.

**Strategic Fixes:**
- Re-sequence the journey to build confidence *before* asking for commitment.
- Develop a proof system (reviews, UGC, guarantees) embedded at each decision point.
- Map and pre-empt the top objections along the path.

**Operational Fixes:**
- Objection-capture loop from chat/DMs feeding page content.
- Journey QA that checks "is there proof at every commitment moment?"

**AI Detection Opportunities:** An agent maps drop-off to journey steps, mines support
conversations for recurring objections, and flags trust gaps at commitment points.

**Diagnostic Usage:** Journey Friction module. Triggered by commitment-step drop-off + trust
objection clustering.

**Report Usage:** "Interested customers are leaving because nothing reassured them at the
moment of decision." Shown with the step-level drop-off chart.

**Service Delivery Usage:** Journey/conversion sprint: proof placement, risk-reversal,
objection handling.

**Future SaaS Usage:** Journey-analysis tool that auto-detects trust gaps and recommends proof
placement.

---

## Pattern: First Purchase Is Treated As A Win Instead Of A Trial

**Category:** Customer Journey

**Description:** The business celebrates the first order as the finish line and invests
nothing in the period that decides whether the customer ever comes back. From the customer's
side the first order is a *trial* — they're deciding if you're worth a second purchase — but
the business has gone silent. The most fragile, most decisive window is left empty.

**Business Symptoms:**
- "We get plenty of first orders but not many come back."
- Strong acquisition numbers, weak repeat rate.
- No structured post-purchase contact beyond a receipt.
- Reorder happens by luck, not design.

**Evidence Signals:**
- Low second-purchase rate within the category's natural reorder window.
- Near-empty post-purchase lifecycle (no onboarding, no nudge, no education).
- First-order cohorts decaying fast with no re-engagement touchpoint.
- Repeat revenue share low relative to first-order volume.

**Common Root Causes:**
- Funnel optimised to first conversion, then attention stops.
- No post-purchase experience (onboarding, usage help, replenish nudge).
- Product-usage uncertainty left unaddressed (customer doesn't get the value, doesn't return).
- Treating retention as a CRM afterthought, not part of the journey.

**Revenue Impact:** Very high in the long run — second purchase is the hinge of lifetime
value; losing it caps LTV and inflates payback period.

**Profit Impact:** Severe — repeat orders are the profitable ones; without them every
customer is acquired at a loss that's never recovered.

**Risk Level:** High — quietly determines whether the unit economics ever work.

**Confidence Factors:**
- Low documented second-purchase rate.
- Absent post-purchase lifecycle.
- Fast cohort decay.

**Counter Evidence:**
- Genuinely one-time-purchase category (then focus is referral/review, not repeat).
- Repeat happens through an owned channel that attribution under-counts.

**Quick Wins:**
- Launch a post-purchase flow this week (thank-you → how-to-get-value → reorder nudge).
- Trigger a timed second-purchase offer at the category's natural reorder point.
- Ask for a review and feed it back into onboarding the next cohort.

**Strategic Fixes:**
- Design the second-purchase journey as deliberately as the first.
- Build onboarding that ensures the customer realises value (the precondition for return).
- Stand up a lifecycle/retention programme (see `Retention_Patterns.md`).

**Operational Fixes:**
- Second-purchase rate as a headline KPI alongside first-order CAC.
- Post-purchase journey owned by a named function.

**AI Detection Opportunities:** An agent measures second-purchase rate by cohort, detects the
empty post-purchase window, and recommends timed interventions at the natural reorder point.

**Diagnostic Usage:** Retention Onset module. Triggered by low second-purchase rate + absent
post-purchase lifecycle.

**Report Usage:** "You're winning trials and losing customers." Shown with the cohort
second-purchase decay curve.

**Service Delivery Usage:** Lifecycle build: post-purchase flows, onboarding, second-purchase
programme.

**Future SaaS Usage:** Second-purchase predictor with automated intervention triggers.

---

## Pattern: The Journey Is Built For The Channel It Started On, Not The One The Customer Finishes On

**Category:** Customer Journey

**Description:** A customer discovers the brand in one context (e.g. a short-form social
video, a marketplace search, a delivery app) but is pushed into a journey designed for a
different context, creating a jarring handoff where intent leaks. The discovery experience
and the conversion experience don't match, so the customer's momentum dies in the gap.

**Business Symptoms:**
- "We get tons of clicks/views but they don't convert."
- Big traffic from one source, conversions don't follow.
- Customers arrive "warm" then act "cold."
- The landing experience feels disconnected from the ad/video/listing that drove it.

**Evidence Signals:**
- High click/view-through from a channel, sharp drop at the landing/handoff.
- Mismatch between the discovery message and the destination page.
- Multi-step handoffs (social → site → app → checkout) each shedding intent.
- Source-level conversion far below site average for the discovery channel.

**Common Root Causes:**
- Generic landing experience regardless of where the customer came from.
- Friction-heavy handoff (app install, account creation, re-search on arrival).
- Discovery promise not honoured immediately on arrival.
- No continuity between the hook that earned the click and the page that receives it.

**Revenue Impact:** High — the traffic is already paid for or earned; the leak is pure waste
at the handoff.

**Profit Impact:** High — wasted acquisition spend on intent that's discarded at the door.

**Risk Level:** Medium-High — often misdiagnosed as "bad traffic" when it's a handoff problem.

**Confidence Factors:**
- Source-level drop-off localised at the handoff.
- Message/experience mismatch between discovery and destination.
- Friction steps measurable in the path.

**Counter Evidence:**
- The traffic genuinely is low-quality/mis-targeted (upstream problem).
- Conversion is normal once intent quality is accounted for.

**Quick Wins:**
- Match the landing page to the exact promise of the ad/video/listing that drove it.
- Remove one friction step in the handoff (guest checkout, no forced app/account).
- Carry the discovery hook's message straight onto the destination above the fold.

**Strategic Fixes:**
- Design channel-specific journeys that honour where the customer came from.
- Minimise handoffs; collapse multi-step paths.
- Build message continuity from hook to conversion as a standard.

**Operational Fixes:**
- Source-level conversion monitoring with handoff QA.
- Creative-to-landing matching as part of every campaign launch.

**AI Detection Opportunities:** An agent compares discovery-message and landing-experience
alignment and flags high-traffic, low-conversion handoffs by source.

**Diagnostic Usage:** Channel-to-Conversion module. Triggered by source-level handoff
drop-off + message mismatch.

**Report Usage:** "Your customers arrive warm and your website cools them down." Shown with
source-level conversion vs. site average.

**Service Delivery Usage:** Channel-journey alignment sprint: landing redesign, handoff
reduction, message continuity.

**Future SaaS Usage:** Automated discovery-to-landing alignment scoring per campaign/source.
