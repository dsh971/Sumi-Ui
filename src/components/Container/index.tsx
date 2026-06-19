import React from "react";
import { cn } from "../../lib/cn";
import type { ContainerProps, ContainerSize } from "./Container.types";

const maxWidthByContainerSize: Record<ContainerSize, string> = {
  sm: "var(--container-sm)",
  md: "var(--container-md)",
  lg: "var(--container-lg)",
  xl: "var(--container-xl)",
  "2xl": "var(--container-2xl)",
  read: "var(--measure-read)",
  app: "var(--measure-app)",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "app", gutter = true, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full",
        gutter &&
          "px-[var(--gutter-mobile)] md:px-[var(--gutter-tablet)] lg:px-[var(--gutter-desktop)]",
        className,
      )}
      style={{ maxWidth: maxWidthByContainerSize[size], ...style }}
      {...props}
    />
  ),
);
Container.displayName = "Container";
