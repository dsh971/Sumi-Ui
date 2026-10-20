import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks whether the viewport is narrower than `breakpoint`, via
 * matchMedia (not a resize listener) so it only re-renders when the
 * boolean actually flips. Ported from Sumi-Design-System's Sheet.jsx
 * reference — the -0.02px offset avoids an off-by-one at the exact
 * breakpoint value between matchMedia's max-width and CSS min-width.
 *
 * useSyncExternalStore gives the server (and the hydration pass) a stable
 * `false`, then switches to the real value on the client, so server-rendered
 * markup never mismatches during hydration.
 */
export function useViewportIsMobile(breakpoint: number): boolean {
  const query = `(max-width: ${breakpoint - 0.02}px)`;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
