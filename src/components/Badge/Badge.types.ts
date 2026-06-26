import type React from "react";

export type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  /** @deprecated Use "malachite" instead. */
  | "jade"
  /** @deprecated Use "canvas" instead. */
  | "clay"
  /** @deprecated Use "sienna" instead. */
  | "peach"
  | "malachite"
  | "canvas"
  | "sienna"
  | "seal";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}
