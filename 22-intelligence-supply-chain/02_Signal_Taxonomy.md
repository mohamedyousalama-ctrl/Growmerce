# 02 — Signal Taxonomy

> One of the most important documents in the workstream. A signal is the **atomic raw material** of
> the intelligence supply chain — a single observable fact about a business or its market. If we
> can't name and characterise a signal, we can't collect, verify, or trust it. This document
> defines every signal category Growmerce consumes and how to handle each.

For each category: **Description · Source · Reliability · Frequency · Business value · Typical
mistakes.** Reliability and the source-tier mapping connect to `03_Intelligence_Source_Hierarchy.md`;
business value connects to the patterns (19) each signal feeds.

> **Reliability** below is the *typical* trust level of the signal as usually sourced — it is
> capped by the actual source tier at collection time (a "marketplace signal" read from the
> platform is high; the same fact from a screenshot is low).

---

## A. Demand & discovery

### Marketplace signals
- **Description:** rank, impressions, click-through, buy-box/featured status, review count & recency
  on marketplaces (Amazon, Noon, delivery apps).
- **Source:** marketplace pages/APIs (best), seller dashboards, screenshots (weak).
- **Reliability:** High when from the platform; medium-low from screenshots.
- **Frequency:** rank/impressions can move daily; reviews accrue continuously.
- **Business value:** very high — drives the entire Marketplace pattern family (Review Density Gap,
  Thumbnail Economics, Ranking Durability).
- **Typical mistakes:** reading a snapshot as a trend; mis-attributing a competitor's listing;
  trusting a stale screenshot; ignoring recency vs. lifetime totals.

### Traffic signals
- **Description:** sessions, sources/channels, impressions, share-of-search, device split.
- **Source:** web/app analytics (best), ad platforms, search/demand data, user claims (weak).
- **Reliability:** high from analytics; medium from inference; low from memory/claims.
- **Frequency:** continuous; meaningful at weekly/monthly trend level.
- **Business value:** high — discovery leaks, channel concentration, create-vs-capture.
- **Typical mistakes:** last-click tunnel vision; confusing traffic volume with traffic *quality*;
  ignoring source-level differences.

### Occasion signals
- **Description:** seasonality, demand curves, gifting/occasion windows, calendar events.
- **Source:** historical sales, category demand data, the occasion calendar.
- **Reliability:** medium-high when from the business's own history; medium from category norms.
- **Frequency:** cyclical/seasonal; lead-time-sensitive.
- **Business value:** high in windows — occasion readiness, post-peak retention.
- **Typical mistakes:** treating recurring events as surprises; using category seasonality where the
  business's own curve differs.

### Geographic signals
- **Description:** location/branch-level demand, delivery zones, market/region differences.
- **Source:** order data by location, branch data, platform geo data.
- **Reliability:** high from order data; medium from platform aggregates.
- **Frequency:** steady, with local seasonality.
- **Business value:** medium-high — branch/zone performance, localisation, expansion.
- **Typical mistakes:** aggregating away real local variation; comparing zones with different
  fundamentals.

---

## B. Conversion & customer

### Conversion signals
- **Description:** funnel-step conversion, checkout drop-off, add-to-cart, device gaps.
- **Source:** web/app analytics (best); diagnostic answers (weak).
- **Reliability:** high from analytics; low from self-report.
- **Frequency:** continuous.
- **Business value:** very high — the entire Conversion pattern family (trust gap, hard checkout,
  intent mismatch, objection coverage).
- **Typical mistakes:** judging conversion without context (category/AOV/consideration); blaming
  traffic for a conversion problem; one-number averages hiding step-level leaks.

### Customer signals
- **Description:** new vs. returning, cohorts, second-purchase rate, repeat behaviour, AOV, value
  segments.
- **Source:** orders/commerce platform (best); CRM.
- **Reliability:** high (transaction-grounded).
- **Frequency:** continuous; cohort views monthly.
- **Business value:** very high — retention onset, value segmentation, LTV.
- **Typical mistakes:** ignoring the second purchase; treating one-time categories like repeat ones;
  averaging across very different cohorts.

### Retention signals
- **Description:** churn timing, repeat cadence, reactivation, advocacy (referrals/NPS/reviews).
- **Source:** orders, CRM, lifecycle data, VoC.
- **Reliability:** high from transactions; medium for advocacy.
- **Frequency:** continuous; churn clusters at specific lifecycle points.
- **Business value:** very high — churn timing, loyalty quality, best-customer treatment.
- **Typical mistakes:** mistaking habit/lock-in for loyalty; detecting churn after it's irreversible;
  no reorder-window baseline.

### Behavioral signals
- **Description:** on-site/in-app behaviour — search, navigation, dwell, save-for-later, deferral.
- **Source:** analytics, session data.
- **Reliability:** medium-high (observed, but interpretation-dependent).
- **Frequency:** continuous.
- **Business value:** medium-high — offer momentum, journey friction, intent reading.
- **Typical mistakes:** over-interpreting behaviour without outcome data; correlation as intent.

