import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
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

describe("RadioGroup accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<TestGroup />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("RadioItem — generated ids (useId)", () => {
  it("gives same-label items in different groups distinct ids", () => {
    render(
      <>
        <RadioGroup aria-label="A">
          <RadioItem value="x" label="Other" />
        </RadioGroup>
        <RadioGroup aria-label="B">
          <RadioItem value="x" label="Other" />
        </RadioGroup>
      </>,
    );
    const radios = screen.getAllByRole("radio", { name: "Other" });
    expect(radios).toHaveLength(2);
    expect(radios[0]?.id).not.toBe(radios[1]?.id);
  });
});
