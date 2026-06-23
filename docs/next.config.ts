import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

// GitHub Pages serves this repo at https://dsh971.github.io/Sumi-Ui/ — every
// asset/link needs the basePath prefix or it 404s once deployed, even though
// it resolves fine in local `next dev` (which ignores basePath in dev mode
// by default — verify against the production build, not dev, before
// trusting a path resolves).
const config: NextConfig = {
  output: "export",
  basePath: "/Sumi-Ui",
  assetPrefix: "/Sumi-Ui",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // The outer ShuimoDS folder also has its own pnpm-workspace.yaml (a
  // separate, empty git repo with no relation to this one), which makes
  // Next ambiguous about which workspace root to use without this set
  // explicitly — it should always resolve to *this* repo's root (SumiUi/).
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default withMDX(config);
