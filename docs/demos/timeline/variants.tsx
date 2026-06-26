"use client";

import { Timeline, type TimelineItemData } from "@sumiui/react";

const CheckIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="5 12 10 17 19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const items: TimelineItemData[] = [
  {
    id: "deploy",
    time: "09:24",
    title: (
      <>
        <b>Deploy succeeded</b> — production
      </>
    ),
    description: "Build #482 · 38s · by Maya",
    marker: "icon-ok",
    iconNode: <CheckIcon />,
  },
  {
    id: "merge",
    time: "09:11",
    title: (
      <>
        Merged <b>feat/ink-wash-toast</b>
      </>
    ),
    description: "+412 −38 across 9 files",
    marker: "dot",
  },
  {
    id: "fail",
    time: "08:47",
    title: (
      <>
        <b>Checks failed</b> on a pull request
      </>
    ),
    description: "2 of 14 tests · timed out",
    marker: "icon-danger",
    iconNode: <CrossIcon />,
  },
];

export default function TimelineVariants() {
  return <Timeline items={items} />;
}

export const code = `import { Timeline, type TimelineItemData } from "@sumiui/react";

const items: TimelineItemData[] = [
  {
    id: "deploy",
    time: "09:24",
    title: <><b>Deploy succeeded</b> — production</>,
    description: "Build #482 · 38s · by Maya",
    marker: "icon-ok",
    iconNode: <CheckIcon />,
  },
  {
    id: "merge",
    time: "09:11",
    title: <>Merged <b>feat/ink-wash-toast</b></>,
    description: "+412 −38 across 9 files",
    marker: "dot",
  },
];

export function TimelineVariants() {
  return <Timeline items={items} />;
}`;
