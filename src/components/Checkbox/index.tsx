import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
  // H-2 fix: destructure `checked` before spread so icon selection uses a stable reference
>(({ label, helperText, errorText, id, checked, className, ...props }, ref) => {
  const checkId =
    id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const hasError = Boolean(errorText);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2.5">
        <RadixCheckbox.Root
          ref={ref}
          id={checkId}
          checked={checked}
          aria-invalid={hasError || undefined}
          aria-describedby={
            errorText ? `${checkId}-error` : helperText ? `${checkId}-helper` : undefined
          }
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded",
            "border border-[color:var(--line-3)]",
            "bg-bg-card",
            "transition-colors mt-0.5",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "data-[state=checked]:bg-accent data-[state=checked]:border-[color:var(--accent)] data-[state=checked]:text-[color:var(--fg-on-malachite)]",
            "data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-[color:var(--accent)] data-[state=indeterminate]:text-[color:var(--fg-on-malachite)]",
            className,
          )}
          {...props}
        >
          <RadixCheckbox.Indicator className="flex items-center justify-center">
            {/* H-2 fix: use destructured `checked`, not props.checked (stable reference) */}
            {checked === "indeterminate" ? (
              <Minus size={10} strokeWidth={3} aria-hidden="true" />
            ) : (
              <Check size={10} strokeWidth={3} aria-hidden="true" />
            )}
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>

        {label && (
          <label
            htmlFor={checkId}
            className="text-sm text-fg-1 leading-snug cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>

      {errorText && (
        <p
          id={`${checkId}-error`}
          role="alert"
          className="text-xs text-[color:var(--status-danger)] pl-6.5"
        >
          {errorText}
        </p>
      )}
      {!errorText && helperText && (
        <p id={`${checkId}-helper`} className="text-xs text-fg-3 pl-6.5">
          {helperText}
        </p>
      )}
    </div>
  );
});
Checkbox.displayName = "Checkbox";
