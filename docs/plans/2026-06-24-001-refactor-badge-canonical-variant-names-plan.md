# refactor: Migrate Badge to canonical pigment variant names

---

## Summary

`Sumi-Design-System` retired its informal color nicknames (`jade`, `clay`,
`peach`, `rice`) in favor of canonical pigment family names (`malachite`,
`canvas`, `cinnabar`/`sienna`, `silk`) across its own content — see
`UI_GUIDE.md` §2 and `documentation/decisions/001-stack-choices.md`'s
2026-06-24 entry. SumiUi's token layer already only points the alias CSS
variables *at* the canonical ones, so no token value is wrong. `Badge` is
the one exception: its public `variant` prop type uses the retired names
themselves (`"jade" | "clay" | "peach"`) as API surface, not just an
internal reference. This plan adds the canonical variant names to `Badge`
alongside the existing ones — deprecated but still functional — mirroring
exactly the backward-compatible strategy the design system itself used, so
no existing consumer breaks.

**Target repo:** SumiUi (this plan affects `src/components/Badge/` and
`documentation/` only; `Sumi-Design-System/` is read-only and untouched)

---

## Problem Frame

- **R1.** `Badge`'s `BadgeVariant` type and its two class-lookup maps
  (`variantClasses`, `dotColorClasses` in `src/components/Badge/index.tsx`)
  use the retired alias names (`jade`, `clay`, `peach`) as the actual prop
  values a consumer passes, not just as internal token references.
  `UI_GUIDE.md` §2 explicitly states new work should never author against
  the alias names.
- **R2.** `Badge` is exported from the published `@sumiui/react` npm
  package (currently `1.3.0`), so any change to `BadgeVariant` is a public
  API change with real consumers (the npm registry shows this package is
  already live).
- **R3.** A prior session already logged the design-system sync as a
  decision and opened `documentation/kanban/IMPROVEMENT-badge-variant-
  naming.md` (Status: Todo) describing this exact gap, with acceptance
  criteria: decide a migration strategy, update the component + its tests/
  stories/consumers, note semver impact, and confirm no other component is
  affected.
- **R4.** Confirmed via repo-wide grep this session: `Badge` is the *only*
  component whose public prop API uses a retired alias name. No other
  `*.types.ts` file is affected.

---

## Key Technical Decisions

**KTD1 — Deprecate, don't break.** Add `malachite`, `canvas`, `sienna` as
new `BadgeVariant` values that resolve to the exact same Tailwind classes
the existing `jade`/`clay`/`peach` entries already use (those entries
already reference `bg-malachite-100`, `bg-canvas-100`, `bg-cinnabar-100`
internally — only the *key name* is the alias, not the CSS). Keep
`jade`/`clay`/`peach` working, mark them `@deprecated` via JSDoc pointing to
their canonical replacement.
**Rationale:** Mirrors exactly what `Sumi-Design-System` itself did with its
own CSS aliases ("nothing breaks, only references migrate"). User-confirmed
this session as the preferred strategy over a clean breaking rename or
leaving Badge untouched.

**KTD2 — `seal` is unaffected.** `seal` was never a retired alias (it maps
to `--highlight`/cinnabar directly and isn't in UI_GUIDE.md's retired-alias
table) — it stays as-is, not renamed or duplicated.

