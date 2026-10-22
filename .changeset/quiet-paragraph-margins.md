---
"@sumiui/react": patch
---

Remove the stray 16px bottom margin under helper and error text in Input, Select, DatePicker, FileUpload and Checkbox, and under EmptyState's description. The base `p` style from `@sumiui/react/styles` was leaking onto these elements.
