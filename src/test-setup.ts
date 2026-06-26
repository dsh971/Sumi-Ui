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
