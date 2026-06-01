import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge } from "../Badge";
import type { SortDirection } from "./Table.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectCell,
  TableSelectHead,
} from "./index";

const meta: Meta<typeof Table> = {
  title: "Data/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    striped: { control: { type: "boolean" } },
    stickyHeader: { control: { type: "boolean" } },
    density: {
      control: { type: "select" },
      options: ["default", "dense"],
    },
    selectable: { control: { type: "boolean" } },
  },
  args: {
    striped: false,
    stickyHeader: false,
    density: "default",
    selectable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const people = [
  { id: "1", name: "Lin Feng", role: "Designer", status: "Active", joined: "2024-03" },
  { id: "2", name: "Kira Solberg", role: "Engineer", status: "Active", joined: "2024-06" },
  { id: "3", name: "Marcus Webb", role: "PM", status: "On leave", joined: "2023-11" },
  { id: "4", name: "Priya Nair", role: "Engineer", status: "Active", joined: "2024-09" },
  { id: "5", name: "Theo Müller", role: "Designer", status: "Inactive", joined: "2023-07" },
];

const statusVariant = (s: string) =>
  s === "Active" ? "success" : s === "On leave" ? "warning" : "neutral";

export const Default: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Table>
        <TableCaption>Team members — sorted by join date</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell style={{ color: "var(--fg-2)" }}>{p.role}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(p.status) as "success" | "warning" | "neutral"}>
                  {p.status}
                </Badge>
              </TableCell>
              <TableCell style={{ color: "var(--fg-3)" }}>{p.joined}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Sortable: Story = {
  render: () => {
    const [sortDir, setSortDir] = useState<SortDirection>("none");
    const sorted = [...people].sort((a, b) =>
      sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : sortDir === "desc"
          ? b.name.localeCompare(a.name)
          : 0,
    );
    return (
      <div style={{ padding: "24px" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                sortable
                sortDirection={sortDir}
                onSort={() =>
                  setSortDir((d) => (d === "none" ? "asc" : d === "asc" ? "desc" : "none"))
                }
              >
                Name
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell style={{ color: "var(--fg-2)" }}>{p.role}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(p.status) as "success" | "warning" | "neutral"}>
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div style={{ padding: "24px" }}>
        <p style={{ fontSize: "13px", color: "var(--fg-3)", marginBottom: "12px" }}>
          {selected.length} of {people.length} selected
        </p>
        <Table
          selectable
          selectedIds={selected}
          rowIds={people.map((p) => p.id)}
          onSelectionChange={setSelected}
        >
          <TableHeader>
            <TableRow>
              <TableSelectHead />
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {people.map((p) => (
              <TableRow key={p.id} rowId={p.id}>
                <TableSelectCell rowId={p.id} />
                <TableCell>{p.name}</TableCell>
                <TableCell style={{ color: "var(--fg-2)" }}>{p.role}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(p.status) as "success" | "warning" | "neutral"}>
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const Striped: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell>{p.joined}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Dense: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Table density="dense">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(p.status) as "success" | "warning" | "neutral"}>
                  {p.status}
                </Badge>
              </TableCell>
              <TableCell>{p.joined}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const EmptyState: Story = {
  name: "Empty state",
  render: () => (
    <div style={{ padding: "24px" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{/* no rows — EmptyState renders automatically */}</TableBody>
      </Table>
    </div>
  ),
};
