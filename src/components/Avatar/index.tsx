import React, { useState } from "react";
import { cn } from "../../lib/cn";
import type { AvatarProps, AvatarSealProps, AvatarSize } from "./Avatar.types";

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-6 text-[var(--avatar-fallback-text-sm)]",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-14 text-base",
};

const sealOverlaySize: Record<AvatarSize, number> = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
};

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = "md", src, alt, fallback, className, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);
    const showFallback = !src || imgError;

    const label = alt ?? fallback ?? "Avatar";

    return (
      // M-7 fix: root span has role="img" + aria-label so AT announces context regardless of render path
      <span
        ref={ref}
        role="img"
        aria-label={label}
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full",
          "select-none",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {!showFallback && (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            onError={() => setImgError(true)}
            className="aspect-square size-full object-cover"
          />
        )}
        {/* BUG-026 fix: fallback text uses font-display (Cormorant Garamond) per spec */}
        <span
          aria-hidden="true"
          className={cn(
            "flex size-full items-center justify-center rounded-full",
            "bg-bg-sunken text-fg-2 font-display font-medium",
            !showFallback && "hidden",
          )}
        >
          {fallback ? fallback.slice(0, 2) : "?"}
        </span>
      </span>
    );
  },
);
Avatar.displayName = "Avatar";

/** Avatar with a cinnabar seal badge pinned to the bottom-right corner. */
// C-1 fix: ref wired to the outer wrapper div, not the inner Avatar span
export const AvatarSeal = React.forwardRef<HTMLDivElement, AvatarSealProps>(
  ({ size = "md", sealGlyph = "墨", className, ...rest }, ref) => {
    const px = sealOverlaySize[size];

    return (
      <div ref={ref} className="relative inline-flex">
        <Avatar size={size} className={className} {...rest} />
        {/* Cinnabar seal badge — color is locked, intentionally no override */}
        <span
          aria-hidden="true"
          data-avatar-seal
          className="absolute bottom-0 right-0 flex items-center justify-center"
          style={{
            width: px,
            height: px,
            background: "var(--pigment-cinnabar)",
            fontSize: px * 0.55,
            fontFamily: "var(--font-han)",
            color: "var(--silk-50)",
            lineHeight: 1,
            borderRadius: 2,
          }}
        >
          {sealGlyph}
        </span>
      </div>
    );
  },
);
AvatarSeal.displayName = "AvatarSeal";
