import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectCell,
  TableSelectHead,
} from "./index";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function BasicTable({
  striped = false,
  density,
}: {
  striped?: boolean;
  density?: "default" | "dense";
}) {
  return (
    <Table striped={striped} density={density}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>Inactive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function SelectableTable({
  selectedIds = [],
  onSelectionChange = vi.fn(),
}: {
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}) {
  const rowIds = ["row-1", "row-2", "row-3"];
  return (
    <Table
      selectable
      selectedIds={selectedIds}
      rowIds={rowIds}
      onSelectionChange={onSelectionChange}
    >
      <TableHeader>
        <TableRow>
          <TableSelectHead />
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowIds.map((id, i) => (
          <TableRow key={id} rowId={id}>
            <TableSelectCell rowId={id} />
            <TableCell>Person {i + 1}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ---------------------------------------------------------------------------
// Basic rendering
// ---------------------------------------------------------------------------

describe("Table", () => {
  it("renders table with correct ARIA structure", () => {
    render(<BasicTable />);
    expect(screen.getByRole("region", { name: "Data table" })).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getAllByRole("row")).toHaveLength(3); // 1 header + 2 body
  });

  it("renders cell content", () => {
    render(<BasicTable />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("renders caption", () => {
    render(
      <Table>
        <TableCaption>User list</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByText("User list")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("renders striped variant without throwing", () => {
    render(<BasicTable striped />);
    expect(screen.getAllByRole("row").length).toBeGreaterThan(0);
  });

  it("renders dense density without throwing", () => {
    render(<BasicTable density="dense" />);
    expect(screen.getAllByRole("row").length).toBeGreaterThan(0);
  });

  it("scroll wrapper is keyboard-focusable", () => {
    render(<BasicTable />);
    const region = screen.getByRole("region", { name: "Data table" });
    expect(region).toHaveAttribute("tabindex", "0");
  });
});

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

describe("TableBody empty state", () => {
  it("renders EmptyState when no rows are provided", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{/* no rows */}</TableBody>
      </Table>,
    );
    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
  });

  it("does not render EmptyState when rows exist", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.queryByText("Nothing here yet")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

describe("TableHead sorting", () => {
  it("calls onSort when a sortable header is clicked", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="none" onSort={onSort}>
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await user.click(screen.getByRole("columnheader", { name: /name/i }));
    expect(onSort).toHaveBeenCalledOnce();
  });

  it("calls onSort via keyboard Enter on sortable header", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc" onSort={onSort}>
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    screen.getByRole("columnheader", { name: /name/i }).focus();
    await user.keyboard("{Enter}");
    expect(onSort).toHaveBeenCalledOnce();
  });

  it("sets aria-sort=ascending when sortDirection=asc", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("columnheader", { name: /name/i })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("sets aria-sort=descending when sortDirection=desc", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="desc">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("columnheader", { name: /name/i })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
  });
});

// ---------------------------------------------------------------------------
// Row selection
// ---------------------------------------------------------------------------

describe("Table row selection", () => {
  it("renders select-all checkbox in header", () => {
    render(<SelectableTable />);
    expect(screen.getByRole("checkbox", { name: "Select all rows" })).toBeInTheDocument();
  });

  it("renders per-row checkboxes", () => {
    render(<SelectableTable />);
    expect(screen.getByRole("checkbox", { name: "Select row row-1" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Select row row-2" })).toBeInTheDocument();
  });

  it("calls onSelectionChange with row ID when a row checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(<SelectableTable onSelectionChange={onSelectionChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Select row row-1" }));
    expect(onSelectionChange).toHaveBeenCalledWith(["row-1"]);
  });

  it("calls onSelectionChange with all IDs when select-all is clicked", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(<SelectableTable onSelectionChange={onSelectionChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(onSelectionChange).toHaveBeenCalledWith(["row-1", "row-2", "row-3"]);
  });

  it("deselects all when select-all clicked while all selected", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <SelectableTable
        selectedIds={["row-1", "row-2", "row-3"]}
        onSelectionChange={onSelectionChange}
      />,
    );
    await user.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it("reflects checked state from selectedIds", () => {
    render(<SelectableTable selectedIds={["row-2"]} />);
    expect(screen.getByRole("checkbox", { name: "Select row row-2" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Select row row-1" })).not.toBeChecked();
  });
});

describe("Table accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<BasicTable />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
