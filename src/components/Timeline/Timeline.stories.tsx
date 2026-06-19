import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge } from "../Badge";
import type { BadgeVariant } from "../Badge/Badge.types";
import { Card, CardBody, CardFooter, CardHeader } from "../Card";
import type { TimelineItemData, TimelineMarker } from "./Timeline.types";
import { Timeline } from "./index";

const meta: Meta<typeof Timeline> = {
  title: "Data/Timeline",
  component: Timeline,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

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
  { id: "workspace", time: "Mar 2", title: "Workspace created", marker: "dot" },
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

export const ActivityFeed: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Timeline items={activityItems} />
    </div>
  ),
};

export const AuditLog: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Timeline items={auditItems} />
    </div>
  ),
};

export const GroupedByDay: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Timeline items={groupedItems} />
    </div>
  ),
};

export const NoTimeGutter: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Timeline items={auditItems} timeGutter={false} />
    </div>
  ),
};

const traceItems: TimelineItemData[] = [
  {
    id: "run",
    time: "00:00",
    title: "Run",
    description: "router-chain",
    marker: "dot-ok",
    children: [
      {
        id: "retriever",
        time: "00:01",
        title: "Retriever",
        description: "fetched 6 documents",
        marker: "dot-ok",
      },
      {
        id: "llm-call",
        time: "00:04",
        title: "LLM call",
        description: "gpt-4.1 · 312 tokens",
        marker: "dot-pending",
        children: [
          {
            id: "tool-call",
            time: "00:05",
            title: "Tool call",
            description: "lookup_inventory",
            marker: "dot-danger",
          },
        ],
      },
    ],
  },
];

export const TraceTree: Story = {
  render: () => {
    function TraceTreeDemo() {
      const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
      return (
        <div style={{ padding: 24, maxWidth: 480 }}>
          <Timeline
            items={traceItems}
            selectedId={selectedId}
            onItemClick={(item) => setSelectedId(item.id)}
          />
        </div>
      );
    }
    return <TraceTreeDemo />;
  },
};

function findTraceItem(items: TimelineItemData[], id: string): TimelineItemData | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    const found = item.children && findTraceItem(item.children, id);
    if (found) return found;
  }
  return undefined;
}

const statusByMarker: Record<TimelineMarker, { variant: BadgeVariant; label: string } | undefined> =
  {
    "dot-ok": { variant: "success", label: "Succeeded" },
    "dot-pending": { variant: "info", label: "Running" },
    "dot-danger": { variant: "danger", label: "Failed" },
    "dot-warn": { variant: "warning", label: "Warning" },
    dot: undefined,
    "dot-info": undefined,
    "dot-hollow": undefined,
    icon: undefined,
    "icon-ok": undefined,
    "icon-danger": undefined,
  };

export const TraceTreeWithDetailPanel: Story = {
  render: () => {
    function Demo() {
      const [selectedId, setSelectedId] = useState<string | undefined>("run");
      const selected = selectedId ? findTraceItem(traceItems, selectedId) : undefined;
      const status = selected?.marker ? statusByMarker[selected.marker] : undefined;

      return (
        <div style={{ padding: 24, display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 360px" }}>
            <Timeline
              items={traceItems}
              selectedId={selectedId}
              onItemClick={(item) => setSelectedId(item.id)}
            />
          </div>
          <div style={{ width: 280 }}>
            {selected ? (
              <Card>
                <CardHeader>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "var(--fg-1)" }}>
                      {selected.title}
                    </h3>
                    {status && <Badge variant={status.variant}>{status.label}</Badge>}
                  </div>
                </CardHeader>
                <CardBody>
                  <dl
                    style={{
                      margin: 0,
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "6px 12px",
                      fontSize: 13,
                    }}
                  >
                    <dt style={{ color: "var(--fg-3)" }}>Time</dt>
                    <dd style={{ margin: 0, color: "var(--fg-1)" }}>{selected.time ?? "—"}</dd>
                    <dt style={{ color: "var(--fg-3)" }}>Detail</dt>
                    <dd style={{ margin: 0, color: "var(--fg-1)" }}>
                      {selected.description ?? "—"}
                    </dd>
                  </dl>
                </CardBody>
                <CardFooter>
                  <span style={{ fontSize: 12, color: "var(--fg-3)" }}>id: {selected.id}</span>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardBody>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--fg-3)" }}>
                    Select a node to see its details.
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

const deepTraceItems: TimelineItemData[] = [
  {
    id: "root",
    time: "00:00",
    title: "Run",
    description: "router-chain",
    marker: "dot-ok",
    children: [
      {
        id: "chain-1",
        time: "00:01",
        title: "Sub-chain A",
        marker: "dot-ok",
        children: [
          {
            id: "chain-2",
            time: "00:02",
            title: "Sub-chain B",
            marker: "dot-ok",
            children: [
              {
                id: "chain-3",
                time: "00:03",
                title: "Sub-chain C",
                description: "depth 3 — children collapsed by default",
                marker: "dot-pending",
                children: [
                  {
                    id: "chain-4",
                    time: "00:04",
                    title: "Sub-chain D",
                    marker: "dot-pending",
                    children: [
                      {
                        id: "tool-lookup",
                        time: "00:05",
                        title: "Tool call",
                        description: "lookup_inventory",
                        marker: "dot-danger",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const DeepNestingWithCollapse: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Timeline items={deepTraceItems} />
    </div>
  ),
};

export const CustomCollapseDepth: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Timeline items={deepTraceItems} defaultCollapsedDepth={1} />
    </div>
  ),
};
