import { Check } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type { StepperProps } from "./Stepper.types";

type NodeState = "done" | "current" | "todo";

function getState(index: number, currentStep: number): NodeState {
  if (index < currentStep) return "done";
  if (index === currentStep) return "current";
  return "todo";
}

const nodeBase =
  "w-[26px] h-[26px] rounded-full flex items-center justify-center font-semibold text-[12.5px] box-border flex-none";

const nodeStateClass: Record<NodeState, string> = {
  done: "bg-[color:var(--accent)] text-[color:var(--accent-on)]",
  current:
    "border-2 border-[color:var(--ink-800)] shadow-[0_0_0_4px_var(--accent-soft)] bg-[color:var(--bg-0)] text-fg-1",
  todo: "border border-[color:var(--line-3)] bg-[color:var(--bg-0)] text-fg-3",
};

function StepNode({ index, state }: { index: number; state: NodeState }) {
  return (
    <span
      className={cn(nodeBase, nodeStateClass[state])}
      aria-current={state === "current" ? "step" : undefined}
    >
      {state === "done" ? <Check className="w-[14px] h-[14px]" aria-hidden /> : index + 1}
    </span>
  );
}

function StepLabel({
  label,
  description,
  state,
}: {
  label: string;
  description?: string;
  state: NodeState;
}) {
  return (
    <span className="leading-[1.3]">
      <span
        className={cn(
          "block text-[13px]",
          state === "todo" ? "font-normal text-fg-3" : "font-medium text-fg-1",
        )}
      >
        {label}
      </span>
      {description ? (
        <span className="block text-[11.5px] text-fg-3 mt-[1px]">{description}</span>
      ) : null}
    </span>
  );
}

function HorizontalStepper({
  steps,
  currentStep,
}: {
  steps: StepperProps["steps"];
  currentStep: number;
}) {
  return (
    <ol className="flex items-center list-none p-0 m-0">
      {steps.map((step, index) => {
        const state = getState(index, currentStep);
        const connectorFilled = index < currentStep;
        return (
          <React.Fragment key={step.label}>
            <li className="flex items-center gap-[9px] flex-none">
              <StepNode index={index} state={state} />
              <StepLabel label={step.label} description={step.description} state={state} />
            </li>
            {index < steps.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "h-[2px] flex-1 min-w-[26px] mx-3 rounded-[2px]",
                  connectorFilled ? "bg-[color:var(--accent)]" : "bg-[color:var(--line-2)]",
                )}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </ol>
  );
}

function VerticalStepper({
  steps,
  currentStep,
}: {
  steps: StepperProps["steps"];
  currentStep: number;
}) {
  return (
    <ol className="list-none p-0 m-0">
      {steps.map((step, index) => {
        const state = getState(index, currentStep);
        const isLast = index === steps.length - 1;
        const connectorFilled = index < currentStep;
        return (
          <li key={step.label} className="grid grid-cols-step-node-content gap-x-[13px]">
            <div className="flex flex-col items-center">
              <StepNode index={index} state={state} />
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    "w-[2px] flex-1 min-h-[26px] rounded-[2px] my-[4px]",
                    connectorFilled ? "bg-[color:var(--accent)]" : "bg-[color:var(--line-2)]",
                  )}
                />
              ) : null}
            </div>
            <div className={isLast ? "pb-0" : "pb-4"}>
              <StepLabel label={step.label} description={step.description} state={state} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function CompactStepper({
  steps,
  currentStep,
}: {
  steps: StepperProps["steps"];
  currentStep: number;
}) {
  const total = steps.length;
  const current = steps[currentStep];
  const fillPercent = ((currentStep + 1) / total) * 100;
  return (
    <div>
      <div className="flex justify-between text-[12.5px] mb-2">
        <span className="text-fg-1 font-medium">
          Step {currentStep + 1} of {total}
        </span>
        {current ? <span className="text-fg-3">{current.label}</span> : null}
      </div>
      <div
        className="h-[5px] rounded-full bg-[color:var(--bg-2)] overflow-hidden"
        role="progressbar"
        tabIndex={0}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={currentStep + 1}
        aria-label={`Step ${currentStep + 1} of ${total}${current ? `: ${current.label}` : ""}`}
      >
        <div
          className="h-full rounded-full bg-[color:var(--accent)]"
          style={{ width: `${fillPercent}%` }}
        />
      </div>
    </div>
  );
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { steps, currentStep, orientation = "horizontal", variant = "default", className, ...props },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {variant === "compact" ? (
          <CompactStepper steps={steps} currentStep={currentStep} />
        ) : orientation === "vertical" ? (
          <VerticalStepper steps={steps} currentStep={currentStep} />
        ) : (
          <HorizontalStepper steps={steps} currentStep={currentStep} />
        )}
      </div>
    );
  },
);
Stepper.displayName = "Stepper";
