import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Foundation/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "ink", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    loading: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    children: { control: { type: "text" } },
  },
  args: {
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Ink: Story = {
  args: { variant: "ink", children: "Ink" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Danger" },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Saving…" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Disabled" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}
        >
          <Button variant="primary" size={size}>
            Primary
          </Button>
          <Button variant="secondary" size={size}>
            Secondary
          </Button>
          <Button variant="ghost" size={size}>
            Ghost
          </Button>
          <Button variant="ink" size={size}>
            Ink
          </Button>
          <Button variant="danger" size={size}>
            Danger
          </Button>
          <Button variant="primary" size={size} loading>
            Loading
          </Button>
          <Button variant="primary" size={size} disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div style={{ padding: "24px", display: "flex", gap: "8px" }}>
      <Button asChild variant="primary">
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Open link
        </a>
      </Button>
      <Button asChild variant="ghost">
        <a href="https://example.com">Ghost link</a>
      </Button>
    </div>
  ),
};
