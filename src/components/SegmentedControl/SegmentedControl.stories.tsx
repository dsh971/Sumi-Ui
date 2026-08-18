import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl, SegmentedControlItem } from "./index";

const meta: Meta<typeof SegmentedControl> = {
  title: "Forms/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <SegmentedControl defaultValue="list" aria-label="View">
        <SegmentedControlItem value="list" label="List" />
        <SegmentedControlItem value="board" label="Board" />
        <SegmentedControlItem value="calendar" label="Calendar" />
      </SegmentedControl>
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <SegmentedControl defaultValue="week" aria-label="Range">
        <SegmentedControlItem value="day" label="Day" />
        <SegmentedControlItem value="week" label="Week" />
        <SegmentedControlItem value="month" label="Month" disabled />
      </SegmentedControl>
    </div>
  ),
};

export const TwoOptions: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <SegmentedControl defaultValue="light" aria-label="Theme">
        <SegmentedControlItem value="light" label="Light" />
        <SegmentedControlItem value="dark" label="Dark" />
      </SegmentedControl>
    </div>
  ),
};
