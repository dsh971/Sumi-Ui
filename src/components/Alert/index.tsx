import { X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { cn } from "../../lib/cn";
import { type VariantClassMap, variantClass } from "../../lib/variantClasses";
import type { AlertProps, AlertVariant } from "./Alert.types";

// BUG-015 fix: danger is inverse cinnabar fill (dark bg, silk text) per spec
// BUG-016 fix: each alert has a 4px left accent bar colored per variant
const variantClasses: VariantClassMap<AlertVariant> = {
  info: ["bg-[color:var(--status-info-bg)]", "border-[color:var(--azurite-200)]", "text-fg-1"].join(
    " ",
  ),
  success: [
    "bg-[color:var(--status-success-bg)]",
    "border-[color:var(--malachite-200)]",
    "text-fg-1",
  ].join(" "),
  warning: [
    "bg-[color:var(--status-warning-bg)]",
    "border-[color:var(--persimmon-200)]",
    "text-fg-1",
  ].join(" "),
  // Inverse cinnabar fill — assertive, highest severity
  danger: [
    "bg-[color:var(--cinnabar-600)]",
    "border-[color:var(--cinnabar-700)]",
    "text-[color:var(--silk-50)]",
  ].join(" "),
};

const titleClasses: VariantClassMap<AlertVariant> = {
  info: "text-[color:var(--status-info)]",
  success: "text-[color:var(--status-success)]",
  warning: "text-[color:var(--status-warning)]",
  danger: "text-[color:var(--silk-50)]",
};

const bodyClasses: VariantClassMap<AlertVariant> = {
  info: "text-fg-2",
  success: "text-fg-2",
  warning: "text-fg-2",
  danger: "text-[color:rgba(247,244,235,0.85)]",
};

const dismissClasses: VariantClassMap<AlertVariant> = {
  info: "text-fg-3 hover:text-fg-1 hover:bg-bg-pressed",
  success: "text-fg-3 hover:text-fg-1 hover:bg-bg-pressed",
  warning: "text-fg-3 hover:text-fg-1 hover:bg-bg-pressed",
  // On cinnabar bg, use translucent silk hover
  danger:
    "text-[color:rgba(247,244,235,0.7)] hover:text-[color:var(--silk-50)] hover:bg-[rgba(247,244,235,0.12)]",
};

// Left accent bar colors per variant
const barColors: Record<AlertVariant, string> = {
  info: "var(--azurite-500)",
  success: "var(--malachite-500)",
  warning: "var(--persimmon-500)",
  danger: "var(--cinnabar-200)",
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "info", title, onDismiss, className, children, ...props }, ref) => {
    const [dismissed, setDismissed] = useState(false);

    const handleDismiss = useCallback(() => {
      setDismissed(true);
      onDismiss?.();
    }, [onDismiss]);

    if (dismissed) return null;

    return (
      <div
        ref={ref}
        // M-1 fix: warning is assertive (same urgency as danger), not polite status
        role={variant === "danger" || variant === "warning" ? "alert" : "status"}
        aria-live={variant === "danger" || variant === "warning" ? "assertive" : "polite"}
        className={cn(
          "relative flex gap-3 rounded-lg border px-4 py-3",
          "animate-sumi-toast-in",
          variantClass(variantClasses, variant),
          className,
        )}
        {...props}
      >
        {/* BUG-016: left accent bar — 4px wide, self-stretching */}
        <span
          aria-hidden="true"
          className="flex-none w-1 self-stretch rounded-full"
          style={{ background: barColors[variant] }}
        />

        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn("text-sm font-medium mb-0.5", variantClass(titleClasses, variant))}>
              {title}
            </p>
          )}
          {children && (
            <div className={cn("text-sm leading-snug", variantClass(bodyClasses, variant))}>
              {children}
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            className={cn(
              "flex-shrink-0 rounded p-2 -me-1.5 -mt-1.5",
              "transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
              variantClass(dismissClasses, variant),
            )}
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";
