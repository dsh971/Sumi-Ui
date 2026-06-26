import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
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

describe("Card sub-component padding is position-independent (BUG-008)", () => {
  it("CardHeader alone gets both edge classes (it's first and last)", () => {
    render(
      <Card>
        <CardHeader>
          <span>Header</span>
        </CardHeader>
      </Card>,
    );
    const header = screen.getByText("Header").parentElement as HTMLElement;
    expect(header).toHaveClass("first:pt-5", "last:pb-5");
  });

  it("CardBody alone gets both edge classes (it's first and last)", () => {
    render(
      <Card>
        <CardBody>
          <span>Body</span>
        </CardBody>
      </Card>,
    );
    const body = screen.getByText("Body").parentElement as HTMLElement;
    expect(body).toHaveClass("first:pt-5", "last:pb-5");
  });

  it("Header+Body: CardHeader is the top edge, CardBody is the bottom edge", () => {
    render(
      <Card>
        <CardHeader>
          <span>Header</span>
        </CardHeader>
        <CardBody>
          <span>Body</span>
        </CardBody>
      </Card>,
    );
    const header = screen.getByText("Header").parentElement as HTMLElement;
    const body = screen.getByText("Body").parentElement as HTMLElement;
    expect(header).toHaveClass("first:pt-5");
    expect(body).toHaveClass("last:pb-5");
  });

  it("Header+Body+Footer: CardFooter keeps its top border (not the first child)", () => {
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
    const footer = screen.getByText("Footer").parentElement as HTMLElement;
    expect(footer).toHaveClass("border-t", "last:pb-5");
  });

  it("CardFooter alone cancels its top border (it's the first child)", () => {
    render(
      <Card>
        <CardFooter>
          <span>Footer</span>
        </CardFooter>
      </Card>,
    );
    const footer = screen.getByText("Footer").parentElement as HTMLElement;
    expect(footer).toHaveClass("first:border-t-0", "first:pt-5", "last:pb-5");
  });
});

describe("Card accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <span>Title</span>
        </CardHeader>
        <CardBody>Body content</CardBody>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
