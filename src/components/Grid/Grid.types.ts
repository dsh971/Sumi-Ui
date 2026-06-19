import type React from "react";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | string;
  gap?: string;
}
