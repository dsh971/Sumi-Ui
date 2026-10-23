// Keeps the stylesheet from the reset-free build (`vite build --mode core`)
// as dist/sumi-core.css and drops the rest of that pass's output.
import { copyFileSync, existsSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const built = resolve(root, "dist-core/sumi.css");
if (!existsSync(built))
  throw new Error("dist-core/sumi.css missing: run `vite build --mode core` first");
copyFileSync(built, resolve(root, "dist/sumi-core.css"));
rmSync(resolve(root, "dist-core"), { recursive: true, force: true });
console.log("✓ dist/sumi-core.css");
