"use client";

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@sumiui/react";

export default function TooltipVariants() {
  return (
    <TooltipProvider>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="sm">
              ⌘K
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open command palette</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="sm">
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save document (⌘S)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </TooltipTrigger>
          <TooltipContent>Permanently delete this item</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export const code = `import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@sumiui/react";

export function TooltipVariants() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="sm">Save</Button>
        </TooltipTrigger>
        <TooltipContent>Save document (⌘S)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;
