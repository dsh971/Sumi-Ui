import type React from "react";

export type TimelineMarker =
  | "dot"
  | "dot-ok"
  | "dot-info"
  | "dot-warn"
  | "dot-danger"
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
}

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  items: TimelineItemData[];
  timeGutter?: boolean;
}

export type TimelineItem = TimelineItemData;
