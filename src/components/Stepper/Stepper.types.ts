import type React from "react";

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "compact";
}
