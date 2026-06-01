import type React from "react";

export interface EmptyStateProps {
  /** ≤ 6 words; optionally one italic-tinted word via <accent-em> */
  title: string;
  /** ≤ 18 words of context */
  description?: string;
  /** Primary action button or link */
  action?: React.ReactNode;
  /** Short self-aware closing beat — "That's it." · "No fuss." */
  closingBeat?: string;
  /** Lucide icon element, rendered at size 32 */
  icon?: React.ReactNode;
  className?: string;
}
