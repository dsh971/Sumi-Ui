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

  it("fallback text has leading-none so it centers within the circle", () => {
    // Without an explicit line-height, the ambient --sumi-leading-body (1.55) on
    // the fallback span pushes font-display's glyphs above true center in
    // a flex-centered box — regression guard for that fix.
    const { container } = render(<Avatar fallback="AB" />);
    const fallbackSpan = container.querySelector('span[aria-hidden="true"]');
    expect(fallbackSpan).toHaveClass("leading-none");
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

  it("uses the design system's seal tokens, not ad hoc values", () => {
    const { container } = render(<AvatarSeal fallback="JD" />);
    const seal = container.querySelector("[data-avatar-seal]") as HTMLElement;
    expect(seal.style.background).toBe("var(--cinnabar-400)");
    expect(seal.style.color).toBe("var(--fg-on-ink)");
    expect(seal.style.borderRadius).toBe("var(--radius-2)");
    expect(seal.style.boxShadow).toContain("var(--shadow-seal)");
  });
});

describe("Avatar accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Avatar fallback="JD" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
