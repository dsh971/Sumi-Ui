import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
} from "./Select.types";

// BUG-006 fix (Select): plain sentence-case label to match spec, consistent with Input
const labelClasses = "block text-xs font-medium text-fg-2 mb-1.5";
const helperClasses = "mt-1 text-xs text-fg-3";
const errorClasses = "mt-1 text-xs text-[color:var(--status-danger)]";

/** Composed root — adds label/helper/error wrapper around the Radix primitive.
 *  H-4 fix: wrapped in forwardRef so react-hook-form and other ref consumers work.
 */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { label, helperText, errorText, placeholder, id, triggerClassName, children, ...props },
  _ref,
) {
  const triggerId =
    id ?? (label ? `select-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const hasError = Boolean(errorText);

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={triggerId} className={labelClasses}>
          {label}
        </label>
      )}
      <RadixSelect.Root {...props}>
        <SelectTrigger
          id={triggerId}
          aria-invalid={hasError || undefined}
          aria-describedby={
            errorText ? `${triggerId}-error` : helperText ? `${triggerId}-helper` : undefined
          }
          className={triggerClassName}
        >
          <RadixSelect.Value placeholder={placeholder ?? "Select an option"} />
        </SelectTrigger>
        {children}
      </RadixSelect.Root>
      {errorText && (
        <p id={`${triggerId}-error`} role="alert" className={errorClasses}>
          {errorText}
        </p>
      )}
      {!errorText && helperText && (
        <p id={`${triggerId}-helper`} className={helperClasses}>
          {helperText}
        </p>
      )}
    </div>
  );
});
Select.displayName = "Select";

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between",
      "bg-bg-card text-fg-1",
      "border border-[color:var(--line-2)] rounded-md",
      "px-3 py-2 text-sm",
      "transition-colors",
      "placeholder:text-fg-3",
      "focus:outline-none focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "data-[state=open]:border-[color:var(--accent)]",
      className,
    )}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <ChevronDown size={14} className="text-fg-3 flex-shrink-0 ml-2" aria-hidden="true" />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      position={position}
      sideOffset={4}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden",
        "bg-bg-card rounded-lg",
        "border border-[color:var(--line-1)]",
        "[box-shadow:var(--shadow-md)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 w-[var(--radix-select-trigger-width)]",
        className,
      )}
      {...props}
    >
      <RadixSelect.ScrollUpButton className="flex items-center justify-center py-1 text-fg-3">
        <ChevronUp size={14} aria-hidden="true" />
      </RadixSelect.ScrollUpButton>
      <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
      <RadixSelect.ScrollDownButton className="flex items-center justify-center py-1 text-fg-3">
        <ChevronDown size={14} aria-hidden="true" />
      </RadixSelect.ScrollDownButton>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center",
      "rounded-md px-2 py-1.5 pl-8 text-sm text-fg-1",
      "outline-none",
      "focus:bg-bg-sunken focus:text-fg-1",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <RadixSelect.ItemIndicator>
        <Check size={14} className="text-accent" aria-hidden="true" />
      </RadixSelect.ItemIndicator>
    </span>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = "SelectItem";

export const SelectGroup = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Group>,
  SelectGroupProps
>((props, ref) => <RadixSelect.Group ref={ref} {...props} />);
SelectGroup.displayName = "SelectGroup";

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <RadixSelect.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-medium text-fg-3 tracking-wide uppercase", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <RadixSelect.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-[color:var(--line-1)]", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";
