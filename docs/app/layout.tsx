import "@sumiui/react/styles";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { ThemeSync } from "./theme-sync";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* `type: "static"` is deprecated upstream in favor of a hand-rolled
            SearchDialog (fumadocs.dev/docs/search/orama), but it's still
            shipped and functional — the simplest path for a static export
            with no search server. Revisit if a future fumadocs-ui major
            removes it.
            The `api` path is a plain client-side fetch(), not a Next <Link>,
            so it does NOT get next.config.ts's basePath auto-prepended —
            it has to match that config by hand (kept as "/Sumi-Ui" there). */}
        <RootProvider search={{ options: { type: "static", api: "/Sumi-Ui/api/search" } }}>
          <ThemeSync />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
