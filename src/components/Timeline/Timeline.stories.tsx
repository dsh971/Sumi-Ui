import type { Meta, StoryObj } from "@storybook/react";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../Badge";
import type { BadgeVariant } from "../Badge/Badge.types";
import { Card, CardBody, CardFooter, CardHeader } from "../Card";
import type { TimelineItemData, TimelineMarker } from "./Timeline.types";
import { Timeline } from "./index";

// Story-local only — matches the precedent set by Workspace.stories.tsx's
// local helpers (NavItem/ToolbarButton/Tag) for illustrative-example code
// that doesn't belong in src/components/. Needed to know whether the
// full-screen mobile panel below should render at all — at `md:` and up the
// static side-by-side Card stays the only detail view.
function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

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
      // 1024 (lg), not the default 768 (md) — a portrait tablet clears 768px
      // on width alone but doesn't have the flat, wide feel the side-by-side
      // Card assumes; real master-detail apps (Mail, Notion) only switch to
      // side-by-side around landscape-tablet/laptop width, not phone width.
      const isMobile = useIsMobile(1024);
      const panelRef = useRef<HTMLDialogElement>(null);

      // showModal()/close() (native, zero dependencies) give a real focus
      // trap, top-layer rendering, and Escape-to-close for free — instead
      // of a role="dialog" div re-implementing all of that by hand.
      useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return;
        if (isMobile && selected) {
          if (!panel.open) panel.showModal();
        } else if (panel.open) {
          panel.close();
        }
      }, [isMobile, selected]);

      return (
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start">
          <div className="w-full lg:w-[360px] lg:flex-none">
            <Timeline
              items={traceItems}
              selectedId={selectedId}
              onItemClick={(item) => setSelectedId(item.id)}
            />
          </div>

          {/* lg: and up only, matching isMobile's 1024 threshold above — a
              narrow column doesn't fit a mobile *or* portrait-tablet
              viewport, and below that there's nothing to permanently
              reserve scroll space for until something's actually
              selected — see the full-screen panel below instead. 320px,
              not the original 280px — real description content (see
              traceItems below) wraps into 3-4 lines per field at 280px;
              320px keeps it visually secondary to Timeline's 360px column
              while meaningfully cutting down on wrapping. */}
          <div className="hidden w-[320px] lg:block">
            {selected ? (
              // max-h + flex-col, CardBody as the one flex-1 overflow-y-auto
              // region — same pattern as the full-screen panel below.
              // Without this, CardBody (plain padding, no height logic) just
              // grows unbounded with content, towering over the Timeline
              // column with no scroll boundary at all.
              <Card className="flex max-h-[70vh] flex-col">
                <CardHeader>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h3
                        style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "var(--fg-1)" }}
                      >
                        {selected.title}
                      </h3>
                      {status && <Badge variant={status.variant}>{status.label}</Badge>}
                    </div>
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={() => setSelectedId(undefined)}
                      className="text-fg-3 hover:text-fg-1"
                    >
                      ✕
                    </button>
                  </div>
                </CardHeader>
                <CardBody className="flex-1 overflow-y-auto">
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

          {/* Mobile only: full-screen drill-in, not a centered popup — this
              reads as "viewing detail about this node," closer to a native
              push navigation than an interrupting dialog. No enter/exit
              motion yet — see the animate-in/slide-in-from-* classes used
              elsewhere in this codebase (Dialog, Tooltip, DropdownMenu,
              Alert, DatePicker, Toast, CommandPalette, Select): none of
              them actually animate, there's no tailwindcss-animate/
              tw-animate-css plugin installed and no hand-rolled @keyframes
              backing those class names. Worth deciding deliberately rather
              than copying a pattern that's already silently inert
              elsewhere. Always mounted (showModal()/close() need the
              element present to call); dismissed via the back button or
              Escape, both routed through onCancel so React state and the
              dialog's own open state never drift apart. */}
          <dialog
            ref={panelRef}
            aria-labelledby="trace-detail-panel-title"
            onCancel={() => setSelectedId(undefined)}
            className="fixed inset-0 z-50 m-0 hidden h-full max-h-full w-full max-w-full flex-col bg-bg-page p-0 open:flex"
          >
            {selected && (
              <>
                <div className="flex items-center gap-2 border-b border-[color:var(--line-1)] px-4 py-3">
                  <button
                    type="button"
                    aria-label="Back"
                    onClick={() => setSelectedId(undefined)}
                    className="flex size-8 items-center justify-center rounded-md text-fg-2 hover:bg-bg-sunken hover:text-fg-1"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span id="trace-detail-panel-title" className="text-sm font-medium text-fg-1">
                    {selected.title}
                  </span>
                  {status && <Badge variant={status.variant}>{status.label}</Badge>}
                </div>

                <div className="flex-1 overflow-y-auto p-4">
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
                  <p style={{ margin: "12px 0 0", fontSize: 12, color: "var(--fg-3)" }}>
                    id: {selected.id}
                  </p>
                </div>
              </>
            )}
          </dialog>
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
