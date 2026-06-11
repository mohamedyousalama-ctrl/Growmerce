# User-State Journey — The Primary Organizing Model

> **This is the spine of the entire Website UX workstream.** Growmerce's website is documented
> primarily around **user states and cognitive transitions**, not around a page inventory. Pages
> are secondary — they are merely *containers* that move a decision-maker from one state to the
> next. Read this before any page document; every surface is an instrument for advancing the
> user through these states.

---

## 1. Why states, not pages

Agencies document a website as a list of pages (Home, Tools, Markets, Reports, Contact). That is
the wrong model for Growmerce, because it describes *our* structure, not the *visitor's mind.*

Growmerce is a commerce **intelligence operating system** guiding a decision-maker through
**progressive certainty** — from a vague sense that something is wrong, to the conviction that
these people understand their business, to the decision to talk. The website's real job is to
move the visitor along that cognitive arc. Pages exist only to serve a state transition.

```
❌ Page-first (copyable)        ✅ State-first (defensible)
Homepage                        Curiosity   → Recognition → Diagnosis →
Tools                           Evidence    → Trust       → Action     →
Markets                         Commitment
Reports
Contact                         (pages are containers for these states)
```

This matters downstream:
- **Claude Design (03)** will design around *psychology and transitions*, not decorate pages.
- **Claude Code** will build *flows that move states*, not static templates.
- **The AI agents (07/20)** will know *what intelligence to reveal at each state* — not dump
  everything at once.
- The result is a system organised around the buyer's mind, which is **far harder for
  competitors to copy** than a collection of pages.

---

## 2. The seven user states

Each state is a sentence in the visitor's own head. The website's job is to earn the transition
to the next one.

| # | State | What the visitor is thinking | The transition we must earn |
|---|---|---|---|
| **1** | **Curiosity** | "I think something is wrong." | → get them to look |
| **2** | **Recognition** | "I think this problem is happening to me." | → name their exact leak |
| **3** | **Diagnosis** | "Show me where the leak is." | → let the Brain analyse them |
| **4** | **Evidence** | "Prove it." | → show how we know + honest confidence |
| **5** | **Trust** | "These people understand my business." | → demonstrate operator-grade judgement |
| **6** | **Action** | "What should I do now?" | → give a prioritised, executable next step |
| **7** | **Commitment** | "Let's talk." | → open a warm, specific conversation |

The arc is **progressive certainty**: each state is a higher degree of conviction than the last.
Friction or a broken transition drops the visitor back a state (or off the site). Every UX
decision either advances a state or protects an earned one.

---

## 3. The states mapped to the Intelligence Brain (20)

The user-state journey is the *outward-facing mirror* of the Brain's cognition pipeline. The
visitor's growing certainty tracks the Brain's growing evidence.

```
USER STATE            BRAIN STAGE (20)              PATTERN LAYER (19)
1 Curiosity      ↔    (pre-SENSE: attention)        a leak exists, generally
2 Recognition    ↔    RECOGNISE (cold)              pattern, un-personalised
3 Diagnosis      ↔    SENSE → GROUND → RECOGNISE     pattern, on their inputs
4 Evidence       ↔    ASSESS + GUARD                 evidence signals + confidence
5 Trust          ↔    INTERACT + Confidence/Honesty  system narrative + ruled-out
6 Action         ↔    VALUE → DECIDE                 ranked recommendations
7 Commitment     ↔    ACT (→ deep diagnosis)         route to Growth Operations
```

The website is literally the Brain's **fast-judgement mode** walking a human up the certainty
ladder until the next step (a real conversation, deep diagnosis, Growth Operations) is the
obvious thing to do.

---

## 4. The six lenses for every surface

Because states are primary, every major surface document describes itself through six lenses (a
**User-State Transition block**), not through layout:

