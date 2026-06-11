# Conversion Patterns

> Why qualified intent fails to convert. Not "low conversion" — these are the specific,
> recurring reasons people who *meant* to buy didn't.

Each pattern uses the canonical template.

---

## Pattern: Traffic Arrives Through Discount Intent But Encounters Premium Positioning

**Category:** Conversion

**Description:** Acquisition (ads, promos, deal placements) attracts deal-seeking, price-led
traffic, but the destination is positioned as premium with full-price framing and no deal.
The arriving intent and the on-site reality are mismatched, so the deal-seekers bounce and the
premium buyers were never targeted. The business pays to bring the wrong intent to the wrong
experience.

**Business Symptoms:**
- "We get loads of traffic from our promos/ads but it doesn't convert."
- High bounce from discount-led campaigns.
- Premium positioning undercut by deal-led acquisition.
- A disconnect between the ad/hook and the landing experience.

**Evidence Signals:**
- Discount/deal-led acquisition driving traffic to full-price premium pages.
- High bounce/low conversion specifically from deal-intent sources.
- Mismatch between campaign hook (price/deal) and landing framing (premium).
- Promo-sourced visitors not finding the promised value.

**Common Root Causes:**
- Acquisition message (deal) inconsistent with positioning (premium).
- Targeting deal-seekers for a premium product.
- No alignment between intent type and destination experience.
- Using discounts to drive traffic to a non-discounted experience.

**Revenue Impact:** High — paid/earned traffic wasted on mismatched intent.

**Profit Impact:** High — acquisition spend burned on visitors who were never going to convert
at the offered terms.

**Risk Level:** Medium-High — common, costly, and frequently misread as "the website doesn't convert."

**Confidence Factors:**
- Intent-source vs. landing-framing mismatch.
- Bounce concentrated in deal-intent traffic.
- Hook-to-landing inconsistency.

**Counter Evidence:**
- Traffic intent actually matches positioning and conversion fails for another reason.
- The deal hook is honoured on-site and the issue is elsewhere.

**Quick Wins:**
- Align the landing experience to the acquisition promise (honour the deal, or change the hook).
- Stop driving deal-seekers to premium full-price pages.
- Match campaign intent to the right destination.

**Strategic Fixes:**
- Align acquisition intent with positioning across the funnel.
- Target the intent that matches the offer (premium buyers for premium, deal-seekers for deals).
- Build intent-matched journeys (see `Customer_Journey_Patterns.md`).

**Operational Fixes:**
- Hook-to-landing consistency check on every campaign.
- Conversion-by-intent-source monitoring.

**AI Detection Opportunities:** An agent classifies traffic intent by source and compares it to
landing-page positioning, flagging intent-experience mismatches.

**Diagnostic Usage:** Intent-Alignment module. Triggered by deal-intent traffic + premium
landing + high bounce.

**Report Usage:** "You're paying to bring bargain hunters to a premium store." Shown with
conversion-by-intent-source and the hook-vs-landing mismatch.

**Service Delivery Usage:** Intent-alignment sprint: acquisition-message and landing realignment.

**Future SaaS Usage:** Intent-vs-experience alignment scoring per campaign.

---

## Pattern: The Decision Is Easy But The Checkout Is Hard

**Category:** Conversion

**Description:** The customer has decided to buy — the hard part is done — but the mechanics of
completing the purchase (forced account creation, too many steps, limited payment options,
surprise costs, mobile friction) defeat them. The business loses sales it had already won, at
the very last step, to pure operational friction.

**Business Symptoms:**
- "People add to cart and then just disappear."
- High cart abandonment at the final steps.
- Customers complaining about a clunky/long checkout.
- Mobile conversion far worse than desktop.

**Evidence Signals:**
- Drop-off concentrated in checkout steps (not earlier).
- High cart-abandonment rate.
- Forced account creation, many fields/steps, limited payment methods.
- Surprise shipping/fees revealed only at checkout; poor mobile checkout.

**Common Root Causes:**
- Friction-heavy checkout (account required, long forms, many steps).
- Limited or unfamiliar payment options.
- Hidden costs surfacing late.
- Poor mobile checkout experience.

**Revenue Impact:** High and immediately recoverable — these buyers had already decided.

**Profit Impact:** High — recovered checkout conversions need no additional acquisition spend.

