---
title: "fix: Resolve QA review's remaining Low-priority items"
date: 2026-06-24
type: fix
status: draft
origin: documentation/kanban/QA-DESIGN-REVIEW-2026-05-29.md
---

# fix: Resolve QA review's remaining Low-priority items

**Target repo:** SumiUi

## Summary

Close out the 9 "Low (deferred to follow-up)" items in
`documentation/kanban/QA-DESIGN-REVIEW-2026-05-29.md`, except the 3 that
explicitly require a separate decision or initiative (`BUG-008`'s Card
padding design question and `H-10`'s axe test initiative stay untouched;
`L-6`'s Skeleton loading-announcement strategy is resolved here per
explicit user direction). Two already-fixed items (`BUG-014`, `L-2`) just
need their checkboxes ticked. Four hardcoded one-off pixel values (`L-1`,
`L-3`, `L-4`, `L-5`) get narrow, named tokens, mirroring the existing
`--duration-skeleton` precedent. `L-7`'s stale `tokens.css` header comment
gets corrected. `L-6` is resolved as documented guidance (a story +
docs note + code comment), not a new component — matching the original QA
finding's own framing ("pattern-level, not component").

---

## Problem Frame

The QA review's Critical/High/Medium findings are all resolved; only Low
items remain, deferred at the time because they're individually minor. Two
turned out to already be fixed in code without the ticket being updated.
Four are genuine, if small, violations of this project's "never hardcode
pixel sizes outside the token layer" rule — each value is a deliberate
one-off (no shared scale value fits), so each needs its own named token
rather than reuse of an existing scale step. One (`L-7`) is a stale
comment. `L-6` is the only one with real shape to decide: today, every
individual `Skeleton` is correctly `aria-hidden="true"`, but nothing
announces to assistive technology that a region is loading at all —
sighted users see the shimmer, screen reader users get silence.

## Requirements

- **R1.** Mark `BUG-014` and `L-2` resolved — both already match the
  ticket's intended end state in code.
- **R2.** Add named tokens for `L-1` (`TextArea` `min-h-[80px]`), `L-3`
  (`Avatar` `text-[9px]`), `L-4` (`Badge` `size-[6px]` dot), and `L-5`
  (`Dialog` `backdrop-blur-[2px]`), replacing the raw arbitrary-value
  classes with references to them.
- **R3.** Correct `L-7`'s stale `tokens.css` header comment, which claims
  the file does "Tailwind v4 `@theme` mapping" when that block was moved
  to `index.css` per this repo's own 2026-05-28 decision-log entry.
- **R4.** Resolve `L-6` by documenting a loading-announcement pattern for
  groups of `Skeleton`s (a `role="status"` wrapper with visually-hidden
  text), surfaced as a Storybook story, a docs note, and a code comment —
  not a new exported component.
- **R5.** Update the originating ticket and decision log per the project's
  append-only conventions once the above land.

## Key Technical Decisions

**KTD1 — New one-off tokens are plain `:root` custom properties in
`tokens.css`, referenced via Tailwind's `[var(--token)]` bracket syntax —
not new `@theme` entries.** These four values have no other consumer and
aren't meant to become reusable Tailwind utility classes (unlike the
grid-template tokens added earlier today, which needed real `grid-cols-*`
utilities at multiple call sites). This exactly mirrors the existing
`--duration-skeleton` precedent in `tokens.css` and the
`px-[var(--gutter-mobile)]`-style bracket-with-var() pattern already used
in `Container`, `Select`, `Combobox`, and `Timeline`.

**KTD2 — `L-6` resolved as guidance, not a new component.** The original
QA finding itself characterizes this as "pattern-level, not component" —
taken as a direct signal not to add a `SkeletonGroup`/`LoadingRegion`
wrapper component. The standard accessible pattern (a container with
`role="status"` — implicit `aria-live="polite"` — holding visually-hidden
loading text, with the `Skeleton` placeholders themselves staying
`aria-hidden`) is demonstrated via a new Storybook story and documented in
`skeleton.mdx` and a short code comment in `Skeleton/index.tsx`, so
consumers see the pattern without `Skeleton`'s own API growing.

