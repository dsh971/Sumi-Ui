---
"@sumiui/react": minor
---

Add `@sumiui/react/styles/core`: the same stylesheet as `@sumiui/react/styles` without Tailwind's preflight reset. Apps that don't use Tailwind can import it instead, so lists, headings, links and margins outside Sumi components keep the browser's defaults.

Components that relied on preflight (Alert, Breadcrumb, Button, Checkbox, Combobox, CommandPalette, DatePicker, Dialog, EmptyState, FileUpload, Input, Logo, Pagination, Radio, Seal, SegmentedControl, Select, Switch, Table, Tabs, Timeline, Toast) now set those resets themselves, so they render the same with either stylesheet. Nothing changes for `@sumiui/react/styles`.
