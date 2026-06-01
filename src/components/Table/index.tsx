import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import React, { createContext, useCallback, useContext } from "react";
import { cn } from "../../lib/cn";
import { EmptyState } from "../EmptyState";
import type {
  SortDirection,
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableContextValue,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TableSelectCellProps,
  TableSelectHeadProps,
} from "./Table.types";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const TableContext = createContext<TableContextValue>({
  selectable: false,
  selectedIds: [],
  rowIds: [],
  onSelectionChange: undefined,
  striped: false,
  density: "default",
  stickyHeader: false,
});

const useTable = () => useContext(TableContext);

// ---------------------------------------------------------------------------
// Scroll wrapper + Table root
// ---------------------------------------------------------------------------

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      striped = false,
      stickyHeader = false,
      density = "default",
      selectable = false,
      selectedIds = [],
      rowIds = [],
      onSelectionChange,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <TableContext.Provider
      value={{ selectable, selectedIds, rowIds, onSelectionChange, striped, density, stickyHeader }}
    >
      {/* tabIndex={0} required by WCAG 2.1 SC 2.1.1 — overflow containers must be keyboard-focusable */}
      <section
        aria-label="Data table"
        tabIndex={0}
        className="w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
      >
        <table
          ref={ref}
          className={cn("w-full caption-bottom text-sm border-collapse", className)}
          {...props}
        >
          {children}
        </table>
      </section>
    </TableContext.Provider>
  ),
);
Table.displayName = "Table";

// ---------------------------------------------------------------------------
// Table sections
// ---------------------------------------------------------------------------

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    const { stickyHeader } = useTable();
    return (
      <thead
        ref={ref}
        // BUG-013 fix: header always bg-bg-sunken (--bg-2 = Hemp Canvas) per spec
        className={cn(
          "bg-bg-sunken",
          stickyHeader && "sticky top-0 z-10 [box-shadow:var(--shadow-xs)]",
          className,
        )}
        {...props}
      />
    );
  },
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    const isEmpty = React.Children.count(children) === 0;

    if (isEmpty) {
      return (
        <tbody ref={ref} className={className} {...props}>
          <tr>
            <td colSpan={100}>
              <EmptyState
                title="Nothing here yet"
                description="No rows to display."
                className="py-16"
              />
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props}>
        {children}
      </tbody>
    );
  },
);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn("border-t border-[color:var(--line-1)] bg-bg-sunken font-medium", className)}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

// ---------------------------------------------------------------------------
// Row
// ---------------------------------------------------------------------------

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, rowId: _rowId, ...props }, ref) => {
    const { striped } = useTable();

    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-[color:var(--line-1)]",
          "transition-colors",
          "hover:bg-bg-sunken",
          striped && "even:bg-bg-sunken even:hover:bg-bg-pressed",
          className,
        )}
        {...props}
      />
    );
  },
);
TableRow.displayName = "TableRow";

// ---------------------------------------------------------------------------
// Head cell (sortable)
// ---------------------------------------------------------------------------

const sortIcon: Record<SortDirection, React.ReactNode> = {
  none: <ArrowUpDown size={14} className="text-fg-3 ml-1 flex-shrink-0" aria-hidden="true" />,
  asc: <ArrowUp size={14} className="text-accent ml-1 flex-shrink-0" aria-hidden="true" />,
  desc: <ArrowDown size={14} className="text-accent ml-1 flex-shrink-0" aria-hidden="true" />,
};

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ sortable = false, sortDirection = "none", onSort, className, children, ...props }, ref) => {
    const { density } = useTable();

    const inner = (
      <>
        {children}
        {sortable && sortIcon[sortDirection]}
      </>
    );

    return (
      <th
        ref={ref}
        scope="col"
        // M-6 fix: sortable columns always carry aria-sort; "none" when not currently sorted
        aria-sort={
          sortable
            ? sortDirection === "asc"
              ? "ascending"
              : sortDirection === "desc"
                ? "descending"
                : "none"
            : undefined
        }
        className={cn(
          "text-left align-middle font-medium text-fg-2",
          "border-b border-[color:var(--line-1)]",
          density === "dense" ? "px-3 py-1.5 text-xs" : "px-4 py-3 text-sm",
          sortable &&
            "cursor-pointer select-none hover:text-fg-1 focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
          className,
        )}
        onClick={sortable ? onSort : undefined}
        onKeyDown={
          sortable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSort?.();
                }
              }
            : undefined
        }
        tabIndex={sortable ? 0 : undefined}
        {...props}
      >
        {sortable ? <span className="inline-flex items-center">{inner}</span> : children}
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

// ---------------------------------------------------------------------------
// Body cell
// ---------------------------------------------------------------------------

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    const { density } = useTable();

    return (
      <td
        ref={ref}
        className={cn(
          "align-middle text-fg-1",
          density === "dense" ? "px-3 py-1.5 text-xs" : "px-4 py-3 text-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
TableCell.displayName = "TableCell";

// ---------------------------------------------------------------------------
// Caption
// ---------------------------------------------------------------------------

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-xs text-fg-3 text-left", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";

// ---------------------------------------------------------------------------
// Selection helpers
// ---------------------------------------------------------------------------

export const TableSelectHead = React.forwardRef<HTMLTableCellElement, TableSelectHeadProps>(
  ({ className, ...props }, ref) => {
    const { selectedIds, rowIds, onSelectionChange, density } = useTable();
    const allSelected = rowIds.length > 0 && selectedIds.length === rowIds.length;
    const someSelected = selectedIds.length > 0 && !allSelected;

    const handleChange = useCallback(() => {
      if (allSelected) {
        onSelectionChange?.([]);
      } else {
        onSelectionChange?.([...rowIds]);
      }
    }, [allSelected, rowIds, onSelectionChange]);

    return (
      <th
        ref={ref}
        scope="col"
        className={cn(
          "align-middle",
          density === "dense" ? "px-3 py-1.5" : "px-4 py-3",
          "w-10",
          className,
        )}
        {...props}
      >
        <input
          type="checkbox"
          checked={allSelected}
          ref={(el) => {
            if (el) el.indeterminate = someSelected;
          }}
          onChange={handleChange}
          aria-label="Select all rows"
          className="size-4 rounded accent-[color:var(--accent)] cursor-pointer"
        />
      </th>
    );
  },
);
TableSelectHead.displayName = "TableSelectHead";

export const TableSelectCell = React.forwardRef<HTMLTableCellElement, TableSelectCellProps>(
  ({ rowId, className, ...props }, ref) => {
    const { selectedIds, onSelectionChange, density } = useTable();
    const checked = selectedIds.includes(rowId);

    const handleChange = useCallback(() => {
      if (checked) {
        onSelectionChange?.(selectedIds.filter((id) => id !== rowId));
      } else {
        onSelectionChange?.([...selectedIds, rowId]);
      }
    }, [checked, rowId, selectedIds, onSelectionChange]);

    return (
      <td
        ref={ref}
        className={cn(
          "align-middle",
          density === "dense" ? "px-3 py-1.5" : "px-4 py-3",
          "w-10",
          className,
        )}
        {...props}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          aria-label={`Select row ${rowId}`}
          className="size-4 rounded accent-[color:var(--accent)] cursor-pointer"
        />
      </td>
    );
  },
);
TableSelectCell.displayName = "TableSelectCell";
