import React from "react";
import { cn } from "../../lib/cn";
import type { BadgeProps, BadgeVariant } from "./Badge.types";

const variantClasses: Record<BadgeVariant, string> = {
  // BUG-011 fix: hairline border uses --line-1 (8% opacity) not --line-2 (14%)
  neutral: "bg-bg-sunken text-fg-2 border border-[color:var(--line-1)]",
  success:
    "bg-[color:var(--status-success-bg)] text-[color:var(--status-success)] border border-[color:var(--malachite-200)]",
  warning:
    "bg-[color:var(--status-warning-bg)] text-[color:var(--status-warning)] border border-[color:var(--persimmon-200)]",
  danger:
    "bg-[color:var(--status-danger-bg)] text-[color:var(--status-danger)] border border-[color:var(--cinnabar-200)]",
  info: "bg-[color:var(--status-info-bg)] text-[color:var(--status-info)] border border-[color:var(--azurite-200)]",
  jade: "bg-malachite-100 text-malachite-700 border border-malachite-200",
  clay: "bg-canvas-100 text-canvas-700 border border-canvas-200",
  peach: "bg-cinnabar-100 text-cinnabar-700 border border-cinnabar-200",
  seal: "bg-[color:var(--highlight)] text-[color:var(--fg-on-cinnabar)] border-transparent",
};

const dotColorClasses: Record<BadgeVariant, string> = {
  neutral: "bg-fg-3",
  success: "bg-[color:var(--status-success)]",
  warning: "bg-[color:var(--status-warning-bar)]",
  danger: "bg-[color:var(--status-danger)]",
  info: "bg-[color:var(--status-info)]",
  jade: "bg-malachite-500",
  clay: "bg-canvas-500",
  peach: "bg-cinnabar-500",
  seal: "bg-[color:var(--fg-on-cinnabar)]",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "neutral", dot = false, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5",
        // BUG-009 fix: padding 10px/3px per spec (not on 4pt grid — use arbitrary values)
        // BUG-010 fix: 11.5px per spec, not 12px (text-xs)
        "rounded-full px-[10px] py-[3px]",
        "text-[11.5px] font-medium leading-none",
        "whitespace-nowrap",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn("block size-[6px] rounded-full flex-shrink-0", dotColorClasses[variant])}
        />
      )}
      {children}
    </span>
  ),
);
Badge.displayName = "Badge";
