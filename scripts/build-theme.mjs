// Builds dist/theme.css — Sumi's Tailwind v4 theme for consumer apps.
//
// The library's own @theme blocks stay inline in src/styles/index.css (the
// single source of truth; decision 2026-05-28). This script copies them into
// a stand-alone file a consumer imports next to `@import "tailwindcss"`, so
// their Tailwind can generate any Sumi utility (text-ink-jiao, bg-bg-page,
// shadow-md, …), not just the ones SumiUi's components happen to use.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Every top-level `@theme { … }` block, braces matched. */
function themeBlocks(css) {
  const blocks = [];
  let from = 0;
  for (;;) {
    const start = css.indexOf("@theme", from);
    if (start === -1) return blocks;
    const open = css.indexOf("{", start);
    let depth = 0;
    let end = open;
    for (; end < css.length; end++) {
      if (css[end] === "{") depth++;
      if (css[end] === "}" && --depth === 0) break;
    }
    if (depth !== 0) throw new Error("unbalanced @theme block in index.css");
    blocks.push(css.slice(open + 1, end));
    from = end + 1;
  }
}

/** The consumer theme for an index.css source. Exported for the unit test. */
export function buildTheme(source) {
  const blocks = themeBlocks(source);
  if (blocks.length === 0) throw new Error("no @theme blocks found in index.css");

  // The 3.0.0 `initial` resets remove shadow-xl/2xl and rounded-2xl/3xl from
  // SumiUi's own compiled CSS. A consumer keeps Tailwind's defaults for those.
  const body = blocks
    .join("\n")
    .split("\n")
    .filter((line) => !/:\s*initial;/.test(line))
    .join("\n")
    .replace(/\n\s*\/\* Removed in 3\.0\.0[\s\S]*?\*\//, "");

  if (/:\s*initial;/.test(body)) throw new Error("initial reset survived the filter");
  return `${HEADER}\n@theme inline {${body}}\n`;
}

const HEADER = `/* ==========================================================================
   @sumiui/react/theme.css — Sumi's Tailwind v4 theme (generated; do not edit)

   Use it in your own Tailwind entry, after Tailwind itself:

     @import "tailwindcss";
     @import "@sumiui/react/theme.css";

   Keep \`import "@sumiui/react/styles"\` for the tokens and component CSS, and
   load it AFTER your Tailwind stylesheet: Tailwind's reset and Sumi's element
   styles both live in @layer base, so whichever loads last wins.

   \`@theme inline\` makes each utility reference the Sumi token directly
   (e.g. text-ink-jiao → color: var(--ink-jiao)), so dark mode and scoped
   themes resolve where the class is used. It adds Sumi's colour families
   (replacing Tailwind's own slate-* and teal-*), and re-maps spacing steps
   1–12, radius, shadow, font and breakpoint scales to Sumi's.
   Source: src/styles/index.css (@theme blocks).
   ========================================================================== */
`;

// Write dist/theme.css only when run as a script, not when imported by a test.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const out = buildTheme(readFileSync(resolve(root, "src/styles/index.css"), "utf-8"));
  mkdirSync(resolve(root, "dist"), { recursive: true });
  writeFileSync(resolve(root, "dist/theme.css"), out);
  console.log(`theme.css: ${out.length} bytes`);
}
