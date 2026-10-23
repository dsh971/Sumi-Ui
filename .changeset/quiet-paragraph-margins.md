---
"@sumiui/react": patch
---

Remove the stray 16px bottom margin under helper and error text in Input, Select, DatePicker, FileUpload, Checkbox and Switch, and under EmptyState's description. EmptyState's title now sets its own bottom margin. The base `p` and `h3` styles from `@sumiui/react/styles` were leaking onto these elements.
