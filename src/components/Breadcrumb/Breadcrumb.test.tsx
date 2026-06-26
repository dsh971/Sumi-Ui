import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./index";

function TestBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  it("renders a nav landmark with the default label", () => {
    render(<TestBreadcrumb />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(
      <Breadcrumb aria-label="Site navigation">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "Site navigation" })).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<TestBreadcrumb />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute("href", "/settings");
  });

  it("marks the current page with aria-current=page", () => {
    render(<TestBreadcrumb />);
    expect(screen.getByText("Profile")).toHaveAttribute("aria-current", "page");
  });

  it("renders the default dot separator", () => {
    render(<TestBreadcrumb />);
    const separators = screen.getAllByText("·");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("renders asChild link as custom element", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <button type="button">Home</button>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
  });
});

describe("Breadcrumb accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<TestBreadcrumb />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
