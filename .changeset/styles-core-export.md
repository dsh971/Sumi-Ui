---
"@sumiui/react": minor
---

Add `@sumiui/react/styles/core`: the same stylesheet as `@sumiui/react/styles` without Tailwind's preflight reset. Import it instead of `/styles` in an app that doesn't use Tailwind, so markup Sumi doesn't own keeps the browser's list markers, element margins and padding, borders and form-control defaults. Sumi's own typography for plain elements (`h1`–`h6`, `p`, `a`…) still applies in both; wrap markup in `.sumi-unstyled` to opt out of it. Tailwind's `--default-font-family` / `--default-mono-font-family` variables, which only preflight reads, aren't emitted in core.

Components no longer depend on preflight: native controls carry a `sumi-control` class and lists a `sumi-list` class, whose resets (in `@layer base`, zero specificity, like preflight) restore the same defaults. `@sumiui/react/styles` renders as before, and any utility or consumer rule still overrides them.
