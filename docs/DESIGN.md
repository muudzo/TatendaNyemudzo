# Portfolio v2 — Design Record

The reasoning behind the redesign, written before the code. If you want to know *why* something
looks or behaves the way it does, it should be answered here.

---

## 1. Audit of v1 ("Nostalgia OS")

v1 asked the visitor to pick Windows Vista or Mac OS X, watch a boot sequence, then open desktop
"apps" to find the work. It is preserved, playable, at `/v1/`.

| | Verdict |
|---|---|
| **What worked** | The instinct that a portfolio should be a *working system*, not a brochure. The window manager and event bus were real engineering. |
| **Gimmicky** | Boot screens, starfield, a choice between two operating systems that changes nothing about the work. |
| **Immature** | Borrowing Microsoft's and Apple's design languages. It shows imitation, not authorship. Emoji icons. |
| **Genuinely distinctive** | Nothing specific to Tatenda. Any developer could have built it. |
| **Structural failures** | Work sits behind 3+ interactions and a timed boot. 1 project in the data file, 4 of 6 apps were stubs. Unusable on phones. Nothing crawlable (JS-rendered). No per-project URLs to share. |
| **Keep** | The engineering discipline; the idea that the medium should prove a claim. |
| **Kill** | The OS metaphor entirely. It frames Tatenda as a nostalgist. The real work is about the future of infrastructure. |

**Verdict:** kill. Only the 20% that matters survives: *the site itself is evidence*.

## 2. What the actual work says

Reading ~40 repositories, READMEs, ADRs, field notes and handover docs, the same themes keep
coming back, whatever the stack:

1. **Designed for failure conditions.** Load-shedding, dropped connectivity, cash leakage, forged
   paper, whistleblowers' devices being seized. SmartRail's card "works in a tunnel during
   load-shedding"; MooMetrics queues writes in IndexedDB; BIGMAMA$ has an emergency wipe.
2. **Trust infrastructure.** Escrow, append-only audit logs, idempotency keys, atomic RPCs,
   stage gates, QR-verifiable certificates, SHA-256 photo dedup. The projects are about making
   money and records *believable*.
3. **Field research drives the product.** Two physical auction visits; a bid card numbered 45
   became the "~45 active bidders" liquidity target.
4. **Unusual honesty.** "Kill criteria", "Non-goals", "What the UI is allowed to claim",
   `[validate]` markers on unconfirmed figures, handovers that list what's still red.
5. **Zimbabwe as the design context.** Mobile money, dual currency (USD + ZiG), councils, NRZ,
   Paynow, smallholders.
6. **A visible trajectory.** From Odin recipe pages (2024) to a national rail fare architecture
   with a DESFire key hierarchy (2026).

## 3. Positioning

> **I design systems for the moment things go wrong, and then I build them.**

Designer-engineer, not designer *or* engineer. The same person does the auction field visit, draws the
state machine, writes the RLS policy, and writes the honest handover. International relevance:
resilience, payments, and govtech are global problems; Zimbabwe is where the constraints are
sharpest, which makes it the best possible training ground.

## 4. Three art directions considered

### A. The Ledger (editorial / civic document)
- **Concept:** the portfolio as a bound working ledger of decisions. Case studies read like
  well-kept records: entries, margin notes, stamps for decisions.
- **Visual language:** warm paper, blue-black ink, one vermilion "stamp" colour reserved for
  decisions and status. Serif text with a newspaper grotesk for labels. Hairline rules, tabular
  numerals.
- **Interaction:** quiet. Motion only for orientation (section index) and for revealing relationships.
- **Strengths:** mature, readable, native to the work (the repos are full of ledgers, ADRs, audit
  logs). Hard to mistake for an AI template.
- **Risks:** could feel static or bureaucratic, and needs a moment of surprise.
- **Fit:** very high. It is how Tatenda already writes.

### B. Load-shedding (the site as a resilience demo)
- **Concept:** the site has a power switch. Cut it and the page drops to a low-energy rendering:
  no web fonts, diagrams collapse to their text equivalents, weight drops from hundreds of KB to
  tens. It also genuinely works offline after one visit.
- **Visual language:** would need an "infrastructure" look if dominant, which risks terminal/dashboard
  clichés.
- **Strengths:** proves the central claim through the experience. Memorable.
- **Risks:** gimmick if it's the whole identity.
- **Fit:** high as a *moment*, weak as a whole visual language.

### C. The System Map (projects as a network of shared primitives)
- **Concept:** home is a map; projects are nodes linked by the primitives they share (idempotency,
  audit log, offline queue…).
- **Visual language:** diagrammatic, technical.
- **Strengths:** shows systems thinking directly.
- **Risks:** node graphs are a portfolio cliché, hard on mobile, and they hide the stories.
- **Fit:** medium as a homepage, high as an index.

### Decision
**A is the dominant language. B is the signature interaction. C is reduced to one honest
instrument (the primitives matrix).** One visual language, one memorable moment, one systems
device, and none of them fighting.

## 5. Information architecture

```
/                     Statement → Selected work (3 flagships) → Supporting work (4)
                      → Recurring primitives matrix → Experiments & archive index
/work/<slug>/         Case study (flagship: 8 sections; supporting: condensed 4)
/about/               Person, principles, trajectory (dated from GitHub), education, contact
/this-site/           The portfolio as its own case study (why v1 died, the switch, budgets)
/v1/                  The killed OS portfolio, preserved and playable
/404                  Useful, not cute
```

