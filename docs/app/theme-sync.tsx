"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

// Fumadocs' RootProvider toggles `.dark` on <html> via next-themes, but
// SumiUi's own dark-mode tokens are scoped under `.theme-dark` (the same
// class its Storybook theme toggle uses) -- a different convention than
// next-themes' default. Without this, the page background and any live
// <ComponentDemo> previews never leave light mode when the docs dark
// toggle is clicked.
export function ThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  return null;
}
