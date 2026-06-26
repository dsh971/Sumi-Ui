import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
import { Select, SelectContent, SelectItem } from "./index";

function TestSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <Select label="Fruit" defaultValue={defaultValue}>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
        <SelectItem value="plum">Plum</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders trigger with label", () => {
    render(<TestSelect />);
    expect(screen.getByText(/fruit/i)).toBeInTheDocument();
  });

  it("shows placeholder when no value selected", () => {
    render(<TestSelect />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("opens when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<TestSelect />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("shows helper text", () => {
    render(
      <Select label="Fruit" helperText="Choose your favourite.">
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByText("Choose your favourite.")).toBeInTheDocument();
  });

  it("shows error text with role=alert", () => {
    render(
      <Select label="Fruit" errorText="Required">
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("marks trigger as aria-invalid when errorText is set", () => {
    render(
      <Select label="Fruit" errorText="Required">
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("Select accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<TestSelect />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
