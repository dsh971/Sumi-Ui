---
"@sumiui/react": minor
---

Design-system fidelity pass: new overlay primitives, virtualized large-data components, and motion/accessibility fixes across the library.

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
