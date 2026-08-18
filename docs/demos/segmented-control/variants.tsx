"use client";

import { SegmentedControl, SegmentedControlItem } from "@sumiui/react";

export default function SegmentedControlVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SegmentedControl defaultValue="list" aria-label="View">
        <SegmentedControlItem value="list" label="List" />
        <SegmentedControlItem value="board" label="Board" />
        <SegmentedControlItem value="calendar" label="Calendar" />
      </SegmentedControl>
      <SegmentedControl defaultValue="week" aria-label="Range">
        <SegmentedControlItem value="day" label="Day" />
        <SegmentedControlItem value="week" label="Week" />
        <SegmentedControlItem value="month" label="Month" disabled />
      </SegmentedControl>
    </div>
  );
}

export const code = `import { SegmentedControl, SegmentedControlItem } from "@sumiui/react";

export function SegmentedControlVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SegmentedControl defaultValue="list" aria-label="View">
        <SegmentedControlItem value="list" label="List" />
        <SegmentedControlItem value="board" label="Board" />
        <SegmentedControlItem value="calendar" label="Calendar" />
      </SegmentedControl>
      <SegmentedControl defaultValue="week" aria-label="Range">
        <SegmentedControlItem value="day" label="Day" />
        <SegmentedControlItem value="week" label="Week" />
        <SegmentedControlItem value="month" label="Month" disabled />
      </SegmentedControl>
    </div>
  );
}`;
