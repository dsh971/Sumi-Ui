import type { Story } from "@ladle/react";
import type { TimelineItemData } from "./Timeline.types";
import { Timeline } from "./index";

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

const MergeIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v12" />
    <polyline points="7 10 12 15 17 10" />
    <path d="M5 21h14" />
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

const activityItems: TimelineItemData[] = [
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
    marker: "icon",
    iconNode: <MergeIcon />,
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

const auditItems: TimelineItemData[] = [
  {
    id: "role",
    time: "Now",
    title: "Role changed to admin",
    description: "marcus@studio.co",
    marker: "dot-hollow",
  },
  {
    id: "key",
    time: "2h ago",
    title: "API key created",
    description: "scopes: read, write",
    marker: "dot-ok",
  },
  {
    id: "billing",
    time: "Yesterday",
    title: "Billing plan downgraded",
    description: "Studio → Personal",
    marker: "dot-warn",
  },
  {
    id: "workspace",
    time: "Mar 2",
    title: "Workspace created",
    marker: "dot",
  },
];

const groupedItems: TimelineItemData[] = [
  {
    id: "comment",
    groupLabel: "Today",
    time: "14:30",
    title: (
      <>
        <b>Ema</b> commented on <b>On restraint</b>
      </>
    ),
    description: '"The negative space carries the whole piece — leave it."',
    marker: "dot-info",
    avatar: { initials: "EM", color: "var(--azurite-500)" },
  },
  {
    id: "approve",
    time: "11:02",
    title: (
      <>
        <b>Maya</b> approved the draft
      </>
    ),
    marker: "dot-ok",
    avatar: { initials: "MA", color: "var(--malachite-600)" },
  },
  {
    id: "create",
    groupLabel: "Yesterday",
    time: "09:15",
    title: (
      <>
        <b>Marcus</b> created the document
      </>
    ),
    marker: "dot",
    avatar: { initials: "MR", color: "var(--sienna-500)" },
  },
];

export const ActivityFeed: Story = () => (
  <div style={{ padding: 24, maxWidth: 420 }}>
    <Timeline items={activityItems} />
  </div>
);

export const AuditLog: Story = () => (
  <div style={{ padding: 24, maxWidth: 420 }}>
    <Timeline items={auditItems} />
  </div>
);

export const GroupedByDay: Story = () => (
  <div style={{ padding: 24, maxWidth: 480 }}>
    <Timeline items={groupedItems} />
  </div>
);

export const NoTimeGutter: Story = () => (
  <div style={{ padding: 24, maxWidth: 360 }}>
    <Timeline items={auditItems} timeGutter={false} />
  </div>
);
