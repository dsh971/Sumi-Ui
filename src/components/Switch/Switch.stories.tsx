import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./index";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    helperText: { control: { type: "text" } },
    errorText: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    defaultChecked: { control: { type: "boolean" } },
  },
  args: {
    label: "Dark mode",
    disabled: false,
    defaultChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: "Dark mode" },
};

export const On: Story = {
  args: { label: "Notifications", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "Sound effects", disabled: true },
};

export const WithHelper: Story = {
  args: {
    label: "Weekly digest",
    helperText: "Enable to receive weekly digests.",
  },
};

export const WithError: Story = {
  args: {
    label: "Required setting",
    errorText: "This setting must be enabled.",
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "24px",
        maxWidth: "360px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          color: "var(--fg-3)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: 0,
        }}
      >
        Preferences
      </p>
      <Switch label="Dark mode" helperText="Switch between light and ink themes." />
      <Switch label="Compact view" helperText="Reduce spacing in list views." />
      <Switch label="Sound effects" helperText="Play subtle audio feedback." disabled />
    </div>
  ),
};
