---
"@sumiui/react": major
---

React compatibility

- Widened peerDependencies from >=19.0.0 to >=18.0.0 for both react and react-dom. No React 19-specific APIs were in use; all components use forwardRef which works identically on both versions.

---
New features

Badge — canonical brand variant names
- Added "malachite", "canvas", and "sienna" as the canonical names for the three brand-color Badge variants.
- "jade", "clay", and "peach" remain as deprecated back-compat aliases (marked with @deprecated JSDoc) — they render identically and will not be removed in a minor release.

Tabs — underline variant
- Added "underline" as a second variant alongside "segmented". "underline" is now the default, matching the design system's primary tab pattern.

Switch — error state
- Added errorText prop matching the Input and Checkbox error pattern. When set, errorText replaces helperText and the control is marked aria-invalid.

---
Visual / design fixes

┌──────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  Component   │                                                                  Fix                                                                   │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Button       │ Border-radius rounded-lg → rounded-md (4px per spec); sm/lg padding corrected; danger variant changed to outlined (transparent bg,     │
│              │ cinnabar border/text)                                                                                                                  │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Button       │ Focus ring changed to --accent (malachite green) across all interactive components                                                     │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Input        │ Background --bg-1 → --bg-0; label uppercase/tracking-wide removed; focus ring --accent + 3px halo                                      │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Badge        │ Padding px-2 py-0.5 → px-[10px] py-[3px]; font-size text-xs → text-[11.5px]; neutral border --line-2 → --line-1                        │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Alert        │ danger variant changed from soft tint to inverse cinnabar (dark fill, silk text); 4px left accent bar added per variant                │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Dialog       │ Title font Inter → Cormorant Garamond 20px; border-radius 6px → 10px; header bottom border removed                                     │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ EmptyState   │ Title Inter → Cormorant Garamond 20px                                                                                                  │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Avatar       │ Fallback text uses font-display (Cormorant Garamond) per spec                                                                          │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Pagination   │ Active page uses ink-800 fill, not --accent                                                                                            │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Breadcrumb   │ Link color fg-2 → fg-3                                                                                                                 │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DropdownMenu │ Separator inset –mx-1 → mx-2                                                                                                           │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Skeleton     │ Shimmer highlight stop --bg-3 → var(--canvas-50)                                                                                       │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Tabs         │ Inactive hover uses bg-bg-sunken token instead of raw var(--bg-2)                                                                      │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Tooltip      │ sideOffset 6 → 8                                                                                                                       │
├──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Table        │ Header background uses bg-bg-sunken                                                                                                    │
└──────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

---
Layout / token fixes

Card sub-component padding
- CardHeader, CardBody, and CardFooter now use first:pt-5 / last:pb-5 Tailwind variants so each sub-component's outer edge is always 20px when it's first or last inside a Card, regardless of which combination is used. Previously, partial compositions (e.g. Header+Body only) rendered asymmetric padding.

Named grid-column tokens
- Replaced raw arbitrary-value grid-cols-[...] classes with named semantic utilities defined in @theme:
  - grid-cols-step-node-content (Stepper)
  - grid-cols-timeline-time-marker-content / grid-cols-timeline-marker-content (Timeline)
  - grid-cols-shell-sidebar-content-properties / grid-cols-shell-content-properties / grid-cols-shell-sidebar-content / grid-cols-shell-content (Workspace example)
- Component-scoped one-off values extracted to CSS tokens: --textarea-min-h, --avatar-fallback-text-sm, --badge-dot-size, --dialog-backdrop-blur.

---
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

---
Mobile / responsive

┌──────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────┐
│      Component       │                                           Fix                                            │
├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
│ Dialog               │ w-full max-w-lg → w-[calc(100vw-2rem)] max-w-lg — 16px margin each side on small screens │
├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
│ CommandPalette       │ Same calc(100vw-2rem) constraint                                                         │
├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
│ ToastViewport        │ w-80 right-4 → w-auto sm:w-80 right-4 left-4 sm:left-auto — full-width on mobile         │
├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
│ Toast root           │ w-80 → w-full sm:w-80                                                                    │
├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
│ Alert dismiss button │ Padding p-0.5 → p-2 (30px tap area, above WCAG 2.5.8 AA minimum)                         │
├──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────┤
│ ToastClose button    │ Fixed 22×22px → min-w/h-[36px] (36px tap area)                                           │
└──────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────┘