import { useEffect, useState } from "react";

/**
 * Tracks whether the viewport is narrower than `breakpoint`, via
 * matchMedia (not a resize listener) so it only re-renders when the
 * boolean actually flips. Ported from Sumi-Design-System's Sheet.jsx
 * reference — the -0.02px offset avoids an off-by-one at the exact
 * breakpoint value between matchMedia's max-width and CSS min-width.
 */
export function useViewportIsMobile(breakpoint: number): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 0.02}px)`);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [breakpoint]);

  return isMobile;
}
