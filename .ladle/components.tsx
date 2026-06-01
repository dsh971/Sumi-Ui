import type { GlobalProvider } from "@ladle/react";
import "../src/styles/index.css";
import { TooltipProvider } from "../src/components/Tooltip";

/** Global wrapper: injects sumi tokens + base styles, toggles dark mode,
 *  and provides the TooltipProvider required by the Tooltip component. */
export const Provider: GlobalProvider = ({ children, globalState }) => (
  <div
    data-theme={globalState.theme === "dark" ? "dark" : undefined}
    style={{ minHeight: "100vh", background: "var(--bg-0)", color: "var(--fg-1)" }}
  >
    <TooltipProvider>{children}</TooltipProvider>
  </div>
);
