# Marketplace Patterns

> Realities specific to how marketplace ranking, economics, and buyer behaviour work
> (Amazon, Noon, marketplace-style delivery apps, etc.). Not "do well on the marketplace" —
> these are the specific recurring mechanics that decide who wins shelf and who doesn't.

Each pattern uses the canonical template.

---

## Pattern: Review Density Gap

**Category:** Marketplace

**Description:** The listing has enough *lifetime* reviews to look established, but its
*recent* review velocity has stalled — so it loses the "freshness" signal that both buyers
and the ranking algorithm reward. Competitors with fewer total reviews but more recent ones
win the click. The listing looks credible to a human auditor and weak to the algorithm.

**Business Symptoms:**
- "We have good reviews but we're slipping in the rankings."
- Ranking decays even though the product and reviews are solid.
- Newer competitors leapfrog despite fewer total reviews.
- Sales soft despite strong historical ratings.

**Evidence Signals:**
- Healthy lifetime review count but low reviews-per-week recently.
- Competitors with lower totals but higher recent velocity ranking above.
- Ranking decline correlating with the review-velocity stall.
- Review recency distribution skewed to the past, not the present.

**Common Root Causes:**
- No systematic review-generation engine; early reviews were organic and tapered off.
- Review requests stopped or never existed post-purchase.
- Sales velocity dropped, dropping review velocity, dropping rank — a doom loop.
- Treating reviews as a one-time milestone, not a continuous flow.

**Revenue Impact:** High — recency drives rank, rank drives impressions, impressions drive
sales; the stall compounds downward.

**Profit Impact:** Indirect but real — declining organic rank pushes the seller toward paid
placement to compensate, raising acquisition cost.

**Risk Level:** High on competitive marketplaces where recency is heavily weighted.

**Confidence Factors:**
- Clear lifetime-vs-recent review divergence.
- Competitor recency advantage at lower totals.
- Rank decline timed to the velocity stall.

