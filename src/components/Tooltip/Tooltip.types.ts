import type * as RadixTooltip from "@radix-ui/react-tooltip";
import type React from "react";

export type TooltipProviderProps = RadixTooltip.TooltipProviderProps;
export type TooltipProps = RadixTooltip.TooltipProps;
export type TooltipTriggerProps = RadixTooltip.TooltipTriggerProps;

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixTooltip.Content> {
  side?: "top" | "right" | "bottom" | "left";
}
