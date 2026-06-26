"use client";

import {
  Badge,
  type BadgeVariant,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sumiui/react";

const people = [
  { id: "1", name: "Lin Feng", role: "Designer", status: "Active", joined: "2024-03" },
  { id: "2", name: "Kira Solberg", role: "Engineer", status: "Active", joined: "2024-06" },
  { id: "3", name: "Marcus Webb", role: "PM", status: "On leave", joined: "2023-11" },
];

const statusVariant = (s: string): BadgeVariant =>
  s === "Active" ? "success" : s === "On leave" ? "warning" : "neutral";

export default function TableVariants() {
  return (
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
              <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
            </TableCell>
            <TableCell style={{ color: "var(--fg-3)" }}>{p.joined}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const code = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sumiui/react";

export function TableVariants() {
  return (
    <Table>
      <TableCaption>Team members</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Lin Feng</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`;
