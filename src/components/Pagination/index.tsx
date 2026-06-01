import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type { PaginationProps } from "./Pagination.types";

type PageItem = number | "left-ellipsis" | "right-ellipsis";

function buildPageItems(page: number, totalPages: number, siblingCount: number): PageItem[] {
  const totalSlots = siblingCount * 2 + 5;

  if (totalSlots >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + 2 * siblingCount;
    return [...Array.from({ length: leftCount }, (_, i) => i + 1), "right-ellipsis", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + 2 * siblingCount;
    const rightPages = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + 1 + i,
    );
    return [1, "left-ellipsis", ...rightPages];
  }

  const middlePages = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, "left-ellipsis", ...middlePages, "right-ellipsis", totalPages];
}

const itemBase = cn(
  "inline-flex items-center justify-center",
  "min-w-8 h-8 px-2 rounded-md",
  "text-sm font-medium",
  "transition-colors select-none",
  // Focus ring uses --accent per BUILD.md
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
);

// BUG-022 fix: active page uses ink-800 fill (charcoal), not malachite accent
const activePageClasses = "bg-ink-800 text-[color:var(--silk-50)] border border-ink-800";

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ page, totalPages, onPageChange, siblingCount = 1, className }, ref) => {
    if (totalPages <= 1) return null;

    const items = buildPageItems(page, totalPages, siblingCount);

    return (
      <nav ref={ref} aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className={cn(
            itemBase,
            "text-fg-2 hover:bg-bg-sunken hover:text-fg-1",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <ChevronLeft size={14} aria-hidden="true" />
        </button>

        {/* Page numbers */}
        {items.map((item) =>
          item === "left-ellipsis" || item === "right-ellipsis" ? (
            <span
              key={item}
              aria-hidden="true"
              className={cn(itemBase, "text-fg-3 cursor-default")}
            >
              <MoreHorizontal size={14} />
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              className={cn(
                itemBase,
                item === page ? activePageClasses : "text-fg-2 hover:bg-bg-sunken hover:text-fg-1",
              )}
            >
              {item}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className={cn(
            itemBase,
            "text-fg-2 hover:bg-bg-sunken hover:text-fg-1",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
