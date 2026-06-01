import type React from "react";

export type SkeletonVariant = "text" | "circle" | "rect";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}
