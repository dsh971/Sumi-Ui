import { render, screen } from "@testing-library/react";
import { FileX } from "lucide-react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./index";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="Nothing here yet" />);
    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <EmptyState
        title="Nothing here yet"
        description="Your drafts will appear here once you start writing."
      />,
    );
    expect(
      screen.getByText("Your drafts will appear here once you start writing."),
    ).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    render(
      <EmptyState title="Nothing here yet" action={<button type="button">Start a draft</button>} />,
    );
    expect(screen.getByRole("button", { name: "Start a draft" })).toBeInTheDocument();
  });

  it("renders closing beat when provided", () => {
    render(<EmptyState title="Nothing here yet" closingBeat="That's it." />);
    expect(screen.getByText("That's it.")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    const { container } = render(
      <EmptyState title="Nothing here yet" icon={<FileX size={32} data-testid="icon" />} />,
    );
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
  });

  it("renders without optional props", () => {
    render(<EmptyState title="Empty" />);
    expect(screen.getByText("Empty")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("accepts additional className", () => {
    const { container } = render(<EmptyState title="Empty" className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("full composition renders all parts", () => {
    render(
      <EmptyState
        title="Nothing here yet"
        description="Your items will appear here."
        action={<button type="button">Add item</button>}
        closingBeat="No fuss."
        icon={<FileX size={32} />}
      />,
    );
    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
    expect(screen.getByText("Your items will appear here.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
    expect(screen.getByText("No fuss.")).toBeInTheDocument();
  });
});
