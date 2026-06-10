# Profit Leak Patterns

> Where margin escapes even when revenue looks fine. The most dangerous patterns in the
> library, because the dashboard says "growing" while the bank account says "drowning." A
> profit leak is invisible to anyone watching only the top line.

Each pattern uses the canonical template.

---

## Pattern: Discounting Is Buying Sales The Business Would Have Made Anyway

**Category:** Profit Leak

**Description:** Promotions are applied broadly to customers who were already going to
purchase, so the discount doesn't generate incremental sales — it just gives away margin on
baseline demand. Revenue holds or grows slightly; profit per order quietly collapses. The
business has trained itself, and its customers, to transact only on discount.

**Business Symptoms:**
- "We're busy but somehow not making money."
- Sales dip whenever there's no active promo, so promos never stop.
- Customers wait for the next sale before buying.
- Margins feel thinner every quarter despite stable prices.

**Evidence Signals:**
- High share of orders carrying a discount code; low full-price order share.
- Baseline (no-promo) demand barely below promo demand → low incrementality.
- Repeat customers redeeming discounts they didn't need.
- Blended margin trending down while revenue is flat/up.

**Common Root Causes:**
- Always-on / habitual promotions instead of targeted ones.
- Discounts shown to retained, high-intent customers (worst possible target).
- No measurement of incrementality — promos judged by redemption, not lift.
- Discounting used as a growth tactic instead of fixing the actual conversion problem.

**Revenue Impact:** Often neutral or mildly positive — which is exactly why it survives
unexamined. The damage hides below the revenue line.

**Profit Impact:** Severe. Every non-incremental discount is pure margin destruction; at
scale it can erase the entire profit of a growing business.

**Risk Level:** High — and self-reinforcing: discount-trained customers stop buying at full
price, deepening the dependence.

**Confidence Factors:**
- Measurable baseline vs. promo demand showing low lift.
- High discount-penetration on repeat/high-intent segments.
- Margin erosion concurrent with stable pricing.

**Counter Evidence:**
- Promotions are genuinely incremental (clear baseline lift, new-customer skew).
- Discounting is a deliberate, funded acquisition strategy with healthy LTV payback.

**Quick Wins:**
- Stop showing discounts to logged-in repeat customers and high-intent traffic this week.
- Run one no-promo control window to measure true baseline demand.
- Gate discounts behind an action (first order, email signup, lapsed-customer winback).

**Strategic Fixes:**
- Replace broad discounting with targeted, incremental offers (see `Offer_Patterns.md`).
- Reposition value so full-price conversion holds without a code.
- Build a promo calendar judged on incremental margin, not redemption volume.

**Operational Fixes:**
- Incrementality testing as standard before any rollout.
- Margin-after-discount, not revenue, as the headline promo KPI.

**AI Detection Opportunities:** An agent estimates promo incrementality from baseline vs.
promo periods and flags discounts landing on already-converting segments.

**Diagnostic Usage:** Margin & Promotion module. Triggered by high discount penetration +
low measured incrementality.

**Report Usage:** "You're paying customers to do what they'd do for free." Shown with the
baseline-vs-promo demand chart and margin-bleed estimate.

**Service Delivery Usage:** Promotion-strategy rebuild: targeting rules, incrementality
testing, calendar redesign.

**Future SaaS Usage:** Automated incrementality scoring on every promotion with a "margin at
risk" alert.

---

## Pattern: Winning Revenue On Products That Lose Money After True Costs

**Category:** Profit Leak

**Description:** Certain SKUs or orders look profitable on gross margin but lose money once
*fully loaded* costs are applied — shipping, payment fees, returns, marketplace commissions,
fulfilment, and ad cost to acquire the order. The business proudly scales its best "sellers"
that are actually its biggest losers.

**Business Symptoms:**
- "Our top sellers are our cheap/heavy/returns-heavy items… and we're not making money."
- More volume, less profit.
- Free shipping or marketplace fees quietly eat the order.
- High-return categories celebrated for their sales volume.

**Evidence Signals:**
- Fully-loaded contribution margin negative on high-volume SKUs.
- Shipping cost > margin on heavy/bulky low-price items.
- Return rate × return cost wipes out category margin.
- Marketplace commission + fulfilment + ad cost exceeds gross margin per order.

**Common Root Causes:**
- Pricing set on gross margin, ignoring variable order costs.
- Free-shipping threshold below true fulfilment cost.
- No SKU-level contribution accounting.
- Acquiring orders for loss-leaders without a profitable attach.

**Revenue Impact:** Usually positive — these are often "bestsellers," which is the trap.

**Profit Impact:** Severe and scaling — the more you sell, the more you lose; growth
accelerates the bleed.