## Scope Boundaries

**In scope:** `tokens.css` (4 new tokens + L-7 comment fix), `TextArea`/
`Avatar`/`Badge`/`Dialog` (consume the new tokens), `Skeleton/index.tsx`
(pattern comment), `Skeleton.stories.tsx` (new story), `skeleton.mdx`
(docs note), decision log, kanban ticket.

**Out of scope:**
- `BUG-008` (Card padding) — ticket explicitly flags "design decision
  needed"; not resolved here.
- `H-10` (axe automated tests) — ticket explicitly scopes this as "a
  separate initiative."

---

## Implementation Units

### U1. Tick already-resolved checkboxes

**Goal:** Reflect reality — `BUG-014` and `L-2` already match the ticket's
intended end state.

**Requirements:** R1

**Dependencies:** None

**Files:** `documentation/kanban/QA-DESIGN-REVIEW-2026-05-29.md`

**Approach:** Check off `BUG-014` and `L-2` in place (editing a checkbox is
not a body rewrite). `L-2`'s code (`Pagination/index.tsx`'s `min-w-8`)
already matches; `BUG-014` was already "confirmed correct, no action" per
its own ticket text.

**Test scenarios:** Test expectation: none — checkbox-only edit.

**Verification:** Visual diff shows only the two checkboxes changed.

---

### U2. Add named tokens for L-1/L-3/L-4/L-5 and consume them

**Goal:** Replace four hardcoded one-off pixel values with named tokens.

**Requirements:** R2

**Dependencies:** None

**Files:**
- `src/styles/tokens.css`
- `src/components/Input/index.tsx` (TextArea)
- `src/components/Avatar/index.tsx`
- `src/components/Badge/index.tsx`
- `src/components/Dialog/index.tsx`

**Approach:** Add a new subsection to `tokens.css`'s light `:root` block
(after the existing Line heights section, following the `--duration-skeleton`
comment style):

```text
--textarea-min-h: 80px; /* TextArea — no shared scale step fits */
--avatar-fallback-text-sm: 9px; /* Avatar sm fallback initials — text-xs (12px) reads too large at size-6 */
--badge-dot-size: 6px; /* Badge status dot */
--dialog-backdrop-blur: 2px; /* Dialog backdrop — subtler than any shared blur step */
```

Replace each component's raw arbitrary-value class with the bracket-var
equivalent: `min-h-[80px]` → `min-h-[var(--textarea-min-h)]`,
`text-[9px]` → `text-[var(--avatar-fallback-text-sm)]`,
`size-[6px]` → `size-[var(--badge-dot-size)]`,
`backdrop-blur-[2px]` → `backdrop-blur-[var(--dialog-backdrop-blur)]`.
Values are unchanged — purely a token-reference substitution, no visual
change expected.

**Patterns to follow:** `--duration-skeleton` in `tokens.css`;
`px-[var(--gutter-mobile)]` in `Container/index.tsx` and the equivalent
`w-[var(--radix-popover-trigger-width)]` in `Combobox/index.tsx`.

**Test scenarios:** Test expectation: none — existing component tests
assert behavior, not literal class strings, for all four components
(confirmed: no test in `Avatar.test.tsx`, `Badge.test.tsx`,
`Dialog.test.tsx`, or `Input.test.tsx` asserts these specific class
strings).

**Verification:** `pnpm build` succeeds; the four new custom properties
appear in `dist/sumi.css`; `pnpm test` (root) still passes unchanged;
visually confirm `Avatar`, `Badge` (dot), `Dialog`, and `TextArea` via
Storybook — no visual diff expected.

---

### U3. Fix L-7's stale tokens.css header comment

**Goal:** Correct the file header's inaccurate claim.

**Requirements:** R3