**Risk Level:** Medium-High — straightforward to fix, which makes the ongoing loss inexcusable.

**Confidence Factors:**
- Drop-off localised in checkout steps.
- Identifiable friction points (forced account, steps, payment, surprise costs).
- Mobile-desktop conversion gap.

**Counter Evidence:**
- Abandonment is price-driven, not friction-driven (surprise costs aside).
- Checkout is already streamlined and the loss is upstream.

**Quick Wins:**
- Enable guest checkout this week.
- Add the payment methods customers expect.
- Show all costs (shipping/fees) before the final step; trim checkout fields.

**Strategic Fixes:**
- Re-engineer checkout for minimum friction (steps, fields, mobile-first).
- Offer the full range of expected/local payment methods.
- Eliminate surprise costs through upfront transparency.

**Operational Fixes:**
- Checkout-funnel monitoring by step and device.
- Regular checkout-friction QA.

**AI Detection Opportunities:** An agent analyses checkout-step drop-off and device gaps,
pinpointing the specific friction points costing completed sales.

**Diagnostic Usage:** Checkout-Friction module. Triggered by checkout-step drop-off + identifiable friction.

**Report Usage:** "You're losing customers who already decided to buy." Shown with the
checkout-step funnel and mobile-vs-desktop gap.

**Service Delivery Usage:** Checkout-optimisation sprint: guest checkout, payments, transparency, mobile.

**Future SaaS Usage:** Checkout-friction analyser with step-level recommendations.

---

## Pattern: The Page Answers The Questions The Seller Cares About, Not The Ones The Buyer Asks

**Category:** Conversion

**Description:** The product/landing page is built around what the seller wants to say (brand
story, feature list, internal priorities) rather than the specific questions a buyer needs
answered to feel safe purchasing (does it fit my case, how long does delivery take, can I
return it, will it work for me). The buyer's real objections go unaddressed on the page and
they leave to resolve them — usually never returning.

**Business Symptoms:**
- "People message us asking things that are 'obviously' on the page" (they're not).
- Lots of pre-purchase questions that the page should answer.
- High research behaviour, low conversion.
- Page reads like a brochure, not an answer to the buyer's doubts.

**Evidence Signals:**
- Recurring pre-purchase questions in chat/DMs/reviews that the page doesn't address.
- Page content seller-centric (story/features) vs. buyer-centric (fit/risk/use).
- High engagement, exit before purchase.
- Buyer's top objections absent from the page.

**Common Root Causes:**
- Page written from the seller's perspective.
- No capture of real buyer questions feeding page content.
- Features listed; buyer doubts unaddressed.
- Assuming the buyer's concerns are obvious.

**Revenue Impact:** High — unanswered objections are a direct, avoidable conversion leak on
already-interested traffic.

**Profit Impact:** Favourable — answering objections lifts conversion with no acquisition cost.

**Risk Level:** Medium-High — silent and pervasive.

**Confidence Factors:**
- Recurring unanswered buyer questions.
- Seller-centric page content.
- Exit-before-purchase on engaged traffic.

**Counter Evidence:**
- The page already answers the real questions and the issue is elsewhere.
- Buyer questions are genuinely idiosyncratic, not recurring.

**Quick Wins:**
- Collect the top 10 pre-purchase questions and answer them directly on the page this week.
- Add a buyer-objection FAQ at the decision point.
- Reorder the page to lead with what the buyer needs to know, not the brand story.

**Strategic Fixes:**
- Rebuild pages around the buyer's decision questions and objections.
- Establish a question-capture loop (chat/DMs/reviews) feeding page content.
- Design pages as objection-resolution tools, not brochures.

**Operational Fixes:**
- Buyer-question capture wired into page maintenance.
- Page QA that checks "are the top objections answered here?"

**AI Detection Opportunities:** An agent mines support/review text for recurring buyer
questions and audits whether the page answers them, recommending the missing content.

**Diagnostic Usage:** Objection-Coverage module. Triggered by recurring unanswered questions +
seller-centric page.

**Report Usage:** "Your page talks about you; your customer wants answers about them." Shown
with the top-unanswered-questions list against page content.

**Service Delivery Usage:** Page-rebuild sprint: objection capture, buyer-centric content, FAQ.

**Future SaaS Usage:** Objection-coverage analyser matching buyer questions to page content.
