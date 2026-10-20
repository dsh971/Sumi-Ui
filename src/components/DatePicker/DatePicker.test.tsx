import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import { DatePicker } from "./index";

describe("DatePicker", () => {
  it("renders trigger button with placeholder", () => {
    render(<DatePicker />);
    expect(screen.getByRole("button", { name: /pick a date/i })).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<DatePicker placeholder="Choose date" />);
    expect(screen.getByText("Choose date")).toBeInTheDocument();
  });

  it("renders label and associates trigger", () => {
    render(<DatePicker label="Start date" />);
    expect(screen.getByText(/start date/i)).toBeInTheDocument();
  });

  it("shows formatted date when value is set", () => {
    render(<DatePicker value="2026-05-28" />);
    expect(screen.getByText(/may 28, 2026/i)).toBeInTheDocument();
  });

  it("opens calendar on trigger click", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByRole("button", { name: /pick a date/i }));
    expect(screen.getByRole("dialog", { name: /date picker/i })).toBeInTheDocument();
  });

  it("navigates to next month", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByRole("button", { name: /pick a date/i }));
    const currentHeading = screen.getByRole("dialog").querySelector("span");
    const initial = currentHeading?.textContent ?? "";
    await user.click(screen.getByRole("button", { name: /next month/i }));
    const after = currentHeading?.textContent ?? "";
    expect(after).not.toBe(initial);
  });

  it("calls onChange when a day is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /pick a date/i }));
    const dayButtons = screen
      .getAllByRole("button")
      .filter((b) => /^\d+$/.test(b.textContent ?? ""));
    const firstDay = dayButtons[0];
    if (!firstDay) throw new Error("No day buttons found in calendar");
    await user.click(firstDay);
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0]?.[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("is disabled when disabled=true", () => {
    render(<DatePicker disabled />);
    expect(screen.getByRole("button", { name: /pick a date/i })).toBeDisabled();
  });

  it("shows helper text", () => {
    render(<DatePicker helperText="Select your arrival date." />);
    expect(screen.getByText("Select your arrival date.")).toBeInTheDocument();
  });

  it("shows error text with role=alert", () => {
    render(<DatePicker errorText="Date required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Date required");
  });
});

describe("DatePicker accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<DatePicker label="Start date" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("DatePicker — ref and ids", () => {
  it("forwards its ref to the trigger button", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DatePicker ref={ref} label="Due" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button", { name: /Due/ }));
  });

  it("gives two pickers with the same label distinct ids", () => {
    render(
      <>
        <DatePicker label="Due" />
        <DatePicker label="Due" />
      </>,
    );
    const triggers = screen.getAllByRole("button", { name: /Due/ });
    expect(triggers[0]?.id).not.toBe(triggers[1]?.id);
  });
});

describe("DatePicker — keyboard grid (WAI-ARIA date picker)", () => {
  const open = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole("button", { name: /Due/ }));
  };
  const focusedLabel = () =>
    (document.activeElement as HTMLElement | null)?.getAttribute("aria-label");

  it("focuses the selected day on open and moves by day and week with the arrows", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due" value="2026-03-11" locale="en-US" />);
    await open(user);
    expect(focusedLabel()).toBe("Wednesday, March 11");
    await user.keyboard("{ArrowRight}");
    expect(focusedLabel()).toBe("Thursday, March 12");
    await user.keyboard("{ArrowDown}");
    expect(focusedLabel()).toBe("Thursday, March 19");
    await user.keyboard("{Home}");
    expect(focusedLabel()).toBe("Sunday, March 15");
  });

  it("rolls the view into the next month when the arrows cross its edge", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due" value="2026-03-31" locale="en-US" />);
    await open(user);
    await user.keyboard("{ArrowRight}");
    expect(focusedLabel()).toBe("Wednesday, April 1");
    expect(screen.getByRole("grid")).toHaveAccessibleName("April 2026");
  });

  it("pages by month with PageDown, clamping the day", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due" value="2026-01-31" locale="en-US" />);
    await open(user);
    await user.keyboard("{PageDown}");
    expect(focusedLabel()).toBe("Saturday, February 28");
  });

  it("selects the focused day with Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker label="Due" value="2026-03-11" onChange={onChange} locale="en-US" />);
    await open(user);
    await user.keyboard("{ArrowLeft}{Enter}");
    expect(onChange).toHaveBeenCalledWith("2026-03-10");
  });

  it("re-syncs the shown month to a value changed while closed", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<DatePicker label="Due" value="2026-03-11" locale="en-US" />);
    await open(user);
    await user.keyboard("{Escape}");
    rerender(<DatePicker label="Due" value="2026-08-02" locale="en-US" />);
    await open(user);
    expect(screen.getByRole("grid")).toHaveAccessibleName("August 2026");
    expect(focusedLabel()).toBe("Sunday, August 2");
  });

  it("keeps out-of-range days reachable but unselectable", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        label="Due"
        value="2026-03-11"
        min="2026-03-11"
        onChange={onChange}
        locale="en-US"
      />,
    );
    await open(user);
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toHaveAttribute("aria-disabled", "true");
    await user.keyboard("{Enter}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("formats with the locale prop", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due" value="2026-03-11" locale="de-DE" />);
    expect(screen.getByRole("button", { name: /Due/ })).toHaveTextContent("11. März 2026");
    await open(user);
    expect(screen.getByRole("grid")).toHaveAccessibleName("März 2026");
  });
});

describe("DatePicker — unlabelled error wiring and grid semantics", () => {
  it("points aria-describedby at the rendered error, never undefined-*", () => {
    render(<DatePicker errorText="Required" />);
    const id =
      screen.getByRole("button", { name: /pick a date/i }).getAttribute("aria-describedby") ?? "";
    expect(id).not.toMatch(/^undefined/);
    expect(document.getElementById(id)).toHaveTextContent("Required");
  });

  it("marks the selected day on the grid cell, not the button", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due" value="2026-03-11" locale="en-US" />);
    await user.click(screen.getByRole("button", { name: /Due/ }));
    const day = screen.getByRole("button", { name: "Wednesday, March 11" });
    expect(day).not.toHaveAttribute("aria-selected");
    expect(day.closest("td")).toHaveAttribute("aria-selected", "true");
  });

  it("jumps to the week's end with End and by a year with Shift+PageDown", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due" value="2026-03-11" locale="en-US" />);
    await user.click(screen.getByRole("button", { name: /Due/ }));
    await user.keyboard("{End}");
    expect(document.activeElement).toHaveAttribute("aria-label", "Saturday, March 14");
    await user.keyboard("{Shift>}{PageDown}{/Shift}");
    expect(document.activeElement).toHaveAttribute("aria-label", "Sunday, March 14");
    expect(screen.getByRole("grid")).toHaveAccessibleName("March 2027");
  });
});
