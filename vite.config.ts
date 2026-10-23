import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const pkg = JSON.parse(readFileSync(resolve(__dirname, "package.json"), "utf-8")) as {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

// Every runtime and peer dependency stays external (subpaths too, e.g.
// react/jsx-runtime): consumers install them, so their bundler dedupes one
// copy of Radix/lucide/etc. instead of a second one inlined here.
const externals = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });
const isExternal = (id: string) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`));

const preflightStub = {
  find: /^tailwindcss\/preflight\.css$/,
  replacement: resolve(__dirname, "src/styles/no-preflight.css"),
};

export default defineConfig(({ mode }) =>
  mode === "core"
    ? // `--mode core` builds only the stylesheet, with preflight stubbed out:
      // dist/sumi-core.css (@sumiui/react/styles/core). Tailwind scans the same
      // sources, so its utilities match dist/sumi.css.
      {
        plugins: [tailwindcss()],
        resolve: { alias: [preflightStub] },
        build: {
          emptyOutDir: false,
          rollupOptions: {
            input: { "sumi-core": resolve(__dirname, "src/styles/index.css") },
            output: { assetFileNames: "[name].css" },
          },
        },
      }
    : {
        plugins: [
          tailwindcss(),
          react(),
          dts({
            include: ["src"],
            exclude: ["src/**/*.test.tsx", "src/**/*.test.ts", "src/**/*.stories.tsx"],
            rollupTypes: true,
          }),
        ],
        build: {
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "SumiUi",
            formats: ["es", "cjs"],
            fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
          },
          rollupOptions: {
            external: isExternal,
            output: {
              // Every export is interactive (hooks, Radix), so the whole bundle is a
              // client module for React Server Components (Next.js App Router).
              banner: '"use client";',
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "react/jsx-runtime": "jsx",
              },
              assetFileNames: (assetInfo) => {
                if (assetInfo.name === "style.css") return "sumi.css";
                return assetInfo.name ?? "asset";
              },
            },
          },
          cssCodeSplit: false,
          sourcemap: true,
        },
      },
);
