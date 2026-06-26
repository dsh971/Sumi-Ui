import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import { Switch } from "./index";

describe("Switch", () => {
  it("renders without label", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders with label and associates via htmlFor", () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByLabelText("Dark mode")).toBeInTheDocument();
  });

  it("is off by default", () => {
    render(<Switch label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("toggles when clicked", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Toggle" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Switch label="Toggle" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("shows helper text", () => {
    render(<Switch label="Toggle" helperText="Enable feature X." />);
    expect(screen.getByText("Enable feature X.")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe("Switch accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Switch label="Dark mode" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
