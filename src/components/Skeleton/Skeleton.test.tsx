import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./index";

describe("Skeleton", () => {
  it("renders with default rect variant", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it.each(["text", "circle", "rect"] as const)("renders variant=%s without throwing", (variant) => {
    const { container } = render(<Skeleton variant={variant} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies width and height as inline styles", () => {
    const { container } = render(<Skeleton width={200} height={100} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("100px");
  });

  it("accepts string width/height values", () => {
    const { container } = render(<Skeleton width="50%" height="2rem" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("50%");
    expect(el.style.height).toBe("2rem");
  });

  it("circle variant sets height equal to width", () => {
    const { container } = render(<Skeleton variant="circle" width={48} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("48px");
    expect(el.style.height).toBe("48px");
  });

  it("applies sm-skeleton class for shimmer animation", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("sm-skeleton");
  });

  it("accepts additional className", () => {
    const { container } = render(<Skeleton className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("is hidden from accessibility tree", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
