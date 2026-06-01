import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    helperText: { control: { type: "text" } },
    errorText: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    defaultChecked: { control: { type: "boolean" } },
  },
  args: {
    label: "Accept terms and conditions",
    disabled: false,
    defaultChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "Accept terms and conditions" },
};

export const Checked: Story = {
  args: { label: "Subscribe to newsletter", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "Disabled unchecked", disabled: true },
};

export const WithHelper: Story = {
  args: {
    label: "Weekly digest",
    helperText: "A summary of activity from the past week.",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    errorText: "You must accept the terms to continue.",
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
      <p
        style={{
          fontSize: "12px",
          color: "var(--fg-3)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: 0,
        }}
      >
        Notification preferences
      </p>
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Push notifications" defaultChecked />
      <Checkbox label="SMS notifications" />
      <Checkbox label="Weekly digest" helperText="A summary of activity from the past week." />
    </div>
  ),
};
