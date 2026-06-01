import type React from "react";

export type BreadcrumbProps = React.HTMLAttributes<HTMLElement> & {
  /** Accessible label for the nav landmark */
  "aria-label"?: string;
};

export type BreadcrumbListProps = React.HTMLAttributes<HTMLOListElement>;
export type BreadcrumbItemProps = React.HTMLAttributes<HTMLLIElement>;

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render as a custom element (e.g. a router Link) */
  asChild?: boolean;
}

export type BreadcrumbPageProps = React.HTMLAttributes<HTMLSpanElement>;
export type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLSpanElement>;
