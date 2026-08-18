import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import { SegmentedControl, SegmentedControlItem } from "./index";

function TestControl({ defaultValue }: { defaultValue?: string }) {
  return (
    <SegmentedControl defaultValue={defaultValue} aria-label="View">
      <SegmentedControlItem value="list" label="List" />
      <SegmentedControlItem value="board" label="Board" />
      <SegmentedControlItem value="calendar" label="Calendar" />
    </SegmentedControl>
  );
}

describe("SegmentedControl", () => {
  it("renders a radiogroup with a radio per segment", () => {
    render(<TestControl />);
    expect(screen.getByRole("radiogroup", { name: "View" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("selects a segment on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <SegmentedControl aria-label="View" onValueChange={onValueChange}>
        <SegmentedControlItem value="list" label="List" />
        <SegmentedControlItem value="board" label="Board" />
      </SegmentedControl>,
    );
    await user.click(screen.getByRole("radio", { name: "Board" }));
    expect(onValueChange).toHaveBeenCalledWith("board");
  });

  it("only one segment is checked at a time", () => {
    render(<TestControl defaultValue="board" />);
    expect(screen.getByRole("radio", { name: "Board" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("radio", { name: "Calendar" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("navigates between segments with arrow keys", async () => {
    const user = userEvent.setup();
    render(<TestControl defaultValue="list" />);
    screen.getByRole("radio", { name: "List" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "Board" })).toHaveFocus();
  });

  it("does not select a disabled segment", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <SegmentedControl aria-label="View" onValueChange={onValueChange}>
        <SegmentedControlItem value="list" label="List" />
        <SegmentedControlItem value="board" label="Board" disabled />
      </SegmentedControl>,
    );
    await user.click(screen.getByRole("radio", { name: "Board" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe("SegmentedControl accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<TestControl defaultValue="list" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
