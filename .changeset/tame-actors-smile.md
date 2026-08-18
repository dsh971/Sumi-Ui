---
"@sumiui/react": patch
---

Fix `Avatar` fallback-initials text rendering above center (missing `line-height`), and correct `AvatarSeal`'s badge to use the design system's own `.seal` tokens (`--cinnabar-400`, `--fg-on-ink`, `--radius-2`, `--shadow-seal`) instead of ad hoc values, plus a `--bg-0` separation ring so the badge reads as an intentional layered element against the circular avatar. The seal's square shape is unchanged — it's an intentional reference to a Chinese chop/seal, not a bug.
