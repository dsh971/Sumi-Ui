import * as RadixSwitch from "@radix-ui/react-switch";
import React from "react";
import { cn } from "../../lib/cn";
import type { SwitchProps } from "./Switch.types";

export const Switch = React.forwardRef<React.ElementRef<typeof RadixSwitch.Root>, SwitchProps>(
  ({ label, helperText, errorText, id, className, ...props }, ref) => {
    // useId, not a label slug: two fields with the same label (or none) must
    // still get unique ids for label/aria-describedby wiring.
    const autoId = React.useId();
    const switchId = id ?? `switch-${autoId}`;
    const hasError = Boolean(errorText);

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={switchId}
          className={cn("flex items-start gap-3", (label ?? helperText) && "cursor-pointer")}
        >
          <RadixSwitch.Root
            ref={ref}
            id={switchId}
            aria-invalid={hasError || undefined}
            aria-describedby={
              errorText ? `${switchId}-error` : helperText ? `${switchId}-helper` : undefined
            }
            className={cn(
              "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center",
              "rounded-[var(--radius-2)] border-2 border-transparent",
              "transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "bg-[color:var(--line-3)]",
              "data-[state=checked]:bg-accent",
              className,
            )}
            {...props}
          >
            <RadixSwitch.Thumb
              className={cn(
                "pointer-events-none block size-4 rounded-[var(--radius-1)]",
                // Paper-white in both themes on purpose: the thumb is a sheet laid on the track.
                "bg-[color:var(--silk-50)]",
                "[box-shadow:var(--shadow-sm)]",
                "transition-transform",
                "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
              )}
            />
          </RadixSwitch.Root>

          {(label ?? helperText) && (
            <span className="flex flex-col gap-0.5">
              {label && <span className="text-sm text-fg-1 leading-snug select-none">{label}</span>}
              {helperText && (
                <span id={`${switchId}-helper`} className="text-xs text-fg-3">
                  {helperText}
                </span>
              )}
            </span>
          )}
        </label>
        {/* M-4 fix: error state follows same pattern as Input/Checkbox */}
        {errorText && (
          <p
            id={`${switchId}-error`}
            role="alert"
            className="text-xs text-[color:var(--status-danger)]"
          >
            {errorText}
          </p>
        )}
      </div>
    );
  },
);
Switch.displayName = "Switch";
