import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./index";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "circle", "rect"],
    },
    width: { control: { type: "number" } },
    height: { control: { type: "number" } },
  },
  args: {
    variant: "text",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: { variant: "text" },
};

export const Circle: Story = {
  args: { variant: "circle", width: 40 },
};

export const Rect: Story = {
  args: { variant: "rect", height: 120 },
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ padding: "24px", maxWidth: "360px" }}>
      <div
        style={{
          border: "1px solid var(--line-1)",
          borderRadius: "6px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Skeleton variant="circle" width={40} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" style={{ width: "60%", marginBottom: "6px" }} />
            <Skeleton variant="text" style={{ width: "40%", height: "12px" }} />
          </div>
        </div>
        <Skeleton variant="rect" height={80} />
        <Skeleton variant="text" />
        <Skeleton variant="text" style={{ width: "80%" }} />
        <div style={{ display: "flex", gap: "8px" }}>
          <Skeleton variant="rect" height={32} style={{ width: "100px" }} />
          <Skeleton variant="rect" height={32} style={{ width: "80px" }} />
        </div>
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        maxWidth: "480px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div key={`row-${i + 1}`} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Skeleton variant="circle" width={32} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            <Skeleton variant="text" style={{ width: `${60 + i * 8}%` }} />
            <Skeleton variant="text" style={{ width: "40%", height: "10px" }} />
          </div>
        </div>
      ))}
    </div>
  ),
};
