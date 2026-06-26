"use client";

import { Button, EmptyState } from "@sumiui/react";
import { Search } from "lucide-react";

export default function EmptyStateVariants() {
  return (
    <EmptyState
      icon={<Search size={32} />}
      title="No results found"
      description="Try different keywords or check your spelling."
      action={
        <Button variant="ghost" size="sm">
          Clear search
        </Button>
      }
      closingBeat="No fuss."
    />
  );
}

export const code = `import { Button, EmptyState } from "@sumiui/react";
import { Search } from "lucide-react";

export function EmptyStateVariants() {
  return (
    <EmptyState
      icon={<Search size={32} />}
      title="No results found"
      description="Try different keywords or check your spelling."
      action={
        <Button variant="ghost" size="sm">
          Clear search
        </Button>
      }
      closingBeat="No fuss."
    />
  );
}`;
