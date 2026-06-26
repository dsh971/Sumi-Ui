---
title: "refactor: Named grid-template-columns tokens to prevent col-span/track-count mismatches"
date: 2026-06-24
type: refactor
status: draft
origin: documentation/kanban/IMPROVEMENT-css-class-naming.md
---

# refactor: Named grid-template-columns tokens to prevent col-span/track-count mismatches

**Target repo:** SumiUi

## Summary

Resolve `documentation/kanban/IMPROVEMENT-css-class-naming.md`. Replace raw
arbitrary-value `grid-cols-[...]` class strings with named, role-encoded
`@theme` tokens (e.g. `grid-cols-shell-sidebar-content-properties` instead of
`grid-cols-[240px_1fr_260px]`) across the three places they appear in SumiUi,
and apply the convention as a working proof-of-concept on
`Workspace.stories.tsx`'s responsive shell `Grid` — the real example
consumers copy from, and the one that broke once already when adapted by a
consuming app with a mismatched `col-span`.

---

## Problem Frame

`Grid`'s `cols` prop sets `grid-template-columns` via inline style, which
always wins over classes regardless of breakpoint, so a responsive grid must
leave `cols` unset and hand-write literal responsive Tailwind classes on the
`Grid` itself (e.g. `md:grid-cols-[240px_1fr_260px]`) and matching
`md:col-span-N` on each child. Nothing about an arbitrary-value class name
encodes how many tracks it declares, so a child's span can drift out of sync
with the grid's actual track count with no signal until the layout visibly
breaks. This already happened: `Workspace.stories.tsx`'s sidebar-shell
pattern was copied into a consuming app with `md:col-span-2`/`md:col-span-10`
children (span values only meaningful in a 12-column grid) applied to a
2/3-explicit-column grid.

Today, `Workspace.stories.tsx` itself has no mismatched `col-span` — its
three children (`Sidebar`, content, `properties`) rely on default one-track
placement, so the bug isn't reproduced in this repo's own source. The fix is
about making the *source* pattern self-evidently safe to read, copy, and
extend, not about fixing an existing bug in this file.

## Requirements

- **R1.** Audit current `grid-template-columns`-related arbitrary-value
  Tailwind class usage across SumiUi components and stories, and record
  which usages are exposed to the span/track-count mismatch risk and which
  are not. *(Ticket acceptance criterion 1.)*
- **R2.** Adopt one naming/structuring convention that makes a mismatched
  `col-span` visually self-evident at the call site, without changing
  `Grid`'s public prop API. *(Ticket acceptance criterion 2.)*
- **R3.** Apply the convention to `Workspace.stories.tsx`'s `Grid` usage as a
  real proof-of-concept. *(Ticket acceptance criterion 3.)*
- **R4.** Apply the same convention to `Stepper` and `Timeline`'s internal
  grid-template classes for repo-wide consistency, even though neither
  currently has a `col-span` child exposed to the mismatch risk (confirmed
  by user during planning).

## Key Technical Decisions

**KTD1 — Named `@theme` tokens + doc comments, not a richer `Grid` prop API.**
SumiUi already defines every other design token (`--color-*`,
`--spacing-*`, `--radius-*`, `--breakpoint-*`) in `src/styles/index.css`'s
`@theme` block, which Tailwind v4 turns into real utility classes. Tailwind
v4 has a first-class `--grid-template-columns-*` theme namespace that
generates `grid-cols-<name>` utilities the same way. Defining named entries
there is a pure CSS addition: no new public prop, no version-bump-driving
API surface change, and it follows the exact pattern every other token in
this codebase already follows. A richer `Grid` prop API (e.g. a
per-breakpoint column-array prop) was considered and rejected: it's the most
preventive option but a real public API addition (new prop shape, new
tests, version bump) for what is currently a small, fixed set of call sites
— disproportionate to the problem.

