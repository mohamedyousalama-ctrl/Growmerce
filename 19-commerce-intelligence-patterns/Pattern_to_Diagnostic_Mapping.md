# Pattern → Diagnostic Mapping

> Connects the Pattern Engine (19) to the **Commerce Diagnostic (06)**. The core idea: the
> diagnostic stops being a generic questionnaire and becomes a **pattern-detection
> instrument**. Every diagnostic module exists to confirm or rule out specific patterns.

---

## 1. The inversion

**Before patterns:** the diagnostic asked questions, produced metrics, and a human
interpreted them.

**With patterns:** every diagnostic question/module is *designed backwards from a pattern* —
it exists to gather that pattern's Evidence Signals and check its Counter Evidence. The
diagnostic's job is to move each candidate pattern from Hypothesis → Observed with enough
evidence to score and rank it.

```
Pattern's Evidence Signals  →  Diagnostic module collects them
Pattern's Counter Evidence  →  Diagnostic module checks them
Diagnostic output           →  Confidence + Priority score per pattern
```

---

## 2. Module → pattern map

Each diagnostic module maps to the patterns it is built to detect. (Module names align with
the patterns' "Diagnostic Usage" fields.)

| Diagnostic Module | Primary Patterns Detected |
|---|---|
| **Visibility** | Demand Exists But Discovery Fails |
| **Inventory & Availability** | Out-of-Stock On The Hero, In-Stock On The Tail |
| **Channel Mix & Durability** | Revenue Is Renting Attention, Not Owning It · One Channel Carries The Business |
| **Margin & Promotion** | Discounting Is Buying Sales The Business Would Have Made Anyway |
| **True-Margin** | Winning Revenue On Products That Lose Money After True Costs |
| **Post-Purchase Cost** | Returns Are A Silent Tax Nobody Owns |
| **Competitive Durability / Position** | Acquisition Is Paid While Competitors Compound Organic · Competing On Price Against A Structural Cost Advantage · The Category Leader Owns The Comparison Frame |
| **Journey Friction** | The Journey Assumes A Confidence The Customer Hasn't Built Yet |
| **Retention Onset** | First Purchase Is Treated As A Win Instead Of A Trial |
| **Channel-to-Conversion** | The Journey Is Built For The Channel It Started On, Not The One It Finishes On |
| **Marketplace Ranking / Listing Conversion / Ranking Durability** | Review Density Gap · Winning Impressions But Losing The Click · Ranking Built On A Foundation That Can Be Pulled |
| **Attribution & Mix / Channel-Fit** | Last-Click Attribution Is Defunding Demand Creation · The Channel Mix Fits The Founder, Not The Customer |
| **Occasion Readiness / Experience / Occasion-to-Retention** | Preparing For The Peak During The Peak · Treating A Gifting Occasion Like A Self-Purchase Occasion · Post-Peak Cliff |
| **Value-Communication / Price-Architecture / Segmentation & Tiering** | Price Advantage Exists But Value Communication Fails · Anchorless Pricing · One Price For Different Willingness To Pay |
| **Offer-Framing / Offer-Momentum / Bundle-Logic** | Selling A Product When The Customer Is Buying An Outcome · The Offer Has No Reason To Buy Now · Bundling By Convenience Instead Of Logic Of Use |
| **Churn-Timing / Loyalty-Quality / Value-Segmentation** | Churn Happens At A Predictable Moment · Loyalty Is Assumed From Habit Or Lock-In · The Best Customers Are Treated Like The Worst |
| **Intent-Alignment / Checkout-Friction / Objection-Coverage** | Traffic Arrives Through Discount Intent But Encounters Premium Positioning · The Decision Is Easy But The Checkout Is Hard · The Page Answers The Seller's Questions, Not The Buyer's |

---

## 3. How a diagnostic module is built from a pattern

For each pattern the module:
1. **Collects** the pattern's Evidence Signals (mapped to data sources in
   `Pattern_to_Tool_Mapping.md`; for signals without an integration, asks a diagnostic
   question instead).
2. **Checks** the Counter Evidence explicitly (this is what earns Confidence points).
3. **Tiers** each captured signal per the `Pattern_Evidence_Framework.md`.
4. **Scores** confidence and priority per the two model files.
5. **Outputs** a ranked pattern with its evidence trail attached.

---

## 4. Diagnostic depth tiers

The diagnostic runs at different depths; patterns surface accordingly:

| Diagnostic Tier | Evidence available | Patterns surfaced |
|---|---|---|
| **Quick scan** (self-serve / lead magnet) | Tier 1 + light Tier 2 | High-recognition patterns at Possible/Probable confidence |
| **Standard audit** | Tier 2 + some Tier 3 | Most patterns at Probable confidence |
| **Deep diagnostic** (full data access) | Full Tier 3 | All patterns at Confirmed confidence with evidence trails |

This lets the *same pattern library* power a free website self-diagnosis and a paid deep
audit — the difference is evidence depth, not pattern content.

---

## 5. Closing the loop

After delivery, confirmed patterns and the effectiveness of their fixes flow back into the
`Intelligence_Compounding_Model.md`, improving the diagnostic's detection accuracy (the Track
Record factor in the Confidence Model) for the next business. The diagnostic gets sharper with
every engagement because it is detecting *transferable patterns*, not context-bound issues.
