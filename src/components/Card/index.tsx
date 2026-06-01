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

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 px-5 pt-5 pb-4", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-5 py-4", className)} {...props} />
  ),
);
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-5 pt-4 pb-5",
        "border-t border-[color:var(--line-1)]",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";
