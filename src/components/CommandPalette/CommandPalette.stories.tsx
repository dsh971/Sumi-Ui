import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import type { CommandGroup, CommandItem } from "./CommandPalette.types";
import { CommandPalette } from "./index";

const meta: Meta<typeof CommandPalette> = {
  title: "Foundation/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

const groups: CommandGroup[] = [
  {
    label: "Actions",
    items: [
      { id: "new", label: "New piece", hint: "N" },
      { id: "publish", label: "Publish current", hint: "⇧P" },
      { id: "archive", label: "Move to archive" },
      { id: "theme", label: "Toggle dark mode", hint: "⇧D" },
    ],
  },
  {
    label: "Pieces",
    items: [
      { id: "p1", label: "On restraint" },
      { id: "p2", label: "Notes from the studio" },
      { id: "p3", label: "The seal & the brush" },
      { id: "p4", label: "A small inventory of greens" },
    ],
  },
];

function Demo() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<CommandItem | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Button onClick={() => setOpen(true)}>Open palette (⌘K)</Button>
      {picked && (
        <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--fg-2)" }}>
          Selected: <strong>{picked.label}</strong>
        </p>
      )}
      <CommandPalette open={open} onOpenChange={setOpen} groups={groups} onSelect={setPicked} />
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
