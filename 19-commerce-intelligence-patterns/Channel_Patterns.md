# Channel Patterns

> Cross-channel acquisition, attribution, and mix realities. Not "use more channels" —
> these are the recurring ways channel strategy quietly creates or destroys commercial value.

Each pattern uses the canonical template.

---

## Pattern: One Channel Carries The Business And Nobody Has Priced The Risk

**Category:** Channel

**Description:** A single channel (one ad platform, one marketplace, one creator, one
algorithm) drives the overwhelming majority of revenue, and the business is structurally
fragile to any change in it — a policy update, a rate hike, an account suspension, an
algorithm shift. The concentration looks like focus; it's actually undiversified single-point
risk that no one has put a number on.

**Business Symptoms:**
- "Basically all our sales come from [one channel]."
- Panic whenever that channel hiccups.
- No credible plan B if the channel changed terms tomorrow.
- Growth and survival both hostage to one platform.

**Evidence Signals:**
- >60–70% of revenue from a single channel.
- No material secondary channel with independent demand.
- History of volatility tied to that channel's changes.
- Owned-audience share low (compounds the risk — see Revenue Leak).

**Common Root Causes:**
- Doubling down on what's working without diversifying.
- Channel success masking the absence of a portfolio.
- No deliberate channel-development roadmap.
- Underestimating platform/policy risk because it hasn't bitten yet.

**Revenue Impact:** Stable until it isn't — the risk is a sudden, large, correlated revenue
loss, not a gradual one.

**Profit Impact:** Concentration also gives the channel pricing power over the seller (rising
fees/CPMs) with no alternative to switch to.

**Risk Level:** High to critical — the canonical "one bad week from disaster" exposure.

**Confidence Factors:**
- Quantified channel concentration.
- Documented past volatility.
- Absence of independent secondary demand.

**Counter Evidence:**
- The channel is genuinely durable and the concentration is an early-stage focus choice with
  diversification already roadmapped.
- A second channel exists but is under-attributed.

