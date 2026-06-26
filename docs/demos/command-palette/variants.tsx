"use client";

import { Button, type CommandGroup, type CommandItem, CommandPalette } from "@sumiui/react";
import { useState } from "react";

const groups: CommandGroup[] = [
  {
    label: "Actions",
    items: [
      { id: "new", label: "New piece", hint: "N" },
      { id: "publish", label: "Publish current", hint: "⇧P" },
      { id: "archive", label: "Move to archive" },
    ],
  },
  {
    label: "Pieces",
    items: [
      { id: "p1", label: "On restraint" },
      { id: "p2", label: "Notes from the studio" },
      { id: "p3", label: "The seal & the brush" },
    ],
  },
];

export default function CommandPaletteVariants() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<CommandItem | null>(null);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open palette</Button>
      {picked && (
        <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--fg-2)" }}>
          Selected: <strong>{picked.label}</strong>
        </p>
      )}
      <CommandPalette open={open} onOpenChange={setOpen} groups={groups} onSelect={setPicked} />
    </div>
  );
}

export const code = `import { Button, CommandPalette, type CommandGroup, type CommandItem } from "@sumiui/react";
import { useState } from "react";

const groups: CommandGroup[] = [
  {
    label: "Actions",
    items: [
      { id: "new", label: "New piece", hint: "N" },
      { id: "publish", label: "Publish current", hint: "⇧P" },
    ],
  },
];

export function CommandPaletteVariants() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<CommandItem | null>(null);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open palette</Button>
      <CommandPalette open={open} onOpenChange={setOpen} groups={groups} onSelect={setPicked} />
    </div>
  );
}`;
