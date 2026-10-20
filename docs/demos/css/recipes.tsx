"use client";

import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Switch } from "@sumiui/react";

// Recipes built from components, shipped classes and var(--token) styles only.
export default function CssRecipes() {
  return (
    <div className="not-prose" style={{ display: "grid", gap: "var(--space-7)" }}>
      {/* Settings panel: a bordered card for a discrete region of app UI */}
      <Card variant="bordered" style={{ maxWidth: 420 }}>
        <CardHeader>
          <div className="eyebrow">Settings</div>
          <div className="h4" style={{ margin: 0 }}>
            Publishing
          </div>
        </CardHeader>
        <CardBody style={{ display: "grid", gap: "var(--space-4)" }}>
          <Switch label="Email subscribers on publish" defaultChecked />
          <Switch label="Show the colophon" />
        </CardBody>
        <CardFooter style={{ gap: "var(--space-2)", justifyContent: "flex-end" }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save</Button>
        </CardFooter>
      </Card>

      {/* Status note: status text on its own tint, with a square bar */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          alignItems: "flex-start",
          maxWidth: 420,
          padding: "var(--space-3) var(--space-4)",
          background: "var(--status-warning-bg)",
          borderLeft: "3px solid var(--status-warning-bar)",
        }}
      >
        <Badge variant="warning">Draft</Badge>
        <p className="small" style={{ margin: 0, color: "var(--status-warning)" }}>
          Two pieces are waiting for a final read.
        </p>
      </div>

      {/* Plain card list: content in space, one hairline per item, no boxes */}
      <div style={{ display: "grid", gap: "var(--space-5)", maxWidth: 420 }}>
        {["On restraint", "The unglamorous middle"].map((title) => (
          <Card key={title}>
            <CardBody>
              <div className="h4" style={{ margin: 0 }}>
                {title}
              </div>
              <p className="caption" style={{ margin: 0 }}>
                Essay · 12 min
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const code = `import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Switch } from "@sumiui/react";

// Settings panel — a bordered card for a discrete region of app UI
<Card variant="bordered">
  <CardHeader>
    <div className="eyebrow">Settings</div>
    <div className="h4">Publishing</div>
  </CardHeader>
  <CardBody style={{ display: "grid", gap: "var(--space-4)" }}>
    <Switch label="Email subscribers on publish" defaultChecked />
    <Switch label="Show the colophon" />
  </CardBody>
  <CardFooter style={{ gap: "var(--space-2)", justifyContent: "flex-end" }}>
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Save</Button>
  </CardFooter>
</Card>

// Status note — status text on its own tint, square bar
<div style={{
  display: "flex", gap: "var(--space-3)",
  padding: "var(--space-3) var(--space-4)",
  background: "var(--status-warning-bg)",
  borderLeft: "3px solid var(--status-warning-bar)",
}}>
  <Badge variant="warning">Draft</Badge>
  <p className="small" style={{ margin: 0, color: "var(--status-warning)" }}>
    Two pieces are waiting for a final read.
  </p>
</div>

// Plain cards — content in space, one hairline per item
<Card>
  <CardBody>
    <div className="h4">On restraint</div>
    <p className="caption">Essay · 12 min</p>
  </CardBody>
</Card>`;
