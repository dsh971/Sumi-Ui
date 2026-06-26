"use client";

import { Switch } from "@sumiui/react";

export default function SwitchVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Switch label="Dark mode" />
      <Switch label="Notifications" defaultChecked />
      <Switch label="Sound effects" disabled />
      <Switch label="Weekly digest" helperText="Enable to receive weekly digests." />
      <Switch label="Required setting" errorText="This setting must be enabled." />
    </div>
  );
}

export const code = `import { Switch } from "@sumiui/react";

export function SwitchVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Switch label="Dark mode" />
      <Switch label="Notifications" defaultChecked />
      <Switch label="Sound effects" disabled />
      <Switch label="Weekly digest" helperText="Enable to receive weekly digests." />
      <Switch label="Required setting" errorText="This setting must be enabled." />
    </div>
  );
}`;
