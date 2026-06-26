import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import type { ToastVariant } from "./Toast.types";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./index";

const renderToast = (ui: React.ReactNode) =>
  render(
    <ToastProvider>
      {ui}
      <ToastViewport />
    </ToastProvider>,
  );

describe("Toast", () => {
  it("renders title and description", () => {
    renderToast(
      <Toast open>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are live.</ToastDescription>
      </Toast>,
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes are live.")).toBeInTheDocument();
  });

  it.each(["success", "info", "warning", "danger"] as const)(
    "applies variant=%s root class",
    (variant: ToastVariant) => {
      const expected: Record<ToastVariant, string> = {
        success: "border-l-[color:var(--malachite-500)]",
        info: "border-l-[color:var(--azurite-500)]",
        warning: "border-l-[color:var(--persimmon-500)]",
        danger: "bg-[color:var(--cinnabar-600)]",
      };
      renderToast(
        <Toast open variant={variant} data-testid="toast">
          <ToastTitle>Message</ToastTitle>
        </Toast>,
      );
      expect(screen.getByTestId("toast")).toHaveClass(expected[variant]);
    },
  );

  it("defaults to the info variant", () => {
    renderToast(
      <Toast open data-testid="toast">
        <ToastTitle>Message</ToastTitle>
      </Toast>,
    );
    expect(screen.getByTestId("toast")).toHaveClass("border-l-[color:var(--azurite-500)]");
  });

  it('exposes role="status"', () => {
    renderToast(
      <Toast open>
        <ToastTitle>Message</ToastTitle>
      </Toast>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("calls onOpenChange(false) when close is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderToast(
      <Toast open onOpenChange={onOpenChange}>
        <ToastTitle>Message</ToastTitle>
        <ToastClose />
      </Toast>,
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("forwards ref to the root element", () => {
    const ref = { current: null as HTMLLIElement | null };
    renderToast(
      <Toast open ref={ref}>
        <ToastTitle>Message</ToastTitle>
      </Toast>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe("Toast accessibility", () => {
  it("has no violations when open", async () => {
    renderToast(
      <Toast open>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are live.</ToastDescription>
      </Toast>,
    );
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
