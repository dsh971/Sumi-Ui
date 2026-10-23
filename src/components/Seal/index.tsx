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
 *
 * A seal is pressed into the paper, not floated above it: flat pigment, a
 * near-square 1-unit corner, and a worn paste edge from a fixed-seed
 * turbulence displacement (deterministic, so every render matches).
 */
export const Seal = React.forwardRef<SVGSVGElement, SealProps>(
  (
    { glyph = "墨", size = "md", "aria-label": ariaLabel = "Sumi seal", className, ...props },
    ref,
  ) => {
    const hasColorProp = "color" in props;
    // Warn once when the prop appears, not on every re-render.
    React.useEffect(() => {
      if (process.env.NODE_ENV !== "production" && hasColorProp) {
        console.warn(
          "[Seal] The seal color is locked to sumi cinnabar (#A62B2B) per brand guidelines. " +
            "The `color` prop is ignored.",
        );
      }
    }, [hasColorProp]);

    const wornEdgeId = `sumi-seal-worn-${React.useId().replace(/:/g, "")}`;
    const px = sizePx[size];

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={px}
        height={px}
        role="img"
        aria-label={ariaLabel}
        className={cn("block flex-shrink-0", className)}
        {...props}
      >
        <title>{ariaLabel}</title>

        <defs>
          <filter id={wornEdgeId} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="1.2" />
          </filter>
        </defs>

        {/* Cinnabar background — brand-locked, references --pigment-cinnabar */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="1"
          fill="var(--pigment-cinnabar)"
          filter={`url(#${wornEdgeId})`}
        />

        {/* Hanzi glyph — --fg-on-cinnabar text */}
        <text
          x="24"
          y="33"
          textAnchor="middle"
          fontFamily="'Noto Serif SC', 'Songti SC', serif"
          fontWeight="500"
          fontSize="26"
          fill="var(--fg-on-cinnabar)"
        >
          {glyph}
        </text>
      </svg>
    );
  },
);
Seal.displayName = "Seal";
