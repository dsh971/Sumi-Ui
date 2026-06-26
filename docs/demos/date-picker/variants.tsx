"use client";

import { DatePicker } from "@sumiui/react";

export default function DatePickerVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "320px" }}>
      <DatePicker placeholder="Pick a date" />
      <DatePicker label="Start date" helperText="Choose your project start date." />
      <DatePicker
        label="Meeting date"
        min="2026-01-01"
        max="2026-12-31"
        helperText="Must be within 2026."
      />
      <DatePicker label="Deadline" errorText="Deadline cannot be in the past." />
      <DatePicker label="Locked date" value="2026-05-01" disabled />
    </div>
  );
}

export const code = `import { DatePicker } from "@sumiui/react";

export function DatePickerVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <DatePicker placeholder="Pick a date" />
      <DatePicker label="Start date" helperText="Choose your project start date." />
      <DatePicker
        label="Meeting date"
        min="2026-01-01"
        max="2026-12-31"
        helperText="Must be within 2026."
      />
      <DatePicker label="Deadline" errorText="Deadline cannot be in the past." />
      <DatePicker label="Locked date" value="2026-05-01" disabled />
    </div>
  );
}`;
