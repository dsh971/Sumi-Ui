import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Guards the Fresh Silk token layer (decision 004): WCAG contrast for every
// text/surface pairing we ship in both themes, and value parity with the
// design-system source.

type TokenMap = Map<string, string>;
type Rgba = { rgb: [number, number, number]; a: number };
type Theme = "light" | "dark";

const TOKENS_PATH = resolve(__dirname, "tokens.css");
const SOURCE_PATH = resolve(__dirname, "../../../Sumi-Design-System/colors_and_type.css");
const DARK_SELECTOR = ':root[data-theme="dark"]';

function blockAfter(css: string, selector: string): string {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`selector not found: ${selector}`);
  const open = css.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}") depth--;
    if (depth === 0) return css.slice(open + 1, i);
  }
  throw new Error(`unclosed block: ${selector}`);
}

function declarations(block: string): TokenMap {
  const map: TokenMap = new Map();
  const stripped = block.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const match of stripped.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    const [, name, value] = match;
    if (name && value) map.set(name, value.trim());
  }
  return map;
}

function themes(path: string): Record<Theme, TokenMap> {
  const css = readFileSync(path, "utf-8");
  const light = declarations(blockAfter(css, ":root {"));
  const dark = new Map([...light, ...declarations(blockAfter(css, DARK_SELECTOR))]);
  return { light, dark };
}

function resolveValue(tokens: TokenMap, name: string, seen: string[] = []): string {
  const value = tokens.get(name);
  if (value === undefined) throw new Error(`token not defined: ${name}`);
  if (seen.includes(name)) throw new Error(`cycle: ${[...seen, name].join(" → ")}`);
  const ref = value.match(/^var\((--[a-z0-9-]+)\)$/i)?.[1];
  return ref ? resolveValue(tokens, ref, [...seen, name]) : value;
}

