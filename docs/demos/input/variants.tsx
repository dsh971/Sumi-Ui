"use client";

import { Input, TextArea } from "@sumiui/react";

export default function InputVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Input label="Username" helperText="Must be 3–20 characters, letters and numbers only." />
      <Input label="Email" defaultValue="not-an-email" errorText="Enter a valid email address." />
      <Input label="Disabled" disabled placeholder="Cannot edit this" />
      <TextArea label="Notes" placeholder="Write something…" helperText="Max 500 characters." />
    </div>
  );
}

export const code = `import { Input, TextArea } from "@sumiui/react";

export function InputVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Input label="Username" helperText="Must be 3–20 characters, letters and numbers only." />
      <Input
        label="Email"
        defaultValue="not-an-email"
        errorText="Enter a valid email address."
      />
      <Input label="Disabled" disabled placeholder="Cannot edit this" />
      <TextArea label="Notes" placeholder="Write something…" helperText="Max 500 characters." />
    </div>
  );
}`;
