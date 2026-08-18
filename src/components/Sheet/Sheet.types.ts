import type * as RadixDialog from "@radix-ui/react-dialog";
import type React from "react";

export type SheetProps = RadixDialog.DialogProps;
export type SheetTriggerProps = RadixDialog.DialogTriggerProps;
export type SheetCloseProps = RadixDialog.DialogCloseProps;
export type SheetTitleProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Title>;
export type SheetDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Description>;

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  /** Width below which the sheet becomes a bottom sheet. Default 640. */
  breakpoint?: number;
  /** Max width of the centered modal form (desktop). Default 420. */
  desktopMaxWidth?: number;
  /** Show the drag handle on the bottom-sheet form. Default true. */
  showHandle?: boolean;
  /** Dismiss when the scrim is clicked. Default true. */
  closeOnScrim?: boolean;
}