**Quick Wins:**
- Quantify the exposure (what % of revenue, what's the downside) — make the risk visible.
- Stand up the cheapest second demand source (owned email/SMS, one adjacent channel).
- Begin building owned audience to reduce platform dependence.

**Strategic Fixes:**
- Channel-diversification roadmap with a target concentration ceiling.
- Develop ≥1 independent demand channel to a material share.
- Build owned assets that survive any single platform.

**Operational Fixes:**
- Channel-concentration KPI with a risk threshold.
- Scenario planning ("if the main channel halved") in regular review.

**AI Detection Opportunities:** An agent computes channel-concentration and models the revenue
impact of a shock to the dominant channel, flagging when exposure crosses a threshold.

**Diagnostic Usage:** Channel Durability module. Triggered by single-channel concentration
above threshold.

**Report Usage:** "Your whole business depends on one channel staying friendly." Shown with
the concentration chart and a shock scenario.

**Service Delivery Usage:** Diversification track: second-channel build + owned-audience build.

**Future SaaS Usage:** Channel-risk score with shock modelling.

---

## Pattern: Last-Click Attribution Is Defunding The Channels That Create Demand

**Category:** Channel

**Description:** Budget is allocated by last-click metrics, so credit flows to the
bottom-funnel channels that *harvest* demand (branded search, retargeting) while the
top-funnel channels that *create* it (awareness content, social, creators) look unprofitable
and get cut. The business slowly starves its own demand-generation and then wonders why
harvesting gets more expensive.

**Business Symptoms:**
- "Our retargeting/branded search is our best performer, so we put money there."
- Awareness channels keep getting cut for 'poor ROAS.'
- Over time, the cheap harvesting channels get more expensive.
- Growth stalls despite 'efficient' spend.

**Evidence Signals:**
- Budget concentrated in last-click winners (branded/retargeting).
- Demand-gen channels judged solely on last-click ROAS.
- Branded-search/retargeting volume flat or declining (the demand pool is shrinking).
- Rising cost in harvesting channels as the top funnel is starved.

**Common Root Causes:**
- Last-click as the sole allocation lens.
- No measurement of demand creation (assisted, new-customer, branded-search lift).
- Performance incentives rewarding harvest over creation.
- Confusing channels that *capture* intent with channels that *cause* it.

**Revenue Impact:** Caps growth — you can only harvest as much demand as you create; starving
creation caps the harvest.

**Profit Impact:** Looks efficient short-term, gets more expensive long-term as harvesting
competition rises within a shrinking demand pool.

**Risk Level:** Medium-High — slow, compounding, easy to miss because the dashboard looks great.

**Confidence Factors:**
- Branded-search/retargeting volume stagnating.
- Demand-gen cuts preceding harvesting-cost rises.
- New-customer rate declining despite stable ROAS.

**Counter Evidence:**
- The business genuinely has enough ambient demand (strong brand) that creation isn't the constraint.
- Demand-gen channels are truly unprofitable even on assisted/new-customer measurement.

**Quick Wins:**
- Add a demand-creation metric (new-customer rate, branded-search trend) to the dashboard.
- Protect a baseline demand-gen budget from last-click cuts.
- Judge top-funnel on new-customer contribution, not last-click ROAS.

**Strategic Fixes:**
- Adopt a measurement model that credits demand creation (incrementality, MMM-lite, assisted).
- Set a demand-gen vs. harvest budget split deliberately.
- Build awareness assets that refill the demand pool.

**Operational Fixes:**
- Separate "create" and "capture" KPIs in reporting.
- Allocation reviews that protect demand creation.

**AI Detection Opportunities:** An agent correlates demand-gen spend with downstream
branded-search/new-customer trends and flags when harvesting is being funded at the expense
of creation.

**Diagnostic Usage:** Attribution & Mix module. Triggered by last-click budget concentration +
declining demand-creation signals.

**Report Usage:** "You're cutting the channels that make customers want you." Shown with the
demand-pool-vs-harvest-cost trend.

**Service Delivery Usage:** Measurement + mix sprint: introduce demand-creation metrics,
rebalance budget.

**Future SaaS Usage:** Create-vs-capture attribution view with budget-rebalancing recommendations.

---

## Pattern: The Channel Mix Fits The Founder, Not The Customer

**Category:** Channel

**Description:** The channels in use reflect where the founder/team is comfortable or
skilled, not where the target customer actually discovers and buys. The business pours effort
into channels its customers under-use and ignores the channels where its customers actually
are. Effort and audience are misaligned.

**Business Symptoms:**
- "We work really hard on [channel] but it's just not landing."
- Strong effort, weak return, on a channel the team personally likes.
- Customers mention discovering competitors somewhere the business isn't.
- A nagging sense of pushing uphill.

**Evidence Signals:**
- Heavy effort/spend on a channel with low customer presence/response.
- Customer research/surveys citing channels the business under-invests in.
- Competitors winning on channels the business ignores.
- Engagement-to-effort ratio poor on the favoured channel.

**Common Root Causes:**
- Channel choice driven by team familiarity, not customer behaviour.
- No customer-channel research.
- Sunk-cost commitment to a channel that was chosen by default.
- Mistaking effort for fit.

**Revenue Impact:** High opportunity cost — effort spent where customers aren't is effort not
spent where they are.

**Profit Impact:** Inefficient — low return on the favoured channel, missed efficient demand
on the right one.

**Risk Level:** Medium — chronic underperformance rather than acute risk.

**Confidence Factors:**
- Customer-channel evidence contradicting the current mix.
- Poor effort-to-result ratio on the favoured channel.
- Competitor success on the ignored channel.

**Counter Evidence:**
- The favoured channel genuinely is where customers are; the problem is execution, not fit.
- The "ignored" channel doesn't actually reach the target customer.

**Quick Wins:**
- Ask recent customers where they actually discover products like yours.
- Run a small test on the evidence-backed customer channel.
- Reallocate a slice of effort from the favoured channel to the customer's channel.

**Strategic Fixes:**
- Rebuild the channel mix around customer discovery behaviour.
- Develop capability on the right channel (hire/partner if it's a skills gap).
- Exit or right-size channels that don't reach the customer.

**Operational Fixes:**
- Customer-channel research as a standing input to planning.
- Channel decisions justified by customer evidence, not preference.

**AI Detection Opportunities:** An agent compares the seller's channel investment against
customer-discovery signals and competitor channel presence to flag misalignment.

**Diagnostic Usage:** Channel-Fit module. Triggered by effort-vs-customer-presence mismatch.

**Report Usage:** "You're working hard where your customers aren't." Shown with an
effort-vs-customer-presence map.

**Service Delivery Usage:** Channel-realignment sprint: research, test, reallocate, build capability.

**Future SaaS Usage:** Channel-fit analyser matching investment to customer-discovery data.
