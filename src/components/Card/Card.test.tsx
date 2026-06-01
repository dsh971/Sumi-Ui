import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardBody, CardFooter, CardHeader } from "./index";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders default variant without throwing", () => {
    render(<Card variant="default">Default</Card>);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("renders elevated variant without throwing", () => {
    render(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText("Elevated")).toBeInTheDocument();
  });

  it("accepts additional className", () => {
    render(<Card className="custom">Content</Card>);
    expect(screen.getByText("Content")).toHaveClass("custom");
  });

  it("renders as a link with asChild", () => {
    render(
      <Card asChild>
        <a href="/test">Card Link</a>
      </Card>,
    );
    expect(screen.getByRole("link", { name: "Card Link" })).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Card ref={ref}>Ref</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("Card sub-components", () => {
  it("renders CardHeader, CardBody, CardFooter together", () => {
    render(
      <Card>
        <CardHeader>
          <span>Header</span>
        </CardHeader>
        <CardBody>
          <span>Body</span>
        </CardBody>
        <CardFooter>
          <span>Footer</span>
        </CardFooter>
      </Card>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
