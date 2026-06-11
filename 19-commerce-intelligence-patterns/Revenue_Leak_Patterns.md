# Revenue Leak Patterns

> Where revenue silently escapes a business that *looks* healthy. These are not "low sales."
> Low sales is a category. These are the specific, recurring mechanisms by which demand that
> already exists fails to become revenue.

Each pattern uses the canonical template (see `Commerce_Intelligence_Patterns_Strategy.md`).

---

## Pattern: Demand Exists But Discovery Fails

**Category:** Revenue Leak

**Description:** The market actively wants the product — search volume, category demand,
and competitor sales all confirm it — but the business is structurally invisible at the
moment of intent. Customers buy the category; they just never see *this* seller. Revenue
isn't being lost at the checkout; it's being lost before the customer ever arrives.

**Business Symptoms:**
- "Our product is great but nobody seems to find us."
- Strong word-of-mouth and repeat customers, but flat new-customer growth.
- Sales spike only when the owner personally promotes; no ambient discovery.
- Competitors with worse products outsell them.

**Evidence Signals:**
- High category search volume vs. near-zero branded/organic impressions for the seller.
- Marketplace: product ranks beyond page 1 for its primary keywords; impression share <10%.
- Website: <15% of sessions from organic search; near-total dependence on direct/paid.
- Share of search far below share of shelf/assortment quality.

