import React from "react";
import { cn } from "../../lib/cn";
import type { GridProps } from "./Grid.types";

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ cols, gap = "var(--grid-gutter)", className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid", className)}
      style={{
        gridTemplateColumns:
          cols === undefined ? undefined : typeof cols === "number" ? `repeat(${cols}, 1fr)` : cols,
        gap,
        ...style,
      }}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";
