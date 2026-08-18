/**
 * Shared overlay enter/exit animation class strings. Collapses the
 * data-[state=...]/data-[side=...] animation wiring that was previously
 * hand-duplicated across Dialog, CommandPalette, DropdownMenu, Select,
 * DatePicker, Toast, and Tooltip into one place. The underlying keyframes
 * and --animate-sumi-* utilities are defined in styles/globals.css and
 * styles/index.css, driven by the design system's --dur-N and --ease-N
 * tokens.
 */

/** Simple fade, no zoom/slide — dialog and command-palette scrim overlays. */
export const scrimTransition =
  "data-[state=open]:animate-sumi-fade-in data-[state=closed]:animate-sumi-fade-out";

/** Centered fade+zoom, no directional slide — command-palette content. */
export const modalTransition =
  "data-[state=open]:animate-sumi-modal-in data-[state=closed]:animate-sumi-modal-out";

/** Fade+zoom+slide from the trigger side — Radix Popper-anchored content
 * (Tooltip, DropdownMenu, Select, DatePicker, Popover). Exit is a plain
 * fade+zoom (matches every reviewed component's existing exit behavior). */
export const popperTransition =
  "data-[state=open]:data-[side=top]:animate-sumi-popper-in-top " +
  "data-[state=open]:data-[side=bottom]:animate-sumi-popper-in-bottom " +
  "data-[state=open]:data-[side=left]:animate-sumi-popper-in-left " +
  "data-[state=open]:data-[side=right]:animate-sumi-popper-in-right " +
  "data-[state=closed]:animate-sumi-modal-out";

/** Sheet's desktop centered-modal form — fade+zoom+translate(-50%,-50%)
 * centering baked into the keyframe. Content positions itself
 * independently via left-1/2 top-1/2, not a flex-centering parent — Radix
 * portals Overlay and Content as separate document.body siblings, not
 * nested, so the static centering translate and the animated transform
 * must live in one keyframe rather than two separate transform
 * declarations (confirmed live: an earlier version assumed flex-centering
 * and rendered Content off-screen). */
export const dialogTransition =
  "data-[state=open]:animate-sumi-dialog-in data-[state=closed]:animate-sumi-dialog-out";

/** Sheet's bottom-sheet form (mobile) — slide up from below the viewport. */
export const sheetMobileTransition =
  "data-[state=open]:animate-sumi-sheet-in data-[state=closed]:animate-sumi-sheet-out";

/** Toast: fade+slide from top on enter, fade+slide to the right on exit —
 * no zoom (matches the design system's toast spec). */
export const toastTransition =
  "data-[state=open]:animate-sumi-toast-in data-[state=closed]:animate-sumi-toast-out";
