"use client";

import { Checkbox } from "@sumiui/react";

export default function CheckboxVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Push notifications" />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Weekly digest" helperText="A summary of activity from the past week." />
      <Checkbox label="Accept terms" errorText="You must accept the terms to continue." />
    </div>
  );
}

export const code = `import { Checkbox } from "@sumiui/react";

export function CheckboxVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Push notifications" />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Weekly digest" helperText="A summary of activity from the past week." />
      <Checkbox label="Accept terms" errorText="You must accept the terms to continue." />
    </div>
  );
}`;
