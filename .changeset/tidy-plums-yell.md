---
"@sumiui/react": patch
---

Fix Sumi's own design tokens silently overriding Tailwind v4's reserved theme variables of the same name, which corrupted Tailwind utility classes for any consuming app. Root cause: Tailwind always compiles its theme variables (built-in defaults and any `@theme` override) into `@layer theme`, and unlayered CSS always wins over layered CSS regardless of source order — so any Sumi token declared unprefixed on a plain `:root` silently beat Tailwind's own value.

Confirmed and fixed for:
- `--container-sm/-md/-lg/-xl/-2xl` — was corrupting `max-w-sm`…`max-w-2xl` (viewport widths instead of Tailwind's rem-based content widths)
- `--text-xs`…`--text-6xl` — was corrupting `text-xs`…`text-6xl` (the entire font-size scale)
- `--ease-out`, `--ease-in-out` — was corrupting those transition-timing utilities
- `--leading-tight/-snug/-loose` — was corrupting those line-height utilities

All renamed to `--sumi-*` (e.g. `--sumi-text-sm`); no `@theme` involvement, since Tailwind's own scale is correct for consumers using those utility classes.

Also fixed a related but different bug: `--shadow-xs/-sm/-md/-lg/-xl/-inset/-seal`, `--font-mono`, `--font-display`, and `--radius-full` were declared twice — once correctly in `@theme` (dead, since it's layered and always lost to the duplicate) and once unprefixed on `:root` (which actually won, by luck of matching values). Consolidated to one source (`--sumi-shadow-*`, `--sumi-font-mono`, `--sumi-font-display`, `--sumi-radius-full`) that `@theme` now references via `var()`, so the `shadow-*`/`font-mono`/`font-display`/`rounded-full` Tailwind utilities and internal component styling both resolve the same, theme-aware value instead of a fragile, hand-synced duplicate. Also fixed an already-drifted `--font-display` (the dead `@theme` copy was missing a `"Songti SC"` fallback that the winning copy had) as a side effect of the consolidation.

`--font-body`/`--font-han` (no Tailwind collision, but same token group) renamed to `--sumi-font-body`/`--sumi-font-han` for consistency.

No visual change for any SumiUi component — only to previously-corrupted Tailwind utility classes in consuming apps, which now resolve correctly, and to the handful of `--sumi-*`-renamed CSS variables a consumer may have referenced directly.
