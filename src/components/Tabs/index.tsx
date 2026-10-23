import * as RadixTabs from "@radix-ui/react-tabs";
import React from "react";
import { cn } from "../../lib/cn";
import { controlReset } from "../../lib/reset";
import type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from "./Tabs.types";

// Tabs are underline-only: an ink rule under the active label, no container
// fill. The segmented/pill pattern belongs to SegmentedControl (decision 004).

export const Tabs = React.forwardRef<React.ElementRef<typeof RadixTabs.Root>, TabsProps>(
  (props, ref) => <RadixTabs.Root ref={ref} {...props} />,
);
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef<React.ElementRef<typeof RadixTabs.List>, TabsListProps>(
  ({ className, ...props }, ref) => (
    <RadixTabs.List
      ref={ref}
      className={cn("flex gap-0 border-b border-[color:var(--line-2)]", className)}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      controlReset,
      "inline-flex items-center justify-center gap-1.5",
      "whitespace-nowrap select-none text-sm",
      "transition-colors",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "px-4 py-[10px]",
      "border-b-2 border-transparent -mb-px",
      // One weight for every state, so switching tabs never reflows the row; the
      // active tab reads by ink colour and the underline (decision 004).
      "font-medium",
      "data-[state=active]:border-[color:var(--line-ink)] data-[state=active]:text-fg-1",
      "data-[state=inactive]:text-fg-2",
      "data-[state=inactive]:hover:text-fg-1 data-[state=inactive]:hover:border-[color:var(--line-2)]",
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
