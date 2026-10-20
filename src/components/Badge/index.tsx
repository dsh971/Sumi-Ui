import React from "react";
import { cn } from "../../lib/cn";
import { type VariantClassMap, variantClass } from "../../lib/variantClasses";
import type { BadgeProps, BadgeVariant } from "./Badge.types";

const variantClasses: VariantClassMap<BadgeVariant> = {
  // BUG-011 fix: hairline border uses --line-1 (8% opacity) not --line-2 (14%)
  neutral: "bg-bg-sunken text-fg-2 border border-[color:var(--line-1)]",
  success:
    "bg-[color:var(--status-success-bg)] text-[color:var(--status-success)] border border-[color:var(--malachite-200)]",
  warning:
    "bg-[color:var(--status-warning-bg)] text-[color:var(--status-warning)] border border-[color:var(--persimmon-200)]",
  danger:
    "bg-[color:var(--status-danger-bg)] text-[color:var(--status-danger)] border border-[color:var(--cinnabar-200)]",
  info: "bg-[color:var(--status-info-bg)] text-[color:var(--status-info)] border border-[color:var(--azurite-200)]",
  jade: "bg-[color:var(--badge-malachite-bg)] text-[color:var(--badge-malachite-fg)] border border-[color:var(--badge-malachite-border)]",
  clay: "bg-[color:var(--badge-canvas-bg)] text-[color:var(--badge-canvas-fg)] border border-[color:var(--badge-canvas-border)]",
  // sienna and its deprecated alias peach must stay identical — Badge.test.tsx
  // asserts they render the same classes. Previously both resolved to
  // cinnabar-* (a copy-paste bug from peach's pre-migration name); sienna
  // has its own token scale in tokens.css, matching the malachite/canvas
  // sibling entries' -100/-700/-200 triad.
  peach:
    "bg-[color:var(--badge-sienna-bg)] text-[color:var(--badge-sienna-fg)] border border-[color:var(--badge-sienna-border)]",
  malachite:
    "bg-[color:var(--badge-malachite-bg)] text-[color:var(--badge-malachite-fg)] border border-[color:var(--badge-malachite-border)]",
  canvas:
    "bg-[color:var(--badge-canvas-bg)] text-[color:var(--badge-canvas-fg)] border border-[color:var(--badge-canvas-border)]",
  sienna:
    "bg-[color:var(--badge-sienna-bg)] text-[color:var(--badge-sienna-fg)] border border-[color:var(--badge-sienna-border)]",
  // The seal is pressed in full pigment in both themes (decision 004); --highlight
  // steps lighter in dark and would drop its text below AA.
  seal: "bg-[color:var(--pigment-cinnabar)] text-[color:var(--fg-on-cinnabar)] border-transparent",
};

const dotColorClasses: VariantClassMap<BadgeVariant> = {
  neutral: "bg-fg-3",
  success: "bg-[color:var(--status-success)]",
  warning: "bg-[color:var(--status-warning-bar)]",
  danger: "bg-[color:var(--status-danger)]",
  info: "bg-[color:var(--status-info)]",
  jade: "bg-malachite-500",
  clay: "bg-canvas-500",
  peach: "bg-sienna-500",
  malachite: "bg-malachite-500",
  canvas: "bg-canvas-500",
  sienna: "bg-sienna-500",
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
        "rounded-sm px-[8px] py-[3px]",
        "text-[11.5px] font-medium leading-none",
        "whitespace-nowrap",
        variantClass(variantClasses, variant),
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            "block size-[var(--badge-dot-size)] rounded-full flex-shrink-0",
            variantClass(dotColorClasses, variant),
          )}
        />
      )}
      {children}
    </span>
  ),
);
Badge.displayName = "Badge";
