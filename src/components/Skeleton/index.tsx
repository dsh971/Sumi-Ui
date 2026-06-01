import React from "react";
import { cn } from "../../lib/cn";
import type { SkeletonProps, SkeletonVariant } from "./Skeleton.types";

const variantClasses: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded",
  circle: "rounded-full",
  rect: "rounded-md",
};

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ variant = "rect", width, height, className, style, ...props }, ref) => {
    const inlineStyles: React.CSSProperties = {
      ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
      ...(height !== undefined
        ? { height: typeof height === "number" ? `${height}px` : height }
        : {}),
      ...(variant === "circle" && width !== undefined
        ? { height: typeof width === "number" ? `${width}px` : width }
        : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn("block sm-skeleton", variantClasses[variant], className)}
        style={inlineStyles}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";
