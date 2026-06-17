import type { Story } from "@ladle/react";
import { useState } from "react";
import type { ComboboxGroup, ComboboxOption } from "./Combobox.types";
import { Combobox } from "./index";

const people: ComboboxOption[] = [
  {
    value: "maya",
    label: "Maya Okonkwo",
    avatar: { initials: "MA", color: "var(--malachite-600)" },
  },
  {
    value: "marcus",
    label: "Marcus Reed",
    avatar: { initials: "MA", color: "var(--azurite-500)" },
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

export const SingleSelect: Story = () => {
  const [value, setValue] = useState<string>("");
  return (
    <div style={{ width: 320, padding: 24 }}>
      <Combobox
        label="Assign reviewer"
        placeholder="Search a reviewer…"
        options={people}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};

export const WithGroups: Story = () => {
  const [value, setValue] = useState<string>("editorial");
  return (
    <div style={{ width: 320, padding: 24 }}>
      <Combobox
        label="Workspace"
        placeholder="Search a workspace…"
        options={workspaces}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};

export const MultiSelect: Story = () => {
  const [value, setValue] = useState<string[]>(["ink-wash", "restraint"]);
  return (
    <div style={{ width: 320, padding: 24 }}>
      <Combobox
        multiple
        label="Tags"
        placeholder="Add tags…"
        options={tags}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};

export const Loading: Story = () => {
  const [value, setValue] = useState<string>("");
  return (
    <div style={{ width: 320, padding: 24 }}>
      <Combobox
        label="Directory"
        placeholder="Search directory…"
        options={people}
        loading
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};

export const EmptyState: Story = () => {
  const [value, setValue] = useState<string>("");
  return (
    <div style={{ width: 320, padding: 24 }}>
      <Combobox
        label="Directory"
        placeholder="Try typing zzz…"
        options={people}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};
