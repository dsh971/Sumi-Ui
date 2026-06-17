import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { ComboboxGroup, ComboboxOption } from "./Combobox.types";
import { Combobox } from "./index";

const meta: Meta<typeof Combobox> = {
  title: "Forms/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const people: ComboboxOption[] = [
  {
    value: "maya",
    label: "Maya Okonkwo",
    avatar: { initials: "MA", color: "var(--malachite-600)" },
  },
  {
    value: "marcus",
    label: "Marcus Reed",
    avatar: { initials: "MR", color: "var(--azurite-500)" },
  },
  { value: "ema", label: "Ema Lindqvist", avatar: { initials: "EM", color: "var(--sienna-500)" } },
];

const tags: ComboboxOption[] = [
  { value: "ink-wash", label: "Ink-wash" },
  { value: "restraint", label: "Restraint" },
  { value: "negative-space", label: "Negative space" },
  { value: "paper-grain", label: "Paper & grain" },
  { value: "compass", label: "Compass" },
];

const workspaces: ComboboxGroup[] = [
  {
    label: "Recent",
    options: [
      { value: "editorial", label: "Studio — Editorial" },
      { value: "archive", label: "Studio — Archive" },
    ],
  },
  {
    label: "All workspaces",
    options: [{ value: "personal", label: "Personal" }],
  },
];

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <Combobox
        label="Assign reviewer"
        placeholder="Search a reviewer…"
        options={people}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = useState<string>("editorial");
    return (
      <Combobox
        label="Workspace"
        placeholder="Search a workspace…"
        options={workspaces}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["ink-wash", "restraint"]);
    return (
      <Combobox
        multiple
        label="Tags"
        placeholder="Add tags…"
        options={tags}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <Combobox
        label="Directory"
        placeholder="Search directory…"
        options={people}
        loading
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <Combobox
        label="Directory"
        placeholder="Try typing zzz…"
        options={people}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};
