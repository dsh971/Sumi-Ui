import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import type { CommandGroup, CommandItem } from "./CommandPalette.types";
import { CommandPalette } from "./index";

const newPieceItem: CommandItem = { id: "new", label: "New piece", hint: "N" };
const publishItem: CommandItem = { id: "publish", label: "Publish current", hint: "⇧P" };

const groups: CommandGroup[] = [
  {
    label: "Actions",
    items: [newPieceItem, publishItem],
  },
  {
    label: "Pieces",
    items: [{ id: "p1", label: "On restraint" }],
  },
];

function Harness({ onSelect = vi.fn() }: { onSelect?: (item: CommandItem) => void }) {
  const [open, setOpen] = useState(true);
  return <CommandPalette open={open} onOpenChange={setOpen} groups={groups} onSelect={onSelect} />;
}

describe("CommandPalette", () => {
  it("renders all items when no query is entered", () => {
    render(<Harness />);
    expect(screen.getByText("New piece")).toBeInTheDocument();
    expect(screen.getByText("Publish current")).toBeInTheDocument();
    expect(screen.getByText("On restraint")).toBeInTheDocument();
  });

  it("filters items as the user types", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.type(screen.getByPlaceholderText("Type a command, or search…"), "publish");
    expect(screen.getByText("Publish current")).toBeInTheDocument();
    expect(screen.queryByText("New piece")).not.toBeInTheDocument();
  });

  it("shows the empty message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.type(screen.getByPlaceholderText("Type a command, or search…"), "zzz");
    expect(screen.getByText("No matches")).toBeInTheDocument();
  });

  it("selects an item on click and closes", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Harness onSelect={onSelect} />);
    await user.click(screen.getByText("New piece"));
    expect(onSelect).toHaveBeenCalledWith(newPieceItem);
    expect(screen.queryByText("New piece")).not.toBeInTheDocument();
  });

  it("navigates with arrow keys and selects with Enter", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Harness onSelect={onSelect} />);
    const input = screen.getByPlaceholderText("Type a command, or search…");
    await user.click(input);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith(publishItem);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByPlaceholderText("Type a command, or search…"));
    await user.keyboard("{Escape}");
    expect(screen.queryByText("New piece")).not.toBeInTheDocument();
  });
});

describe("CommandPalette accessibility", () => {
  it("has no violations when open", async () => {
    render(<Harness />);
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
