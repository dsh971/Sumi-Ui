"use client";

import { Combobox, type ComboboxGroup, type ComboboxOption } from "@sumiui/react";
import { useState } from "react";

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

export default function ComboboxVariants() {
  const [reviewer, setReviewer] = useState("");
  const [workspace, setWorkspace] = useState("editorial");
  const [selectedTags, setSelectedTags] = useState<string[]>(["ink-wash", "restraint"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "320px" }}>
      <Combobox
        label="Assign reviewer"
        placeholder="Search a reviewer…"
        options={people}
        value={reviewer}
        onValueChange={setReviewer}
      />
      <Combobox
        label="Workspace"
        placeholder="Search a workspace…"
        options={workspaces}
        value={workspace}
        onValueChange={setWorkspace}
      />
      <Combobox
        multiple
        label="Tags"
        placeholder="Add tags…"
        options={tags}
        value={selectedTags}
        onValueChange={setSelectedTags}
      />
    </div>
  );
}

export const code = `import { Combobox, type ComboboxOption } from "@sumiui/react";
import { useState } from "react";

const people: ComboboxOption[] = [
  { value: "maya", label: "Maya Okonkwo", avatar: { initials: "MA", color: "var(--malachite-600)" } },
  { value: "marcus", label: "Marcus Reed", avatar: { initials: "MR", color: "var(--azurite-500)" } },
];

export function ComboboxVariants() {
  const [reviewer, setReviewer] = useState("");
  return (
    <Combobox
      label="Assign reviewer"
      placeholder="Search a reviewer…"
      options={people}
      value={reviewer}
      onValueChange={setReviewer}
    />
  );
}`;
