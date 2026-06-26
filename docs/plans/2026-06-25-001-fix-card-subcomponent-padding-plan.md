---
title: "fix: Make Card sub-component padding position-independent"
date: 2026-06-25
type: fix
status: draft
origin: documentation/kanban/QA-DESIGN-REVIEW-2026-05-29.md
---

# fix: Make Card sub-component padding position-independent

**Target repo:** SumiUi

## Summary

Resolve `BUG-008` from the QA review. `CardHeader`/`CardBody`/`CardFooter`
currently hardcode asymmetric top/bottom padding tuned only for the one
case where all three are stacked together. Replace it with `first:`/`last:`
Tailwind variants so each sub-component is correct regardless of which
siblings are actually present — fixing the two most common real-world
compositions (`Header`+`Body` only, and `Body`-only) without changing the
one case (`Header`+`Body`+`Footer`) the current values already get right.

---

## Problem Frame

`Card` itself has no padding. Today:

- `CardHeader`: `px-5 pt-5 pb-4` (top 20px, bottom 16px)
- `CardBody`: `px-5 py-4` (top 16px, bottom 16px)
- `CardFooter`: `px-5 pt-4 pb-5` + `border-t` (top 16px, bottom 20px)

These values were tuned so that when all three are stacked, the *outer*
edges land on a symmetric 20px (matching the design system's flat-card
reference, `Sumi-Design-System/preview/cards.html`'s `.sk-card { padding:
20px }`) and the *inner* gaps between sections are a consistent 32px
(16+16). That's the only composition this scheme gets right.

A repo-wide census of every real `Card` usage (`src/components/Card/Card.stories.tsx`,
`src/components/Container/Container.stories.tsx`,
`src/components/Grid/Grid.stories.tsx`, `src/components/Timeline/Timeline.stories.tsx`,
`src/stories/examples/Workspace.stories.tsx`, `docs/demos/card/basic.tsx`,
`docs/demos/grid/variants.tsx`) shows the full 3-part composition is
actually the *rare* case (2 usages). The two common patterns are:

- **`Header`+`Body`, no `Footer`** (the majority of usages): top edge is
  correctly 20px, but the bottom edge is `CardBody`'s `pb-4` = 16px —
  visibly asymmetric against the top.
- **`Body`-only** (several usages): both edges are `py-4` = 16px on all
  sides — undersized against the 20px spec on every side, not just one.

So the current values get the rare case right and the common cases wrong.

## Requirements

- **R1.** Every `CardHeader`/`CardBody`/`CardFooter` instance renders a
  20px outer edge wherever it is the first or last rendered child inside
  a `Card`, regardless of which other sub-components are present.
- **R2.** The `Header`+`Body`+`Footer` composition's current visual result
  (20px outer edges, 32px inter-section gaps) is unchanged — this is a
  fix for the other compositions, not a redesign of the one that already
  works.
- **R3.** No public API change — `CardHeaderProps`/`CardBodyProps`/
  `CardFooterProps` stay exactly as they are; this is an internal
  className fix only.

## Key Technical Decisions

**KTD1 — Use Tailwind's built-in `first:`/`last:` pseudo-class variants
instead of hardcoding edge-specific padding per component.** Give each
sub-component a "middle position" base of `pt-4 pb-4` (16px, the existing
inter-section gap contribution), then layer `first:pt-5` and `last:pb-5`
to bump whichever edge is actually touching the card's own border up to
20px. This makes correctness a function of actual DOM position, not of
which component you are — so a lone `CardBody` (first *and* last) gets
`pt-5`+`pb-5` (20/20, matching spec) automatically, a `CardHeader` followed
by a `CardBody` gets `CardHeader`'s `first:pt-5` (top=20) and `CardBody`'s
`last:pb-5` (bottom=20) automatically, and the existing 3-part case is
unaffected (verified by hand: `Header` is first-only → 20/16, `Body` is
neither → 16/16, `Footer` is last-only → 16/20 — identical to today's
hardcoded values). `CardFooter`'s `border-t` is similarly made
position-aware (`first:border-t-0`, canceling it if `Footer` is ever used
without anything above it) rather than unconditional.

A sibling-selector approach (`[&+&]:mt-0`-style margin collapsing) and a
"just always use 20px and accept a larger 40px inter-section gap" approach
were both considered. The `first:`/`last:` variant approach was preferred
because it requires no new CSS mechanism beyond what Tailwind already
provides, produces zero visual change for the one composition already
verified correct, and fixes every other composition to also be correct
rather than picking a single compromise value.

## Scope Boundaries

**In scope:** `src/components/Card/index.tsx` (3 sub-components' className
strings), `src/components/Card/Card.test.tsx` (new coverage for the
position-independence fix), decision log, kanban ticket resolution.

**Out of scope:** `Card` itself (no padding today, not part of this bug);
any new prop or composition API; Storybook snapshot/visual-regression
tooling (none exists in this repo — verification is manual via Storybook).

---

## Implementation Units

### U1. Make CardHeader/CardBody/CardFooter padding position-independent

**Goal:** Fix the actual bug.

**Requirements:** R1, R2, R3

**Dependencies:** None

**Files:** `src/components/Card/index.tsx`

**Approach:**

```text
CardHeader: "flex flex-col gap-1 px-5 pt-4 pb-4 first:pt-5 last:pb-5"
CardBody:   "px-5 pt-4 pb-4 first:pt-5 last:pb-5"
CardFooter: "flex items-center px-5 pt-4 pb-4 first:pt-5 last:pb-5
             border-t border-[color:var(--line-1)] first:border-t-0"
