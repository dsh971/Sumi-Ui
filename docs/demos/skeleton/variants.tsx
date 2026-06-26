"use client";

import { Skeleton } from "@sumiui/react";

export default function SkeletonVariants() {
  return (
    <div
      style={{
        maxWidth: "360px",
        border: "1px solid var(--line-1)",
        borderRadius: "6px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Skeleton variant="circle" width={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" style={{ width: "60%", marginBottom: "6px" }} />
          <Skeleton variant="text" style={{ width: "40%", height: "12px" }} />
        </div>
      </div>
      <Skeleton variant="rect" height={80} />
      <Skeleton variant="text" />
      <Skeleton variant="text" style={{ width: "80%" }} />
    </div>
  );
}

export const code = `import { Skeleton } from "@sumiui/react";

export function SkeletonVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Skeleton variant="circle" width={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" style={{ width: "60%" }} />
          <Skeleton variant="text" style={{ width: "40%", height: "12px" }} />
        </div>
      </div>
      <Skeleton variant="rect" height={80} />
      <Skeleton variant="text" />
      <Skeleton variant="text" style={{ width: "80%" }} />
    </div>
  );
}`;
