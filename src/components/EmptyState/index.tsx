import React from "react";
import { cn } from "../../lib/cn";
import type { EmptyStateProps } from "./EmptyState.types";

// BUG-023 fix: title uses font-display (Cormorant Garamond) at 20px per spec

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, action, closingBeat, icon, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "px-6 py-12 gap-4",
        className,
      )}
    >
      {icon && (
        <span className="text-fg-3 mb-1" aria-hidden="true">
          {icon}
        </span>
      )}

      <div className="flex flex-col gap-2">
        {/* Display serif at 20px matches spec h3 styling for empty states */}
        <h3 className="font-display text-[20px] font-medium text-fg-1 leading-snug">{title}</h3>
        {description && (
          <p className="text-sm text-fg-2 leading-snug max-w-[320px]">{description}</p>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}

      {closingBeat && <p className="text-xs text-fg-3 italic mt-1">{closingBeat}</p>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";
