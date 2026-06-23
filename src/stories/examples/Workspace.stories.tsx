import type { Meta, StoryObj } from "@storybook/react";
import {
  Bold,
  ChevronDown,
  Clock,
  Code2,
  Heading1,
  Heading2,
  Home,
  ImageIcon,
  Italic,
  Link2,
  Menu,
  Minus,
  Moon,
  PanelLeft,
  PanelLeftClose,
  Pilcrow,
  Quote,
  Search,
  Settings,
  Star,
  Sun,
  Underline,
  Users,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Badge } from "../../components/Badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/Breadcrumb";
import { Button } from "../../components/Button";
import { Card, CardBody, CardHeader } from "../../components/Card";
import { CommandPalette } from "../../components/CommandPalette";
import type {
  CommandGroup,
  CommandItem,
} from "../../components/CommandPalette/CommandPalette.types";
import { Grid } from "../../components/Grid";
import { Input, TextArea } from "../../components/Input";
import { Seal } from "../../components/Seal";
import { Timeline } from "../../components/Timeline";
import type { TimelineItemData } from "../../components/Timeline/Timeline.types";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/Toast";
import { cn } from "../../lib/cn";

const meta: Meta = {
  title: "Examples/Workspace",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ─── Gap fillers ──────────────────────────────────────────────────────────
// These three patterns don't exist as exported SumiUi components yet — see
// documentation/decisions/003-component-gaps.md. Kept local to this story
// rather than promoted to src/components/.

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors",
        active
          ? "bg-bg-sunken text-fg-1 font-medium"
          : "text-fg-2 hover:bg-bg-sunken hover:text-fg-1",
      )}
    >
      {icon ?? <span className="size-1.5 rounded-full bg-fg-4" aria-hidden="true" />}
      <span className="truncate">{label}</span>
    </button>
  );
}

function ToolbarButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-7 items-center justify-center rounded-md text-fg-2 hover:bg-bg-sunken hover:text-fg-1"
    >
      {children}
    </button>
  );
}

function EditorToolbar() {
  return (
    <div className="flex items-center gap-0.5 overflow-x-auto border-b border-[color:var(--line-1)] px-1 py-1.5">
      {/* overflow-x-auto: 11 icon buttons + 2 dividers run close to a
          320px mobile viewport's width once the editor's own padding is
          subtracted — scroll rather than wrap, since wrapping would break
          the divider grouping. */}
      <ToolbarButton label="Bold">
        <Bold size={14} />
      </ToolbarButton>
      <ToolbarButton label="Italic">
        <Italic size={14} />
      </ToolbarButton>
      <ToolbarButton label="Underline">
        <Underline size={14} />
      </ToolbarButton>
      <span className="mx-1 h-4 w-px bg-[color:var(--line-1)]" />
      <ToolbarButton label="Heading 1">
        <Heading1 size={14} />
      </ToolbarButton>
      <ToolbarButton label="Heading 2">
        <Heading2 size={14} />
      </ToolbarButton>
      <ToolbarButton label="Paragraph">
        <Pilcrow size={14} />
      </ToolbarButton>
      <span className="mx-1 h-4 w-px bg-[color:var(--line-1)]" />
      <ToolbarButton label="Quote">
        <Quote size={14} />
      </ToolbarButton>
      <ToolbarButton label="Rule">
        <Minus size={14} />
      </ToolbarButton>
      <ToolbarButton label="Code">
        <Code2 size={14} />
      </ToolbarButton>
      <span className="mx-1 h-4 w-px bg-[color:var(--line-1)]" />
      <ToolbarButton label="Image">
        <ImageIcon size={14} />
      </ToolbarButton>
      <ToolbarButton label="Link">
        <Link2 size={14} />
      </ToolbarButton>
    </div>
  );
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-[color:var(--line-1)] bg-bg-sunken px-2 py-1 text-xs text-fg-1">
      {label}
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
        className="text-fg-3 hover:text-fg-1"
      >
        <X size={11} />
      </button>
    </span>
  );
}

