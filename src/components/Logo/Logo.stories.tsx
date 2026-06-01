import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./index";

const meta: Meta<typeof Logo> = {
  title: "Brand/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
    width: { control: { type: "number" } },
  },
  args: {
    variant: "light",
    width: 120,
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Light: Story = {
  args: { variant: "light", width: 180 },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--bg-0)", padding: "40px", display: "inline-block" }}>
        <Story />
      </div>
    ),
  ],
};

export const Dark: Story = {
  args: { variant: "dark", width: 180 },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--ink-800)", padding: "40px", display: "inline-block" }}>
        <Story />
      </div>
    ),
  ],
};

export const OnBrandSurface: Story = {
  render: () => (
    <div
      style={{
        background: "var(--pigment-malachite)",
        padding: "32px",
        borderRadius: "8px",
        display: "inline-block",
      }}
    >
      <Logo variant="dark" width={140} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
      {[240, 180, 120, 80, 48].map((w) => (
        <Logo key={w} width={w} />
      ))}
    </div>
  ),
};
