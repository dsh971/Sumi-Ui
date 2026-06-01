import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./index";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Something went wrong.</Alert>);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(<Alert title="Save failed">Check your connection.</Alert>);
    expect(screen.getByText("Save failed")).toBeInTheDocument();
    expect(screen.getByText("Check your connection.")).toBeInTheDocument();
  });

  it.each(["info", "success", "warning", "danger"] as const)(
    "renders variant=%s without throwing",
    (variant) => {
      render(<Alert variant={variant}>Message</Alert>);
      expect(screen.getByText("Message")).toBeInTheDocument();
    },
  );

  it('uses role="alert" for danger variant', () => {
    render(<Alert variant="danger">Error</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it('uses role="status" for non-danger variants', () => {
    render(<Alert variant="info">Info</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders dismiss button when onDismiss is provided", () => {
    render(<Alert onDismiss={vi.fn()}>Message</Alert>);
    expect(screen.getByRole("button", { name: "Dismiss alert" })).toBeInTheDocument();
  });

  it("calls onDismiss and removes from DOM when dismissed", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Message</Alert>);
    await user.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(onDismiss).toHaveBeenCalledOnce();
    expect(screen.queryByText("Message")).not.toBeInTheDocument();
  });

  it("does not render dismiss button without onDismiss", () => {
    render(<Alert>Message</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Alert ref={ref}>Message</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
