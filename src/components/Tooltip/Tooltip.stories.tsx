import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./index";

// TooltipProvider is registered in the global Storybook decorator — do not wrap here.

const meta: Meta<typeof Tooltip> = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "32px",
        padding: "64px 24px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm">
            Hover me
          </Button>
        </TooltipTrigger>
        <TooltipContent>This is a tooltip. Keep copy brief — 12 words or fewer.</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "32px",
        padding: "80px 24px",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="sm">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "64px 24px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="sm">
            ⌘K
          </Button>
        </TooltipTrigger>
        <TooltipContent>Open command palette</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="sm">
            Save
          </Button>
        </TooltipTrigger>
        <TooltipContent>Save document (⌘S)</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="danger" size="sm">
            Delete
          </Button>
        </TooltipTrigger>
        <TooltipContent>Permanently delete this item</TooltipContent>
      </Tooltip>
    </div>
  ),
};
