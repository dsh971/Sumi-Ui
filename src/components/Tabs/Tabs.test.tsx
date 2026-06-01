import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

function TestTabs({ defaultValue = "tab1" }: { defaultValue?: string }) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger value="tab1">First</TabsTrigger>
        <TabsTrigger value="tab2">Second</TabsTrigger>
        <TabsTrigger value="tab3">Third</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Panel one</TabsContent>
      <TabsContent value="tab2">Panel two</TabsContent>
      <TabsContent value="tab3">Panel three</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders all tab triggers", () => {
    render(<TestTabs />);
    expect(screen.getByRole("tab", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Second" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Third" })).toBeInTheDocument();
  });

  it("shows the default panel", () => {
    render(<TestTabs defaultValue="tab1" />);
    expect(screen.getByText("Panel one")).toBeVisible();
  });

  it("switches panel when a tab is clicked", async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    await user.click(screen.getByRole("tab", { name: "Second" }));
    expect(screen.getByText("Panel two")).toBeVisible();
  });

  it("marks the active tab with aria-selected=true", () => {
    render(<TestTabs defaultValue="tab2" />);
    expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "false");
  });

  it("navigates with arrow keys", async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    screen.getByRole("tab", { name: "First" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Second" })).toHaveFocus();
  });

  it("forwards ref on TabsList", () => {
    const ref = { current: null };
    render(
      <Tabs defaultValue="a">
        <TabsList ref={ref}>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A</TabsContent>
      </Tabs>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
