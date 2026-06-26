import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
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
    expect(container.querySelector(".grid-cols-timeline-time-marker-content")).toBeInTheDocument();
  });

  it("uses the 2-column grid when timeGutter is false", () => {
    const { container } = render(<Timeline items={items} timeGutter={false} />);
    expect(container.querySelector(".grid-cols-timeline-marker-content")).toBeInTheDocument();
    expect(
      container.querySelector(".grid-cols-timeline-time-marker-content"),
    ).not.toBeInTheDocument();
  });

  it("renders nested children as nested listitems under their parent", () => {
    render(
      <Timeline
        items={[
          {
            id: "parent",
            title: "Run",
            children: [{ id: "child", title: "Span" }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Run")).toBeInTheDocument();
    expect(screen.getByText("Span")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("calls onItemClick with the clicked item's data", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    const item: TimelineItemData = { id: "a", title: "Deploy succeeded" };
    render(<Timeline items={[item]} onItemClick={onItemClick} />);

    await user.click(screen.getByRole("button", { name: "Deploy succeeded" }));

    expect(onItemClick).toHaveBeenCalledWith(item);
  });

  it("does not throw when a node is clicked without an onItemClick handler", async () => {
    const user = userEvent.setup();
    render(<Timeline items={[{ id: "a", title: "Deploy succeeded" }]} />);

    await expect(
      user.click(screen.getByRole("button", { name: "Deploy succeeded" })),
    ).resolves.not.toThrow();
  });

  it("applies aria-current only to the item matching selectedId", () => {
    render(
      <Timeline
        items={[
          { id: "a", title: "First" },
          { id: "b", title: "Second" },
        ]}
        selectedId="b"
      />,
    );
    expect(screen.getByRole("button", { name: "First" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: "Second" })).toHaveAttribute("aria-current", "true");
  });

  it("applies the dot-pending marker class", () => {
    const { container } = render(
      <Timeline items={[{ title: "running", marker: "dot-pending" }]} />,
    );
    expect(container.querySelector(".bg-\\[color\\:var\\(--steel-500\\)\\]")).toBeInTheDocument();
  });

  it("renders a disclosure toggle only for nodes with children", () => {
    render(
      <Timeline
        items={[{ id: "parent", title: "Parent", children: [{ id: "child", title: "Child" }] }]}
      />,
    );
    expect(screen.getAllByRole("button", { name: "Collapse" })).toHaveLength(1);
  });

  it("does not call onItemClick when the disclosure toggle is clicked", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    render(
      <Timeline
        items={[{ id: "parent", title: "Parent", children: [{ id: "child", title: "Child" }] }]}
        onItemClick={onItemClick}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Collapse" }));

    expect(onItemClick).not.toHaveBeenCalled();
  });

  it("does not toggle expand state when the title button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Timeline
        items={[{ id: "parent", title: "Parent", children: [{ id: "child", title: "Child" }] }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Parent" }));

    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("does not repeat the time gutter below the root level", () => {
    const { container } = render(
      <Timeline
        items={[
          {
            id: "parent",
            time: "00:00",
            title: "Parent",
            children: [{ id: "child", time: "00:01", title: "Child" }],
          },
        ]}
        timeGutter
      />,
    );
    const rows = container.querySelectorAll("li.grid");
    expect(rows[0]).toHaveClass("grid-cols-timeline-time-marker-content");
    expect(rows[1]).toHaveClass("grid-cols-timeline-marker-content");
    expect(rows[1]).not.toHaveClass("grid-cols-timeline-time-marker-content");
  });

  const deepItems: TimelineItemData[] = [
    {
      id: "l0",
      title: "Level 0",
      children: [
        {
          id: "l1",
          title: "Level 1",
          children: [
            {
              id: "l2",
              title: "Level 2",
              children: [
                {
                  id: "l3",
                  title: "Level 3",
                  children: [{ id: "l4", title: "Level 4" }],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  it("collapses a node's children by default once depth reaches defaultCollapsedDepth", () => {
    render(<Timeline items={deepItems} />);
    expect(screen.getByText("Level 3")).toBeInTheDocument();
    expect(screen.queryByText("Level 4")).not.toBeInTheDocument();
  });

  it("expands a collapsed node's children when its disclosure toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<Timeline items={deepItems} />);

    await user.click(screen.getByRole("button", { name: "Expand" }));

    expect(screen.getByText("Level 4")).toBeInTheDocument();
  });

  it("respects a custom defaultCollapsedDepth", () => {
    render(<Timeline items={deepItems} defaultCollapsedDepth={1} />);
    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.queryByText("Level 2")).not.toBeInTheDocument();
  });
});

describe("Timeline accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Timeline items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
