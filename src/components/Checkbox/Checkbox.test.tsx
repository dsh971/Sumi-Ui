import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./index";

describe("Checkbox", () => {
  it("renders without label", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders with label and associates via htmlFor", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox label="Item" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles when clicked", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Item" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox label="Item" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("shows helper text", () => {
    render(<Checkbox label="Item" helperText="Optional detail." />);
    expect(screen.getByText("Optional detail.")).toBeInTheDocument();
  });

  it("shows error text with role=alert", () => {
    render(<Checkbox label="Item" errorText="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