**Hierarchy of work**

| Tier | Projects | Treatment |
|---|---|---|
| Flagship | ZimLivestock · Vaka · Investment Gamified (ZSE) | Full 8-section case studies |
| Supporting | SmartRail ZW · BIGMAMA$ · MooMetrics · ClearLedger | Condensed studies |
| Experiments | ZimLingua · AgentEval · AdReel · fxagent · node graph | One line + link |
| Archive | v1 portfolio · Closet Muse · Tate Studies · UI studies · early web | Index only |

The flagship order is chosen for the story, not the calendar: lead with the strongest evidence
(ZimLivestock: field research + live product + CI catching real SEV-1s), then the most
mature systems design (Vaka), then the origin story of learning to make money logic correct
(Investment Gamified).

## 6. Homepage narrative

1. **Masthead.** Name, three links, the power switch. No hero image, no "Hello".
2. **Statement.** One sentence of positioning, then a short three-line ledger: now / recently / building.
3. **Selected work, immediately.** Each flagship is an editorial entry with a *plate*: a small
   diagram drawn from real evidence (the auction room's 45 bid cards; the 5-stage gate; two $600
   orders racing a $1,000 balance). No screenshot grid.
4. **Supporting work.** Denser rows.
5. **What keeps recurring.** The primitives × projects matrix. Hover or focus a primitive to see
   where it shows up. This is where the visitor realises it's one way of thinking, not a folder of
   assignments.
6. **Index.** Experiments and archive, compact.
7. **Footer.** Contact, plus an invitation to cut the power.

Ten-second test: statement (who + what) → the first flagship title and its evidence are
visible above the fold on a laptop.

## 7. Case-study system

Flagship sections, always in this order, always numbered:
`01 Context · 02 Problem · 03 Thinking · 04 Design · 05 Build · 06 Iteration · 07 Result · 08 Reflection`

Components:
- **Record header.** Role, period, context, status stamp, stack, links as a ledger table.
- **Section rail.** Sticky numbered index on desktop, showing the current section; collapses on mobile.
- **Margin notes.** `Decision`, `Rejected`, `Evidence`, `Open`, sitting in the right margin on wide
  screens and inline on narrow ones. This is where process shows up without dumping.
- **Plates.** Figures with a mandatory text equivalent, which is also what the low-power mode shows.
- **Ledger tables.** Real numbers only. Every figure traceable to a repo document.

Rule: **no invented metrics.** Where the evidence is partial (e.g. user feedback ~30% collected),
the page says so.

## 8. Design system

**Colour: cobalt and lime, one brand in two moods.** (Revised after launch: the original warm
paper and vermilion felt too archival for Tatenda's taste; the ledger structure stayed.)

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `--paper` | near-white | deep navy-black | the page |
| `--ink` | deep navy | warm off-white | text |
| `--stamp` | cobalt | lime | **decisions, status, focus, the current thing**. Never decoration. |
| `--pop` / `--marker` | lime highlighter under the key line | (cobalt accent) | the one expressive stroke |
| `--panel` | cobalt | deep cobalt | the colour block diagrams and the footer sit on |

Panels re-point the ordinary tokens (`.plate`, `.site-footer`), so every diagram re-colours
without changes. Visitors can switch mode in the header; until they do, the system decides.

Low-power mode drops to pure greyscale with system fonts.

**Type:** *Newsreader* (variable serif) for reading and display, set large and tight for titles,
italic for voice. *Schibsted Grotesk* (born at a newspaper) for labels, navigation, numerals,
meta. Two families, self-hosted, `font-display: swap`, only the body face preloaded.
No Inter, no Space Grotesk, and monospace only for real artifacts (commit hashes, state names).

**Rhythm:** a 4px base, but deliberately uneven: tight inside a record, generous between records.
Measure is ~66ch for reading.

**Motion:** only for (a) orientation: section rail, (b) relationships: primitives matrix,
(c) the power cut, (d) page-to-page cross-fade via CSS view transitions. `prefers-reduced-motion`
removes all of it with no loss of meaning.

## 9. The signature interaction: the power switch

The masthead has a switch labelled **Power**. Load-shedding (scheduled power cuts) is the
condition much of the work is designed for. Switching it off:

- Removes web fonts, colour, diagrams and motion; every diagram is replaced by its written
  equivalent.
- Reports, using the browser's own Resource Timing data, how much of the page is actually
  needed to read it.
- Persists per visitor, and **turns itself on automatically for visitors whose browser sends
  Save-Data**, with a note explaining why.

Separately, a service worker caches pages as you read, so the site keeps working with no network.

What someone should remember after leaving: *"the designer whose portfolio you can switch the
power off on, and it still works, like the systems he builds."*

## 10. Engineering

- Astro (static HTML per route, zero JS by default), MDX case studies in a typed content collection.
- Vanilla TypeScript islands only for the switch, section rail, matrix, and service worker.
- Built-in hashed CSP, sitemap, per-page OG images generated at build time, JSON-LD `Person`.
- Budgets: < 60 KB JS total (target: < 10 KB), < 30 KB CSS, fonts ≈ 170 KB (the one deliberate spend).
- Tests: Vitest for the pure logic (matrix derivation, weight accounting, ordering);
  Playwright for smoke, keyboard, reduced-motion and screenshots at 320/768/1024/1440.
