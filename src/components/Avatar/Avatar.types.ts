import type React from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  /** 1–2 character fallback initials */
  fallback?: string;
}

/** Avatar with a cinnabar seal badge overlaid at bottom-right */
export interface AvatarSealProps extends AvatarProps {
  /** Seal glyph override — defaults to "墨" */
  sealGlyph?: string;
}
