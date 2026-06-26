"use client";

import { Container } from "@sumiui/react";

function Swatch({ label, token }: { label: string; token: string }) {
  return (
    <div
      style={{
        background: "var(--bg-2)",
        border: "1px dashed var(--line-2)",
        borderRadius: "6px",
        padding: "16px",
        fontSize: "13px",
        color: "var(--fg-2)",
      }}
    >
      {label} — <code>{token}</code>
    </div>
  );
}

export default function ContainerVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Container size="sm">
        <Swatch label='size="sm"' token="--container-sm (640px)" />
      </Container>
      <Container size="md">
        <Swatch label='size="md"' token="--container-md (768px)" />
      </Container>
      <Container size="read">
        <Swatch label='size="read"' token="--measure-read (680px, long-form)" />
      </Container>
      <Container size="app">
        <Swatch label='size="app" (default)' token="--measure-app (1200px, app-shell)" />
      </Container>
    </div>
  );
}

export const code = `import { Container } from "@sumiui/react";

export function ContainerVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Container size="sm">…</Container>
      <Container size="md">…</Container>
      <Container size="read">…</Container>
      <Container size="app">…</Container>
    </div>
  );
}`;
