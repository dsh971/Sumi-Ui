"use client";

import { Avatar, AvatarSeal } from "@sumiui/react";

export default function AvatarVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Avatar size="sm" fallback="LF" />
        <Avatar size="md" fallback="LF" />
        <Avatar size="lg" fallback="LF" />
        <Avatar size="xl" fallback="LF" />
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <AvatarSeal size="md" fallback="LF" />
        <AvatarSeal size="lg" fallback="KS" />
        <AvatarSeal size="xl" fallback="MW" sealGlyph="印" />
      </div>
    </div>
  );
}

export const code = `import { Avatar, AvatarSeal } from "@sumiui/react";

export function AvatarVariants() {
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar size="md" fallback="LF" />
      <AvatarSeal size="md" fallback="LF" />
    </div>
  );
}`;
