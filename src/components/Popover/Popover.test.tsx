import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

function TestPopover() {
  return (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>Popover body content</PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("does not render content when closed", () => {
    render(<TestPopover />);
    expect(screen.queryByText("Popover body content")).not.toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    const user = userEvent.setup();
    render(<TestPopover />);
    await user.click(screen.getByText("Open popover"));
    expect(screen.getByText("Popover body content")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<TestPopover />);
    await user.click(screen.getByText("Open popover"));
    expect(screen.getByText("Popover body content")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Popover body content")).not.toBeInTheDocument();
  });

  it("closes on outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <TestPopover />
        <button type="button">Outside</button>
      </div>,
    );
    await user.click(screen.getByText("Open popover"));
    expect(screen.getByText("Popover body content")).toBeInTheDocument();
    await user.click(screen.getByText("Outside"));
    expect(screen.queryByText("Popover body content")).not.toBeInTheDocument();
  });
});

describe("Popover accessibility", () => {
  it("has no violations when open", async () => {
    const user = userEvent.setup();
    // aria-label is required here for the axe check specifically — Popover
    // itself doesn't force a Title/label (Radix doesn't either); a real
    // consumer names its content the same way DatePicker's Popover.Content
    // does (aria-label="Date picker").
    render(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent aria-label="Options">Popover body content</PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByText("Open popover"));
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
