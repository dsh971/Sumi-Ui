import React from "react";
import { cn } from "../../lib/cn";
import type { SealProps, SealSize } from "./Seal.types";

const sizePx: Record<SealSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

/**
 * The sumi cinnabar seal — inline SVG reproduction of assets/seal.svg.
 * H-8 fix: wrapped in React.forwardRef.
 *
 * The seal color (--pigment-cinnabar) is brand-locked and cannot be overridden.
 * Passing a `color` prop logs a development warning and is ignored.
 */
export const Seal = React.forwardRef<SVGSVGElement, SealProps>(
  (
    { glyph = "墨", size = "md", "aria-label": ariaLabel = "Sumi seal", className, ...props },
    ref,
  ) => {
    if (process.env.NODE_ENV !== "production" && "color" in props) {
      console.warn(
        "[Seal] The seal color is locked to sumi cinnabar (#A62B2B) per brand guidelines. " +
          "The `color` prop is ignored.",
      );
    }

    const px = sizePx[size];
    const fontSize = Math.round(px * 0.54);
    const textY = Math.round(px * 0.69);

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={px}
        height={px}
        role="img"
        aria-label={ariaLabel}
        className={cn("flex-shrink-0", className)}
        {...props}
      >
        <title>{ariaLabel}</title>

        {/* Cinnabar background — brand-locked, references --pigment-cinnabar */}
        <rect x="2" y="2" width="44" height="44" rx="4" fill="var(--pigment-cinnabar)" />

        {/* Subtle inner stroke — --cinnabar-800 at 40% opacity */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="4"
          fill="none"
          stroke="var(--cinnabar-800)"
          strokeOpacity="0.4"
        />

        {/* Hanzi glyph — --silk-50 text */}
        <text
          x="24"
          y={textY}
          textAnchor="middle"
          fontFamily="'Noto Serif SC', 'Songti SC', serif"
          fontWeight="500"
          fontSize={fontSize}
          fill="var(--silk-50)"
        >
          {glyph}
        </text>
      </svg>
    );
  },
);
Seal.displayName = "Seal";
