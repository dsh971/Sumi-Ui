import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./index";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it.each(["neutral", "success", "warning", "danger", "info"] as const)(
    "renders semantic variant=%s without throwing",
    (variant) => {
      render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    },
  );

  it.each(["jade", "clay", "peach", "seal"] as const)(
    "renders brand variant=%s without throwing",
    (variant) => {
      render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    },
  );

  it("renders a dot indicator when dot=true", () => {
    const { container } = render(<Badge dot>Label</Badge>);
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).toBeInTheDocument();
  });

  it("does not render a dot when dot=false", () => {
    const { container } = render(<Badge dot={false}>Label</Badge>);
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).not.toBeInTheDocument();
  });

  it("accepts additional className", () => {
    render(<Badge className="custom">Label</Badge>);
    expect(screen.getByText("Label")).toHaveClass("custom");
  });
});
