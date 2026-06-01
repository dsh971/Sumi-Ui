import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    helperText: { control: { type: "text" } },
    errorText: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    value: { control: { type: "text" } },
    min: { control: { type: "text" } },
    max: { control: { type: "text" } },
  },
  args: {
    placeholder: "Pick a date",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: { placeholder: "Pick a date" },
};

export const WithLabel: Story = {
  args: {
    label: "Start date",
    helperText: "Choose your project start date.",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>("2026-05-29");
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "24px",
          maxWidth: "360px",
        }}
      >
        <DatePicker
          label="Publication date"
          value={value}
          onChange={setValue}
          helperText={value ? `Selected: ${value}` : "No date selected."}
        />
      </div>
    );
  },
};

export const WithBounds: Story = {
  args: {
    label: "Meeting date",
    min: "2026-01-01",
    max: "2026-12-31",
    helperText: "Must be within 2026.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Deadline",
    errorText: "Deadline cannot be in the past.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Locked date",
    value: "2026-05-01",
    disabled: true,
  },
};
