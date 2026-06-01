import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioItem } from "./index";

const meta: Meta<typeof RadioGroup> = {
  title: "Forms/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <RadioGroup defaultValue="monthly" aria-label="Billing period">
        <RadioItem value="monthly" label="Monthly billing" />
        <RadioItem value="annual" label="Annual billing" />
        <RadioItem value="custom" label="Custom schedule" />
      </RadioGroup>
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <RadioGroup defaultValue="standard" aria-label="Plan">
        <RadioItem value="starter" label="Starter" />
        <RadioItem value="standard" label="Standard" />
        <RadioItem value="pro" label="Pro (coming soon)" disabled />
      </RadioGroup>
    </div>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <p
        style={{
          fontSize: "12px",
          color: "var(--fg-3)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "12px",
        }}
      >
        Theme
      </p>
      <RadioGroup
        defaultValue="light"
        aria-label="Theme"
        style={{ flexDirection: "row", gap: "24px" }}
      >
        <RadioItem value="light" label="Light" />
        <RadioItem value="dark" label="Dark" />
        <RadioItem value="system" label="System" />
      </RadioGroup>
    </div>
  ),
};
