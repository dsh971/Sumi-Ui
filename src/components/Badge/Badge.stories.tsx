import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";

const meta: Meta<typeof Badge> = {
  title: "Foundation/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "neutral",
        "success",
        "warning",
        "danger",
        "info",
        "malachite",
        "canvas",
        "sienna",
        "jade",
        "clay",
        "peach",
        "seal",
      ],
    },
    dot: { control: { type: "boolean" } },
    children: { control: { type: "text" } },
  },
  args: {
    variant: "neutral",
    dot: false,
    children: "Badge",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {
  args: { variant: "neutral", children: "Neutral" },
};

export const Success: Story = {
  args: { variant: "success", children: "Success" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Warning" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Danger" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

export const WithDot: Story = {
  args: { variant: "success", dot: true, children: "Published" },
};

export const BrandVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        padding: "24px",
        alignItems: "center",
      }}
    >
      <Badge variant="malachite">Malachite</Badge>
      <Badge variant="canvas">Canvas</Badge>
      <Badge variant="sienna">Sienna</Badge>
      <Badge variant="seal">Seal</Badge>
    </div>
  ),
};

// Deprecated alias names (jade/clay/peach) — kept working for back-compat
// per Sumi-Design-System's own migration strategy. New work should use
// BrandVariants' canonical names above instead.
export const LegacyAliases: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        padding: "24px",
        alignItems: "center",
      }}
    >
      <Badge variant="jade">Jade</Badge>
      <Badge variant="clay">Clay</Badge>
      <Badge variant="peach">Peach</Badge>
    </div>
  ),
};

export const AllWithDots: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <Badge variant="neutral" dot>
          Draft
        </Badge>
        <Badge variant="success" dot>
          Published
        </Badge>
        <Badge variant="warning" dot>
          Review needed
        </Badge>
        <Badge variant="danger" dot>
          Blocked
        </Badge>
        <Badge variant="info" dot>
          In progress
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <Badge variant="malachite" dot>
          Malachite
        </Badge>
        <Badge variant="canvas" dot>
          Canvas
        </Badge>
        <Badge variant="sienna" dot>
          Sienna
        </Badge>
        <Badge variant="seal" dot>
          Seal
        </Badge>
      </div>
    </div>
  ),
};
