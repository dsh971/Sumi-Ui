import type { Preview } from "@storybook/react";
import React from "react";
import "../src/styles/index.css";
import { TooltipProvider } from "../src/components/Tooltip";

const preview: Preview = {
  parameters: {
    // Controls: auto-detect color and date props
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // A11y: run on every story automatically
    a11y: {
      config: {
        rules: [
          // Canvas colour contrast is checked via design system tokens
          { id: "color-contrast", enabled: true },
        ],
      },
    },
    backgrounds: {
      // Map Storybook backgrounds to sumi surfaces
      default: "Aged Silk (light)",
      values: [
        { name: "Aged Silk (light)", value: "#F7F4EB" },
        { name: "Hemp Canvas", value: "#EBE5D8" },
        { name: "Charcoal Ink (dark)", value: "#161514" },
      ],
    },
  },

  // Global decorator: apply sumi CSS tokens + provide TooltipProvider
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === "#161514";
      return (
        <div
          className={isDark ? "theme-dark" : undefined}
          style={{
            background: context.globals.backgrounds?.value ?? "var(--bg-0)",
            color: "var(--fg-1)",
            minHeight: "100vh",
            padding: "32px",
            fontFamily: "var(--font-body)",
          }}
        >
          <TooltipProvider>
            <Story />
          </TooltipProvider>
        </div>
      );
    },
  ],
};

export default preview;
