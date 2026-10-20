import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { compile } from "tailwindcss";
import { describe, expect, it } from "vitest";
import { buildTheme } from "../../scripts/build-theme.mjs";

// Guards the stylesheet rules and the consumer theme export (decision
// 003, 2026-10-20) that the component tests can't see.

const read = (file: string) => readFileSync(resolve(__dirname, file), "utf-8");
const theme = buildTheme(read("index.css"));
const require = createRequire(import.meta.url);

/** Compile `@import "tailwindcss"` + the generated theme, as a consumer would. */
async function consumerCss(candidates: string[]): Promise<string> {
  const compiler = await compile('@import "tailwindcss";\n@import "sumi-theme";', {
    base: __dirname,
    loadStylesheet: async (id: string) => {
      if (id === "sumi-theme") return { path: "theme.css", base: __dirname, content: theme };
      const path = require.resolve(id === "tailwindcss" ? "tailwindcss/index.css" : id);
      return { path, base: dirname(path), content: readFileSync(path, "utf-8") };
    },
  });
  return compiler.build(candidates);
}

const rule = (css: string, cls: string) =>
  css.match(new RegExp(`\\.${cls.replace(/[-[\]]/g, "\\$&")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";

describe("theme.css export", () => {
  it("is a single @theme inline block without the 3.0.0 initial resets", () => {
    expect(theme.match(/@theme inline \{/g)).toHaveLength(1);
    expect(theme).not.toMatch(/:\s*initial;/);
  });

  it("lets a consumer's Tailwind generate Sumi utilities that point at the tokens", async () => {
    const css = await consumerCss([
      "text-ink-jiao",
      "bg-bg-page",
      "shadow-md",
      "p-7",
      "grid-cols-shell-sidebar-content",
    ]);
    expect(rule(css, "text-ink-jiao")).toContain("var(--ink-jiao)");
    expect(rule(css, "bg-bg-page")).toContain("var(--bg-0)");
    expect(rule(css, "shadow-md")).toContain("var(--sumi-shadow-md)");
    expect(rule(css, "p-7")).toContain("32px");
    expect(rule(css, "grid-cols-shell-sidebar-content")).toContain("240px 1fr");
  });

  it("leaves Tailwind's own shadow-xl and rounded-2xl in place for the consumer", async () => {
    const css = await consumerCss(["shadow-xl", "rounded-2xl"]);
    expect(rule(css, "shadow-xl")).not.toBe("");
    expect(rule(css, "rounded-2xl")).toContain("var(--radius-2xl)");
  });
});

describe("globals.css rules", () => {
  const globals = read("globals.css");

  it("stops the skeleton shimmer under reduced motion, after the shimmer rules", () => {
    const shimmer = globals.indexOf(".theme-dark .sm-skeleton");
    const still = globals.search(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.sm-skeleton \{\s*animation: none;/,
    );
    expect(shimmer).toBeGreaterThan(-1);
    expect(still).toBeGreaterThan(shimmer);
  });

  it("applies the dark skeleton under both dark-mode switches", () => {
    expect(globals).toMatch(
      /:root\[data-theme="dark"\] \.sm-skeleton,\s*\.theme-dark \.sm-skeleton \{/,
    );
  });

  it("keeps cinnabar off text selection and avoids a color-mix fallback there", () => {
    const selection = (globals.match(/::selection \{([^}]*)\}/)?.[1] ?? "").replace(
      /\/\*[\s\S]*?\*\//g,
      "",
    );
    expect(selection).toContain("var(--accent-soft)");
    expect(selection).not.toMatch(/cinnabar|color-mix/);
  });
});
