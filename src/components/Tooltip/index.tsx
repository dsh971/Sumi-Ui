import * as RadixTooltip from "@radix-ui/react-tooltip";
import React from "react";
import { cn } from "../../lib/cn";
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
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "duration-150",
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
