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

/**
 * Each `Skeleton` is correctly `aria-hidden` — a placeholder has nothing to
 * announce. But that leaves a *group* of skeletons silent to screen readers
 * while it's the only content on screen. Wrap the group in `role="status"`
 * (implicit `aria-live="polite"`) with a visually-hidden label so assistive
 * tech gets one "Loading…" announcement when the region mounts, without
 * re-announcing on every shimmer frame. This is documented guidance, not a
 * new exported component — apply it at the call site that renders the
 * skeleton group.
 */
export const AccessibleLoadingRegion: Story = {
  render: () => (
    // <output> carries an implicit role="status" (implicit aria-live=
    // "polite") — the semantic element Biome's a11y rule asks for in place
    // of a plain div with role="status" bolted on.
    <output style={{ display: "block", padding: "24px", maxWidth: "360px" }}>
      <span className="sr-only">Loading…</span>
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
      </div>
    </output>
  ),
};
