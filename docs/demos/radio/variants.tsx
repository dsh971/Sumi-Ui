"use client";

import { RadioGroup, RadioItem } from "@sumiui/react";

export default function RadioVariants() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing period">
      <RadioItem value="monthly" label="Monthly billing" />
      <RadioItem value="annual" label="Annual billing" />
      <RadioItem value="custom" label="Custom schedule" />
    </RadioGroup>
  );
}

export const code = `import { RadioGroup, RadioItem } from "@sumiui/react";

export function RadioVariants() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing period">
      <RadioItem value="monthly" label="Monthly billing" />
      <RadioItem value="annual" label="Annual billing" />
      <RadioItem value="custom" label="Custom schedule" />
    </RadioGroup>
  );
}`;
