"use client";

import { Button } from "@sumiui/react";

export default function ButtonVariants() {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ink">Ink</Button>
    </div>
  );
}

export const code = `import { Button } from "@sumiui/react";

export function ButtonVariants() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ink">Ink</Button>
    </div>
  );
}`;
