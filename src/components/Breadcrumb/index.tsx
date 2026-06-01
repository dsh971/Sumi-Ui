import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { cn } from "../../lib/cn";
import type {
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "./Breadcrumb.types";

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ "aria-label": ariaLabel = "Breadcrumb", className, ...props }, ref) => (
    <nav ref={ref} aria-label={ariaLabel} className={cn(className)} {...props} />
  ),
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("flex flex-wrap items-center gap-1.5", "text-sm text-fg-3", className)}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        className={cn(
          // BUG-024 fix: ancestor links use fg-3 (Misty Wash) per spec, not fg-2
          "text-fg-3 underline-offset-4 hover:text-fg-1",
          "transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] rounded-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn("text-fg-1 font-medium", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

/** The `·` separator between breadcrumb items. Override children to use a different character. */
// M-8 fix: add forwardRef for consistency with sibling sub-components
export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn("text-fg-3 select-none", className)}
      {...props}
    >
      {children ?? "·"}
    </span>
  ),
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
