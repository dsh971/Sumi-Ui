import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { cn } from "../../lib/cn";
import type { CardBodyProps, CardFooterProps, CardHeaderProps, CardProps } from "./Card.types";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          "bg-bg-card rounded-lg border border-[color:var(--line-1)]",
          variant === "default" && "[box-shadow:var(--shadow-xs)]",
          variant === "elevated" && "[box-shadow:var(--shadow-md)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

// BUG-008 fix: pt-5/pb-5 only apply via first:/last: — each sub-component's
// outer edge is correct (20px, matching the design system's flat-card spec)
// whenever it's actually touching the Card's border, regardless of which
// other sub-components are present. The pt-4/pb-4 base is the contribution
// to the 32px inter-section gap when a sub-component sits in the middle.
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1 px-5 pt-4 pb-4 first:pt-5 last:pb-5", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-5 pt-4 pb-4 first:pt-5 last:pb-5", className)} {...props} />
  ),
);
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-5 pt-4 pb-4 first:pt-5 last:pb-5",
        // first:border-t-0 — no stray top rule if Footer is ever used
        // without anything above it.
        "border-t border-[color:var(--line-1)] first:border-t-0",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";