// ─── Shared shell ─────────────────────────────────────────────────────────

const kbdClasses =
  "rounded-[4px] border border-[color:var(--line-2)] bg-bg-sunken px-1.5 py-0.5 font-mono text-[11px] text-fg-3";

function Sidebar({
  activeView,
  theme,
  onTheme,
  onOpenPalette,
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapsed,
}: {
  activeView: "dashboard" | "editor";
  theme: "light" | "dark";
  onTheme: (t: "light" | "dark") => void;
  onOpenPalette: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  const pieces = [
    { id: "p1", name: "On restraint" },
    { id: "p2", name: "Notes from the studio" },
    { id: "p3", name: "The seal & the brush" },
  ];

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-[color:var(--line-1)] bg-bg-card transition-transform",
        "fixed inset-y-0 left-0 z-40 w-[240px] md:w-auto",
        // collapsed is a desktop-only concept — the mobile drawer
        // (mobileOpen, below) stays independent of it entirely.
        collapsed ? "md:hidden" : "md:static md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-[color:var(--line-1)] px-3.5 py-3">
        <Seal size="sm" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13.5px] font-semibold text-fg-1">Lin Tan</div>
          <div className="text-xs text-fg-3">Personal · 3 spaces</div>
        </div>
        <ChevronDown size={14} className="text-fg-3" aria-hidden="true" />
        <button
          type="button"
          aria-label="Collapse sidebar"
          onClick={onToggleCollapsed}
          className="hidden size-7 items-center justify-center rounded-md text-fg-3 hover:text-fg-1 md:flex"
        >
          <PanelLeftClose size={16} />
        </button>
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onMobileClose}
          className="flex size-7 items-center justify-center rounded-md text-fg-3 hover:text-fg-1 md:hidden"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-3 pt-3">
        <Button variant="ink" size="sm" className="w-full">
          New piece
        </Button>
      </div>

      <button
        type="button"
        onClick={onOpenPalette}
        className="mx-3 mt-2 flex items-center gap-2 rounded-md border border-[color:var(--line-2)] bg-bg-page px-2.5 py-1.5 text-left text-sm text-fg-3"
      >
        <Search size={14} aria-hidden="true" />
        <span className="flex-1">Search…</span>
        <kbd className={kbdClasses}>⌘K</kbd>
      </button>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="mb-1 px-2.5 text-[10px] font-medium uppercase tracking-wider text-fg-3">
          Workspace
        </div>
        <NavItem icon={<Home size={14} />} label="Home" active={activeView === "dashboard"} />
        <NavItem icon={<Clock size={14} />} label="Recent" />
        <NavItem icon={<Star size={14} />} label="Starred" />
        <NavItem icon={<Users size={14} />} label="Shared" />

        <div className="mb-1 mt-4 px-2.5 text-[10px] font-medium uppercase tracking-wider text-fg-3">
          Pieces
        </div>
        {pieces.map((p) => (
          <NavItem key={p.id} label={p.name} active={activeView === "editor" && p.id === "p1"} />
        ))}
      </nav>

      <div className="flex items-center gap-1 border-t border-[color:var(--line-1)] px-2 py-2">
        <button
          type="button"
          className="flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fg-2 hover:bg-bg-sunken hover:text-fg-1"
        >
          <Settings size={14} />
          Settings
        </button>
        <button
          type="button"
          aria-label="Light theme"
          onClick={() => onTheme("light")}
          className={cn(
            "flex size-7 items-center justify-center rounded-md",
            theme === "light" ? "bg-bg-sunken text-fg-1" : "text-fg-3 hover:text-fg-1",
          )}
        >
          <Sun size={14} />
        </button>
        <button
          type="button"
          aria-label="Dark theme"
          onClick={() => onTheme("dark")}
          className={cn(
            "flex size-7 items-center justify-center rounded-md",
            theme === "dark" ? "bg-bg-sunken text-fg-1" : "text-fg-3 hover:text-fg-1",
          )}
        >
          <Moon size={14} />
        </button>
      </div>
    </aside>
  );
}

