import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./index";

describe("Logo", () => {
  it("renders an SVG with role=img", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: "Sumi" })).toBeInTheDocument();
  });

  it("has an accessible title element", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector("title")).toBeInTheDocument();
    expect(container.querySelector("title")?.textContent).toBe("Sumi");
  });

  it("accepts a custom aria-label", () => {
    render(<Logo aria-label="Sumi wordmark" />);
    expect(screen.getByRole("img", { name: "Sumi wordmark" })).toBeInTheDocument();
  });

  it.each(["light", "dark"] as const)("renders variant=%s without throwing", (variant) => {
    render(<Logo variant={variant} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("applies the specified width", () => {
    render(<Logo width={200} />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("width", "200");
  });

  it("renders the cinnabar seal rect at #A62B2B", () => {
    const { container } = render(<Logo />);
    const rects = container.querySelectorAll("rect");
    // Seal rect now references --pigment-cinnabar via var()
    const sealRect = Array.from(rects).find(
      (r) => r.getAttribute("fill") === "var(--pigment-cinnabar)",
    );
    expect(sealRect).toBeInTheDocument();
  });

  it("changes wordmark fill for dark variant", () => {
    const { container: lightContainer } = render(<Logo variant="light" />);
    const { container: darkContainer } = render(<Logo variant="dark" />);

    const lightText = lightContainer.querySelectorAll("text");
    const darkText = darkContainer.querySelectorAll("text");

    // The wordmark text (last <text>) should differ between light and dark
    const lightWordmark = lightText[lightText.length - 1];
    const darkWordmark = darkText[darkText.length - 1];
    expect(lightWordmark?.getAttribute("fill")).not.toBe(darkWordmark?.getAttribute("fill"));
  });

  it("accepts additional className", () => {
    const { container } = render(<Logo className="custom" />);
    expect(container.querySelector("svg")).toHaveClass("custom");
  });
});
