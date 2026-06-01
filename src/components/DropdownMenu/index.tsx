import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from "./DropdownMenu.types";

export const DropdownMenu = (props: DropdownMenuProps) => <RadixDropdown.Root {...props} />;
DropdownMenu.displayName = "DropdownMenu";

export const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Trigger>,
  DropdownMenuTriggerProps
>((props, ref) => <RadixDropdown.Trigger ref={ref} {...props} />);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <RadixDropdown.Portal>
    <RadixDropdown.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[10rem] overflow-hidden",
        "rounded-lg p-1",
        "bg-bg-card",
        "border border-[color:var(--line-1)]",
        "[box-shadow:var(--shadow-md)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </RadixDropdown.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Item>,
  DropdownMenuItemProps & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <RadixDropdown.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2",
      "rounded-md px-2 py-1.5 text-sm text-fg-1",
      "outline-none transition-colors",
      "focus:bg-bg-sunken focus:text-fg-1",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Label>,
  DropdownMenuLabelProps & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <RadixDropdown.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-medium text-fg-3 tracking-wide uppercase",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <RadixDropdown.Separator
    ref={ref}
    // BUG-025 fix: inset 8px from sides per spec (not full-bleed negative margin)
    className={cn("mx-2 my-1.5 h-px bg-[color:var(--line-1)]", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <RadixDropdown.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2",
      "rounded-md py-1.5 pl-8 pr-2 text-sm text-fg-1",
      "outline-none transition-colors",
      "focus:bg-bg-sunken",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <RadixDropdown.ItemIndicator>
        <Check size={14} className="text-accent" aria-hidden="true" />
      </RadixDropdown.ItemIndicator>
    </span>
    {children}
  </RadixDropdown.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.RadioGroup>,
  DropdownMenuRadioGroupProps
>((props, ref) => <RadixDropdown.RadioGroup ref={ref} {...props} />);
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <RadixDropdown.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2",
      "rounded-md py-1.5 pl-8 pr-2 text-sm text-fg-1",
      "outline-none transition-colors",
      "focus:bg-bg-sunken",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <RadixDropdown.ItemIndicator>
        <Circle size={8} className="fill-accent text-accent" aria-hidden="true" />
      </RadixDropdown.ItemIndicator>
    </span>
    {children}
  </RadixDropdown.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export const DropdownMenuSub = (props: DropdownMenuSubProps) => <RadixDropdown.Sub {...props} />;
DropdownMenuSub.displayName = "DropdownMenuSub";

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.SubTrigger>,
  DropdownMenuSubTriggerProps & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <RadixDropdown.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2",
      "rounded-md px-2 py-1.5 text-sm text-fg-1",
      "outline-none transition-colors",
      "focus:bg-bg-sunken data-[state=open]:bg-bg-sunken",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight size={14} className="ml-auto text-fg-3" aria-hidden="true" />
  </RadixDropdown.SubTrigger>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <RadixDropdown.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden",
      "rounded-lg p-1",
      "bg-bg-card",
      "border border-[color:var(--line-1)]",
      "[box-shadow:var(--shadow-md)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