| Lens | Question it answers |
|---|---|
| **State entering** | What does the visitor believe when they arrive here? |
| **State leaving** | What should they believe when they leave? (the transition this surface earns) |
| **Friction** | What fear/effort could block the transition, and how we remove it |
| **Trust gained** | What specifically makes them trust Growmerce more here |
| **Intelligence revealed** | What the Brain shows at this state (and, crucially, *withholds* for later) |
| **Next action** | The one forward action that advances the state |

Each surface doc (`Homepage_Experience.md`, `Commerce_Diagnostic_Experience.md`,
`Tool_Ecosystem_Experience.md`, `Report_Preview_Experience.md`, `Market_Page_Experience.md`,
`WhatsApp_and_Consultation_CTA.md`, etc.) carries this block. The block, not the page layout, is
the unit of design intent handed to brand (03) and build.

---

## 5. Surfaces are containers — the mapping

The same surface can serve different states for different visitors; this table shows the
*primary* state each surface advances. Pages are plural, reusable instruments of the state arc.

| Surface (container) | Primary state it serves | Advances toward |
|---|---|---|
| TikTok lander / Homepage hero | 1 Curiosity | 2 Recognition |
| Homepage recognition · Pattern pages · Market pages | 2 Recognition | 3 Diagnosis |
| Structured input · Diagnostic flow | 3 Diagnosis | 4 Evidence |
| Diagnostic pattern-matching · Report evidence fields | 4 Evidence | 5 Trust |
| Report system-narrative · Trust & Proof system · ruled-out | 5 Trust | 6 Action |
| Report recommendations · "Growmerce can execute" | 6 Action | 7 Commitment |
| WhatsApp / Consultation CTA · Lead capture | 7 Commitment | Growth Operations |

> A surface that doesn't clearly advance a state is decoration and should be cut. A surface that
> tries to jump two states (e.g. homepage → "book a call") breaks the arc and loses the visitor.

---

## 6. The cardinal rules of the journey

1. **Never skip a state.** Don't ask for commitment (7) before trust (5); don't claim trust
   before evidence (4); don't show evidence before recognition (2). The classic agency error is
   jumping from Curiosity straight to Commitment.
2. **Reveal intelligence progressively.** Each state reveals only as much as it needs and
   withholds the rest to power the next transition. (This is also how the AI agents decide what
   to surface when.)
3. **Protect earned states.** Once trust is gained, don't undermine it with a hard sell or a
   dark pattern — a single manipulative moment drops the visitor back to scepticism.
4. **Every transition is earned, not assumed.** The visitor advances because Growmerce *showed*
   them something, never because the funnel told them to.
5. **Friction is state-specific.** The fear that blocks Recognition (skepticism) differs from the
   fear that blocks Commitment (vague-call dread). Each surface removes *its* state's friction.

---

## 7. Friction and fear, mapped to states

| State | The friction/fear that blocks the transition | How the UX removes it |
|---|---|---|
| 1 Curiosity | "another agency / not relevant to me" | instant operator-grade specificity |
| 2 Recognition | skepticism, "they don't know my business" | name the exact leak in their words |
| 3 Diagnosis | form fatigue, upload anxiety, time fear | Spotlight-style input; value-first; optional everything |
| 4 Evidence | "AI nonsense / made up" | show signals + honest confidence + missing-data |
| 5 Trust | "sounds smart but generic" | system narrative + ruled-out + profit≠revenue |
| 6 Action | overwhelm, "now what / too much" | one prioritised first action; clear sequence |
| 7 Commitment | vague-call dread, agency distrust | specific, warm, low-pressure WhatsApp |

---

## 8. How to use this document

- It is the **primary reference** for the workstream. Page documents are applications of it.
- When designing or building any surface, first ask: *which state is the visitor in, which state
  must they leave in, and what's the one thing that earns that transition?*
- The **User-State Transition block** in each surface doc is the canonical hand-off to Claude
  Design (psychology), Claude Code (flows), and the AI agents (progressive reveal).

> The website is not a set of pages. It is a guided ascent through progressive certainty —
> Curiosity → Recognition → Diagnosis → Evidence → Trust → Action → Commitment — and every pixel,
> word, and interaction exists to move a decision-maker one step up that ladder.
