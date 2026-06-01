import type { Meta, StoryObj } from "@storybook/react";
import { Seal } from "./index";

const meta: Meta<typeof Seal> = {
  title: "Brand/Seal",
  component: Seal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    glyph: { control: { type: "text" } },
    "aria-label": { control: { type: "text" } },
  },
  args: {
    size: "md",
    glyph: "墨",
    "aria-label": "Sumi seal",
  },
};

export default meta;
type Story = StoryObj<typeof Seal>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", padding: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <Seal size="sm" />
        <span style={{ fontSize: "10px", color: "var(--fg-3)" }}>sm · 16px</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <Seal size="md" />
        <span style={{ fontSize: "10px", color: "var(--fg-3)" }}>md · 24px</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <Seal size="lg" />
        <span style={{ fontSize: "10px", color: "var(--fg-3)" }}>lg · 32px</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <Seal size="xl" />
        <span style={{ fontSize: "10px", color: "var(--fg-3)" }}>xl · 48px</span>
      </div>
    </div>
  ),
};

export const Glyphs: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", padding: "24px" }}>
      <Seal size="xl" glyph="墨" aria-label="Ink seal" />
      <Seal size="xl" glyph="印" aria-label="Stamp seal" />
      <Seal size="xl" glyph="水" aria-label="Water seal" />
    </div>
  ),
};

export const OnDarkSurface: Story = {
  render: () => (
    <div
      style={{
        background: "var(--ink-800)",
        padding: "40px",
        display: "inline-flex",
        gap: "16px",
        borderRadius: "8px",
      }}
    >
      <Seal size="sm" />
      <Seal size="md" />
      <Seal size="lg" />
      <Seal size="xl" />
    </div>
  ),
};

export const InBrandContext: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          border: "1px solid var(--line-1)",
          borderRadius: "6px",
          padding: "32px",
          position: "relative",
          minHeight: "120px",
          maxWidth: "360px",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px", color: "var(--fg-2)", fontStyle: "italic" }}>
          &quot;A great deal of unmarked paper, a few decisive marks, a single red seal.&quot;
        </p>
        <div style={{ position: "absolute", bottom: "12px", right: "12px" }}>
          <Seal size="md" />
        </div>
      </div>
    </div>
  ),
};
