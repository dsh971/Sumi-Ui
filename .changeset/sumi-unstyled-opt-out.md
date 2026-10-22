---
"@sumiui/react": minor
---

Add the `.sumi-unstyled` class. Sumi's typography rules for plain elements (`h1`–`h6`, `p`, `a`, `small`, `blockquote`, `code`, `kbd`, `samp`, `pre`, `hr`) now skip anything inside it, so third-party markup can opt out. Specificity is unchanged, so nothing changes outside the class. The Tailwind preflight reset bundled in `@sumiui/react/styles` still applies inside it.