**KTD2 — Encode track *roles*, not a numeric track count, in the name.**
A numeric suffix (e.g. `grid-cols-shell-3`) breaks down the moment a
"3-column" grid collapses to 2 visible tracks at a narrower state — the name
would still say "3" while only declaring 2, reproducing the exact
count/name mismatch this ticket exists to eliminate. Naming by role instead
(`grid-cols-shell-sidebar-content-properties`,
`grid-cols-shell-sidebar-content`, `grid-cols-shell-content-properties`,
`grid-cols-shell-content`) keeps the name accurate at every state, and the
track count is still immediately countable by counting the dash-joined
words.

**KTD3 — Scope to `grid-template-columns` classes only, not all
arbitrary-value classes.** The ticket's literal description (acceptance
criterion 1) reads broadly ("audit current arbitrary-value Tailwind class
usage... for readability gaps"), but the actual reported bug class is
specifically about column tracks vs. `col-span`. Other arbitrary values in
the codebase (e.g. `text-[11.5px]`, `size-[6px]`, `gap-x-[13px]`) are
deliberate one-off design-fidelity pixel values with no inter-class
structural relationship to mismatch against — renaming them wouldn't
prevent any analogous bug, just rename a constant. The audit (R1) covers
them by exclusion: explicitly noted as out of scope with rationale, not
silently ignored.

**KTD4 — Patch the named tokens, the three usage sites, and their tests in
one pass; treat this as a `minor` semver bump.** The new `@theme` entries
ship inside `src/styles/index.css`, which is part of the published
`@sumiui/react/styles` import — new, non-breaking utility classes available
to consumers, consistent with how the recent Badge canonical-variant
addition was classified.

## Scope Boundaries

**In scope:**
- `src/styles/index.css` — new named `--grid-template-columns-*` `@theme`
  entries
- `src/stories/examples/Workspace.stories.tsx` — swap arbitrary shell-grid
  classes for the new named classes
- `src/components/Stepper/index.tsx` — swap its internal arbitrary grid
  class
- `src/components/Timeline/index.tsx` + `Timeline.test.tsx` — swap its two
  internal arbitrary grid classes and the test assertions that check for
  them literally
- `documentation/decisions/001-stack-choices.md` — log the new convention
  per the project's token-usage rule (document before adding)
- `documentation/kanban/IMPROVEMENT-css-class-naming.md` — mark Done with
  an append-only resolution note
- A changeset for `@sumiui/react` (minor)

**Out of scope:**
- `fe-interview-template` (the consuming app where the bug actually broke
  layout) — a different repository, not in this working directory
- Any change to `Grid`'s public prop API or `cols`/`gap` behavior
- Renaming non-grid-template arbitrary-value classes (`text-[11.5px]`,
  `size-[6px]`, `gap-x-[13px]`, etc.) — noted in the audit, not touched
- Building a generic, reusable shell-layout component to replace
  `Workspace.stories.tsx`'s hand-rolled `Grid` usage

### Deferred to Follow-Up Work

- If a future component introduces another responsive multi-column shell
  beyond the Workspace example, extend the same `shell-*` token family
  rather than inventing a parallel convention.

---

## Implementation Units

### U1. Log the convention decision

**Goal:** Satisfy the project's token-usage rule ("if a token doesn't exist
yet, document it under `documentation/decisions/` before adding it") before
any CSS changes land.

**Requirements:** R2

**Dependencies:** None

**Files:**
- `documentation/decisions/001-stack-choices.md` (append)

**Approach:** Append a dated `### Decision — 2026-06-24` entry following the
existing What/Why/Impact format used by this file's other entries (e.g. the
Badge canonical-naming entries from earlier this session). What: adopting
named, role-encoded `--grid-template-columns-*` `@theme` tokens in place of
raw arbitrary-value `grid-cols-[...]` classes for grids exposed to
`col-span` mismatch risk. Why: makes a mismatched child span self-evident at
the call site without changing `Grid`'s public API (references KTD1/KTD2).
Impact: `src/styles/index.css`, `Workspace.stories.tsx`, `Stepper`,
`Timeline`.

