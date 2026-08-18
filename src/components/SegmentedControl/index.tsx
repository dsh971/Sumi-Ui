import * as RadixRadio from "@radix-ui/react-radio-group";
import React from "react";
import { cn } from "../../lib/cn";
import type { SegmentedControlItemProps, SegmentedControlProps } from "./SegmentedControl.types";

/**
 * Standalone value-picker in the "paper inset" style documented in
 * Sumi-Design-System/preview/tabs.html ("Tabs & segmented" card). Distinct
 * from Tabs' segmented variant, which is a tab-panel switcher (requires an
 * associated TabsContent) — this is a single-select control with no content
 * panels, built on @radix-ui/react-radio-group for roving-tabindex/arrow-key
 * navigation and radiogroup/radio ARIA semantics.
 */
export const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof RadixRadio.Root>,
  SegmentedControlProps
>(({ className, ...props }, ref) => (
  <RadixRadio.Root
    ref={ref}
    className={cn("inline-flex items-center gap-0.5", "bg-bg-sunken rounded-md p-[3px]", className)}
    {...props}
  />
));
SegmentedControl.displayName = "SegmentedControl";

export const SegmentedControlItem = React.forwardRef<
  React.ElementRef<typeof RadixRadio.Item>,
  SegmentedControlItemProps
>(({ label, className, ...props }, ref) => (
  <RadixRadio.Item
    ref={ref}
    className={cn(
      "rounded-sm px-[14px] py-[6px] text-[length:var(--text-sm)] text-fg-2",
      "transition-colors",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "data-[state=checked]:bg-bg-page data-[state=checked]:text-fg-1 data-[state=checked]:font-medium",
      "data-[state=checked]:[box-shadow:var(--shadow-xs)]",
      className,
    )}
    {...props}
  >
    {label}
  </RadixRadio.Item>
));
SegmentedControlItem.displayName = "SegmentedControlItem";
