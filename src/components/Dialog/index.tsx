import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./Dialog.types";

// Radix Root — no DOM element, forwardRef not applicable
export const Dialog = (props: DialogProps) => <RadixDialog.Root {...props} />;
Dialog.displayName = "Dialog";

export const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Trigger>,
  DialogTriggerProps
>((props, ref) => <RadixDialog.Trigger ref={ref} {...props} />);
DialogTrigger.displayName = "DialogTrigger";

export const DialogClose = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Close>,
  DialogCloseProps
>((props, ref) => <RadixDialog.Close ref={ref} {...props} />);
DialogClose.displayName = "DialogClose";

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DialogContentProps
>(({ showClose = true, className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay
      className={cn(
        "fixed inset-0 z-50",
        "bg-[color:var(--bg-scrim)]",
        "backdrop-blur-[var(--dialog-backdrop-blur)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      )}
    />
    {/* BUG-018 fix: rounded-xl = --radius-xl = 10px per spec */}
    <RadixDialog.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50",
        "-translate-x-1/2 -translate-y-1/2",
        "w-[calc(100vw-2rem)] max-w-lg",
        "bg-bg-card rounded-xl",
        "border border-[color:var(--line-1)]",
        "[box-shadow:var(--shadow-xl)]",
        "p-0 overflow-hidden",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "duration-200",
        className,
      )}
      {...props}
    >
      {children}
      {showClose && (
        <RadixDialog.Close
          className={cn(
            "absolute right-4 top-4",
            "rounded-md p-1",
            "text-fg-3 hover:text-fg-1",
            "hover:bg-bg-sunken",
            "transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
          )}
          aria-label="Close"
        >
          <X size={16} aria-hidden="true" />
        </RadixDialog.Close>
      )}
    </RadixDialog.Content>
  </RadixDialog.Portal>
));
DialogContent.displayName = "DialogContent";

// BUG-019 fix: no bottom border divider — spec uses spacing rhythm alone
export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={cn("flex flex-col gap-1.5 px-6 pt-6 pb-4", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={cn(
      "flex items-center justify-end gap-3 px-6 py-4",
      "border-t border-[color:var(--line-1)]",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

// BUG-017 fix: Cormorant Garamond (font-display) at 20px per spec, not Inter 18px
export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn("font-display text-[20px] font-medium text-fg-1 leading-snug", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn("text-sm text-fg-2 leading-relaxed", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
