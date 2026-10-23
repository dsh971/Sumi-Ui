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

/** Compile index.css as the build does; without `preflight`, as `vite build --mode core` does. */
async function sumiCss(preflight: boolean): Promise<string> {
  const compiler = await compile(read("index.css"), {
    base: __dirname,
    loadStylesheet: async (id: string, base: string) => {
      const path =
        !preflight && id === "tailwindcss/preflight.css"
          ? resolve(__dirname, "no-preflight.css")
          : id.startsWith(".")
            ? resolve(base, id)
            : require.resolve(id);
      return { path, base: dirname(path), content: readFileSync(path, "utf-8") };
    },
  });
  return compiler.build(["p-7"]);
}

describe("reset-free build (@sumiui/react/styles/core)", () => {
  it("drops Tailwind's preflight and adds nothing", async () => {
    const full = await sumiCss(true);
    const core = await sumiCss(false);

    expect(full).toMatch(/ol, ul, menu \{\s*list-style: none;/);
    expect(core).not.toMatch(/list-style: none|border: 0 solid|font-size: inherit/);
    expect(core).toContain("p:where(:not(.sumi-unstyled, .sumi-unstyled *))");
    expect(core).toContain("--bg-0:");
    expect(core).toContain("padding: var(--spacing-7)");

    // The emptied preflight import leaves a bare `@layer base;` behind.
    const fullLines = new Set(full.split("\n"));
    expect(core.split("\n").filter((line) => !fullLines.has(line))).toEqual(["@layer base;"]);
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

describe(".sumi-unstyled opt-out", () => {
  const GUARD = ":where(:not(.sumi-unstyled, .sumi-unstyled *))";
  const guard = GUARD.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const DOCUMENT_ROOTS = new Set(["html", "body"]);

  /** Split `text` at characters matching `separator` that sit outside parentheses. */
  const splitTopLevel = (text: string, separator: RegExp) => {
    const parts: string[] = [];
    let depth = 0;
    let current = "";
    for (const char of text) {
      if (char === "(") depth++;
      if (char === ")") depth--;
      if (depth === 0 && separator.test(char)) {
        parts.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    return [...parts, current].map((part) => part.trim()).filter(Boolean);
  };

  /** Every selector the `./styles` sources declare, minus at-rule preludes and keyframe stops. */
  const selectors = ["globals.css", "tokens.css", "index.css"].flatMap((file) =>
    [
      ...read(file)
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "")
        .matchAll(/([^{};]+)\{/g),
    ]
      .map(([, prelude = ""]) => prelude.trim())
      .filter((prelude) => !prelude.startsWith("@"))
      .flatMap((prelude) => splitTopLevel(prelude, /,/)),
  );

  it("guards every type selector, wherever it sits in a selector", () => {
    const typed = selectors
      .flatMap((selector) => splitTopLevel(selector, /[\s>+~]/))
      .filter((compound) => /^[a-z]/.test(compound))
      .filter((compound) => !DOCUMENT_ROOTS.has(compound.match(/^[a-z][a-z0-9-]*/)?.[0] ?? ""));
    for (const compound of typed) {
      expect(compound, compound).toMatch(new RegExp(`^[a-z][a-z0-9-]*${guard}`));
    }
    // :is() and :matches() could hide a type selector from the check above.
    expect(selectors.filter((selector) => /:(is|matches)\(/.test(selector))).toEqual([]);
  });

  it("styles each plain element outside .sumi-unstyled and never inside it", () => {
    const guarded = selectors.flatMap((selector) => {
      const tag = selector.match(new RegExp(`^([a-z][a-z0-9]*)${guard}$`))?.[1];
      return tag ? [{ selector, tag }] : [];
    });
    expect(guarded.map(({ tag }) => tag).sort()).toEqual(
      ["a", "blockquote", "code", "h1", "h2", "h3", "h4", "h5", "h6"]
        .concat(["hr", "kbd", "p", "pre", "samp", "small"])
        .sort(),
    );

    for (const { selector, tag } of guarded) {
      const outside = document.createElement(tag);
      const wrapper = document.createElement("div");
      wrapper.className = "sumi-unstyled";
      const inside = wrapper.appendChild(document.createElement(tag));
      const optedOut = document.createElement(tag);
      optedOut.className = "sumi-unstyled";
      document.body.replaceChildren(outside, wrapper, optedOut);

      expect(outside.matches(selector), `${tag} outside`).toBe(true);
      expect(inside.matches(selector), `${tag} inside`).toBe(false);
      expect(optedOut.matches(selector), `${tag}.sumi-unstyled`).toBe(false);
    }
  });
});