**Dependencies:** None

**Files:** `src/styles/tokens.css`

**Approach:** The header (lines 1-5) currently reads "This file: verbatim
token definitions + Tailwind v4 `@theme` mapping." Per the 2026-05-28
decision log entry, the `@theme` block was deliberately moved to
`index.css` (Tailwind v4 only fully processes inline, non-`@import`ed
`@theme` blocks) — `tokens.css` contains only `:root` custom properties.
Update the comment to state that accurately and point at `index.css` for
the `@theme` mapping.

**Test scenarios:** Test expectation: none — comment-only change.

**Verification:** Comment text no longer contradicts the decision log.

---

### U4. Resolve L-6: document the Skeleton loading-announcement pattern

**Goal:** Give consumers a correct, demonstrated pattern for announcing a
loading region to assistive technology, without adding a new component.

**Requirements:** R4

**Dependencies:** None

**Files:**
- `src/components/Skeleton/index.tsx`
- `src/components/Skeleton/Skeleton.stories.tsx`
- `docs/content/docs/components/feedback/skeleton.mdx`

**Approach:** Add a short comment above `Skeleton`'s `aria-hidden="true"`
explaining that the placeholder itself is correctly hidden, but a group of
skeletons needs its own `role="status"` wrapper with visually-hidden text
to announce loading state — pointing at the new story for the worked
example. Add a new Storybook story (e.g. `AccessibleLoadingRegion`)
demonstrating: a wrapping `<div role="status">` containing the existing
`CardSkeleton`-style composition plus a visually-hidden (`sr-only` or
equivalent) `<span>Loading…</span>`. Add a matching "Loading announcements"
section to `skeleton.mdx` with the same guidance and a short code snippet.

**Technical design:** *(directional, not implementation-ready)*

```text
<div role="status">
  <span class="sr-only">Loading…</span>
  <Skeleton .../>  <!-- aria-hidden, as today -->
  <Skeleton .../>
</div>
```

`role="status"` carries an implicit `aria-live="polite"` — the
visually-hidden text is announced once when the region mounts, without
re-announcing on every shimmer frame, and the individual `Skeleton`s stay
out of the accessibility tree exactly as they are today.

**Test scenarios:** Test expectation: none — this unit is documentation
and a Storybook story; `Skeleton`'s own component and test file are
unchanged (no new prop, no behavior change).

**Verification:** `pnpm storybook:build` succeeds; visually confirm the
new story renders correctly; `docs` `typecheck`/`lint`/`build` pass if the
`skeleton.mdx` note references any code that needs to compile (a plain
prose/snippet addition does not).

---

### U5. Close out: decision log and ticket resolution

**Goal:** Record the token additions and the L-6 pattern decision; mark the
ticket's resolved items.

**Requirements:** R5

**Dependencies:** U1-U4

**Files:**
- `documentation/decisions/001-stack-choices.md`
- `documentation/kanban/QA-DESIGN-REVIEW-2026-05-29.md`

**Approach:** Append one dated decision-log entry covering both the
token additions (KTD1) and the L-6 pattern resolution (KTD2). Append a
resolution note to the QA ticket's Notes section (append-only) summarizing
what changed and referencing this plan file; the ticket's overall
`**Status:**` can move to Done once `BUG-008` and `H-10` are confirmed as
the only remaining open items (left as Todo/separate-initiative, not
blocking this ticket's other resolved work).

**Test scenarios:** Test expectation: none — documentation only.

**Verification:** Full root + docs `typecheck`/`lint`/`test`/`build` (and
`pnpm storybook:build`) pass; ticket and decision log are appended-to, not
rewritten.

---

## Risks & Dependencies

- **Low risk, mechanical.** All four token substitutions in U2 are
  value-preserving (no visual change). U4 adds new, additive content only
  (no existing API changes). The main risk is a missed reference to one of
  the four old arbitrary-value classes; covered by a repo-wide grep in
  verification.
