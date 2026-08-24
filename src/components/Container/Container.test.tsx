import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
import { Container } from "./index";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("defaults to the app max-width", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content")).toHaveStyle({ maxWidth: "var(--measure-app)" });
  });

  it.each([
    ["sm", "var(--sumi-container-sm)"],
    ["md", "var(--sumi-container-md)"],
    ["lg", "var(--sumi-container-lg)"],
    ["xl", "var(--sumi-container-xl)"],
    ["2xl", "var(--sumi-container-2xl)"],
    ["read", "var(--measure-read)"],
    ["app", "var(--measure-app)"],
  ] as const)("maps size=%s to %s", (size, expected) => {
    render(<Container size={size}>Content</Container>);
    expect(screen.getByText("Content")).toHaveStyle({ maxWidth: expected });
  });

  it("applies responsive gutter padding by default", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content").className).toContain("px-[var(--gutter-mobile)]");
  });

  it("omits gutter padding when gutter is false", () => {
    render(<Container gutter={false}>Content</Container>);
    expect(screen.getByText("Content").className).not.toContain("gutter-mobile");
  });

  it("accepts additional className", () => {
    render(<Container className="custom">Content</Container>);
    expect(screen.getByText("Content")).toHaveClass("custom");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Container ref={ref}>Content</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("Container accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Container>Page content</Container>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
