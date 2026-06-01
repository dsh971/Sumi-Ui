import type React from "react";

export type LogoVariant = "light" | "dark";

export interface LogoProps extends React.SVGAttributes<SVGElement> {
  variant?: LogoVariant;
  /** Width in px — height scales proportionally */
  width?: number;
  /** Accessible label override */
  "aria-label"?: string;
}
