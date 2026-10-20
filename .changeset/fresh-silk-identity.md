---
"@sumiui/react": major
---

Fresh Silk identity refresh: a near-white ground, a Song display face and real brushwork, replacing the cream "Aged Silk" look (decision log `004-fresh-silk-identity.md`). This is a clean break with no deprecation shims.

### Breaking changes and migration

- **React 19 or later.** `peerDependencies` are now `react >=19` and `react-dom >=19` (some components rely on React 19 passing `ref` as a prop).
- **Dependencies are no longer bundled.** Radix, lucide-react, clsx, tailwind-merge and TanStack Virtual are imported from your `node_modules`, so your bundler shares one copy with your own code (fixes click-outside and focus-layer clashes between your Radix popovers and Sumi dialogs). `dist/index.js` drops from 465 KB to 116 KB.
- **Generated field IDs.** Input, TextArea, Checkbox, Switch, RadioItem, Select and DatePicker no longer derive `id` from the label text (`input-email`); they use `React.useId()`, so repeated labels no longer collide. Pass `id` if your code or tests relied on the old slug.
- **Tabs weight.** Every tab is `font-medium`; the active tab reads by ink colour and the underline, so switching tabs no longer shifts the row.
- **Card section padding** comes from the variant: `plain` sections are `px-0`, `bordered` sections `px-5`, set as a base class so your own `px-*` on `CardHeader`/`CardBody`/`CardFooter` now wins (replaces the `[&>*]:px-0` override).
- **`Card` variants.** `CardVariant` is now `"plain" | "bordered"` (was `"default" | "elevated"`), default `"plain"`. `plain` has no fill or box, just one `--line-2` hairline above and children flush to the column; `bordered` is a white sheet with a hairline edge. Cards never carry a shadow.
  - `variant="default"` → omit `variant` (or `variant="plain"`); use `variant="bordered"` where the region must read as a discrete object.
  - `variant="elevated"` → `variant="bordered"`.
- **`Tabs` `variant` prop removed** from `TabsList` and `TabsTrigger`; tabs are underline-only. Replace `variant="segmented"` with `SegmentedControl`.
- **`.accent-em` removed** (italic cinnabar headline word). Use `.ink-em`: one upright word at `--weight-semi` in `--ink-jiao`.
- **Tokens and utilities removed:** `--shadow-xl` / `--sumi-shadow-xl`, `--shadow-seal` / `--sumi-shadow-seal`, `--radius-5`, `--radius-2xl`. Tailwind's own defaults are reset too, so `shadow-xl`, `shadow-2xl`, `rounded-2xl` and `rounded-3xl` generate no CSS. Use `shadow-lg` for floating overlays only and `rounded-xl` (`--radius-4`, 10px) as the largest radius.
- **Display face:** `--sumi-font-display` / `--font-serif` are now Noto Serif SC (Song). Cormorant Garamond is no longer loaded, and quotes are upright.
- **Surfaces:** `--bg-0` is `#F9F8F4`, and cards (`--bg-1`) are white, so cards are now *lighter* than the page. `--bg-2` is `#F1F0EB` and `--bg-3` is `#E4E2DB`. Anything that assumed a darker card or a cream ground should be re-checked.
- **Raw scale values changed** (for code that reads the scales directly): `--silk-50` `#FFFFFF`, `--silk-100` `#F9F8F4`, `--silk-200` `#F1F0EB`, `--silk-300` `#E4E2DB`, `--pigment-silk` `#F9F8F4`, `--ink-400` `#6E6962`, `--malachite-50` `#E8F1EB`, `--azurite-50` `#E8EDF3`, `--cinnabar-50` `#FAEBE7`.
- **Base styles are layered:** `globals.css` is imported into `@layer base`, so element rules (`p`, headings) no longer beat Tailwind utilities. Text that relied on the old unlayered `p` colour, size or margin now takes the utility you set.
- **Shape:** Badges, the Alert bar, the Stepper bar and the Sheet handle are square; the Switch track uses `--radius-2` with a `--radius-1` thumb; the mobile Sheet top radius is `--radius-3`.
- **Seal:** flat `--pigment-cinnabar` at `--radius-1` with a worn-edge filter and no glow. The Avatar seal badge and the `seal` Badge follow (the Badge no longer uses `--highlight`).
- **Rendering changes without an API change:** the `EmptyState` `closingBeat` is upright, not italic; the Tabs active underline uses `--line-ink`.

### Additions

- `"use client"` banner on both bundles, so the components import directly into React Server Component trees (Next.js App Router).
- CommonJS type declarations (`dist/index.d.cts`, `exports.require.types`): TypeScript CommonJS projects using `node16`/`nodenext` no longer hit TS1479.
- `DatePicker`: full keyboard grid (arrows by day/week, Home/End, PageUp/PageDown by month, Shift+Page by year), focus lands on the selected day, the view re-syncs to `value` on open, out-of-range days are `aria-disabled` but reachable, and a `locale` prop (defaults to the runtime locale) drives the trigger, month title, weekday headers and day labels.
- `Combobox` and `CommandPalette` announce the highlighted option to screen readers (`aria-activedescendant`, option ids, `aria-autocomplete="list"`, `aria-multiselectable` in multiple mode, status regions for loading/empty).
- `color-scheme` follows the theme, so native checkboxes, scrollbars and form controls render dark in dark mode.
- Ink tones `--ink-jiao/nong/zhong/dan/qing` (焦浓重淡清), exposed as `--color-ink-*`. `--fg-1..4` and `--line-ink` resolve through them and invert in dark.
- `--knockout` for marker rings (Timeline, Stepper, Avatar): it defaults to `--bg-0`, and white containers set it to `--bg-1`.
- `--paper-grain`: a faint silk-fibre texture on the light `body`, off in dark and under `prefers-contrast: more`.
- `.brush-rule` is a tapered 56×3 ink stroke (an SVG mask over `--line-ink`).
- `--badge-*` component tokens so the brand Badge tones stay legible in dark mode.

### Fixes

- `Select` and `DatePicker` now forward `ref` to their trigger (it was always `null`), so form libraries can focus them.
- Fields without a label no longer point `aria-describedby` at `undefined-error`.
- `Pagination`'s current page and `Tooltip` use theme-flipping ink, so they stay visible in dark mode.
- The selected `Timeline` row is a sunken wash with an ink bar (its meta text was 4.2:1 on the old pressed fill), and the dark danger `Toast` description passes AA (90% mix).
- `CommandPalette`: hovering a command highlights that command, not the last one.
- `Seal` warns about the `color` prop once, not on every render; the compact `Stepper` progressbar is no longer an empty tab stop; `Sheet`'s viewport hook is hydration-safe.
- WCAG AA restored: `--fg-3` is `#6E6962`, the warning bar uses `--persimmon-600`, status tints are retuned, and dark accent, secondary, highlight and status text step one shade lighter. Guarded by the new `tokens.contrast.test.ts`.
- The Ink button flips with the theme; the Danger button and Toast use the status tokens; the Tabs underline and Timeline/Stepper rings are visible in dark.
- Combobox listbox width, the Toast dismiss position, Seal glyph centring and helper/error text sizing (via the layering fix).
