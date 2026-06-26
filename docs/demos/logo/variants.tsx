"use client";

import { Logo } from "@sumiui/react";

export default function LogoVariants() {
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ background: "var(--bg-0)", padding: "32px", borderRadius: "8px" }}>
        <Logo variant="light" width={160} />
      </div>
      <div style={{ background: "var(--ink-800)", padding: "32px", borderRadius: "8px" }}>
        <Logo variant="dark" width={160} />
      </div>
    </div>
  );
}

export const code = `import { Logo } from "@sumiui/react";

export function LogoVariants() {
  return (
    <div style={{ background: "var(--ink-800)", padding: "32px" }}>
      <Logo variant="dark" width={160} />
    </div>
  );
}`;
