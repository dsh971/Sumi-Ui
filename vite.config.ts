import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
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
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
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
});
