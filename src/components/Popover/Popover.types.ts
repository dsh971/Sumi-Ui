import type * as RadixPopover from "@radix-ui/react-popover";
import type React from "react";

export type PopoverProps = RadixPopover.PopoverProps;
export type PopoverTriggerProps = RadixPopover.PopoverTriggerProps;
export type PopoverAnchorProps = RadixPopover.PopoverAnchorProps;
export type PopoverCloseProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Close>;
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Content>;
