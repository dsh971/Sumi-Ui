import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
import { Avatar, AvatarSeal } from "./index";

describe("Avatar", () => {
  it("renders with fallback text in the DOM when no src", () => {
    // Radix Avatar Fallback is in the DOM but may be hidden until image error fires.
    // In jsdom, image load events don't fire, so we check textContent directly.
    const { container } = render(<Avatar fallback="JD" />);
    expect(container.textContent).toContain("JD");
  });

  it("truncates fallback to 2 characters", () => {
    const { container } = render(<Avatar fallback="John" />);
    expect(container.textContent).toContain("Jo");
    expect(container.textContent).not.toContain("hn");
  });

  it("renders '?' when no src or fallback", () => {
    const { container } = render(<Avatar />);
    expect(container.textContent).toContain("?");
  });

  it.each(["sm", "md", "lg", "xl"] as const)("renders size=%s without throwing", (size) => {
    const { container } = render(<Avatar size={size} fallback="AB" />);
    expect(container.textContent).toContain("AB");
  });

  it("accepts additional className", () => {
    const { container } = render(<Avatar fallback="AB" className="custom" />);
    expect(container.querySelector(".custom")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Avatar ref={ref} fallback="AB" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe("AvatarSeal", () => {
  it("renders avatar with seal overlay", () => {
    const { container } = render(<AvatarSeal fallback="JD" />);
    const seal = container.querySelector("[data-avatar-seal]");
    expect(seal).toBeInTheDocument();
    expect(seal?.textContent).toBe("墨");
  });

  it("renders custom seal glyph", () => {
    const { container } = render(<AvatarSeal fallback="JD" sealGlyph="印" />);
    const seal = container.querySelector("[data-avatar-seal]");
    expect(seal?.textContent).toBe("印");
  });

  it.each(["sm", "md", "lg", "xl"] as const)("renders size=%s without throwing", (size) => {
    const { container } = render(<AvatarSeal size={size} fallback="AB" />);
    expect(container.textContent).toContain("AB");
  });
});

describe("Avatar accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Avatar fallback="JD" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