### Review signals
- **Description:** review volume, recency, ratings, **and text content** (themes, complaints, return
  reasons, praised outcomes).
- **Source:** marketplace/store reviews, support chats, surveys.
- **Reliability:** medium (self-selected sample) but rich; text needs careful extraction.
- **Frequency:** continuous.
- **Business value:** very high — review density, returns causes, objection coverage,
  outcome-vs-feature offer framing.
- **Typical mistakes:** AI extraction errors on text; treating a vocal minority as representative;
  ignoring recency.

---

## C. Commercial & competitive

### Pricing signals
- **Description:** own prices, competitor prices, discount depth/penetration, price changes over
  time, tiers.
- **Source:** own systems, marketplace/competitor pages, promotion data.
- **Reliability:** high for own prices; medium for competitor prices (observation-dependent, can be
  stale/regional).
- **Frequency:** can change frequently; promotions are bursty.
- **Business value:** very high — pricing patterns, discount margin bleed, competitive position.
- **Typical mistakes:** comparing list vs. effective prices; stale competitor prices; ignoring
  fully-loaded cost when judging price.

### Offer signals
- **Description:** offer structure — bundles, tiers, guarantees, shipping terms, urgency, attach.
- **Source:** the business's own pages/listings, competitor pages, diagnostic input.
- **Reliability:** medium-high (observable structure).
- **Frequency:** changes with merchandising cycles.
- **Business value:** high — offer framing, bundle logic, reason-to-buy-now.
- **Typical mistakes:** judging the offer without the buyer's outcome; missing co-purchase logic.

### Competitor signals
- **Description:** competitor rank, pricing, reviews, content cadence, assortment, organic
  footprint, comparison-frame dominance — and their **trajectory**.
- **Source:** competitor pages, marketplace data, public/market data, manual observation (weak).
- **Reliability:** medium (external, observation-dependent); trajectory needs time series.
- **Frequency:** periodic; trajectory matters more than snapshot.
- **Business value:** high — the Competitor pattern family and Risk & Threat detection (20).
- **Typical mistakes:** snapshot instead of trajectory; assuming "organic" isn't funded; mis-
  identifying the real competitor set.

### Menu signals (delivery/F&B)
- **Description:** menu structure, item placement, photography, availability, descriptions, hero-item
  visibility on delivery apps.
- **Source:** delivery-app pages, the menu itself (upload/screenshot), POS.
- **Reliability:** medium-high from platform; medium from uploads.
- **Frequency:** changes with menu updates; availability is live.
- **Business value:** high — delivery merchandising leaks ("the menu hides what should sell").
- **Typical mistakes:** ignoring availability's revenue impact; treating the menu as static.

### Product signals
- **Description:** SKU/catalogue attributes, depth, ranges, sizing, content quality, hero vs. tail.
- **Source:** catalogue/PIM, store/listing pages.
- **Reliability:** high from the catalogue.
- **Frequency:** changes with range updates.
- **Business value:** high — assortment, hero/tail stock, listing conversion.
- **Typical mistakes:** counting SKUs without velocity; missing thin-catalogue-depth issues.

---

## D. Economics & operations

### Operational signals
- **Description:** stock levels, velocity, days-of-cover, fulfilment speed (promise vs. actual),
  returns processing, response flow (WhatsApp/inbox), lead times.
- **Source:** inventory/ops systems, fulfilment data, support logs, POS.
- **Reliability:** high when from systems.
- **Frequency:** continuous/operational (daily-weekly).
- **Business value:** very high — most sales problems are operational (hero stockouts, returns tax,
  WhatsApp response flow).
- **Typical mistakes:** ignoring availability's direct revenue cost; not separating hero from tail;
  unowned returns.

### Execution signals
- **Description:** what was actually *done* during a Growmerce engagement and what moved — the
  outcome of recommendations (success-measure movement, before/after).
- **Source:** delivery records, post-change analytics, the business's own results.
- **Reliability:** high (measured outcomes) but needs honest attribution vs. confounders.
- **Frequency:** per engagement / per fix.
- **Business value:** very high — closes the loop; the only signal that proves a recommendation
  *worked*, and the fuel for improving the whole chain (20's learning loop).
- **Typical mistakes:** over-attributing results to the fix; ignoring confounders (seasonality,
  market shifts); not capturing outcomes at all (loop stalls).

---

## How the taxonomy is used in the supply chain

- **Collection (stage 2):** we collect *against* this taxonomy — we know what each signal type is
  and what a good capture looks like.
- **Classification (stage 5):** every signal is tagged with its category here + its source tier
  (03) + reliability.
- **Pattern detection (stage 7):** each pattern (19) declares which signal categories it needs;
  missing categories = a coverage gap (a known limitation, surfaced honestly).
- **Coverage tracking:** the taxonomy lets us measure *what we don't have yet* — the categories with
  thin or no coverage for a given business — which directly bounds output accuracy (07).

> A signal we can name, source, and rate is an asset. A signal we can't is noise. The taxonomy is
> the difference, and it is the first discipline of a real intelligence supply chain.
