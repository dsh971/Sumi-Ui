import "@testing-library/jest-dom";

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