```

(directional — exact class order within the string is an implementation
detail). `first:`/`last:` are Tailwind's built-in `:first-child`/
`:last-child` variants; specificity of a class+pseudo-class selector beats
the plain base utility regardless of source order, so no `!important` or
manual ordering trick is needed.

**Patterns to follow:** None directly comparable elsewhere in this
codebase — this is the first use of Tailwind's `first:`/`last:` variants
in SumiUi. Document the pattern via the test coverage in U1 itself
(no separate Storybook story needed — the existing stories already
exercise every composition shape).

**Test scenarios:**
- Happy path: `CardHeader` alone in a `Card` carries both `first:pt-5` and
  `last:pb-5` (it's both first and last child).
- Happy path: `CardBody` alone in a `Card` carries both `first:pt-5` and
  `last:pb-5`.
- Happy path: `Header`+`Body` — `CardHeader` carries `first:pt-5` (and not
  uniquely tied to `last:pb-5` mattering since it's not last), `CardBody`
  carries `last:pb-5`.
- Happy path: `Header`+`Body`+`Footer` — `CardHeader` carries `first:pt-5`,
  `CardFooter` carries `last:pb-5` and does **not** get `border-t-0`
  applied as the active rule (it has a preceding sibling).
- Edge case: `CardFooter` alone — carries `first:border-t-0` (so no
  stray top rule renders with nothing above it) and both `first:pt-5`/
  `last:pb-5`.

**Verification:** `pnpm test -- Card` passes with the new assertions;
`pnpm storybook:build` succeeds; manually compare the `Default`,
`Elevated`, and `WithFooter` (or equivalent) `Card` stories before/after in
Storybook — the 3-part story should look pixel-identical, the
header/body-only stories should now show symmetric top/bottom edges.

---

### U2. Close out: decision log and ticket resolution

**Goal:** Record the decision and close `BUG-008`.

**Requirements:** R1, R2, R3

**Dependencies:** U1

**Files:**
- `documentation/decisions/001-stack-choices.md`
- `documentation/kanban/QA-DESIGN-REVIEW-2026-05-29.md`
- `.changeset/*.md` (new — `patch` for `@sumiui/react`, per the Risks note
  below: a visible rendering fix for existing consumers, not a new
  feature or a breaking change)

**Approach:** Append a dated decision-log entry (What/Why/Impact format)
describing the `first:`/`last:` variant approach and the census findings
that motivated it. Check off `BUG-008` in the QA ticket and append a
resolution note referencing this plan file. With `BUG-008` resolved,
`H-10` (axe automated tests, a separately-tracked initiative) is the only
item left unchecked in that ticket — leave it as-is, already correctly
scoped out.

**Test scenarios:** Test expectation: none — documentation only.

**Verification:** Full root `typecheck`/`lint`/`test`/`build`/
`storybook:build` pass; ticket and decision log are appended-to, not
rewritten.

---

## Risks & Dependencies

- **Low risk.** The fix is scoped to 3 className strings in one file, is
  verified by hand to be a no-op for the one previously-correct
  composition, and is covered by new direct tests. No public API changes
  mean no consumer migration and no version-bump-driving surface change —
  still worth a `patch` changeset since it changes rendered output for
  existing consumers using the `Header`-only/`Body`-only/`Footer`-only/
  partial compositions (not a new feature, and not breaking, but visibly
  different padding in those specific cases).
