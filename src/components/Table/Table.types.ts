import type React from "react";

export type SortDirection = "asc" | "desc" | "none";
export type TableDensity = "default" | "dense";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Alternate row background tinting */
  striped?: boolean;
  /** `position: sticky` on the thead */
  stickyHeader?: boolean;
  /** Compact row padding — matches preview/table-dense.html */
  density?: TableDensity;
  /** Enable row-selection mode */
  selectable?: boolean;
  /** Controlled selected row IDs */
  selectedIds?: string[];
  /** Full list of row IDs — needed so TableSelectHead can compute "all selected" */
  rowIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

/** Opt-in windowed rendering for large datasets — see TableBodyProps.virtualize. */
export interface TableVirtualizeConfig<T = unknown> {
  rows: T[];
  estimateRowHeight: number;
  /** Return this row's <TableCell> children — no <tr> wrapper (the
   *  virtualized body supplies it). Columns must be fixed-width: the
   *  parent <tr> is display:flex for windowing, not table layout, so
   *  cells no longer auto-size against the header's column widths. */
  renderRow: (row: T, index: number) => React.ReactNode;
  overscan?: number;
}

export interface TableBodyProps<T = unknown> extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** When set, children is ignored and rows render virtualized (windowed)
   *  instead of all at once. Uses real <tr>/<td> elements repositioned via
   *  display:flex + position:absolute (not ARIA-role divs) so the body
   *  stays valid, foster-parenting-safe HTML nested inside <table>; the
   *  display override needs role="rowgroup"/"row" restored explicitly
   *  since overriding `display` on table elements drops their implicit
   *  ARIA table roles in some browsers. */
  virtualize?: TableVirtualizeConfig<T>;
}

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Provide when inside a selectable Table */
  rowId?: string;
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

/** Drop into a <TableRow> inside <TableHeader> for the "select all" column */
export type TableSelectHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

/** Drop into a <TableRow> inside <TableBody> for per-row selection */
export interface TableSelectCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  rowId: string;
}

/** Internal context shape */
export interface TableContextValue {
  selectable: boolean;
  selectedIds: string[];
  rowIds: string[];
  onSelectionChange: ((ids: string[]) => void) | undefined;
  striped: boolean;
  density: TableDensity;
  stickyHeader: boolean;
}