**Test scenarios:** Test expectation: none — documentation-only change.

**Verification:** Entry appended, not rewritten; matches the file's existing
dated-entry format.

---

### U2. Add named grid-template-columns tokens

**Goal:** Define the new `@theme` tokens that U3-U5 will consume.

**Requirements:** R2, R4

**Dependencies:** U1 (decision logged first)

**Files:**
- `src/styles/index.css`

**Approach:** Add a new, clearly labeled subsection inside the existing
`@theme` block (alongside the existing `--breakpoint-*` entries, before the
closing brace), with a short comment pointing at the decision log entry.
Token set:

```text
--grid-template-columns-shell-sidebar-content-properties: 240px 1fr 260px;
--grid-template-columns-shell-content-properties: 1fr 260px;
--grid-template-columns-shell-sidebar-content: 240px 1fr;
--grid-template-columns-shell-content: 1fr;
--grid-template-columns-step-node-content: 26px 1fr;
--grid-template-columns-timeline-time-marker-content: 64px 24px 1fr;
--grid-template-columns-timeline-marker-content: 24px 1fr;
```

Each generates a matching `grid-cols-<name>` utility class automatically
(Tailwind v4's `--grid-template-columns-*` theme namespace). Values are
copied verbatim from the arbitrary-value classes being replaced — this unit
introduces no visual change by itself.

**Patterns to follow:** The existing `--breakpoint-*` / `--radius-*` /
`--spacing-*` subsections immediately above in the same file, for comment
style and grouping.

**Test scenarios:** Test expectation: none — additive CSS, no behavior to
unit-test. Verified visually in U3-U5 once consumed, and structurally by the
production build in U6.

**Verification:** `pnpm build` (root) succeeds; the new class names appear
in built CSS output.

---

### U3. Apply to Workspace.stories.tsx (proof-of-concept)

**Goal:** Demonstrate the convention on the real, already-conditional
multi-state `Grid` usage that consumers copy from.

**Requirements:** R3

**Dependencies:** U2

**Files:**
- `src/stories/examples/Workspace.stories.tsx`

**Approach:** Replace the four arbitrary-value classes
(`md:grid-cols-[1fr_260px]`, `md:grid-cols-[240px_1fr_260px]`,
`md:grid-cols-[1fr]`, `md:grid-cols-[240px_1fr]`) with their named
equivalents (`md:grid-cols-shell-content-properties`,
`md:grid-cols-shell-sidebar-content-properties`,
`md:grid-cols-shell-content`, `md:grid-cols-shell-sidebar-content`). Add a
short comment immediately above the `Grid` stating that its three children
(`Sidebar`, content, `properties`) rely on default one-track placement and
that any future `col-span` override added to a child must match the active
class's role list — making the invariant explicit for the next person who
extends this example (the exact failure mode that broke the consuming app).

**Patterns to follow:** The existing extensive inline comments already in
this file (e.g. the mobile sidebar-toggle button's comment block a few
lines above) for comment density and style.

**Test scenarios:** Test expectation: none — this is a Storybook example
file with no test coverage; verified visually via Storybook.

**Verification:** `pnpm storybook:build` succeeds; manually check the
Workspace story in Storybook at both a narrow and wide viewport to confirm
the sidebar shell still lays out identically to before the rename (no
visual diff expected, since values are unchanged — only the class names
are).

---

### U4. Apply to Stepper

**Goal:** Retrofit `Stepper`'s internal fixed grid for naming consistency.

**Requirements:** R4

**Dependencies:** U2

**Files:**
- `src/components/Stepper/index.tsx`

**Approach:** Replace `grid-cols-[26px_1fr]` with `grid-cols-step-node-content`
in `VerticalStepper`'s `<li>` className. Leave the adjacent `gap-x-[13px]`
untouched (KTD3 — out of scope, a one-off spacing value with no structural
mismatch risk).

**Test scenarios:** Test expectation: none — `Stepper.test.tsx` has no
class-string assertions (confirmed during planning); existing behavioral
tests continue to cover rendering correctness.

**Verification:** `pnpm test -- Stepper` passes unchanged; `pnpm
storybook:build` succeeds; visually confirm the vertical stepper layout via
Storybook (`Vertical` story).

---

### U5. Apply to Timeline

**Goal:** Retrofit `Timeline`'s two internal fixed grids for naming
consistency, including its direct test coverage.

**Requirements:** R4

**Dependencies:** U2

**Files:**
- `src/components/Timeline/index.tsx`
- `src/components/Timeline/Timeline.test.tsx`

**Approach:** In `rowGridFor`, replace `"grid grid-cols-[64px_24px_1fr]"`
with `"grid grid-cols-timeline-time-marker-content"` and `"grid
grid-cols-[24px_1fr]"` with `"grid grid-cols-timeline-marker-content"`.
Update the three literal-string assertions in `Timeline.test.tsx` (around
lines 212-214) that check `toHaveClass("grid-cols-[64px_24px_1fr]")` /
`toHaveClass("grid-cols-[24px_1fr]")` / the negative assertion, to match the
new class names.

**Test scenarios:**
- Happy path: a depth-0 item with `timeGutter` (default) renders
  `grid-cols-timeline-time-marker-content`.
- Happy path: a depth-1+ item, or a depth-0 item with `timeGutter={false}`,
  renders `grid-cols-timeline-marker-content`.
- Negative: a depth-0/`timeGutter` row does not carry the
  marker-content-only class, and vice versa (preserves the existing
  negative assertion's intent under the new names).

**Verification:** `pnpm test -- Timeline` passes with updated assertions;
`pnpm storybook:build` succeeds; visually confirm `ActivityFeed` and
`NoTimeGutter` stories via Storybook.

---

### U6. Close out: changeset, docs cross-reference, ticket resolution

**Goal:** Ship the change and close the originating ticket per the
project's append-only documentation conventions.

**Requirements:** R1, R2, R3, R4

**Dependencies:** U1-U5

**Files:**
- `.changeset/*.md` (new)
- `documentation/kanban/IMPROVEMENT-css-class-naming.md`
- `docs/content/docs/components/foundation/grid.mdx` (optional cross-reference)

**Approach:** Add a changeset (`minor` bump for `@sumiui/react`) describing
the new named grid-template utility classes. Mark the kanban ticket Done by
prepending `**Status: Done**` (never rewriting the body) and append a
resolution note summarizing the convention adopted, the audit findings
(R1 — which usages were/weren't at risk), and a reference to this plan file.
Optionally add one sentence to `grid.mdx`'s existing "Going responsive" note
pointing at the named-token convention as the recommended approach for
known, reusable shell layouts (the Workspace pattern), leaving the existing
guidance about `cols` vs. classes unchanged.

**Test scenarios:** Test expectation: none — documentation and release
metadata only.

**Verification:** `pnpm changeset status` (or equivalent) recognizes the new
changeset; ticket file's body is appended-to, not rewritten, matching the
project's kanban convention; full root + docs `typecheck`/`lint`/`build`
(and `pnpm storybook:build`) still pass after all units land.

---

## Risks & Dependencies

- **Low risk, mechanical rename.** Every replaced value is copied verbatim
  from the arbitrary-value class it replaces — no visual or behavioral
  change is expected anywhere. The main risk is a missed reference (e.g. a
  story or test still asserting the old class string), which `pnpm test`
  and a Storybook visual check in each unit catch directly.
- **Dependency on Tailwind v4's `--grid-template-columns-*` theme
  namespace** generating `grid-cols-<name>` utilities as expected — verify
  this in U2 by confirming the new class appears in build output before
  proceeding to U3-U5.

## Documentation Plan

- `documentation/decisions/001-stack-choices.md` — convention decision
  (U1)
- `documentation/kanban/IMPROVEMENT-css-class-naming.md` — marked Done
  (U6)
- `docs/content/docs/components/foundation/grid.mdx` — optional one-sentence
  cross-reference (U6)
