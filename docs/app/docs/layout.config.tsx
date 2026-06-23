import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

// Shared nav config between the docs layout and any future top-level pages
// (e.g. a landing page) that want the same header.
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "SumiUi",
  },
  links: [
    {
      // Storybook is a separate static build merged into the same deploy
      // artifact at build time (not a Next.js route), so this needs the
      // basePath ("/Sumi-Ui") spelled out explicitly — Next's automatic
      // basePath prefixing only applies to routes it controls.
      text: "Storybook",
      url: "/Sumi-Ui/storybook/",
    },
    {
      text: "GitHub",
      url: "https://github.com/dsh971/Sumi-Ui",
    },
  ],
};