**Risk Level:** Critical — this is the pattern most likely to bankrupt a "growing" business.

**Confidence Factors:**
- SKU-level fully-loaded cost data.
- Consistent negative contribution across the high-volume items.
- Returns/shipping cost data tied to specific SKUs.

**Counter Evidence:**
- The loss-leader is a deliberate, working acquisition hook with profitable attach/LTV.
- "Negative" margin is an artefact of mis-allocated overhead, not true variable cost.

**Quick Wins:**
- Run a fully-loaded contribution calc on the top 20 SKUs by volume this week.
- Raise price or shipping on the clearest negative-contribution items immediately.
- Fix the free-shipping threshold to cover true cost.

**Strategic Fixes:**
- SKU-level contribution accounting as the basis for pricing and merchandising.
- Re-engineer or discontinue structurally unprofitable SKUs.
- Redesign loss-leaders into profitable bundles.

**Operational Fixes:**
- Contribution margin (not gross) on every product P&L.
- New-product pricing gate that requires fully-loaded margin sign-off.

**AI Detection Opportunities:** An agent loads shipping, fees, returns, and ad cost per SKU
and surfaces negative-contribution bestsellers ranked by total margin destroyed.

**Diagnostic Usage:** True-Margin module. Triggered when fully-loaded contribution goes
negative on material-volume SKUs.

**Report Usage:** "Your bestsellers are your biggest losses." Shown with the gross-vs-true
margin waterfall per top SKU — frequently the most alarming slide in an audit.

**Service Delivery Usage:** Margin-recovery sprint: SKU contribution model, pricing/shipping
fixes, range rationalisation.

**Future SaaS Usage:** Per-SKU true-contribution engine that flags loss-making products
continuously as costs change.

---

## Pattern: Returns Are A Silent Tax Nobody Owns

**Category:** Profit Leak

**Description:** Returns are treated as an unavoidable cost of doing business and never
attributed to their cause, so the same fixable problems (sizing, expectation gaps,
quality, wrong-item) keep generating returns that quietly tax every margin. Nobody owns the
number, so nobody fixes the cause.

**Business Symptoms:**
- "Returns are just part of the game in our category."
- Reverse-logistics and refund costs growing with volume.
- Customer-service time dominated by returns.
- No idea *why* things come back.

**Evidence Signals:**
- Return rate concentrated in specific SKUs/categories/sizes.
- Return reasons cluster (e.g. "too small," "not as described") but go uncoded/unactioned.
- Cost of returns (logistics + refund + restocking + write-off) a material % of revenue.
- Repeat returners forming a costly segment.

**Common Root Causes:**
- Expectation gaps from inaccurate photos/descriptions/sizing.
- Quality or packaging issues.
- No return-reason capture or analysis loop.
- Lenient policy abused by a small high-cost segment.

**Revenue Impact:** Indirect — but high returns suppress reorder rate and review quality,
dragging future revenue.

**Profit Impact:** High and chronic — each return can cost more than the original margin
once logistics and write-offs are included.

**Risk Level:** Medium-High — slow bleed that scales with growth and degrades reputation.

**Confidence Factors:**
- Coded return-reason data showing fixable clusters.
- SKU/size concentration of returns.
- Quantified per-return cost.

**Counter Evidence:**
- Returns are inherent to a try-before-keep model already priced into the economics.
- Return rate is at/below category benchmark and driven by genuine variety-seeking.

**Quick Wins:**
- Add/clean return-reason capture this week so the cause becomes visible.
- Fix the listings/sizing on the top 3 return-driving SKUs.
- Tighten policy on identified serial returners.

**Strategic Fixes:**
- Close expectation gaps systematically (better imagery, sizing guidance, fit tools).
- Quality/packaging fixes on return-prone SKUs.
- Returns reason-loop feeding merchandising and product decisions.

**Operational Fixes:**
- Return rate and return cost owned by a named function with a target.
- Monthly return-reason review wired into listing and product roadmaps.

**AI Detection Opportunities:** An agent clusters return reasons, links them to SKU/listing
attributes, and recommends the highest-ROI fixes.

**Diagnostic Usage:** Post-Purchase Cost module. Triggered when return cost % and reason
concentration exceed thresholds.

**Report Usage:** "Returns are taxing every sale and nobody owns the bill." Shown with the
return-cost waterfall and top return-cause breakdown.

**Service Delivery Usage:** Returns-reduction sprint: reason instrumentation, listing/sizing
fixes, policy tightening, quality loop.

**Future SaaS Usage:** Return-cause analytics with SKU-level "expected return cost" and fix
recommendations.
