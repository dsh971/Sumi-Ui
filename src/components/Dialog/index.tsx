import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import { SheetContent } from "../Sheet";
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

// Dialog is Sumi's confirm/prompt archetype built on Sheet, the responsive
// overlay primitive (centered modal >=640px, bottom sheet below) — see
// Sheet/index.tsx. Dialog's own public API (props, sub-components) is
// unchanged; only the internals now route through Sheet.
export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DialogContentProps
>(({ showClose = true, className, children, ...props }, ref) => (
  // BUG-018 fix: --radius-4 (10px, Sheet's own default desktop rounding)
  // is the same value the old rounded-xl override resolved to — no
  // Dialog-specific corner-radius override needed, and leaving it out
  // lets Sheet's mobile rounded-t-[18px] form apply correctly too.
  <SheetContent
    ref={ref}
    breakpoint={640}
    desktopMaxWidth={512}
    showHandle
    className={cn("p-0 overflow-hidden", className)}
    {...props}
  >
    {children}
    {showClose && (
      <RadixDialog.Close
        className={cn(
          "absolute end-4 top-4",
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
  </SheetContent>
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
