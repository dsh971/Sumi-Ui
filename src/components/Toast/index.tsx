import * as RadixToast from "@radix-ui/react-toast";
import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
  ToastVariant,
  ToastViewportProps,
} from "./Toast.types";

const ToastVariantContext = React.createContext<ToastVariant>("info");
const useToastVariant = () => React.useContext(ToastVariantContext);

const rootClasses: Record<ToastVariant, string> = {
  success: "border-l-[color:var(--malachite-500)]",
  info: "border-l-[color:var(--azurite-500)]",
  warning: "border-l-[color:var(--persimmon-500)]",
  danger:
    "bg-[color:var(--cinnabar-600)] border-[color:var(--cinnabar-700)] border-l-[color:var(--cinnabar-200)]",
};

const iconClasses: Record<ToastVariant, string> = {
  success: "text-[color:var(--malachite-600)]",
  info: "text-[color:var(--azurite-500)]",
  warning: "text-[color:var(--persimmon-600)]",
  danger: "text-[color:var(--silk-50)]",
};

const timerClasses: Record<ToastVariant, string> = {
  success: "bg-[color:var(--malachite-400)]",
  info: "bg-[color:var(--azurite-400)]",
  warning: "bg-[color:var(--persimmon-400)]",
  danger: "bg-[color:rgba(247,244,235,0.55)]",
};

const actionClasses: Record<ToastVariant, string> = {
  success: "text-[color:var(--malachite-700)]",
  info: "text-[color:var(--azurite-600)]",
  warning: "text-[color:var(--persimmon-700)]",
  danger: "text-[color:var(--silk-50)] underline",
};

const titleClasses: Record<ToastVariant, string> = {
  success: "text-fg-1",
  info: "text-fg-1",
  warning: "text-fg-1",
  danger: "text-[color:var(--silk-50)]",
};

const descriptionClasses: Record<ToastVariant, string> = {
  success: "text-fg-2",
  info: "text-fg-2",
  warning: "text-fg-2",
  danger: "text-[color:rgba(247,244,235,0.82)]",
};

const dismissClasses: Record<ToastVariant, string> = {
  success: "text-fg-2 hover:bg-bg-sunken",
  info: "text-fg-2 hover:bg-bg-sunken",
  warning: "text-fg-2 hover:bg-bg-sunken",
  danger: "text-[color:var(--silk-50)] hover:bg-[color:rgba(247,244,235,0.14)]",
};

const variantIcons: Record<
  ToastVariant,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
};

export const ToastProvider = (props: ToastProviderProps) => <RadixToast.Provider {...props} />;
ToastProvider.displayName = "ToastProvider";

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof RadixToast.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => (
  <RadixToast.Viewport
    ref={ref}
    className={cn(
      "fixed top-4 right-4 left-4 sm:left-auto z-50 flex flex-col gap-2.5 w-auto sm:w-80 max-h-screen outline-none",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export const Toast = React.forwardRef<React.ElementRef<typeof RadixToast.Root>, ToastProps>(
  ({ variant = "info", duration, className, children, ...props }, ref) => {
    const Icon = variantIcons[variant];

    return (
      <ToastVariantContext.Provider value={variant}>
        <RadixToast.Root
          ref={ref}
          duration={duration}
          className={cn(
            "relative flex items-start gap-[11px] w-full sm:w-80 p-[13px_14px_14px]",
            "bg-[color:var(--bg-1)] border border-[color:var(--line-1)] border-l-[3px]",
            "rounded-lg [box-shadow:var(--shadow-lg)] overflow-hidden",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-top-2 data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-0",
            "duration-200",
            rootClasses[variant],
            className,
          )}
          {...props}
        >
          <span className={cn("flex-none mt-px", iconClasses[variant])} aria-hidden="true">
            <Icon size={19} />
          </span>
          <div className="flex-1 min-w-0">{children}</div>
          <span
            aria-hidden="true"
            className={cn("absolute bottom-0 left-0 h-0.5 rounded-r-sm", timerClasses[variant])}
            style={
              duration
                ? { animation: `sumi-toast-timer ${duration}ms linear forwards` }
                : { width: "100%" }
            }
          />
        </RadixToast.Root>
      </ToastVariantContext.Provider>
    );
  },
);
Toast.displayName = "Toast";

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof RadixToast.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => {
  const variant = useToastVariant();
  return (
    <RadixToast.Title
      ref={ref}
      className={cn("font-semibold text-[13.5px] leading-[1.35]", titleClasses[variant], className)}
      {...props}
    />
  );
});
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof RadixToast.Description>,
  ToastDescriptionProps
>(({ className, ...props }, ref) => {
  const variant = useToastVariant();
  return (
    <RadixToast.Description
      ref={ref}
      className={cn("text-[12.5px] leading-[1.5] mt-0.5", descriptionClasses[variant], className)}
      {...props}
    />
  );
});
ToastDescription.displayName = "ToastDescription";

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof RadixToast.Action>,
  ToastActionProps
>(({ className, ...props }, ref) => {
  const variant = useToastVariant();
  return (
    <RadixToast.Action
      ref={ref}
      className={cn(
        "text-[12.5px] font-semibold leading-none",
        "bg-transparent border-0 p-0 pt-[7px] m-0 cursor-pointer hover:underline",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
        actionClasses[variant],
        className,
      )}
      {...props}
    />
  );
});
ToastAction.displayName = "ToastAction";

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof RadixToast.Close>,
  ToastCloseProps
>(({ className, "aria-label": ariaLabel = "Dismiss", ...props }, ref) => {
  const variant = useToastVariant();
  return (
    <RadixToast.Close
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        "flex-none flex items-center justify-center min-w-[36px] min-h-[36px] -mr-[10px] -mt-[10px]",
        "bg-transparent border-0 cursor-pointer rounded opacity-55 hover:opacity-100",
        "transition-opacity",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
        dismissClasses[variant],
        className,
      )}
      {...props}
    >
      <X size={13} aria-hidden="true" />
    </RadixToast.Close>
  );
});
ToastClose.displayName = "ToastClose";
