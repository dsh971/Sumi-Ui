import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
