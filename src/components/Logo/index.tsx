import React from "react";
import { cn } from "../../lib/cn";
import type { LogoProps } from "./Logo.types";

/** Aspect ratio of the sumi wordmark SVG (180 × 48) */
const LOGO_ASPECT = 48 / 180;

/**
 * Sumi wordmark — inline SVG, no external assets required.
 * H-7 fix: wrapped in React.forwardRef so consumers can measure/animate the SVG.
 * H-9 fix: dark wordmark uses var(--silk-50) instead of hardcoded #EEE7D6.
 */
export const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  (
    { variant = "light", width = 120, "aria-label": ariaLabel = "Sumi", className, ...props },
    ref,
  ) => {
    const height = Math.round(width * LOGO_ASPECT);
    // H-9 fix: both variants now use CSS tokens.
    // Dark: var(--silk-50) — aged silk on dark/brand surface.
    // Light: var(--pigment-ink) — charcoal ink on silk page.
    const wordmarkFill = variant === "dark" ? "var(--silk-50)" : "var(--pigment-ink)";

    const scale = width / 180;
    const fontSize = {
      seal: Math.round(20 * scale),
      word: Math.round(28 * scale),
    };

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 48"
        width={width}
        height={height}
        role="img"
        aria-label={ariaLabel}
        className={cn("flex-shrink-0", className)}
        {...props}
      >
        <title>{ariaLabel}</title>

        {/* Cinnabar seal block — references --pigment-cinnabar */}
        <rect x="0" y="6" width="36" height="36" rx="3" fill="var(--pigment-cinnabar)" />

        {/* 墨 character — --silk-50 (aged silk on cinnabar) */}
        <text
          x="18"
          y="29"
          textAnchor="middle"
          fontFamily="'Noto Serif SC', 'Songti SC', serif"
          fontSize={fontSize.seal}
          fontWeight="500"
          fill="var(--silk-50)"
        >
          墨
        </text>

        {/* sumi wordmark — token-based color per variant */}
        <text
          x="48"
          y="35"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize={fontSize.word}
          fontWeight="300"
          letterSpacing="-0.02em"
          fill={wordmarkFill}
        >
          sumi
        </text>
      </svg>
    );
  },
);
Logo.displayName = "Logo";