**Counter Evidence:**
- Ranking is stable despite low recency (the algorithm isn't weighting it here).
- Category has low review density overall (recency matters less).

**Quick Wins:**
- Turn on a post-purchase review-request flow this week.
- Prioritise review velocity on the hero listings losing rank.
- Recover recent buyers with a (compliant) review ask.

**Strategic Fixes:**
- Build a continuous review-generation engine tied to fulfilment.
- Protect sales velocity on hero listings (it feeds review velocity).
- Treat review recency as an ongoing KPI, not a launch task.

**Operational Fixes:**
- Reviews-per-week target per hero listing.
- Recency dashboard alerting when velocity stalls.

**AI Detection Opportunities:** An agent tracks review recency vs. competitors and rank, and
alerts when a velocity stall threatens ranking before sales visibly drop.

**Diagnostic Usage:** Marketplace Ranking module. Triggered by lifetime-vs-recent review
divergence + rank decline.

**Report Usage:** "Your reviews look good to a person and weak to the algorithm." Shown with
the recency-vs-rank overlay against competitors.

**Service Delivery Usage:** Review-engine build: post-purchase flow, velocity targets, hero
protection.

**Future SaaS Usage:** Review-recency monitor with rank-risk alerts — a classic recurring
marketplace feature.

---

## Pattern: Winning Impressions But Losing The Click (Thumbnail Economics)

**Category:** Marketplace

**Description:** The listing ranks and earns impressions, but its main image, title, and
price *block* (the "thumbnail economics" the buyer scans in under a second) lose the click to
competitors. The seller is paying — in ranking equity or ad spend — for visibility it can't
convert into traffic. The leak is in the half-second comparison on the results page.

**Business Symptoms:**
- "We show up in search but people click the others."
- Decent impressions, weak click-through, low sessions.
- Competitors with similar products get the clicks.
- Ad spend buys impressions that don't turn into visits.

**Evidence Signals:**
- High impressions, low click-through-rate vs. category benchmark.
- Main image/title/price block visibly weaker than competitors in the same results row.
- Badges (best-seller, fast-delivery, rating) present on competitors, absent on seller.
- CTR gap concentrated on the primary search terms.

**Common Root Causes:**
- Main image not optimised for the thumbnail context (too busy, low contrast, no hero benefit).
- Title front-loaded with brand instead of the search-relevant benefit.
- Price/badge disadvantage in the scan block (no rating shown, no delivery badge).
- Designed for the product page, not the results-page glance.

**Revenue Impact:** High — impressions are the hard-won part; failing the click wastes all of it.

**Profit Impact:** High when impressions are paid — directly wasted spend.

**Risk Level:** Medium-High — fixable fast, which makes the ongoing leak especially wasteful.

**Confidence Factors:**
- CTR gap vs. benchmark on primary terms.
- Side-by-side scan-block disadvantage.
- CTR improving in any prior image/title test.

**Counter Evidence:**
- CTR is at/above benchmark (the leak is on the product page, not the thumbnail).
- Impressions are low-intent (an upstream relevance issue).

**Quick Wins:**
- Rework the main image for thumbnail clarity (hero benefit, contrast, clean) this week.
- Front-load the title with the search-relevant benefit, not the brand.
- Earn the visible badges (ratings, fast delivery) competitors are showing.

**Strategic Fixes:**
- Systematic main-image and title testing against the results-page context.
- Badge/eligibility strategy (delivery speed, ratings) to win the scan block.
- Pricing presentation tuned to the comparison row.

**Operational Fixes:**
- CTR-by-keyword monitoring with a test cadence on hero listings.
- Thumbnail QA standard before publishing any listing.

**AI Detection Opportunities:** An agent benchmarks CTR by keyword, renders the results-page
scan context, and recommends image/title/badge fixes ranked by recoverable clicks.

**Diagnostic Usage:** Listing Conversion module. Triggered by high-impression, low-CTR
listings vs. benchmark.

**Report Usage:** "You're winning the shelf and losing the glance." Shown with a side-by-side
results-row comparison and CTR gap.

**Service Delivery Usage:** Listing-CTR sprint: main-image redesign, title rewrite, badge
acquisition.

**Future SaaS Usage:** CTR-gap detector with automated thumbnail/title recommendations.

---

## Pattern: Ranking Built On A Foundation That Can Be Pulled (Velocity Dependence)

**Category:** Marketplace

**Description:** The listing's rank is propped up by something fragile and withdrawable — a
heavy ad push, an aggressive promo, or a single viral spike — rather than durable relevance
and conversion. The moment the prop is removed, rank collapses, because the underlying
organic conversion never justified the position. The business mistakes rented rank for earned
rank.

**Business Symptoms:**
- "Whenever we cut ad spend / end the promo, we fall off a cliff."
- Rank and sales evaporate the second support stops.
- Profitable position is impossible — holding rank costs more than it earns.
- Constant anxiety about "feeding" the listing.

**Evidence Signals:**
- Rank tightly correlated with ad spend / promo activity.
- Organic (unsupported) conversion rate weak.
- Sharp rank/sales decay during any support pause.
- Position economics negative once support cost is included.

**Common Root Causes:**
- Using ads/promos to buy rank without fixing organic conversion.
- Treating a launch spike as durable equity.
- No underlying relevance/conversion strength to hold position.
- Misreading supported rank as proof of product-market fit.

**Revenue Impact:** Illusory — revenue is real while supported but structurally unsustainable.

**Profit Impact:** Negative — paying to hold a position the listing can't earn organically.

**Risk Level:** High — creates a dependence that's expensive to maintain and brutal to exit.

**Confidence Factors:**
- Rank-to-support correlation.
- Weak organic conversion under the support.
- Decay on every pause.

**Counter Evidence:**
- Support is a deliberate, funded launch ramp with improving organic conversion underneath.
- Organic conversion is actually strong and support is incremental, not load-bearing.

**Quick Wins:**
- Fix the listing's organic conversion levers (image, content, reviews) before scaling support.
- Run a controlled support taper to measure true organic floor.
- Stop scaling spend on listings with weak organic conversion.

**Strategic Fixes:**
- Build durable relevance and conversion so rank is earned, not rented.
- Sequence: fix conversion → then use support to accelerate, not substitute.
- Establish review/velocity equity that holds rank without spend.

**Operational Fixes:**
- Track organic vs. supported conversion separately.
- Gate ad scaling behind an organic-conversion threshold.

**AI Detection Opportunities:** An agent decomposes rank into supported vs. organic
contribution and flags listings whose position would collapse without support.

**Diagnostic Usage:** Ranking Durability module. Triggered by rank-to-support correlation +
weak organic conversion.

**Report Usage:** "Your ranking is rented, not earned — and the rent is rising." Shown with
the rank-vs-support overlay and projected decay-on-pause.

**Service Delivery Usage:** Organic-conversion sprint before/alongside any paid scaling.

**Future SaaS Usage:** Rank-durability score separating earned from rented position.
