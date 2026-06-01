import * as RadixTabs from "@radix-ui/react-tabs";
import React from "react";
import { cn } from "../../lib/cn";
import type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from "./Tabs.types";

// BUG-012 fix: add `variant` prop supporting "underline" (spec primary) and "segmented"
// "underline" is now the default to match the spec's primary tabs pattern

export const Tabs = React.forwardRef<React.ElementRef<typeof RadixTabs.Root>, TabsProps>(
  (props, ref) => <RadixTabs.Root ref={ref} {...props} />,
);
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  TabsListProps & { variant?: "underline" | "segmented" }
>(({ className, variant = "underline", ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn(
      variant === "underline"
        ? // Primary tabs pattern per spec: flush bottom border, no container fill
          "flex gap-0 border-b border-[color:var(--line-2)]"
        : // Secondary segmented pill pattern
          "inline-flex items-center gap-0.5 rounded-lg bg-bg-sunken p-1 border border-[color:var(--line-1)]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  TabsTriggerProps & { variant?: "underline" | "segmented" }
>(({ className, variant = "underline", ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-1.5",
      "whitespace-nowrap select-none text-sm",
      "transition-colors",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
      "disabled:pointer-events-none disabled:opacity-50",
      variant === "underline"
        ? [
            // Underline pattern: bottom-border indicator, no background
            "px-4 py-[10px]",
            "border-b-2 border-transparent -mb-px",
            "data-[state=active]:border-[color:var(--ink-800)] data-[state=active]:text-fg-1 data-[state=active]:font-medium",
            "data-[state=inactive]:text-fg-2 data-[state=inactive]:font-normal",
            "data-[state=inactive]:hover:text-fg-1 data-[state=inactive]:hover:border-[color:var(--line-2)]",
          ].join(" ")
        : [
            // Segmented pattern: filled active tab
            "rounded-md px-3 py-1.5 font-medium",
            "data-[state=active]:bg-bg-card data-[state=active]:text-fg-1",
            "data-[state=active]:[box-shadow:var(--shadow-xs)]",
            // M-3 fix: use semantic bg-bg-sunken not raw var(--bg-2)
            "data-[state=inactive]:text-fg-2 data-[state=inactive]:hover:bg-bg-sunken data-[state=inactive]:hover:text-fg-1",
          ].join(" "),
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn(
      "mt-4",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
