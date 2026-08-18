import * as RadixRadio from "@radix-ui/react-radio-group";
import React from "react";
import { cn } from "../../lib/cn";
import type { RadioGroupProps, RadioItemProps } from "./Radio.types";

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadio.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => (
  <RadixRadio.Root ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export const RadioItem = React.forwardRef<React.ElementRef<typeof RadixRadio.Item>, RadioItemProps>(
  ({ label, id, className, ...props }, ref) => {
    const itemId = id ?? (label ? `radio-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <label
        htmlFor={itemId}
        className={cn("flex items-center gap-2.5", label && "cursor-pointer")}
      >
        <RadixRadio.Item
          ref={ref}
          id={itemId}
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-full",
            "border border-[color:var(--line-3)]",
            "bg-bg-card",
            "transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "data-[state=checked]:border-[color:var(--accent)] data-[state=checked]:bg-bg-card",
            className,
          )}
          {...props}
        >
          <RadixRadio.Indicator className="flex items-center justify-center">
            <span aria-hidden="true" className="block size-2 rounded-full bg-accent" />
          </RadixRadio.Indicator>
        </RadixRadio.Item>

        {label && <span className="text-sm text-fg-1 leading-snug select-none">{label}</span>}
      </label>
    );
  },
);
RadioItem.displayName = "RadioItem";
