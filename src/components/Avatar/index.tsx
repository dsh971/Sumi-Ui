import React, { useState } from "react";
import { cn } from "../../lib/cn";
import { type VariantClassMap, variantClass } from "../../lib/variantClasses";
import type { AvatarProps, AvatarSealProps, AvatarSize } from "./Avatar.types";

const sizeClasses: VariantClassMap<AvatarSize> = {
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
          variantClass(sizeClasses, size),
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
            "bg-bg-sunken text-fg-2 font-display font-medium leading-none",
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
        {/* Cinnabar seal badge — color is locked, intentionally no override.
            Square with a modest corner radius per the design system's own
            .seal utility (colors_and_type.css) — a literal reference to a
            Chinese chop/seal (印章), which is historically square, never
            round; --radius-full is deliberately reserved for avatars,
            pills, and toggle thumbs (UI_GUIDE.md), not the seal. The
            box-shadow layers the DS's --shadow-seal halo with a solid
            page-background ring (matching the avatar-stack separation
            technique in Sumi-Design-System/preview/avatar-seal.html) so
            the badge reads as a distinct layered element, not a stray
            square notch. */}
        <span
          aria-hidden="true"
          data-avatar-seal
          className="absolute bottom-0 end-0 flex items-center justify-center"
          style={{
            width: px,
            height: px,
            background: "var(--cinnabar-400)",
            fontSize: px * 0.55,
            fontFamily: "var(--sumi-font-han)",
            color: "var(--fg-on-ink)",
            lineHeight: 1,
            borderRadius: "var(--radius-2)",
            boxShadow: "0 0 0 2px var(--bg-0), var(--shadow-seal)",
          }}
        >
          {sealGlyph}
        </span>
      </div>
    );
  },
);
AvatarSeal.displayName = "AvatarSeal";
