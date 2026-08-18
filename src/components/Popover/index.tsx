import * as RadixPopover from "@radix-ui/react-popover";
import React from "react";
import { cn } from "../../lib/cn";
import { popperTransition } from "../../lib/motion";
import type {
  PopoverAnchorProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "./Popover.types";

/**
 * Public Popover primitive — @radix-ui/react-popover was already a
 * dependency (used internally by DatePicker and Combobox) but was never
 * exposed as its own component. Styled to match Combobox's existing
 * inline popover treatment for visual consistency.
 */
export const Popover = (props: PopoverProps) => <RadixPopover.Root {...props} />;
Popover.displayName = "Popover";

export const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Trigger>,
  PopoverTriggerProps
>((props, ref) => <RadixPopover.Trigger ref={ref} {...props} />);
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverAnchor = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Anchor>,
  PopoverAnchorProps
>((props, ref) => <RadixPopover.Anchor ref={ref} {...props} />);
PopoverAnchor.displayName = "PopoverAnchor";

export const PopoverClose = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Close>,
  PopoverCloseProps
>((props, ref) => <RadixPopover.Close ref={ref} {...props} />);
PopoverClose.displayName = "PopoverClose";

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem]",
        "bg-[color:var(--bg-1)] border border-[color:var(--line-1)] rounded-lg",
        "[box-shadow:var(--shadow-lg)] p-[5px]",
        "outline-none",
        "origin-[--radix-popover-content-transform-origin]",
        popperTransition,
        className,
      )}
      {...props}
    />
  </RadixPopover.Portal>
));
PopoverContent.displayName = "PopoverContent";
