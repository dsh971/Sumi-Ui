"use client";

import { Stepper, type StepperStep } from "@sumiui/react";

const steps: StepperStep[] = [
  { label: "Account", description: "Signed in" },
  { label: "Shipping", description: "123 Hemp Ln." },
  { label: "Payment", description: "In progress" },
  { label: "Review" },
];

export default function StepperVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <Stepper steps={steps} currentStep={2} />
      <Stepper steps={steps} currentStep={2} variant="compact" />
    </div>
  );
}

export const code = `import { Stepper, type StepperStep } from "@sumiui/react";

const steps: StepperStep[] = [
  { label: "Account", description: "Signed in" },
  { label: "Shipping", description: "123 Hemp Ln." },
  { label: "Payment", description: "In progress" },
  { label: "Review" },
];

export function StepperVariants() {
  return <Stepper steps={steps} currentStep={2} />;
}`;
