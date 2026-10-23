// Fails the build unless dist/sumi-core.css (@sumiui/react/styles/core) is
// Sumi's stylesheet without Tailwind's preflight reset.
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
const corePath = resolve(dist, "sumi-core.css");
if (!existsSync(corePath)) throw new Error("dist/sumi-core.css is missing");
const core = readFileSync(corePath, "utf-8");
const full = readFileSync(resolve(dist, "sumi.css"), "utf-8");

// Rules only preflight emits, minified as Vite writes them.
const preflight = ["abbr:where([title])", "ol,ul,menu{list-style:none}"];
const sumi = [":where(.sumi-control)", ":where(.sumi-list)", ":where(:not(.sumi-unstyled"];

for (const marker of preflight) {
  if (!full.includes(marker)) throw new Error(`dist/sumi.css lost preflight (${marker})`);
  if (core.includes(marker)) throw new Error(`dist/sumi-core.css still has preflight (${marker})`);
}
for (const marker of sumi) {
  if (!core.includes(marker)) throw new Error(`dist/sumi-core.css is missing ${marker}`);
}
console.log("✓ dist/sumi-core.css: no preflight, Sumi rules intact");
