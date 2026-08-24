# @sumiui/react

## 2.1.2

### Patch Changes

- acc3f66: Fix Sumi's own design tokens silently overriding Tailwind v4's reserved theme variables of the same name, which corrupted Tailwind utility classes for any consuming app. Root cause: Tailwind always compiles its theme variables (built-in defaults and any `@theme` override) into `@layer theme`, and unlayered CSS always wins over layered CSS regardless of source order — so any Sumi token declared unprefixed on a plain `:root` silently beat Tailwind's own value.

  Confirmed and fixed for:

  - `--container-sm/-md/-lg/-xl/-2xl` — was corrupting `max-w-sm`…`max-w-2xl` (viewport widths instead of Tailwind's rem-based content widths)
  - `--text-xs`…`--text-6xl` — was corrupting `text-xs`…`text-6xl` (the entire font-size scale)
  - `--ease-out`, `--ease-in-out` — was corrupting those transition-timing utilities
  - `--leading-tight/-snug/-loose` — was corrupting those line-height utilities

  All renamed to `--sumi-*` (e.g. `--sumi-text-sm`); no `@theme` involvement, since Tailwind's own scale is correct for consumers using those utility classes.

  Also fixed a related but different bug: `--shadow-xs/-sm/-md/-lg/-xl/-inset/-seal`, `--font-mono`, `--font-display`, and `--radius-full` were declared twice — once correctly in `@theme` (dead, since it's layered and always lost to the duplicate) and once unprefixed on `:root` (which actually won, by luck of matching values). Consolidated to one source (`--sumi-shadow-*`, `--sumi-font-mono`, `--sumi-font-display`, `--sumi-radius-full`) that `@theme` now references via `var()`, so the `shadow-*`/`font-mono`/`font-display`/`rounded-full` Tailwind utilities and internal component styling both resolve the same, theme-aware value instead of a fragile, hand-synced duplicate. Also fixed an already-drifted `--font-display` (the dead `@theme` copy was missing a `"Songti SC"` fallback that the winning copy had) as a side effect of the consolidation.

  `--font-body`/`--font-han` (no Tailwind collision, but same token group) renamed to `--sumi-font-body`/`--sumi-font-han` for consistency.

  No visual change for any SumiUi component — only to previously-corrupted Tailwind utility classes in consuming apps, which now resolve correctly, and to the handful of `--sumi-*`-renamed CSS variables a consumer may have referenced directly.

## 2.1.1

### Patch Changes

- 3cabf7a: Fix `Avatar` fallback-initials text rendering above center (missing `line-height`), and correct `AvatarSeal`'s badge to use the design system's own `.seal` tokens (`--cinnabar-400`, `--fg-on-ink`, `--radius-2`, `--shadow-seal`) instead of ad hoc values, plus a `--bg-0` separation ring so the badge reads as an intentional layered element against the circular avatar. The seal's square shape is unchanged — it's an intentional reference to a Chinese chop/seal, not a bug.

## 2.1.0

### Minor Changes

- 3a37573: Design-system fidelity pass: new overlay primitives, virtualized large-data components, and motion/accessibility fixes across the library.

  ***

  New components

  - **Sheet** — the responsive overlay primitive (`Sheet`, `SheetTrigger`, `SheetContent`, `SheetTitle`, `SheetDescription`, `SheetClose`). Centered modal at/above `breakpoint` (default 640px), bottom sheet with a drag handle below it. `Dialog` is now built on this internally — `Dialog`'s own public API is unchanged.
  - **Popover** — a public, trigger-anchored overlay (`Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverContent`, `PopoverClose`) wrapping `@radix-ui/react-popover`, which was previously only used internally by `DatePicker`/`Combobox`.
  - **SegmentedControl** — a standalone "paper inset" single-select value picker (`SegmentedControl`, `SegmentedControlItem`), distinct from `Tabs`' segmented variant (no associated content panels).

  ***

  New capabilities on existing components

  - `TableBody` accepts an optional `virtualize` prop (`{ rows, estimateRowHeight, renderRow, overscan? }`) for windowed rendering of large datasets. Opt-in only — default rendering (via `children`) is unchanged.
  - `Combobox`'s option list is now internally virtualized via `@tanstack/react-virtual`, so large option lists (hundreds/thousands) render only the visible window. No API change.

  ***

  Fixes

  - **Badge** — `sienna`/`peach` variants previously resolved to the wrong (cinnabar) color scale; now correctly use the `sienna-*` token scale.
  - **Button** — press feedback (`active:translateY`) previously had no transition applied to `transform`, so it snapped instead of animating.
  - **Motion** — every overlay (Dialog/Sheet, Toast, Tooltip, DropdownMenu, Select, CommandPalette, DatePicker, Alert) now animates using real keyframes wired to the design system's `--dur-*`/`--ease-*` tokens. Previously these referenced a `tailwindcss-animate` vocabulary that was never installed, so overlays opened/closed with no transition at all.
  - **Accessibility** — `focus-visible:` used consistently instead of `focus:` on Input/Select/Combobox/DatePicker (ring no longer shows on mouse click); Checkbox/Radio/Switch's label+control gap is now part of the click/tap target; popover-family components (Tooltip, DropdownMenu, Select, Combobox, Popover) now scale in from their trigger instead of a fixed center.
  - **RTL** — logical properties (`ps-`/`pe-`/`start-`/`end-`) used instead of physical-direction utilities across Alert, Avatar, Checkbox, Combobox, DatePicker, DropdownMenu, Select, Table, Timeline, and Toast, so the system mirrors correctly under `dir="rtl"`.
  - **Spacing tokens** — `tokens.css` now defines the canonical named spacing scale (`--space-050`…`--space-1600`) as primary, with the ordinal scale (`--space-1`…`--space-12`) as deprecated aliases — matching the design system's own source. Pixel-value-preserving; no visual change for existing consumers.

## 2.0.0

### Major Changes

- 8ced90f: React compatibility

  - Widened peerDependencies from >=19.0.0 to >=18.0.0 for both react and react-dom. No React 19-specific APIs were in use; all components use forwardRef which works identically on both versions.

  ***

  New features

  Badge — canonical brand variant names

  - Added "malachite", "canvas", and "sienna" as the canonical names for the three brand-color Badge variants.
  - "jade", "clay", and "peach" remain as deprecated back-compat aliases (marked with @deprecated JSDoc) — they render identically and will not be removed in a minor release.

  Tabs — underline variant

  - Added "underline" as a second variant alongside "segmented". "underline" is now the default, matching the design system's primary tab pattern.

  Switch — error state

  - Added errorText prop matching the Input and Checkbox error pattern. When set, errorText replaces helperText and the control is marked aria-invalid.

  ***

  Visual / design fixes

  ┌──────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Component │ Fix │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Button │ Border-radius rounded-lg → rounded-md (4px per spec); sm/lg padding corrected; danger variant changed to outlined (transparent bg, │
  │ │ cinnabar border/text) │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Button │ Focus ring changed to --accent (malachite green) across all interactive components │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Input │ Background --bg-1 → --bg-0; label uppercase/tracking-wide removed; focus ring --accent + 3px halo │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Badge │ Padding px-2 py-0.5 → px-[10px] py-[3px]; font-size text-xs → text-[11.5px]; neutral border --line-2 → --line-1 │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Alert │ danger variant changed from soft tint to inverse cinnabar (dark fill, silk text); 4px left accent bar added per variant │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Dialog │ Title font Inter → Cormorant Garamond 20px; border-radius 6px → 10px; header bottom border removed │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ EmptyState │ Title Inter → Cormorant Garamond 20px │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Avatar │ Fallback text uses font-display (Cormorant Garamond) per spec │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Pagination │ Active page uses ink-800 fill, not --accent │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Breadcrumb │ Link color fg-2 → fg-3 │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ DropdownMenu │ Separator inset –mx-1 → mx-2 │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Skeleton │ Shimmer highlight stop --bg-3 → var(--canvas-50) │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Tabs │ Inactive hover uses bg-bg-sunken token instead of raw var(--bg-2) │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Tooltip │ sideOffset 6 → 8 │
  ├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Table │ Header background uses bg-bg-sunken │
  └──────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  ***

  Layout / token fixes

  Card sub-component padding

  - CardHeader, CardBody, and CardFooter now use first:pt-5 / last:pb-5 Tailwind variants so each sub-component's outer edge is always 20px when it's first or last inside a Card, regardless of which combination is used. Previously, partial compositions (e.g. Header+Body only) rendered asymmetric padding.

  Named grid-column tokens

  - Replaced raw arbitrary-value grid-cols-[...] classes with named semantic utilities defined in @theme:
    - grid-cols-step-node-content (Stepper)
    - grid-cols-timeline-time-marker-content / grid-cols-timeline-marker-content (Timeline)
    - grid-cols-shell-sidebar-content-properties / grid-cols-shell-content-properties / grid-cols-shell-sidebar-content / grid-cols-shell-content (Workspace example)
  - Component-scoped one-off values extracted to CSS tokens: --textarea-min-h, --avatar-fallback-text-sm, --badge-dot-size, --dialog-backdrop-blur.

  ***

  Accessibility fixes

  Combobox

  - Trigger changed from Popover.Trigger asChild (which injected aria-expanded onto a <div>, causing an aria-allowed-attr axe violation) to Popover.Anchor asChild. Open state was already fully controlled so the Trigger was redundant; popover content width updated to use --radix-popover-anchor-width.

  Other ARIA fixes

  - Alert warning role corrected: role="status" → role="alert" / aria-live="assertive"
  - Table sortable columns set aria-sort="none" when unsorted (previously omitted)
  - Avatar root span gains role="img" and aria-label
  - FileUpload label changed from <p> to <label htmlFor> wired to the hidden input
  - Checkbox checked prop destructured before spread to prevent stale reference in the indicator
  - BreadcrumbSeparator gains forwardRef
  - Select composed wrapper, Pagination, EmptyState, Logo, Seal, FileUpload, DatePicker all gain forwardRef

  ***

  Mobile / responsive

  ┌──────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────┐
  │ Component │ Fix │
  ├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
  │ Dialog │ w-full max-w-lg → w-[calc(100vw-2rem)] max-w-lg — 16px margin each side on small screens │
  ├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
  │ CommandPalette │ Same calc(100vw-2rem) constraint │
  ├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
  │ ToastViewport │ w-80 right-4 → w-auto sm:w-80 right-4 left-4 sm:left-auto — full-width on mobile │
  ├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
  │ Toast root │ w-80 → w-full sm:w-80 │
  ├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
  │ Alert dismiss button │ Padding p-0.5 → p-2 (30px tap area, above WCAG 2.5.8 AA minimum) │
  ├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
  │ ToastClose button │ Fixed 22×22px → min-w/h-[36px] (36px tap area) │
  └──────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────┘

### Minor Changes

- 8ced90f: Add canonical malachite/canvas/sienna Badge variants; jade/clay/peach are now deprecated aliases, not removed.
- 8ced90f: Add named `grid-cols-*` utility classes (`grid-cols-shell-sidebar-content-properties`, `grid-cols-shell-content-properties`, `grid-cols-shell-sidebar-content`, `grid-cols-shell-content`, `grid-cols-step-node-content`, `grid-cols-timeline-time-marker-content`, `grid-cols-timeline-marker-content`) that encode their own track roles, replacing the equivalent raw arbitrary-value `grid-cols-[...]` classes used internally by `Stepper` and `Timeline`.

### Patch Changes

- 8ced90f: Fix `CardHeader`/`CardBody`/`CardFooter` padding to be position-independent: each sub-component's outer edge is now correctly 20px whenever it's the first or last child inside a `Card`, regardless of which other sub-components are present. Previously a lone `CardHeader`, `CardBody`, or `CardFooter` (or any partial combination) rendered asymmetric or undersized padding; the full `Header`+`Body`+`Footer` composition is visually unchanged.

## 1.3.0

### Minor Changes

- c93bcca: Added Grid and imporve containers. Alos fix darkmode bug

## 1.2.0

### Minor Changes

- 694a297: Made improvements to timeline components to enable new usecases

## 1.1.0

### Minor Changes

- 12d61ad: Added components for toast, combobox, stepper and timeline per new design update

## 1.0.0

### Major Changes

- 5656341: Initial release of `@sumiui/react` — React component library implementing the Sumi Design System (水墨).

  **20 components across 7 phases:**

  Foundation: Button · Input · TextArea · Card · Badge · Dialog

  Forms: Select · Checkbox · RadioGroup · RadioItem · Switch · DatePicker · FileUpload

  Navigation: Tabs · Breadcrumb · DropdownMenu · Pagination

  Feedback: Alert · Tooltip · Skeleton · EmptyState

  Data: Table (sortable columns, row selection, striped, sticky header, dense density)

  Brand: Avatar · AvatarSeal · Logo · Seal

  **Features:**

  - Tailwind v4 with full `@theme` token mapping
  - Dark mode via `[data-theme="dark"]`
  - WCAG AA accessibility throughout
  - TypeScript strict mode
  - ESM + CJS dual output
  - CSS tokens as `dist/sumi.css`
