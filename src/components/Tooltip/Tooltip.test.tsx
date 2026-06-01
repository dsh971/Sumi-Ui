import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./index";

function TestTooltip({ side }: { side?: "top" | "right" | "bottom" | "left" }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent side={side}>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("renders the trigger", () => {
    render(<TestTooltip />);
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("does not show tooltip content initially", () => {
    render(<TestTooltip />);
    expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
  });

  it("shows tooltip content when open via defaultOpen", async () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  it.each(["top", "right", "bottom", "left"] as const)("accepts side=%s prop", (side) => {
    render(<TestTooltip side={side} />);
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("trigger has aria-describedby when open", async () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Description</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Trigger")).toHaveAttribute("aria-describedby");
  });

  it("tooltip content is accessible via role=tooltip when open", async () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>T</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });
});
