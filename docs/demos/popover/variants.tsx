"use client";

import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@sumiui/react";

export default function PopoverVariants() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ fontSize: "13px", color: "var(--fg-1)" }}>
          <p style={{ margin: "0 0 8px" }}>Popover content lives here.</p>
          <PopoverClose asChild>
            <Button variant="ghost" size="sm">
              Close
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const code = `import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@sumiui/react";

export function PopoverVariants() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ fontSize: "13px", color: "var(--fg-1)" }}>
          <p style={{ margin: "0 0 8px" }}>Popover content lives here.</p>
          <PopoverClose asChild>
            <Button variant="ghost" size="sm">Close</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;
