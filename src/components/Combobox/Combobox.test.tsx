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
    expect(screen.getByText("No matches for “zzz”.")).toBeInTheDocument();
  });

  it("virtualizes a large option list — renders far fewer rows than total", async () => {
    const user = userEvent.setup();
    const many: ComboboxOption[] = Array.from({ length: 500 }, (_, i) => ({
      value: `opt-${i}`,
      label: `Option ${i}`,
    }));
    render(<Combobox options={many} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText("Search"));
    const rendered = screen.getAllByRole("option");
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.length).toBeLessThan(many.length / 2);
  });

  it("keeps listbox/option ARIA structure intact while virtualized", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} placeholder="Search" />);
    await user.click(screen.getByPlaceholderText("Search"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(options.length);
  });

  it("scrolls the active option into view when navigating with arrow keys", async () => {
    const user = userEvent.setup();
    const many: ComboboxOption[] = Array.from({ length: 60 }, (_, i) => ({
      value: `opt-${i}`,
      label: `Option ${i}`,
    }));
    render(<Combobox options={many} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    await user.click(input);
    for (let i = 0; i < 20; i++) {
      await user.keyboard("{ArrowDown}");
    }
    // react-virtual's scrollToIndex schedules its scroll-reconcile check via
    // requestAnimationFrame before the new range is committed — flush a
    // couple of frames so the resulting re-render actually happens before
    // asserting (see test-setup.ts for the scrollTo→scrollTop→"scroll"
    // event polyfill this depends on).
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    expect(screen.getByText("Option 20")).toBeInTheDocument();
  });
});

describe("Combobox accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Combobox options={options} label="Assignee" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
