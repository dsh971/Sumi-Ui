"use client";

import { Pagination } from "@sumiui/react";
import { useState } from "react";

export default function PaginationVariants() {
  const [page, setPage] = useState(5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <p style={{ fontSize: "13px", color: "var(--fg-3)", margin: 0 }}>Current page: {page}</p>
      <Pagination page={page} totalPages={20} onPageChange={setPage} />
    </div>
  );
}

export const code = `import { Pagination } from "@sumiui/react";
import { useState } from "react";

export function PaginationVariants() {
  const [page, setPage] = useState(5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <p style={{ fontSize: "13px", color: "var(--fg-3)" }}>Current page: {page}</p>
      <Pagination page={page} totalPages={20} onPageChange={setPage} />
    </div>
  );
}`;
