---
"@sumiui/react": patch
---

Fix `CardHeader`/`CardBody`/`CardFooter` padding to be position-independent: each sub-component's outer edge is now correctly 20px whenever it's the first or last child inside a `Card`, regardless of which other sub-components are present. Previously a lone `CardHeader`, `CardBody`, or `CardFooter` (or any partial combination) rendered asymmetric or undersized padding; the full `Header`+`Body`+`Footer` composition is visually unchanged.
