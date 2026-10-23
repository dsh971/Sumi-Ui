import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import { controlReset } from "../../lib/reset";
import { type VariantClassMap, variantClass } from "../../lib/variantClasses";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

// BUG-003 fix: danger is outlined (transparent bg, cinnabar border/text) per spec
// BUG-004 fix: focus ring uses --accent (malachite) per BUILD.md
const variantClasses: VariantClassMap<ButtonVariant> = {
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
  // Ink tones flip with the theme: thick ink on silk in light, pale ink on charcoal in dark.
  ink: [
    "bg-[color:var(--ink-nong)]",
    "text-[color:var(--bg-0)]",
    "hover:bg-[color:var(--ink-jiao)]",
  ].join(" "),
  // Outlined danger: transparent bg, cinnabar border + text, soft fill on hover.
  // Status tokens step lighter in dark mode, so the text keeps AA on charcoal.
  danger: [
    "bg-transparent",
    "border border-[color:color-mix(in_srgb,var(--status-danger)_35%,transparent)]",
    "text-[color:var(--status-danger)]",
    "hover:bg-[color:var(--status-danger-bg)]",
  ].join(" "),
};

// BUG-001 fix: border-radius is --radius-2 (4px = rounded-md), not 6px
// BUG-002 fix: sm padding → py-1.5 (6px) matching spec; lg → py-[14px] px-[22px]
// font-size: sm uses --sumi-text-sm (13px), md uses --sumi-text-base (15px), lg uses --sumi-text-md (17px)
const sizeClasses: VariantClassMap<ButtonSize> = {
  sm: "px-3 py-1.5 text-[length:var(--sumi-text-sm)] gap-1.5",
  md: "px-4 py-2.5 text-[length:var(--sumi-text-base)] gap-2",
  lg: "px-[22px] py-[14px] text-[length:var(--sumi-text-md)] gap-2",
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
        controlReset,
        "inline-flex items-center justify-center",
        "font-medium leading-none select-none rounded-md",
        // Fix: transform must be in the transitioned property list, or the
        // active:translateY press feedback below snaps instead of animating.
        "transition-[color,background-color,border-color,box-shadow,transform]",
        // BUG-004 fix: --accent (malachite) not --secondary (azurite)
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:[transform:translateY(1px)]",
        variantClass(variantClasses, variant),
        variantClass(sizeClasses, size),
        // tailwind-merge lets the text-[length:…] sizes above cancel
        // leading-none, so buttons inherit their line-height. Say so
        // explicitly: without preflight a <button> wouldn't inherit it.
        "leading-[inherit]",
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
