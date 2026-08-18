import "@testing-library/jest-dom";
import { configureAxe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// color-contrast is disabled: jsdom has no layout engine, so every element
// computes as 0/0 contrast — disabling prevents false positives on every test.
export const axe = configureAxe({ rules: { "color-contrast": { enabled: false } } });

// jsdom does not implement pointer capture, scrollIntoView, or ResizeObserver — polyfill for Radix UI tests.
window.HTMLElement.prototype.hasPointerCapture = () => false;
window.HTMLElement.prototype.scrollIntoView = () => undefined;
window.HTMLElement.prototype.releasePointerCapture = () => undefined;
window.HTMLElement.prototype.setPointerCapture = () => undefined;

// ResizeObserver — used by Radix Tooltip and other floating-UI primitives.
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// matchMedia — jsdom doesn't implement it. Defaults to "no match" (desktop)
// for every query; tests that need mobile behavior override window.matchMedia
// directly (see Sheet.test.tsx).
window.matchMedia =
  window.matchMedia ??
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }));

// getBoundingClientRect — jsdom has no layout engine, so every element
// computes as 0/0 (see color-contrast note above).
window.HTMLElement.prototype.getBoundingClientRect = () => ({
  width: 320,
  height: 400,
  top: 0,
  left: 0,
  bottom: 400,
  right: 320,
  x: 0,
  y: 0,
  toJSON() {
    return this;
  },
});

// offsetWidth/offsetHeight — @tanstack/react-virtual measures both its
// scroll container AND each row via these (not getBoundingClientRect —
// confirmed by reading virtual-core's source: observeElementRect and
// measureElement's jsdom-reachable fallback path both read element.offsetW/H
// directly), synchronously on mount, independent of ResizeObserver firing.
// jsdom's default is 0/0 for both, which makes every virtualizer render
// zero rows. One representative small value works for both purposes here:
// as the "row height" it's plausible, and as the "container height" it
// still lets overscan pull in enough rows for meaningful assertions.
Object.defineProperty(window.HTMLElement.prototype, "offsetHeight", {
  configurable: true,
  value: 40,
});
Object.defineProperty(window.HTMLElement.prototype, "offsetWidth", {
  configurable: true,
  value: 320,
});

// scrollHeight/clientHeight (+ width equivalents) — separately from
// offsetHeight above: @tanstack/react-virtual's getMaxScrollOffset() reads
// scrollHeight - clientHeight to clamp scrollToIndex()'s target offset.
// Both default to 0 in jsdom, which clamps every computed offset to 0 —
// scrollToIndex silently becomes a no-op without this. clientHeight uses
// the same "viewport" value as offsetHeight above; scrollHeight is a large
// arbitrary value so realistic offsets (e.g. index 20 of 60 rows) aren't
// clamped away.
Object.defineProperty(window.HTMLElement.prototype, "clientHeight", {
  configurable: true,
  value: 40,
});
Object.defineProperty(window.HTMLElement.prototype, "clientWidth", {
  configurable: true,
  value: 320,
});
Object.defineProperty(window.HTMLElement.prototype, "scrollHeight", {
  configurable: true,
  value: 20000,
});
Object.defineProperty(window.HTMLElement.prototype, "scrollWidth", {
  configurable: true,
  value: 2000,
});

// Element.scrollTo — jsdom doesn't implement it (no-op), so scrollTop never
// actually changes and no "scroll" event fires when react-virtual's
// scrollToIndex() calls it internally. Polyfill it to behave like a real
// browser: set the offset and dispatch "scroll" synchronously.
window.HTMLElement.prototype.scrollTo = function scrollTo(
  this: HTMLElement,
  optionsOrX?: ScrollToOptions | number,
) {
  if (typeof optionsOrX === "object" && optionsOrX !== null) {
    if (optionsOrX.top !== undefined) this.scrollTop = optionsOrX.top;
    if (optionsOrX.left !== undefined) this.scrollLeft = optionsOrX.left;
  } else if (typeof optionsOrX === "number") {
    this.scrollLeft = optionsOrX;
  }
  this.dispatchEvent(new Event("scroll"));
};
