import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./index";

function TestMenu({ onSelect }: { onSelect?: (v: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => onSelect?.("edit")}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onSelect?.("copy")}>Copy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" onSelect={() => onSelect?.("delete")}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("does not render menu content when closed", () => {
    render(<TestMenu />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);
    await user.click(screen.getByText("Open menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders all menu items", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);
    await user.click(screen.getByText("Open menu"));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Copy" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
  });

  it("calls onSelect and closes menu when an item is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TestMenu onSelect={onSelect} />);
    await user.click(screen.getByText("Open menu"));
    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onSelect).toHaveBeenCalledWith("edit");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);
    await user.click(screen.getByText("Open menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("navigates items with arrow keys", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);
    await user.click(screen.getByText("Open menu"));
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
  });

  it("applies danger styling when variant is danger", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);
    await user.click(screen.getByText("Open menu"));
    expect(screen.getByRole("menuitem", { name: "Delete" }).className).toContain("status-danger");
  });
});