function TopBar({ title, onOpenPalette }: { title: string; onOpenPalette: () => void }) {
  return (
    <div className="flex items-center gap-3 border-b border-[color:var(--line-1)] px-5 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Pieces</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Essays</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-1" />
      <Badge variant="neutral">Draft</Badge>
      <span className="text-xs text-fg-3">Saved just now</span>
      <Button variant="secondary" size="sm" onClick={onOpenPalette}>
        Quick action <kbd className={kbdClasses}>⌘K</kbd>
      </Button>
      <Button variant="ink" size="sm">
        Publish
      </Button>
    </div>
  );
}

function AppShell({
  activeView,
  properties,
  children,
}: {
  activeView: "dashboard" | "editor";
  properties?: React.ReactNode;
  children: (openPalette: () => void) => React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const groups: CommandGroup[] = [
    {
      label: "Actions",
      items: [
        { id: "new", label: "New piece", hint: "N" },
        { id: "publish", label: "Publish current", hint: "⇧P" },
        { id: "archive", label: "Move to archive" },
      ],
    },
    {
      label: "Pieces",
      items: [
        { id: "p1", label: "On restraint" },
        { id: "p2", label: "Notes from the studio" },
        { id: "p3", label: "The seal & the brush" },
      ],
    },
  ];

  const handleSelect = (item: CommandItem) => {
    if (item.id === "publish") setToast("Published to Live");
    else setToast(`Opened "${item.label}"`);
  };

  return (
    <ToastProvider duration={2200}>
      {/* Below `md`, the app window fills the viewport like a real app.
          At `md` and up it's a fixed-size desktop mockup (1100x640) inside
          a horizontal-scroll wrapper, so narrow embedding contexts (like
          the Storybook Docs column) scroll instead of squeezing the
          topbar/sidebar into a broken layout. */}
      <div className="md:overflow-x-auto">
        <div
          className={cn(
            "relative flex h-screen w-full flex-col overflow-hidden bg-bg-page",
            "md:h-[640px] md:w-[1100px] md:rounded-xl md:border md:border-[color:var(--line-1)]",
            theme === "dark" && "theme-dark",
          )}
        >
          {/* Opens the mobile drawer below `md`, always visible there
              regardless of `sidebarCollapsed` (a desktop-only concept).
              At `md` and up this row is normally hidden entirely — it only
              reappears once the static column itself is gone, to host the
              expand button. Sits in its own row above the Grid so it can
              never collide with TopBar/DashboardContent the way a floating
              absolutely-positioned button would. */}
          <div
            className={cn(
              "flex items-center gap-2 border-b border-[color:var(--line-1)] px-3 py-2 md:hidden",
              sidebarCollapsed && "md:flex",
            )}
          >
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="flex size-7 items-center justify-center rounded-md text-fg-2 hover:bg-bg-sunken hover:text-fg-1 md:hidden"
            >
              <Menu size={16} />
            </button>
            {sidebarCollapsed && (
              <button
                type="button"
                aria-label="Expand sidebar"
                onClick={() => setSidebarCollapsed(false)}
                className="hidden size-7 items-center justify-center rounded-md text-fg-2 hover:bg-bg-sunken hover:text-fg-1 md:flex"
              >
                <PanelLeft size={16} />
              </button>
            )}
            <span className="text-sm font-medium text-fg-1">
              {activeView === "dashboard" ? "Dashboard" : "Editor"}
            </span>
          </div>

          {sidebarOpen && (
            <button
              type="button"
              aria-label="Close sidebar"
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <Grid
            gap="0"
            className={cn(
              "flex-1 grid-cols-1 overflow-y-auto md:overflow-visible",
              properties
                ? sidebarCollapsed
                  ? "md:grid-cols-[1fr_260px]"
                  : "md:grid-cols-[240px_1fr_260px]"
                : sidebarCollapsed
                  ? "md:grid-cols-[1fr]"
                  : "md:grid-cols-[240px_1fr]",
            )}
          >
            <Sidebar
              activeView={activeView}
              theme={theme}
              onTheme={setTheme}
              onOpenPalette={() => setPaletteOpen(true)}
              mobileOpen={sidebarOpen}
              onMobileClose={() => setSidebarOpen(false)}
              collapsed={sidebarCollapsed}
              onToggleCollapsed={() => setSidebarCollapsed(true)}
            />
            <div className="flex min-w-0 flex-col overflow-hidden bg-bg-page">
              {children(() => setPaletteOpen(true))}
            </div>
            {properties}
          </Grid>
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        groups={groups}
        onSelect={handleSelect}
      />

      <Toast
        open={toast !== null}
        onOpenChange={(open) => !open && setToast(null)}
        variant="success"
      >
        <ToastTitle>{toast}</ToastTitle>
        <ToastDescription>Workspace example</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────

const stats = [
  { label: "Pieces published", value: "12", delta: "+2 this season" },
  { label: "Words this season", value: "24,840", delta: "6,210 to go" },
  { label: "Drafts open", value: "3", delta: "oldest · 9 days" },
  { label: "Subscribers", value: "842", delta: "+18 this week" },
];

const resumeItems = [
  { title: "On restraint", meta: "1,240 words · 2 hours ago", status: "Draft" as const },
  { title: "Notes from the studio", meta: "640 words · yesterday", status: "Draft" as const },
  { title: "The seal & the brush", meta: "2,840 words · 3 days ago", status: "In review" as const },
];

const activityItems: TimelineItemData[] = [
  { groupLabel: "Today", time: "just now", title: 'Edited "On restraint"' },
  {
    time: "11:24 am",
    title: 'Replied to a comment on "A small inventory of greens"',
  },
  { groupLabel: "Yesterday", time: "4:08 pm", title: 'Published "The seal & the brush" to Live' },
  { time: "2:51 pm", title: 'Tagged 2 pieces · "craft"' },
  { groupLabel: "May 16", time: "—", title: "Subscriber milestone · 800" },
];

const publishedPieces = [
  { kind: "Essay", title: "On restraint", meta: "1,240 words · May 12" },
  { kind: "Note", title: "Notes from the studio", meta: "640 words · May 8" },
  { kind: "Essay", title: "The seal & the brush", meta: "2,840 words · May 2" },
];

function DashboardContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <Badge variant="info" dot className="mb-2">
            3 drafts open · 1 piece in review
          </Badge>
          <h1 className="font-display text-[28px] font-medium leading-tight text-fg-1">
            Welcome back, Lin.
          </h1>
          <p className="mt-1 text-sm text-fg-2">A quiet morning. Two pieces want attention.</p>
        </div>
        <div className="flex flex-none gap-2">
          <Button variant="secondary" size="sm">
            View archive
          </Button>
          <Button variant="ink" size="sm">
            New piece
          </Button>
        </div>
      </header>

      <Grid cols={4} gap="14px" className="mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardBody>
              <div className="text-xs text-fg-3">{s.label}</div>
              <div className="mt-1 font-display text-2xl text-fg-1">{s.value}</div>
              <div className="mt-1 text-xs text-fg-3">{s.delta}</div>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Grid cols="1.45fr 1fr" gap="18px" className="mb-8">
        <Card>
          <CardHeader>
            <div className="text-xs uppercase tracking-wide text-fg-3">Continue</div>
            <h2 className="text-base font-medium text-fg-1">Where you left off</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-1">
            {resumeItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-bg-sunken"
              >
                <div className="flex-1">
                  <div className="text-sm text-fg-1">{item.title}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-fg-3">
                    <span>{item.meta}</span>
                    <Badge variant={item.status === "Draft" ? "neutral" : "warning"}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-xs uppercase tracking-wide text-fg-3">This week</div>
            <h2 className="text-base font-medium text-fg-1">Activity</h2>
          </CardHeader>
          <CardBody>
            <Timeline items={activityItems} />
          </CardBody>
        </Card>
      </Grid>

      <div>
        <div className="mb-3 text-xs uppercase tracking-wide text-fg-3">From the journal</div>
        <Grid cols={3} gap="14px">
          {publishedPieces.map((p) => (
            <Card key={p.title}>
              <div
                className="h-28 rounded-t-lg"
                style={{
                  background: "linear-gradient(135deg, var(--malachite-700), var(--ink-800))",
                }}
              />
              <CardBody>
                <div className="text-xs uppercase tracking-wide text-fg-3">{p.kind}</div>
                <div className="mt-1 text-sm font-medium text-fg-1">{p.title}</div>
                <div className="mt-1 text-xs text-fg-3">{p.meta}</div>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export const Dashboard: Story = {
  render: () => <AppShell activeView="dashboard">{() => <DashboardContent />}</AppShell>,
};

// ─── Editor ───────────────────────────────────────────────────────────────

function EditorContent({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [title, setTitle] = useState("On restraint");
  const [body, setBody] = useState(
    "There is a discipline in leaving something out. The brush lifts before the line is finished, and the white space does the rest of the talking.",
  );

  const words = body.split(/\s+/).filter(Boolean).length;

  return (
    <>
      <TopBar title={title || "Untitled"} onOpenPalette={onOpenPalette} />
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 text-xs uppercase tracking-wide text-fg-3">Essay</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="w-full border-0 bg-transparent font-display text-3xl text-fg-1 outline-none placeholder:text-fg-3"
          />
          <div className="mt-2 mb-4 flex items-center gap-2 text-xs text-fg-3">
            <span>Lin Tan</span>
            <span>·</span>
            <span>May 18</span>
            <span>·</span>
            <span>{Math.max(1, Math.round(words / 220))} min read</span>
          </div>

          <EditorToolbar />

          <TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className="mt-4 w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-relaxed text-fg-1 shadow-none focus:shadow-none focus:outline-none"
          />

          <div className="mt-4 flex border-t border-[color:var(--line-1)] pt-3 text-xs text-fg-3">
            <span>
              {words} words · {body.length} characters
            </span>
            <span className="ml-auto">Last edited just now</span>
          </div>
        </div>
      </div>
    </>
  );
}

function PropertiesPanel() {
  const [tags, setTags] = useState(["craft", "restraint"]);
  const [draft, setDraft] = useState("");

  const addTag = () => {
    if (draft.trim()) {
      setTags((t) => [...t, draft.trim()]);
      setDraft("");
    }
  };

  const historyItems: TimelineItemData[] = [
    { time: "just now", title: "Edited" },
    { time: "9:14 am", title: "Edited" },
    { time: "Yesterday", title: 'Tagged "restraint"' },
    { time: "May 8", title: "Created" },
  ];

  return (
    <aside className="flex h-full flex-col gap-6 overflow-y-auto border-t border-[color:var(--line-1)] bg-bg-card p-4 md:border-t-0 md:border-l">
      <div>
        <div className="mb-2 text-xs uppercase tracking-wide text-fg-3">Properties</div>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-fg-3">Type</span>
            <span className="text-fg-1">Essay</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg-3">Series</span>
            <span className="text-fg-1">On craft</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg-3">Length</span>
            <span className="text-fg-1">2,840 words</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-3">Status</span>
            <Badge variant="neutral">Draft</Badge>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs uppercase tracking-wide text-fg-3">Tags</div>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Tag key={t} label={t} onRemove={() => setTags((ts) => ts.filter((x) => x !== t))} />
          ))}
        </div>
        <Input
          placeholder="Add a tag…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
        />
      </div>

      <div>
        <div className="mb-2 text-xs uppercase tracking-wide text-fg-3">History</div>
        <Timeline items={historyItems} />
      </div>
    </aside>
  );
}

export const Editor: Story = {
  render: () => (
    <AppShell activeView="editor" properties={<PropertiesPanel />}>
      {(openPalette) => <EditorContent onOpenPalette={openPalette} />}
    </AppShell>
  ),
};
