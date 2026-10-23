import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  parameters: {
    options: {
      storySort: {
        order: ["Introduction", "Tokens", "*"],
      },
    },
  },
  async viteFinal(config) {
    config.plugins = (config.plugins ?? []).filter(
      (p) => !(p && !Array.isArray(p) && (p as { name?: string }).name === "vite:dts"),
    );
    // `pnpm storybook:core` previews the stories under
    // @sumiui/react/styles/core: Tailwind's preflight swapped for an empty file.
    if (process.env.SUMI_STYLES === "core") {
      const { resolve } = await import("node:path");
      config.resolve = {
        ...config.resolve,
        alias: [
          {
            find: /^tailwindcss\/preflight\.css$/,
            replacement: resolve(process.cwd(), "src/styles/no-preflight.css"),
          },
        ],
      };
    }
    return config;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
