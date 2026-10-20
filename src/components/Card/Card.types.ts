import type React from "react";

/**
 * `plain` (default) — no fill, no box: content set in space under one ink
 * hairline, the way a passage sits on silk. `bordered` — a white sheet with a
 * hairline edge, for dense app UI where regions must read as discrete objects.
 */
export type CardVariant = "plain" | "bordered";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  asChild?: boolean;
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
