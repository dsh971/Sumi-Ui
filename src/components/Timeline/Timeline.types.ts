import type React from "react";

export type TimelineMarker =
  | "dot"
  | "dot-ok"
  | "dot-info"
  | "dot-warn"
  | "dot-danger"
  | "dot-pending"
  | "dot-hollow"
  | "icon"
  | "icon-ok"
  | "icon-danger";

export interface TimelineItemData {
  id?: string;
  time?: string;
  title: React.ReactNode;
  description?: string;
  marker?: TimelineMarker;
  iconNode?: React.ReactNode;
  avatar?: { initials: string; color: string };
  groupLabel?: string;
  children?: TimelineItemData[];
}

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  items: TimelineItemData[];
  timeGutter?: boolean;
  selectedId?: string;
  onItemClick?: (item: TimelineItemData) => void;
  defaultCollapsedDepth?: number;
}

export type TimelineItem = TimelineItemData;
