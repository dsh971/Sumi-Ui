import type { Story } from "@ladle/react";
import type { StepperStep } from "./Stepper.types";
import { Stepper } from "./index";

const steps: StepperStep[] = [
  { label: "Account", description: "Signed in" },
  { label: "Shipping", description: "123 Hemp Ln." },
  { label: "Payment", description: "In progress" },
  { label: "Review" },
];

const verticalSteps: StepperStep[] = [
  { label: "Connect a source", description: "GitHub · linked 2 days ago" },
  { label: "Configure the build", description: "Choose a framework preset and output dir." },
  { label: "Deploy", description: "Goes live on a preview URL." },
];

export const HorizontalStep1: Story = () => (
  <div style={{ padding: 24 }}>
    <Stepper steps={steps} currentStep={0} />
  </div>
);

export const HorizontalStep2: Story = () => (
  <div style={{ padding: 24 }}>
    <Stepper steps={steps} currentStep={1} />
  </div>
);

export const HorizontalStep3: Story = () => (
  <div style={{ padding: 24 }}>
    <Stepper steps={steps} currentStep={2} />
  </div>
);

export const Vertical: Story = () => (
  <div style={{ padding: 24, maxWidth: 270 }}>
    <Stepper steps={verticalSteps} currentStep={1} orientation="vertical" />
  </div>
);

export const Compact: Story = () => (
  <div style={{ padding: 24, maxWidth: 270 }}>
    <Stepper steps={steps} currentStep={2} variant="compact" />
  </div>
);
