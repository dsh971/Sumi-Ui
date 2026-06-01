import type React from "react";

export type SealSize = "sm" | "md" | "lg" | "xl";

export interface SealProps extends Omit<React.SVGAttributes<SVGElement>, "color"> {
  /** Hanzi glyph inside the seal — defaults to "墨" */
  glyph?: string;
  size?: SealSize;
  /** Accessible label — defaults to "Sumi seal" */
  "aria-label"?: string;
}
