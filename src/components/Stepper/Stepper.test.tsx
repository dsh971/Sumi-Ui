import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { StepperStep } from "./Stepper.types";
import { Stepper } from "./index";

const steps: StepperStep[] = [
  { label: "Account", description: "Signed in" },
  { label: "Shipping", description: "123 Hemp Ln." },
  { label: "Payment", description: "In progress" },
  { label: "Review" },
];

describe("Stepper", () => {
  it("renders all step labels", () => {
    render(<Stepper steps={steps} currentStep={2} />);
    for (const step of steps) {
      expect(screen.getByText(step.label)).toBeInTheDocument();
    }
  });

  it("marks completed steps as done with a checkmark and no number", () => {
    render(<Stepper steps={steps} currentStep={2} />);
    const account = screen.getByText("Account").closest("li");
    expect(account?.querySelector("svg")).toBeInTheDocument();
    expect(account).not.toHaveTextContent("1");
  });

  it("marks the current step with aria-current='step' and its number", () => {
    render(<Stepper steps={steps} currentStep={2} />);
    const current = screen.getByText("3");
    expect(current).toHaveAttribute("aria-current", "step");
  });

  it("renders upcoming steps with a muted label", () => {
    render(<Stepper steps={steps} currentStep={2} />);
    const review = screen.getByText("Review");
    expect(review).toHaveClass("text-fg-3");
  });

  it("renders a progress bar in the compact variant", () => {
    render(<Stepper steps={steps} currentStep={2} variant="compact" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "3");
    expect(bar).toHaveAttribute("aria-valuemax", "4");
    expect(screen.getByText("Step 3 of 4")).toBeInTheDocument();
  });

  it("renders the vertical orientation with all steps and current marker", () => {
    render(<Stepper steps={steps} currentStep={1} orientation="vertical" />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("2")).toHaveAttribute("aria-current", "step");
  });
});
