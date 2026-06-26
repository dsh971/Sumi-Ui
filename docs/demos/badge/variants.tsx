"use client";

import { Badge } from "@sumiui/react";

export default function BadgeVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <Badge variant="malachite">Malachite</Badge>
        <Badge variant="canvas">Canvas</Badge>
        <Badge variant="sienna">Sienna</Badge>
        <Badge variant="seal">Seal</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <Badge variant="success" dot>
          Published
        </Badge>
        <Badge variant="warning" dot>
          Review needed
        </Badge>
      </div>
    </div>
  );
}

export const code = `import { Badge } from "@sumiui/react";

export function BadgeVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Badge variant="malachite">Malachite</Badge>
        <Badge variant="canvas">Canvas</Badge>
        <Badge variant="sienna">Sienna</Badge>
        <Badge variant="seal">Seal</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Badge variant="success" dot>Published</Badge>
        <Badge variant="warning" dot>Review needed</Badge>
      </div>
    </div>
  );
}`;