**Common Root Causes:**
- Listings/pages not built around the words customers actually search.
- No ranking equity (new listing, thin reviews, low velocity) so algorithms bury it.
- Over-reliance on one fragile channel (owner's personal reach, a single ad set).
- Strong product, zero distribution strategy.

**Revenue Impact:** Very high. The ceiling is set by *visibility*, not product quality —
so this caps total revenue regardless of how good everything downstream is.

**Profit Impact:** High and favourable to fix — discovery revenue is often organic, so
incremental sales arrive at high margin once visibility exists.

**Risk Level:** High. Every day invisible is demand handed to competitors who compound
ranking equity you'll later have to fight to win back.

**Confidence Factors:**
- Confirmed category demand (independent search/volume data).
- Clear gap between product quality (reviews, repeat rate) and discovery metrics.
- Multiple intent keywords where the seller is absent from page 1.

**Counter Evidence:**
- Category demand is actually thin (it's a niche, not a discovery problem).
- The seller *is* visible but conversion is failing → this is a Conversion pattern, not a
  discovery one.
- Margins can't support the visibility cost → it's an economics problem.

**Quick Wins:**
- Rewrite primary listing/page titles and first paragraph around the top 5 real search terms.
- Turn on/repair the cheapest discovery surface (marketplace sponsored for own keywords,
  Google Business profile, basic SEO title fixes).
- Ask existing happy customers for reviews to unlock ranking velocity.

**Strategic Fixes:**
- Build a deliberate discovery portfolio across ≥2 independent surfaces.
- Establish a content/keyword footprint matching real intent.
- Invest in ranking equity (review velocity, sales velocity) on the primary platform.

**Operational Fixes:**
- Standing keyword-coverage check in the diagnostic cadence.
- Listing/page QA checklist that includes "search term coverage" before publish.

**AI Detection Opportunities:** An agent compares category demand signals against the
seller's impression/ranking footprint and flags the gap automatically, ranking missing
high-intent keywords by recoverable revenue.

**Diagnostic Usage:** Top of the Visibility module. The diagnostic measures share-of-search
vs. product quality and triggers this pattern when the gap exceeds threshold.

**Report Usage:** Framed as "You are losing the customers who already want what you sell."
Shown with the demand-vs-visibility gap chart — the single most persuasive slide in an audit.

**Service Delivery Usage:** Kicks off a Visibility sprint: keyword rebuild, listing
optimisation, review-velocity push, discovery-channel activation.

**Future SaaS Usage:** Continuous "share of search" monitor that alerts when category demand
rises but the seller's visibility doesn't — the canonical automated revenue-leak detector.

---

## Pattern: Out-of-Stock On The Hero, In-Stock On The Tail

**Category:** Revenue Leak

**Description:** The business's best-selling, best-margin "hero" SKUs go out of stock while
capital and shelf sit in slow-moving tail products. Revenue leaks not because demand is
weak but because inventory is allocated against the wrong items. The store is "in stock"
on paper while being out of stock on exactly the things people want.

**Business Symptoms:**
- "We had a great month but kept running out of the popular sizes/colours."
- Customers ask for items that are "coming soon."
- Warehouse looks full, yet bestsellers are gone.
- Sales plateau right when momentum should compound.

**Evidence Signals:**
- Top-decile SKUs show frequent zero-stock days; bottom-decile SKUs show high days-of-cover.
- Lost-sales/oversell or "notify me" requests concentrated on a few SKUs.
- Sell-through rate diverges sharply between hero and tail.
- Marketplace: hero listing toggles to unavailable, losing ranking each time.

**Common Root Causes:**
- Reordering by gut or even-spread instead of by velocity.
- Supplier lead times not matched to hero demand.
- Cash tied up in tail inventory, starving hero reorders.
- No min-stock/reorder-point logic on the SKUs that matter most.

**Revenue Impact:** High and recurring — every stockout day on a hero is direct, repeatable
lost revenue, often during exactly the demand peaks that matter most.

**Profit Impact:** Double hit: lost high-margin hero sales *and* dead capital in low-margin
tail. Marketplace stockouts also cost ranking, raising future acquisition cost.

**Risk Level:** High — compounds on marketplaces where each stockout resets hard-won rank.

**Confidence Factors:**
- Velocity data clearly separating hero from tail.
- Documented stockout days on top SKUs.
- Tail SKUs with months of cover.

**Counter Evidence:**
- Stockouts are deliberate (drop model / scarcity strategy).
- The "tail" is strategic range needed for assortment credibility.
- Demand is genuinely unforecastable (true novelty launches).

**Quick Wins:**
- Set reorder points on the top 10 SKUs by margin-weighted velocity this week.
- Reallocate next purchase order toward heroes; pause tail reorders.
- Add "notify me" capture so demand during stockouts is recovered, not lost.

**Strategic Fixes:**
- Velocity-based replenishment policy; safety stock sized to lead time and demand variance.
- Supplier terms negotiated specifically for hero SKUs (shorter lead time / priority).

**Operational Fixes:**
- Weekly stock-health review keyed to margin-weighted velocity.
- Days-of-cover dashboard separating hero, core, and tail tiers.

**AI Detection Opportunities:** An agent watches stock + velocity, predicts hero stockouts
before they happen, and quantifies the tail capital that should be reallocated.

**Diagnostic Usage:** Inventory & Availability module. Triggered when hero stockout days and
tail over-cover both exceed thresholds.

**Report Usage:** "Your bestsellers are out of stock while your cash is locked in your worst
sellers." Shown as a velocity-vs-cover quadrant.

**Service Delivery Usage:** Replenishment-policy build + PO restructuring + reorder-point
setup as a defined delivery package.

**Future SaaS Usage:** Predictive stockout alerts and reorder recommendations for hero SKUs —
a high-retention recurring feature.

---

## Pattern: Revenue Is Renting Attention, Not Owning It

**Category:** Revenue Leak

**Description:** Nearly all revenue depends on continuously *bought* attention. The moment
ad spend pauses, sales collapse, because the business has built no owned audience (list,
followers, repeat base) that produces revenue on its own. It looks like a growth machine but
it's a treadmill — revenue is rented, and the rent never stops rising.

**Business Symptoms:**
- "If we turn off ads, sales basically stop."
- Rising ad costs eat any growth in revenue.
- Owner anxious every time a campaign underperforms.
- No email/SMS/community revenue to speak of.

**Evidence Signals:**
- >70% of revenue attributable to paid, first-time buyers.
- Email/SMS/organic-social revenue share in low single digits.
- Repeat-purchase rate low; list size small relative to order count.
- Revenue tracks ad spend almost 1:1 week over week.

**Common Root Causes:**
- No capture of buyer/visitor contact for owned re-marketing.
- No post-purchase or community engine.
- Performance team optimised for first purchase, never for owned-audience growth.
- "Acquisition" treated as the whole funnel.

**Revenue Impact:** The leak is *future* revenue — every customer acquired and not retained
into an owned channel is repurchased later at full cost. Caps lifetime value hard.

**Profit Impact:** Severe over time — paid-only revenue carries the highest acquisition cost
on every order forever; owned revenue is near-zero marginal cost.

**Risk Level:** High and existential — a platform/algorithm change or rising CPMs can erase
the business overnight.

**Confidence Factors:**
- Clear revenue-tracks-spend correlation.
- Tiny owned-channel contribution.
- Low repeat rate despite decent product satisfaction.

**Counter Evidence:**
- Genuinely one-time/low-frequency purchase category (then focus shifts to referral, not list).
- Owned channels exist and perform but are simply under-reported by attribution.

**Quick Wins:**
- Turn on email/SMS capture at checkout and on-site this week.
- Launch a basic post-purchase flow (thank-you → review → replenish/cross-sell).
- Start a simple welcome flow to convert browsers into owned contacts.

**Strategic Fixes:**
- Build an owned-audience growth target alongside the acquisition target.
- Develop retention/lifecycle programme so each cohort produces repeat revenue.
- Shift a slice of paid budget to audience-building creative.

**Operational Fixes:**
- Track "owned revenue %" as a standing KPI.
- Every acquisition campaign carries an audience-capture objective, not just sales.

**AI Detection Opportunities:** An agent computes revenue-to-spend elasticity and owned-channel
share, flagging dangerous paid dependence and forecasting the cliff if spend pauses.

**Diagnostic Usage:** Channel Mix & Durability module. Triggered by paid-revenue concentration
+ low owned share.

**Report Usage:** "You don't own your revenue — you're renting it, and the rent goes up."
Shown with the spend-vs-revenue overlay and the "what happens if ads pause" projection.

**Service Delivery Usage:** Owned-audience build: capture setup, lifecycle flows, retention
programme — a multi-sprint delivery track.

**Future SaaS Usage:** "Revenue durability score" that continuously rates how much of a
business's revenue survives a spend pause.
