import type * as RadixToast from "@radix-ui/react-toast";
import type React from "react";

export type ToastVariant = "success" | "info" | "warning" | "danger";

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof RadixToast.Root> {
  variant?: ToastVariant;
}

export type ToastProviderProps = React.ComponentPropsWithoutRef<typeof RadixToast.Provider>;

export type ToastViewportProps = React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>;

export type ToastTitleProps = React.ComponentPropsWithoutRef<typeof RadixToast.Title>;

export type ToastDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixToast.Description>;

export type ToastActionProps = React.ComponentPropsWithoutRef<typeof RadixToast.Action>;

export type ToastCloseProps = React.ComponentPropsWithoutRef<typeof RadixToast.Close>;
