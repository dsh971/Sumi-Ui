import type React from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "read" | "app";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  gutter?: boolean;
}
