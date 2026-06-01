# @sumiui/react

> **sumi · 墨** — ink. A React component library for the Sumi Design System.

A calm, restrained, paper-and-ink UI library built around the discipline of Chinese ink-wash painting. 20 fully-accessible components, Tailwind v4 tokens, dark mode, and TypeScript throughout.

## Install

```bash
npm install @sumiui/react
# or
pnpm add @sumiui/react
```

**Peer dependencies** (must be in your project):

```bash
npm install react react-dom
# React >=19.0.0 required
```

## Quick start

Import the CSS once at your app root — it provides all design tokens and base styles:

```tsx
// main.tsx or _app.tsx
import "@sumiui/react/styles";
```

Then use components:

```tsx
import { Button, Card, CardBody, CardHeader } from "@sumiui/react";

export function App() {
  return (
    <Card>
      <CardHeader>
        <h2>A quiet place to write.</h2>
      </CardHeader>
      <CardBody>
        <Button variant="primary" size="md">
          Start a draft
        </Button>
        <Button variant="ghost" size="md">
          Browse
        </Button>
      </CardBody>
    </Card>
  );
}
```

## Tooltip setup

Wrap your app root in `TooltipProvider` so tooltips share a single floating layer:

```tsx
import { TooltipProvider } from "@sumiui/react";

<TooltipProvider>
  <App />
</TooltipProvider>
```

## Available components

| Phase | Components |
|---|---|
| Foundation | `Button` · `Input` · `TextArea` · `Card` · `Badge` · `Dialog` |
| Forms | `Select` · `Checkbox` · `RadioGroup` · `Switch` · `DatePicker` · `FileUpload` |
| Navigation | `Tabs` · `Breadcrumb` · `DropdownMenu` · `Pagination` |
| Feedback | `Alert` · `Tooltip` · `Skeleton` · `EmptyState` |
| Data | `Table` (sortable, selectable, dense) |
| Brand | `Avatar` · `AvatarSeal` · `Logo` · `Seal` |

## Dark mode

Toggle dark mode by setting `data-theme="dark"` on the `<html>` element (or any ancestor):

```tsx
document.documentElement.setAttribute("data-theme", "dark");
```

## Customising tokens

All design values are CSS custom properties. Override them at `:root` to theme the library without touching component code:

```css
/* your-theme.css — import AFTER @sumiui/react/styles */
:root {
  /* Example: swap the primary brand colour */
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --accent-strong: #1e40af;
}
```

Token families: `--silk-*` · `--canvas-*` · `--ink-*` · `--malachite-*` · `--azurite-*` · `--teal-*` · `--cinnabar-*` · `--persimmon-*` · `--sienna-*` · `--slate-*` · `--steel-*`

Semantic aliases: `--accent` · `--secondary` · `--highlight` · `--status-*` · `--bg-*` · `--fg-*`

## Accessibility

All components meet WCAG AA (4.5:1 body text, 3:1 large text and UI). Focus rings use the azurite secondary token. Every interactive component has keyboard navigation and appropriate ARIA roles.

## License

MIT