function parseColor(value: string, name: string): Rgba {
  const hex = value.match(/^#([0-9a-f]{6})$/i)?.[1];
  if (hex) {
    const channel = (i: number) => Number.parseInt(hex.slice(i, i + 2), 16);
    return { rgb: [channel(0), channel(2), channel(4)], a: 1 };
  }
  const rgba = value.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (rgba) {
    const [, r = "0", g = "0", b = "0", a = "1"] = rgba;
    return { rgb: [Number(r), Number(g), Number(b)], a: Number(a) };
  }
  throw new Error(`${name} is not a hex or rgba colour: ${value}`);
}

function color(tokens: TokenMap, name: string): Rgba {
  return parseColor(resolveValue(tokens, name), name);
}

/** Composite a (possibly translucent) colour over an opaque surface. */
function over(top: Rgba, base: Rgba): Rgba {
  const mix = (i: 0 | 1 | 2) => top.rgb[i] * top.a + base.rgb[i] * (1 - top.a);
  return { rgb: [mix(0), mix(1), mix(2)], a: 1 };
}

function luminance({ rgb }: Rgba): number {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: Rgba, b: Rgba): number {
  const [lo, hi] = [luminance(a), luminance(b)].sort((x, y) => x - y) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const ours = themes(TOKENS_PATH);
const SURFACES = ["--bg-0", "--bg-1", "--bg-2"];
const TEXT_AA = 4.5;
const NON_TEXT = 3;
const STATUSES = ["success", "warning", "danger", "info"];
const TEXT_TOKENS = [
  "--fg-1",
  "--fg-2",
  "--fg-3",
  "--accent",
  "--secondary",
  "--highlight",
  ...STATUSES.map((s) => `--status-${s}`),
];
const ON_PIGMENT: Record<Theme, [string, string][]> = {
  light: [
    ["--fg-on-malachite", "--accent"],
    ["--accent-on", "--accent"],
    ["--fg-on-azurite", "--azurite-600"],
    ["--fg-on-cinnabar", "--cinnabar-600"],
    ["--fg-on-ink", "--ink-800"],
    ["--fg-on-cinnabar", "--pigment-cinnabar"],
  ],
  dark: [
    ["--fg-on-malachite", "--accent"],
    ["--accent-on", "--accent"],
    ["--fg-on-azurite", "--azurite-600"],
    ["--fg-on-cinnabar", "--cinnabar-600"],
    ["--fg-on-cinnabar", "--pigment-cinnabar"],
  ],
};

// Translucent text that components mix in CSS (`color-mix(... N%, transparent)`).
// Keep in step with the percentages in the component source.
const COMPOSITES = [
  { name: "Toast danger description", fg: "--fg-on-cinnabar", alpha: 0.9, bg: "--cinnabar-600" },
  { name: "Alert danger body", fg: "--fg-on-cinnabar", alpha: 0.85, bg: "--cinnabar-600" },
];

for (const theme of ["light", "dark"] as const) {
  const tokens = ours[theme];
  describe(`token contrast — ${theme}`, () => {
    for (const fg of TEXT_TOKENS) {
      it(`${fg} meets AA on bg-0, bg-1 and bg-2`, () => {
        for (const bg of SURFACES) {
          expect(
            contrast(color(tokens, fg), color(tokens, bg)),
            `${fg} on ${bg}`,
          ).toBeGreaterThanOrEqual(TEXT_AA);
        }
      });
    }

    it("status text meets AA on its own tint, composited over every surface", () => {
      for (const s of STATUSES) {
        for (const bg of SURFACES) {
          const tint = over(color(tokens, `--status-${s}-bg`), color(tokens, bg));
          expect(
            contrast(color(tokens, `--status-${s}`), tint),
            `${s} on tint over ${bg}`,
          ).toBeGreaterThanOrEqual(TEXT_AA);
        }
      }
    });

    it("warning bar meets the 3:1 non-text minimum on the page", () => {
      expect(
        contrast(color(tokens, "--status-warning-bar"), color(tokens, "--bg-0")),
      ).toBeGreaterThanOrEqual(NON_TEXT);
    });

    it("on-pigment text meets AA on its pigment", () => {
      for (const [fg, bg] of ON_PIGMENT[theme]) {
        expect(
          contrast(color(tokens, fg), color(tokens, bg)),
          `${fg} on ${bg}`,
        ).toBeGreaterThanOrEqual(TEXT_AA);
      }
    });

    it("component text mixes meet AA once composited onto their surface", () => {
      for (const { name, fg, alpha, bg } of COMPOSITES) {
        const ink = { ...color(tokens, fg), a: alpha };
        const surface = color(tokens, bg);
        expect(contrast(over(ink, surface), surface), name).toBeGreaterThanOrEqual(TEXT_AA);
      }
    });

    it("primary and secondary text meet AA on the pressed surface (bg-3)", () => {
      // --fg-3 is deliberately not allowed on --bg-3 (≈4.2:1): selected and
      // pressed states use --bg-2 plus an ink mark instead (decision 004).
      for (const fg of ["--fg-1", "--fg-2"]) {
        expect(
          contrast(color(tokens, fg), color(tokens, "--bg-3")),
          `${fg} on --bg-3`,
        ).toBeGreaterThanOrEqual(TEXT_AA);
      }
    });
  });
}

describe("surface ladder", () => {
  it("cards lift off the page in light: bg-1 is lighter than bg-0", () => {
    expect(luminance(color(ours.light, "--bg-1"))).toBeGreaterThan(
      luminance(color(ours.light, "--bg-0")),
    );
  });

  it("paper grain textures the light page only", () => {
    expect(ours.light.get("--paper-grain")).toMatch(/^url\("data:image\/svg\+xml,/);
    expect(ours.dark.get("--paper-grain")).toBe("none");
  });
});

describe("ink tones (焦浓重淡清)", () => {
  const order = ["--ink-jiao", "--ink-nong", "--ink-zhong", "--ink-dan", "--ink-qing"];

  it("light: tones step from darkest (jiao) to clearest (qing)", () => {
    const lum = order.map((t) => luminance(color(ours.light, t)));
    expect([...lum].sort((a, b) => a - b)).toEqual(lum);
  });

  it("dark: tones step from brightest (jiao) to clearest (qing)", () => {
    const lum = order.map((t) => luminance(color(ours.dark, t)));
    expect([...lum].sort((a, b) => b - a)).toEqual(lum);
  });

  it("text foregrounds are expressed through the ink tones", () => {
    for (const [fg, tone] of [
      ["--fg-1", "--ink-nong"],
      ["--fg-2", "--ink-zhong"],
      ["--fg-3", "--ink-dan"],
      ["--fg-4", "--ink-qing"],
    ] as const) {
      expect(ours.light.get(fg)).toBe(`var(${tone})`);
      expect(ours.dark.get(fg)).toBe(`var(${tone})`);
    }
  });
});

// SumiUi prefixes some groups to avoid Tailwind v4's reserved namespaces
// (decision log 2026-08-24): --text-*, --font-*, --leading-*, --ease-*,
// --shadow-*, --radius-full and the legacy --shuimo-* aliases live under --sumi-*.
function sumiuiName(name: string): string[] {
  return [name, name.replace(/^--shuimo-/, "--sumi-"), name.replace(/^--/, "--sumi-")];
}

/** Lowercase, drop whitespace, and canonicalise numbers so 0.10 equals 0.1. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\d*\.\d+/g, (n) => String(Number(n)));
}

// The design-system source lives beside the SumiUi repo, not inside it. CI
// checks out SumiUi alone, so this block runs only in the full workspace —
// run `pnpm test` there before syncing tokens.
describe.skipIf(!existsSync(SOURCE_PATH))("token parity with Sumi-Design-System", () => {
  const source = existsSync(SOURCE_PATH)
    ? themes(SOURCE_PATH)
    : { light: new Map(), dark: new Map() };
  for (const theme of ["light", "dark"] as const) {
    it(`every ${theme} source token exists in SumiUi with the same value`, () => {
      const problems: string[] = [];
      for (const name of source[theme].keys()) {
        const match = sumiuiName(name).find((n) => ours[theme].has(n));
        if (match === undefined) {
          problems.push(`${name}: missing from tokens.css`);
          continue;
        }
        // Compare resolved values, so SumiUi's alias indirection (e.g. dark
        // --shadow-xs: var(--sumi-shadow-xs)) counts as the same value.
        const mine = resolveValue(ours[theme], match);
        const theirs = resolveValue(source[theme], name);
        const asSource = (v: string) =>
          normalize(v.replace(/--sumi-/g, "--").replace(/--shuimo-/g, "--"));
        if (asSource(mine) !== asSource(theirs)) {
          problems.push(`${name}: source ${theirs} ≠ sumiui ${match} ${mine}`);
        }
      }
      expect(problems).toEqual([]);
    });
  }
});
