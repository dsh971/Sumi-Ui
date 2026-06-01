export interface PaginationProps {
  /** Current page (1-based) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Number of page buttons shown on each side of the current page */
  siblingCount?: number;
  className?: string;
}
