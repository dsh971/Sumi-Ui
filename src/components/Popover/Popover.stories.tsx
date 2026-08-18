import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./index";

const meta: Meta<typeof Popover> = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "48px" }}>
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>
          <div style={{ fontSize: "13px", color: "var(--fg-1)" }}>
            <p style={{ margin: "0 0 8px" }}>Popover content lives here.</p>
            <PopoverClose>Close</PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
