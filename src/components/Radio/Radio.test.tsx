import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioItem } from "./index";

function TestGroup({ defaultValue }: { defaultValue?: string }) {
  return (
    <RadioGroup defaultValue={defaultValue} aria-label="Colour">
      <RadioItem value="red" label="Red" />
      <RadioItem value="green" label="Green" />
      <RadioItem value="blue" label="Blue" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("renders all items", () => {
    render(<TestGroup />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("associates labels via htmlFor", () => {
    render(<TestGroup />);
    expect(screen.getByLabelText("Red")).toBeInTheDocument();
  });

  it("selects an item on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="Colour" onValueChange={onValueChange}>
        <RadioItem value="red" label="Red" />
        <RadioItem value="blue" label="Blue" />
      </RadioGroup>,
    );
    await user.click(screen.getByLabelText("Red"));
    expect(onValueChange).toHaveBeenCalledWith("red");
  });

  it("reflects defaultValue", () => {
    render(<TestGroup defaultValue="green" />);
    expect(screen.getByLabelText("Green")).toBeChecked();
  });

  it("navigates between items with arrow keys", async () => {
    const user = userEvent.setup();
    render(<TestGroup />);
    screen.getByLabelText("Red").focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByLabelText("Green")).toHaveFocus();
  });
});