**KTD3 — Stories/tests show canonical as primary, legacy as back-compat.**
`Badge.stories.tsx`'s `BrandVariants`/`AllWithDots` stories currently
demonstrate `jade`/`clay`/`peach`. Per UI_GUIDE.md §2 ("all new work uses
the canonical name"), the primary demonstration should switch to
`malachite`/`canvas`/`sienna`; the legacy names get a smaller dedicated
story proving they still render identically, rather than being deleted.

**KTD4 — Minor version, changeset required.** Adding new accepted prop
values without removing old ones is additive — a `minor` bump under
semver. The project already uses `@changesets/cli` (see `.changeset/`
format from prior releases); this plan adds one changeset file.

---

## Scope Boundaries

**In scope:** `Badge`'s type definition, implementation, stories, and tests;
the changeset; closing out the already-open kanban ticket and decision log.

**Out of scope:**
- Any component other than `Badge` (confirmed via grep — none affected).
- The unrelated `documentation/graphify-out` knowledge-graph scope mismatch
  (tracked separately in `IMPROVEMENT-graphify-baseline-mismatch.md`).
- Rewriting `documentation/kanban/PHASE-2-foundation-components.md`'s body —
  it's a `Status: Done` ticket and this repo's convention is append-only,
  never rewrite. It still literally lists `jade | clay | peach | seal` as
  what shipped at the time, which remains historically accurate.
- Building `docs/content/docs/components/foundation/badge.mdx` (the
  Fumadocs demo page) — it's still a "Coming soon" stub from an unrelated,
  not-yet-started slice of work (PHASE-9's Foundation category). Whenever
  that page is eventually written, it should demonstrate the canonical
  names by default — noted, not actioned here.

### Deferred to Follow-Up Work
- Removing the deprecated `jade`/`clay`/`peach` values entirely is a future
  breaking change (major version) — not this plan. Revisit once enough of a
  deprecation window has passed.

---

## Implementation Units

### U1. Extend `BadgeVariant` and its class maps with canonical names

**Goal:** Add `malachite`, `canvas`, `sienna` as fully-supported
`BadgeVariant` values; mark the retired names deprecated without removing
them.
**Requirements:** R1, R2, R4
**Dependencies:** none
**Files:**
- `src/components/Badge/Badge.types.ts`
- `src/components/Badge/index.tsx`
**Approach:** In `Badge.types.ts`, add `"malachite" | "canvas" | "sienna"`
to the `BadgeVariant` union, and add a `@deprecated Use "malachite" instead`
(etc.) JSDoc comment directly above each retired literal in the union so
editors surface the warning at the call site. In `index.tsx`, add
`malachite`/`canvas`/`sienna` keys to both `variantClasses` and
`dotColorClasses`, copying the exact class strings currently under
`jade`/`clay`/`peach` respectively (do not introduce new class values — the
visual output must be pixel-identical between an old and new variant name).
Leave `jade`/`clay`/`peach` entries in place unchanged.
**Patterns to follow:** The existing `Record<BadgeVariant, string>` shape in
`index.tsx` — this is purely additive entries in that same record, no
structural change.
**Test scenarios:**
- Happy path: `<Badge variant="malachite">` renders the same class string
  previously asserted for `variant="jade"`. Same for `canvas`/`clay` and
  `sienna`/`peach`.
- Happy path: `<Badge variant="jade">` (and `clay`/`peach`) still renders
  identically to before this change — no regression for existing callers.
- Edge case: TypeScript should accept all 12 `BadgeVariant` values
  (`neutral`, `success`, `warning`, `danger`, `info`, `jade`, `clay`,
  `peach`, `malachite`, `canvas`, `sienna`, `seal`) without a type error.
**Verification:** `pnpm typecheck` and `pnpm test -- Badge` pass; visually
diffing a `malachite` badge against a `jade` badge shows no pixel
difference (same class string).

### U2. Update `Badge.test.tsx` coverage

**Goal:** Extend the existing parametrized variant test to cover the three
new canonical values alongside the retired ones, proving both render and
neither throws.
**Requirements:** R1, R4
**Dependencies:** U1
**Files:**
- `src/components/Badge/Badge.test.tsx`
**Approach:** The existing test does
`it.each(["jade", "clay", "peach", "seal"])(...)`. Extend the array to
include `"malachite"`, `"canvas"`, `"sienna"` (alongside, not replacing,
the existing values) so both old and new names are covered by the same
parametrized assertion.
**Patterns to follow:** The existing `it.each` block in this same file —
no new test structure needed, just a wider input array.
**Test scenarios:**
- Happy path: each of the 7 brand/semantic-adjacent variants (`jade`,
  `clay`, `peach`, `malachite`, `canvas`, `sienna`, `seal`) renders without
  throwing and applies a non-empty class string.
- Integration: rendering `<Badge variant="malachite" dot>` applies both the
  variant class and the dot-color class together (mirrors however the
  existing test already checks `dot` interaction, if it does — add this
  case if not already covered for the legacy variants).
**Verification:** `pnpm test -- Badge` passes with the widened parametrized
set; coverage of the new values confirmed by reading the test run output
(no skipped cases).

### U3. Update `Badge.stories.tsx` to lead with canonical names

**Goal:** Make `malachite`/`canvas`/`sienna` the primary documented
examples; keep `jade`/`clay`/`peach` demonstrated as a smaller back-compat
proof rather than the default story.
**Requirements:** R1, KTD3
**Dependencies:** U1
**Files:**
- `src/components/Badge/Badge.stories.tsx`
**Approach:** Update the `argTypes.variant.options` array to list the
canonical names alongside the rest (keep legacy names in the list too — the
Storybook control should still let someone pick `jade` and see it works).
Rename/repurpose the existing `BrandVariants` story to render
`malachite`/`canvas`/`sienna` instead of `jade`/`clay`/`peach`. Add a new,
smaller story (e.g. `LegacyAliases`) that renders the three retired names
side-by-side with a one-line comment noting they're deprecated aliases kept
for back-compat — this proves visually that nothing broke. Apply the same
swap to the `AllWithDots` story's brand row.
**Patterns to follow:** This file's own existing `render: () => (...)`
story shape — no new story-authoring pattern needed.
**Test scenarios:** Test expectation: none — Storybook stories are visual
documentation, not behavior under test; covered functionally by U1/U2.
**Verification:** `pnpm storybook:build` succeeds; manually opening the
`Foundation/Badge` story in Storybook shows the canonical names as the
primary brand row and the legacy names still rendering correctly in their
own story.

### U4. Add a changeset for the minor version bump

**Goal:** Record this as a `minor` release per semver (additive API
surface, no removals).
**Requirements:** R2, KTD4
**Dependencies:** U1, U2, U3
**Files:**
- `.changeset/<generated-name>.md` (new file)
**Approach:** Follow the existing changeset format used by this repo
(frontmatter `"@sumiui/react": minor`, followed by a one-line human
description, e.g. "Add canonical malachite/canvas/sienna Badge variants;
jade/clay/peach are now deprecated aliases, not removed.").
**Test scenarios:** Test expectation: none — this is a release metadata
file, not behavior.
**Verification:** File matches the shape of prior changesets in this repo's
git history (frontmatter + one-line description); `pnpm changeset status`
(or equivalent) recognizes it without error.

### U5. Close out the documentation trail

**Goal:** Resolve the already-open tracking ticket and append the
resolution to the decision log, per this repo's append-only documentation
convention.
**Requirements:** R3
**Dependencies:** U1, U2, U3, U4
**Files:**
- `documentation/kanban/IMPROVEMENT-badge-variant-naming.md`
- `documentation/decisions/001-stack-choices.md`
**Approach:** In the kanban ticket, check off the acceptance criteria that
are now satisfied (migration strategy decided, component/tests/stories
updated, semver noted) and prepend `**Status: Done**` per this repo's
"mark done by prepending Status: Done, don't rewrite the body" convention.
Append (do not rewrite) one note line with the date and a one-sentence
summary of what shipped. In `001-stack-choices.md`, append a new dated
decision entry recording the resolution (KTD1-KTD4 above, condensed),
linking back to the original 2026-06-24 sync entry rather than duplicating
it.
**Test scenarios:** Test expectation: none — documentation only.
**Verification:** Both files render correctly as markdown; the kanban
ticket's checkboxes and status line are internally consistent; the
decisions log reads as a coherent append-only history.

---

## Risks & Dependencies

- **Risk:** A future major-version cleanup that removes `jade`/`clay`/
  `peach` entirely will be a breaking change for any consumer who adopted
  them in the meantime — already captured under "Deferred to Follow-Up
  Work" so it isn't forgotten.
- **Dependency:** None outside this repo — Sumi-Design-System is read-only
  and already fully migrated; this plan only touches SumiUi's own component
  and docs.

---

## Documentation Plan

Covered by U5 above — this plan's own documentation footprint is the
kanban ticket closeout and decision log entry, not a separate doc-writing
task.
