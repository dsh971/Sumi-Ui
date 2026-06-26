"use client";

import { Seal } from "@sumiui/react";

export default function SealVariants() {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <Seal size="sm" />
        <span style={{ fontSize: "10px", color: "var(--fg-3)" }}>sm</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <Seal size="md" />
        <span style={{ fontSize: "10px", color: "var(--fg-3)" }}>md</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <Seal size="lg" />
        <span style={{ fontSize: "10px", color: "var(--fg-3)" }}>lg</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <Seal size="xl" glyph="印" aria-label="Stamp seal" />
        <span style={{ fontSize: "10px", color: "var(--fg-3)" }}>xl · custom glyph</span>
      </div>
    </div>
  );
}

export const code = `import { Seal } from "@sumiui/react";

export function SealVariants() {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Seal size="sm" />
      <Seal size="md" />
      <Seal size="lg" />
      <Seal size="xl" glyph="印" aria-label="Stamp seal" />
    </div>
  );
}`;
