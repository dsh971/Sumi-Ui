import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

// BUG-003 fix: danger is outlined (transparent bg, cinnabar border/text) per spec
// BUG-004 fix: focus ring uses --accent (malachite) per BUILD.md
const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent",
    "text-[color:var(--fg-on-malachite)]",
    "hover:bg-accent-hover",
    "active:[box-shadow:var(--shadow-xs)]",
  ].join(" "),
  secondary: [
    "bg-bg-card",
    "border border-[color:var(--line-2)]",
    "text-fg-1",
    "hover:bg-bg-sunken",
    "active:bg-bg-pressed",
  ].join(" "),
  ghost: ["text-fg-1", "hover:bg-bg-sunken", "active:bg-bg-pressed"].join(" "),
  ink: ["bg-ink-800", "text-[color:var(--silk-50)]", "hover:bg-ink-700"].join(" "),
  // Outlined danger: transparent bg, cinnabar border + text, soft fill on hover
  danger: [
    "bg-transparent",
    "border border-[color:var(--cinnabar-200)]",
    "text-[color:var(--cinnabar-600)]",
    "hover:bg-[color:var(--cinnabar-50)]",
  ].join(" "),
};

// BUG-001 fix: border-radius is --radius-2 (4px = rounded-md), not 6px
// BUG-002 fix: sm padding → py-1.5 (6px) matching spec; lg → py-[14px] px-[22px]
// font-size: sm uses --text-sm (13px), md uses --text-base (15px), lg uses --text-md (17px)
const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[length:var(--text-sm)] gap-1.5",
  md: "px-4 py-2.5 text-[length:var(--text-base)] gap-2",
  lg: "px-[22px] py-[14px] text-[length:var(--text-md)] gap-2",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      asChild = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const loaderSize = size === "sm" ? 12 : size === "md" ? 14 : 16;

    const sharedProps = {
      ref,
      disabled: disabled || loading,
      "aria-busy": loading || undefined,
      className: cn(
        "inline-flex items-center justify-center",
        "font-medium leading-none select-none rounded-md",
        "transition-colors",
        // BUG-004 fix: --accent (malachite) not --secondary (azurite)
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:[transform:translateY(1px)]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ),
      ...props,
    };

    if (asChild) {
      return <Slot {...sharedProps}>{children}</Slot>;
    }

    return (
      <button {...sharedProps}>
        {loading && <Loader2 className="animate-spin" size={loaderSize} aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
