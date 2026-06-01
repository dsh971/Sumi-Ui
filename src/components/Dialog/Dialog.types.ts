import type * as RadixDialog from "@radix-ui/react-dialog";
import type React from "react";

export type DialogProps = RadixDialog.DialogProps;
export type DialogTriggerProps = RadixDialog.DialogTriggerProps;
export type DialogCloseProps = RadixDialog.DialogCloseProps;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  showClose?: boolean;
}

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Title>;
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Description>;
