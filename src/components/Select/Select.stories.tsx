import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "./index";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    helperText: { control: { type: "text" } },
    errorText: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
  },
  args: {
    placeholder: "Choose an option",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "24px",
        maxWidth: "320px",
      }}
    >
      <Select label="Country" placeholder="Choose a country">
        <SelectContent>
          <SelectItem value="cn">China</SelectItem>
          <SelectItem value="jp">Japan</SelectItem>
          <SelectItem value="kr">South Korea</SelectItem>
          <SelectItem value="us">United States</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "24px",
        maxWidth: "320px",
      }}
    >
      <Select label="Font" placeholder="Select a font">
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Display</SelectLabel>
            <SelectItem value="cormorant">Cormorant Garamond</SelectItem>
            <SelectItem value="playfair">Playfair Display</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Body</SelectLabel>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="source">Source Sans</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Mono</SelectLabel>
            <SelectItem value="jetbrains">JetBrains Mono</SelectItem>
            <SelectItem value="fira">Fira Code</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithHelperAndError: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "24px",
        maxWidth: "320px",
      }}
    >
      <Select label="Status" helperText="Set the current project status.">
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
      <Select label="Priority" errorText="Priority is required.">
        <SelectContent>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "24px",
        maxWidth: "320px",
      }}
    >
      <Select label="Region" disabled defaultValue="east">
        <SelectContent>
          <SelectItem value="east">East Asia</SelectItem>
          <SelectItem value="west">Western Europe</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
