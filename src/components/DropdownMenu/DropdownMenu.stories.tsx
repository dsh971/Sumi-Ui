import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./index";

const meta: Meta<typeof DropdownMenu> = {
  title: "Navigation/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "24px", display: "flex", gap: "16px" }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem style={{ color: "var(--status-danger)" }}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ padding: "24px", display: "flex", gap: "16px" }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>File</DropdownMenuLabel>
          <DropdownMenuItem>New document</DropdownMenuItem>
          <DropdownMenuItem>Open…</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Edit</DropdownMenuLabel>
          <DropdownMenuItem>Undo</DropdownMenuItem>
          <DropdownMenuItem>Redo</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Find and replace</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [checked, setChecked] = useState({ toolbar: true, sidebar: false, statusBar: true });
    return (
      <div style={{ padding: "24px", display: "flex", gap: "16px" }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">View options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Show / hide</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={checked.toolbar}
              onCheckedChange={(v) => setChecked((s) => ({ ...s, toolbar: !!v }))}
            >
              Toolbar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checked.sidebar}
              onCheckedChange={(v) => setChecked((s) => ({ ...s, sidebar: !!v }))}
            >
              Sidebar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checked.statusBar}
              onCheckedChange={(v) => setChecked((s) => ({ ...s, statusBar: !!v }))}
            >
              Status bar
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [sort, setSort] = useState("updated");
    return (
      <div style={{ padding: "24px", display: "flex", gap: "16px" }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Sort by: {sort}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="created">Date created</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="updated">Last updated</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Name (A–Z)</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
