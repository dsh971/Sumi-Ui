import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import type { ComboboxOption } from "./Combobox.types";
import { Combobox } from "./index";

const options: ComboboxOption[] = [
  { value: "maya", label: "Maya Okonkwo" },
  { value: "marcus", label: "Marcus Reed" },
  { value: "ema", label: "Ema Lindqvist" },
];

describe("Combobox", () => {
  it("renders with placeholder text", () => {
    render(<Combobox options={options} placeholder="Assign reviewer" />);
    expect(screen.getByPlaceholderText("Assign reviewer")).toBeInTheDocument();
  });

  it("filters options as the user types", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText("Search"));
    await user.type(screen.getByPlaceholderText("Search"), "marc");
    expect(screen.getByText("Reed", { exact: false })).toBeInTheDocument();
    expect(screen.queryByText(/Lindqvist/)).not.toBeInTheDocument();
  });

  it("calls onValueChange when an option is clicked", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Combobox options={options} placeholder="Search" onValueChange={onValueChange} />);
    await user.click(screen.getByPlaceholderText("Search"));
    await user.click(screen.getByText("Maya Okonkwo"));
    expect(onValueChange).toHaveBeenCalledWith("maya");
  });

  it("adds a chip in multi-mode and removes it via the × button", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = useState<string[]>([]);
      return (
        <Combobox
          multiple
          options={options}
          placeholder="Tags"
          value={value}
          onValueChange={setValue}
        />
      );
    }

    render(<Harness />);
    await user.click(screen.getByPlaceholderText("Tags"));
    await user.click(screen.getByText("Maya Okonkwo"));

    const remove = screen.getByLabelText("Remove Maya Okonkwo");
    expect(remove).toBeInTheDocument();

    await user.click(remove);
    expect(screen.queryByLabelText("Remove Maya Okonkwo")).not.toBeInTheDocument();
  });

  it("shows a spinner while loading", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} placeholder="Search" loading />);
    await user.click(screen.getByPlaceholderText("Search"));
    expect(screen.getByText("Searching…")).toBeInTheDocument();
  });

  it("shows the empty state when the query has no matches", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText("Search"));
    await user.type(screen.getByPlaceholderText("Search"), "zzz");
    expect(screen.getByText('No matches for "zzz".')).toBeInTheDocument();
  });
});

describe("Combobox accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Combobox options={options} label="Assignee" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
