import React from "react";
import { cn } from "../../lib/cn";
import { type VariantClassMap, variantClass } from "../../lib/variantClasses";
import type { SkeletonProps, SkeletonVariant } from "./Skeleton.types";

const variantClasses: VariantClassMap<SkeletonVariant> = {
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

    // `aria-hidden` is correct here — a single placeholder has nothing to
    // announce. But that means a *group* of Skeletons is otherwise silent
    // to assistive tech while it's the only thing on screen: wrap the
    // group in a `role="status"` element with a visually-hidden "Loading…"
    // label so screen readers get one announcement when loading starts.
    // See Skeleton.stories.tsx's `AccessibleLoadingRegion` story and the
    // "Loading announcements" section in the docs for the worked pattern —
    // this is intentionally guidance, not a new wrapper component.
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn("block sm-skeleton", variantClass(variantClasses, variant), className)}
        style={inlineStyles}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";
