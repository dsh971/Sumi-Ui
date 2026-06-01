import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./index";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    page: { control: { type: "number" } },
    totalPages: { control: { type: "number" } },
    siblingCount: { control: { type: "number" } },
  },
  args: {
    page: 1,
    totalPages: 10,
    siblingCount: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <p style={{ fontSize: "13px", color: "var(--fg-3)", margin: 0 }}>Current page: {page}</p>
        <Pagination page={page} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ padding: "24px" }}>
        <Pagination page={page} totalPages={4} onPageChange={setPage} />
      </div>
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div style={{ padding: "24px" }}>
        <Pagination page={page} totalPages={50} onPageChange={setPage} siblingCount={1} />
      </div>
    );
  },
};

export const FirstPage: Story = {
  args: { page: 1, totalPages: 10, onPageChange: () => {} },
};

export const LastPage: Story = {
  args: { page: 10, totalPages: 10, onPageChange: () => {} },
};
