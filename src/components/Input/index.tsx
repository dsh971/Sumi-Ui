import React from "react";
import { cn } from "../../lib/cn";
import type { InputProps, TextAreaProps } from "./Input.types";

// BUG-006 fix: plain sentence-case label — no uppercase, no tracking-wide
const labelClasses = "block text-xs font-medium text-fg-2 mb-1.5";
const helperClasses = "mt-1 text-xs text-fg-3";
const errorClasses = "mt-1 text-xs text-[color:var(--status-danger)]";

// BUG-005 fix: bg-bg-page (--bg-0) not bg-bg-card (--bg-1) — inputs sit on the page surface
// BUG-007 fix: focus uses --accent (malachite) + 3px ring/shadow to match spec
const inputBaseClasses = [
  "block w-full",
  "bg-bg-page text-fg-1",
  "border border-[color:var(--line-2)] rounded-md",
  "placeholder:text-fg-3",
  "transition-colors",
  "focus:outline-none focus:border-[color:var(--accent)]",
  "focus:[box-shadow:0_0_0_3px_var(--accent-soft)]",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ");

const inputErrorClasses =
  "border-[color:var(--status-danger)] focus:border-[color:var(--status-danger)] focus:[box-shadow:0_0_0_3px_var(--highlight-soft)]";

const sizeClasses = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-3.5 py-2.5 text-base",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, errorText, id, size = "md", className, ...props }, ref) => {
    const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    const hasError = Boolean(errorText);

    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={hasError || undefined}
          aria-describedby={
            errorText ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(
            inputBaseClasses,
            sizeClasses[size],
            hasError && inputErrorClasses,
            className,
          )}
          {...props}
        />
        {errorText && (
          <p id={`${inputId}-error`} role="alert" className={errorClasses}>
            {errorText}
          </p>
        )}
        {!errorText && helperText && (
          <p id={`${inputId}-helper`} className={helperClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, helperText, errorText, id, rows = 4, className, ...props }, ref) => {
    const inputId =
      id ?? (label ? `textarea-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    const hasError = Boolean(errorText);

    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          aria-invalid={hasError || undefined}
          aria-describedby={
            errorText ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(
            inputBaseClasses,
            "px-3 py-2 text-sm resize-y min-h-[80px]",
            hasError && inputErrorClasses,
            className,
          )}
          {...props}
        />
        {errorText && (
          <p id={`${inputId}-error`} role="alert" className={errorClasses}>
            {errorText}
          </p>
        )}
        {!errorText && helperText && (
          <p id={`${inputId}-helper`} className={helperClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
TextArea.displayName = "TextArea";
