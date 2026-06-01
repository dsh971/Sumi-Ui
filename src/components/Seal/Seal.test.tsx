import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Seal } from "./index";

describe("Seal", () => {
  it("renders an SVG with role=img", () => {
    render(<Seal />);
    expect(screen.getByRole("img", { name: "Sumi seal" })).toBeInTheDocument();
  });

  it("has an accessible title element", () => {
    const { container } = render(<Seal />);
    expect(container.querySelector("title")).toBeInTheDocument();
    expect(container.querySelector("title")?.textContent).toBe("Sumi seal");
  });

  it("renders the default '墨' glyph", () => {
    const { container } = render(<Seal />);
    const text = container.querySelector("text");
    expect(text?.textContent).toBe("墨");
  });

  it("renders a custom glyph", () => {
    const { container } = render(<Seal glyph="印" />);
    const text = container.querySelector("text");
    expect(text?.textContent).toBe("印");
  });

  it.each(["sm", "md", "lg", "xl"] as const)("renders size=%s without throwing", (size) => {
    render(<Seal size={size} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("applies the correct pixel size per size prop", () => {
    const sizeMap = { sm: "16", md: "24", lg: "32", xl: "48" } as const;
    for (const [size, px] of Object.entries(sizeMap)) {
      const { container } = render(<Seal size={size as "sm" | "md" | "lg" | "xl"} />);
      expect(container.querySelector("svg")).toHaveAttribute("width", px);
    }
  });

  it("always renders cinnabar background via --pigment-cinnabar token (color is brand-locked)", () => {
    const { container } = render(<Seal />);
    const rects = container.querySelectorAll("rect");
    const bg = rects[0];
    expect(bg?.getAttribute("fill")).toBe("var(--pigment-cinnabar)");
  });

  it("warns in dev when color prop is passed", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    // @ts-expect-error — intentionally testing a forbidden prop
    render(<Seal color="red" />);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("locked"));
    spy.mockRestore();
  });

  it("accepts a custom aria-label", () => {
    render(<Seal aria-label="Brand seal" />);
    expect(screen.getByRole("img", { name: "Brand seal" })).toBeInTheDocument();
  });

  it("accepts additional className", () => {
    const { container } = render(<Seal className="custom" />);
    expect(container.querySelector("svg")).toHaveClass("custom");
  });
});
