import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
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

  it.each(["jade", "clay", "peach", "malachite", "canvas", "sienna", "seal"] as const)(
    "renders brand variant=%s without throwing",
    (variant) => {
      render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    },
  );

  it.each([
    ["jade", "malachite"],
    ["clay", "canvas"],
    ["peach", "sienna"],
  ] as const)(
    "legacy variant=%s renders identically to canonical variant=%s",
    (legacy, canonical) => {
      const { container: legacyContainer } = render(<Badge variant={legacy}>Label</Badge>);
      const { container: canonicalContainer } = render(<Badge variant={canonical}>Label</Badge>);
      expect(legacyContainer.firstElementChild?.className).toBe(
        canonicalContainer.firstElementChild?.className,
      );
    },
  );

  it("applies the variant's dot color class when dot=true", () => {
    const { container } = render(
      <Badge variant="malachite" dot>
        Label
      </Badge>,
    );
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).toHaveClass("bg-malachite-500");
  });

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

describe("Badge accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Badge>In review</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
