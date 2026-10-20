import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { cn } from "../../lib/cn";
import type {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardVariant,
} from "./Card.types";

// Sections read the variant to pick their side padding as a *base* class, so a
// consumer's own px-* on a section still wins through cn()/tailwind-merge.
// plain: flush to the column (text aligns with the surrounding page);
// bordered: inset inside the sheet's edge.
const CardVariantContext = React.createContext<CardVariant>("plain");
const useSectionPadding = () =>
  React.useContext(CardVariantContext) === "plain" ? "px-0" : "px-5";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "plain", asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <CardVariantContext.Provider value={variant}>
        <Comp
          ref={ref}
          data-variant={variant}
          className={cn(
            // plain: separation by space and a single top hairline.
            variant === "plain" && "border-t border-[color:var(--line-2)]",
            variant === "bordered" &&
              "bg-bg-card rounded-lg border border-[color:var(--line-1)] [--knockout:var(--bg-1)]",
            className,
          )}
          {...props}
        />
      </CardVariantContext.Provider>
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
      className={cn(
        "flex flex-col gap-1 pt-4 pb-4 first:pt-5 last:pb-5",
        useSectionPadding(),
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pt-4 pb-4 first:pt-5 last:pb-5", useSectionPadding(), className)}
      {...props}
    />
  ),
);
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center pt-4 pb-4 first:pt-5 last:pb-5",
        useSectionPadding(),
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
