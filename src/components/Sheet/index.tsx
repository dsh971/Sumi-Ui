import * as RadixDialog from "@radix-ui/react-dialog";
import React from "react";
import { useViewportIsMobile } from "../../hooks/useViewportIsMobile";
import { cn } from "../../lib/cn";
import { dialogTransition, scrimTransition, sheetMobileTransition } from "../../lib/motion";
import type {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps,
} from "./Sheet.types";

/**
 * Sheet — the responsive overlay primitive (Sumi-Design-System's own
 * compiled primitive set is Button/Sheet/Dialog, with Dialog "built on
 * Sheet"). Centered modal at/above `breakpoint`, bottom sheet below it —
 * see Sumi-Design-System/preview/mobile-behavior.html ("Archetype 1 —
 * overlays become sheets") and components/Sheet/Sheet.jsx for the
 * reference behavior this ports onto Radix Dialog (focus-trap, Escape,
 * scroll-lock, and portal handling come from Radix instead of being
 * reimplemented — BUILD.md: "match the visuals, not the code").
 */
export const Sheet = (props: SheetProps) => <RadixDialog.Root {...props} />;
Sheet.displayName = "Sheet";

export const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Trigger>,
  SheetTriggerProps
>((props, ref) => <RadixDialog.Trigger ref={ref} {...props} />);
SheetTrigger.displayName = "SheetTrigger";

export const SheetClose = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Close>,
  SheetCloseProps
>((props, ref) => <RadixDialog.Close ref={ref} {...props} />);
SheetClose.displayName = "SheetClose";

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  SheetTitleProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn("font-display text-[20px] font-medium text-fg-1 leading-snug", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn("text-sm text-fg-2 leading-relaxed", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  SheetContentProps
>(
  (
    {
      breakpoint = 640,
      desktopMaxWidth = 420,
      showHandle = true,
      closeOnScrim = true,
      className,
      style,
      children,
      onPointerDownOutside,
      ...props
    },
    ref,
  ) => {
    const isMobile = useViewportIsMobile(breakpoint);

    return (
      // Radix's Dialog.Portal portals each of its children (Overlay,
      // Content) as independent top-level siblings under document.body —
      // NOT nested inside each other — so Overlay is scrim-only here and
      // Content positions/centers itself independently below (verified
      // live: an earlier version had Overlay flex-center Content, which
      // rendered Content off-screen since a flex parent-child relationship
      // never actually existed in the portaled DOM).
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={cn(
            "fixed inset-0 z-50",
            "bg-[color:var(--bg-scrim)]",
            "[overscroll-behavior:contain]",
            scrimTransition,
          )}
        />
        <RadixDialog.Content
          ref={ref}
          aria-modal="true"
          onPointerDownOutside={(e) => {
            if (!closeOnScrim) e.preventDefault();
            onPointerDownOutside?.(e);
          }}
          style={{ ...(!isMobile ? { maxWidth: desktopMaxWidth } : undefined), ...style }}
          className={cn(
            "fixed z-50 outline-none box-border",
            "bg-bg-card border border-[color:var(--line-1)] [box-shadow:var(--shadow-lg)]",
            "[overscroll-behavior:contain]",
            isMobile
              ? cn(
                  "inset-x-0 bottom-0 w-full rounded-t-[18px] max-h-[90vh] overflow-y-auto",
                  sheetMobileTransition,
                )
              : cn(
                  "left-1/2 top-1/2 w-[calc(100vw-2rem)] rounded-[var(--radius-4)] max-h-[85vh] overflow-y-auto",
                  dialogTransition,
                ),
            className,
          )}
          {...props}
        >
          {isMobile && showHandle && (
            <div aria-hidden="true" className="flex justify-center pt-2.5 pb-0.5">
              <div className="h-1 w-[34px] rounded-full bg-[color:var(--line-3)]" />
            </div>
          )}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  },
);
SheetContent.displayName = "SheetContent";
