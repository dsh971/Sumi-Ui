import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    ["sm", "var(--container-sm)"],
    ["md", "var(--container-md)"],
    ["lg", "var(--container-lg)"],
    ["xl", "var(--container-xl)"],
    ["2xl", "var(--container-2xl)"],
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
