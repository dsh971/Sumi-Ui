import type { Meta, StoryObj } from "@storybook/react";
import { Input, TextArea } from "./index";

const meta: Meta<typeof Input> = {
  title: "Foundation/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    helperText: { control: { type: "text" } },
    errorText: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "search", "url", "number"],
    },
  },
  args: {
    placeholder: "Enter text…",
    disabled: false,
    size: "md",
    type: "text",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter your email" },
};

export const WithHelper: Story = {
  args: {
    label: "Username",
    helperText: "Must be 3–20 characters, letters and numbers only.",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    defaultValue: "not-an-email",
    errorText: "Enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
    placeholder: "Cannot edit this",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "24px",
        maxWidth: "480px",
      }}
    >
      <Input label="Small" size="sm" placeholder="Small input" />
      <Input label="Medium (default)" size="md" placeholder="Medium input" />
      <Input label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
};

export const TextAreaStory: Story = {
  name: "TextArea",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "24px",
        maxWidth: "480px",
      }}
    >
      <TextArea label="Notes" placeholder="Write something…" helperText="Max 500 characters." />
      <TextArea label="Required" errorText="Notes are required." />
      <TextArea label="Disabled" disabled placeholder="Cannot edit" />
    </div>
  ),
};
