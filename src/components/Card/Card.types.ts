import type React from "react";

export type CardVariant = "default" | "elevated";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  asChild?: boolean;
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
