import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
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

describe("Select — ref and ids", () => {
  it("forwards its ref to the trigger button", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Select ref={ref} label="Fruit" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("combobox", { name: "Fruit" }));
  });

  it("gives two selects with the same label distinct ids", () => {
    render(
      <>
        <Select label="Fruit" />
        <Select label="Fruit" />
      </>,
    );
    const triggers = screen.getAllByRole("combobox", { name: "Fruit" });
    expect(triggers[0]?.id).not.toBe(triggers[1]?.id);
  });
});

describe("Select — unlabelled error wiring", () => {
  it("points aria-describedby at the rendered error, never undefined-*", () => {
    render(<Select aria-label="Fruit" errorText="Required" />);
    const id = screen.getByRole("combobox").getAttribute("aria-describedby") ?? "";
    expect(id).not.toMatch(/^undefined/);
    expect(document.getElementById(id)).toHaveTextContent("Required");
  });
});
