import * as RadixTooltip from "@radix-ui/react-tooltip";
import React from "react";
import { cn } from "../../lib/cn";
import { popperTransition } from "../../lib/motion";
import type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from "./Tooltip.types";

export const TooltipProvider = (props: TooltipProviderProps) => (
  <RadixTooltip.Provider delayDuration={400} {...props} />
);
TooltipProvider.displayName = "TooltipProvider";

export const Tooltip = (props: TooltipProps) => <RadixTooltip.Root {...props} />;
Tooltip.displayName = "Tooltip";

export const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Trigger>,
  TooltipTriggerProps
>((props, ref) => <RadixTooltip.Trigger ref={ref} {...props} />);
TooltipTrigger.displayName = "TooltipTrigger";

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  TooltipContentProps
  // BUG-020 fix: sideOffset = 8px per spec (not 6px)
>(({ className, side = "top", sideOffset = 8, children, ...props }, ref) => (
  <RadixTooltip.Portal>
    <RadixTooltip.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-[240px] overflow-hidden",
        "rounded-md px-2.5 py-1.5",
        "bg-ink-800 text-[color:var(--silk-50)]",
        "text-xs leading-snug",
        "[box-shadow:var(--shadow-md)]",
        "origin-[--radix-tooltip-content-transform-origin]",
        popperTransition,
        className,
      )}
      {...props}
    >
      {children}
      <RadixTooltip.Arrow className="fill-ink-800" />
    </RadixTooltip.Content>
  </RadixTooltip.Portal>
));
TooltipContent.displayName = "TooltipContent";
