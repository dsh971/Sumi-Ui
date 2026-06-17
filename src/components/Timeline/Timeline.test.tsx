import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { TimelineItemData } from "./Timeline.types";
import { Timeline } from "./index";

const items: TimelineItemData[] = [
  { id: "a", time: "09:24", title: "Deploy succeeded", marker: "dot-ok" },
  { id: "b", time: "09:11", title: "Merged branch", marker: "dot" },
  { id: "c", time: "08:47", title: "Checks failed", marker: "dot-danger" },
];

describe("Timeline", () => {
  it("renders all item titles", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("Deploy succeeded")).toBeInTheDocument();
    expect(screen.getByText("Merged branch")).toBeInTheDocument();
    expect(screen.getByText("Checks failed")).toBeInTheDocument();
  });

  it("renders a list with one listitem per row", () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders a group separator before items with groupLabel", () => {
    render(
      <Timeline
        items={[
          { title: "First", groupLabel: "Today" },
          { title: "Second", groupLabel: "Yesterday" },
        ]}
      />,
    );
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Yesterday")).toBeInTheDocument();
  });

  it("applies the correct marker class per marker type", () => {
    const { container } = render(
      <Timeline
        items={[
          { title: "ok", marker: "dot-ok" },
          { title: "hollow", marker: "dot-hollow" },
          { title: "info", marker: "dot-info" },
        ]}
      />,
    );
    expect(
      container.querySelector(".bg-\\[color\\:var\\(--malachite-500\\)\\]"),
    ).toBeInTheDocument();
    expect(container.querySelector(".border-\\[color\\:var\\(--ink-800\\)\\]")).toBeInTheDocument();
    expect(container.querySelector(".bg-\\[color\\:var\\(--azurite-500\\)\\]")).toBeInTheDocument();
  });

  it("renders an icon node for icon markers", () => {
    render(
      <Timeline
        items={[
          {
            title: "with icon",
            marker: "icon-ok",
            iconNode: <svg data-testid="check-icon" />,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });

  it("renders an avatar with initials when provided", () => {
    render(
      <Timeline
        items={[
          {
            title: "commented",
            avatar: { initials: "EM", color: "var(--azurite-500)" },
          },
        ]}
      />,
    );
    expect(screen.getByText("EM")).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(<Timeline items={[{ title: "t", description: "details here" }]} />);
    expect(screen.getByText("details here")).toBeInTheDocument();
  });

  it("uses the 3-column grid by default", () => {
    const { container } = render(<Timeline items={items} />);
    expect(container.querySelector(".grid-cols-\\[64px_24px_1fr\\]")).toBeInTheDocument();
  });

  it("uses the 2-column grid when timeGutter is false", () => {
    const { container } = render(<Timeline items={items} timeGutter={false} />);
    expect(container.querySelector(".grid-cols-\\[24px_1fr\\]")).toBeInTheDocument();
    expect(container.querySelector(".grid-cols-\\[64px_24px_1fr\\]")).not.toBeInTheDocument();
  });
});
