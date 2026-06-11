# Profit Leakage Intelligence

> A complete worked subsystem: **how Growmerce determines that a business is leaking profit** —
> the most dangerous and most-missed class of problem, because the top line looks healthy while
> the margin quietly disappears. This is decision template DT-2 expanded, and the clearest
> demonstration of heuristic H1: *revenue is vanity, profit is sanity, cash is reality.*

---

## 1. Why profit leaks are the hardest to see

A revenue leak shows up as a number that's too low. A profit leak shows up as a number that
looks **fine** — revenue is flat or growing — while margin erodes underneath. The dashboard
says "winning." The bank account says "drowning." A generic tool watching the top line misses
it entirely. An operator's instinct is to never trust a revenue number without its cost.

```
"We had a great month"  →  operator asks: "...and what did it cost you to have it?"
```

The brain encodes this reflex: **no revenue conclusion is complete without its margin
consequence.**

---

## 2. The four places profit leaks (the operator's mental map)

| # | Leak point | The hole | Primary patterns (19) |
|---|---|---|---|
| 1 | **True unit economics** | SKUs/orders that lose money after fully-loaded costs | Products That Lose Money After True Costs |
| 2 | **Discount bleed** | Promotions giving away margin on demand you'd have won anyway | Discounting Is Buying Sales The Business Would Have Made Anyway |
| 3 | **Returns tax** | Returns silently taxing every sale, cause unowned | Returns Are A Silent Tax Nobody Owns |
| 4 | **Price capture** | Real value/advantage not converted into price | Price Advantage Exists But Value Communication Fails; Anchorless; Single-price-for-mixed-WTP |

These are not a strict chain like revenue leaks; they are four independent drains, often all
open at once. The brain checks each and sizes the bleed.

---

## 3. The reasoning chain (worked for leak 1: true unit economics)

1. **Trigger** — margin trend down while revenue flat/up; "busy but not profitable"; or a
   high-volume SKU that's cheap/heavy/returns-heavy.
2. **Gather** — order data (S2), **fully-loaded** cost per SKU: COGS + shipping + payment fees +
   marketplace commission + fulfilment + returns + ad cost to acquire the order (S2/S9 finance).
3. **Ground** — fully-loaded contribution is Tier 3 if cost data is real; gross-margin-only is
   insufficient and the brain flags the gap.
4. **Recognise** — *Products That Lose Money After True Costs*.
5. **Corroborate (H4)** — negative contribution on material-volume SKUs, consistent across the
   period, with the cost drivers identified (shipping > margin; returns wipe category; commission
   + ad cost > gross margin).
6. **Counter-check (H5)** — is it a deliberate, working loss-leader with profitable attach/LTV?
   Is "negative" an artefact of mis-allocated overhead vs. true variable cost?
7. **Context (H6)** — category norms for returns/shipping; intended strategy.
8. **Score** — confidence + **margin recoverable** (the bleed size).
9. **Conclude** — name it: *"Your bestsellers are your biggest losses,"* with the gross-vs-true
   margin waterfall as provenance.
10. **Sequence** — stop the bleed (price/shipping/range) before chasing new margin elsewhere.

Leaks 2–4 run the same chain with their own signals and counter-checks (e.g. discount bleed
requires a measured **baseline-vs-promo incrementality** test before concluding — redemption
volume is not incrementality).

---

## 4. The critical separation: gross margin vs. true contribution

The single most important move in profit-leak intelligence is refusing to reason on gross
margin. The brain always reconstructs **fully-loaded contribution**:

```
Selling price
  − COGS
  − shipping (true, not the customer-charged amount)
  − payment fees
  − marketplace commission / platform fees
  − fulfilment / pick-pack
  − expected returns cost (rate × handling × write-off)
  − acquisition cost attributable to the order
  = TRUE CONTRIBUTION   ← the number the brain reasons on
```

A SKU can show 45% gross margin and **negative** true contribution. The brain ranks profit
leaks on the true number, and the gap between gross and true is itself one of the most
persuasive things it can show a client.

---

## 5. Sizing the bleed

- **True economics:** Σ (negative contribution per loss-making SKU × volume). Scaling = worse
  (more volume, more loss), so it's flagged as a *scaling* threat too (Risk & Threat T2).
- **Discount bleed:** non-incremental discounted orders × average discount margin given away.
- **Returns tax:** return rate × fully-loaded return cost, concentrated by SKU/size/reason.
- **Price capture:** estimated price the market would bear with value communicated/tiered, ×
  volume — an *upside* leak (margin left on the table), sized conservatively.

All sized in ranges with stated assumptions (H10).

---

## 6. The compound profit leak

Profit leaks frequently compound with each other and with revenue tactics:

> *"You're discounting to drive volume on products that already lose money after true costs,
> and the discounts aren't even incremental. Every 'great month' digs the hole deeper."*

This compound — *Discounting Buys Sales Anyway* + *Products That Lose Money After True Costs* —
is escalated because growth actively accelerates the loss. The brain names it as one reality and
sequences the stop-loss (fix unit economics, then fix discounting) ahead of growth work.

---

## 7. Anti-generic guardrails

- The brain will **not** reason on gross margin when variable order costs are material.
- It will **not** call a discount a leak without an **incrementality** check (redemption ≠ lift).
- It will **not** ignore a profit leak just because revenue is up — that's exactly when it's most
  dangerous (H1).
- It will **not** condemn a loss-leader without checking the attach/LTV defence (H5).
- It will size in ranges with assumptions, never false precision.

---

## 8. Output

For a real business:
1. A **true-contribution model** for material SKUs (gross-vs-true gap surfaced).
2. A **profit-leak map** across the four drains, sized, with confidence.
3. The **compound profit-leak narrative** (where revenue tactics are feeding margin loss).
4. A **stop-the-bleed sequenced plan** wired to patterns (19) → packages (11) → delivery (12).
5. Confidence + counter-evidence record per leak.

This is how Growmerce determines a profit leak: by reconstructing the true economics the
business itself often can't see, proving where margin escapes, sizing it, and stopping the
bleed in the right order — the judgement of an operator who has been burned by a "profitable"
bestseller before.
