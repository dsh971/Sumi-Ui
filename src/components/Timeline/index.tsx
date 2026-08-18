import { ChevronRight } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type { TimelineItemData, TimelineMarker, TimelineProps } from "./Timeline.types";

export type {
  TimelineItem,
  TimelineItemData,
  TimelineMarker,
  TimelineProps,
} from "./Timeline.types";

const dotBase = "w-[9px] h-[9px] rounded-full mt-[5px] shadow-[0_0_0_3px_var(--bg-0)] z-10";

const dotClasses: Record<Extract<TimelineMarker, `dot${string}`>, string> = {
  dot: cn(dotBase, "bg-[color:var(--ink-300)]"),
  "dot-ok": cn(dotBase, "bg-[color:var(--malachite-500)]"),
  "dot-info": cn(dotBase, "bg-[color:var(--azurite-500)]"),
  "dot-warn": cn(dotBase, "bg-[color:var(--persimmon-500)]"),
  "dot-danger": cn(dotBase, "bg-[color:var(--cinnabar-500)]"),
  "dot-pending": cn(dotBase, "bg-[color:var(--steel-500)]"),
  "dot-hollow": cn(
    "w-[7px] h-[7px] mt-[5px] rounded-full bg-[color:var(--bg-0)]",
    "border-2 border-[color:var(--ink-800)] shadow-[0_0_0_3px_var(--bg-0)] z-10",
  ),
};

const iconBase = cn(
  "w-[26px] h-[26px] rounded-full flex items-center justify-center z-10",
  "shadow-[0_0_0_3px_var(--bg-0)]",
);

const iconClasses: Record<Extract<TimelineMarker, `icon${string}`>, string> = {
  icon: cn(iconBase, "bg-[color:var(--bg-1)] border border-[color:var(--line-2)] text-fg-2"),
  "icon-ok": cn(
    iconBase,
    "bg-[color:var(--malachite-50)] border border-[color:var(--malachite-200)] text-[color:var(--malachite-700)]",
  ),
  "icon-danger": cn(
    iconBase,
    "bg-[color:var(--cinnabar-50)] border border-[color:var(--cinnabar-200)] text-[color:var(--cinnabar-600)]",
  ),
};

function isIconMarker(marker: TimelineMarker): marker is Extract<TimelineMarker, `icon${string}`> {
  return marker.startsWith("icon");
}

function Marker({
  marker,
  iconNode,
}: {
  marker: TimelineMarker;
  iconNode?: React.ReactNode;
}) {
  if (isIconMarker(marker)) {
    return (
      <span aria-hidden="true" className={iconClasses[marker]}>
        {iconNode}
      </span>
    );
  }
  return <span aria-hidden="true" className={dotClasses[marker]} />;
}

function lineStyle(isFirst: boolean, isLast: boolean): React.CSSProperties {
  if (isFirst) return { top: "9px", bottom: 0 };
  if (isLast) return { top: 0, height: "9px" };
  return { top: 0, bottom: 0 };
}

function rowGridFor(depth: number, timeGutter: boolean): string {
  return depth === 0 && timeGutter
    ? "grid grid-cols-timeline-time-marker-content"
    : "grid grid-cols-timeline-marker-content";
}

function isExpandedByDefault(depth: number, defaultCollapsedDepth: number): boolean {
  return depth < defaultCollapsedDepth;
}

function resolveExpanded(
  path: string,
  depth: number,
  defaultCollapsedDepth: number,
  overrides: Set<string>,
): boolean {
  const byDefault = isExpandedByDefault(depth, defaultCollapsedDepth);
  return overrides.has(path) ? !byDefault : byDefault;
}

function DisclosureToggle({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={expanded ? "Collapse" : "Expand"}
      className={cn(
        "flex items-center justify-center w-5 h-5 mt-[1px] shrink-0 rounded-md bg-transparent border-0 cursor-pointer",
        "text-fg-3 transition-colors hover:bg-[color:var(--bg-1)] hover:text-fg-1",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
      )}
    >
      <ChevronRight
        size={14}
        aria-hidden="true"
        className={cn("transition-transform", expanded && "rotate-90")}
      />
    </button>
  );
}

interface TimelineRowProps {
  item: TimelineItemData;
  isFirst: boolean;
  isLast: boolean;
  depth: number;
  path: string;
  timeGutter: boolean;
  defaultCollapsedDepth: number;
  selectedId?: string;
  onItemClick?: (item: TimelineItemData) => void;
  collapsedOverrides: Set<string>;
  onToggle: (path: string) => void;
}

function TimelineRow({
  item,
  isFirst,
  isLast,
  depth,
  path,
  timeGutter,
  defaultCollapsedDepth,
  selectedId,
  onItemClick,
  collapsedOverrides,
  onToggle,
}: TimelineRowProps) {
  const hasChildren = !!item.children?.length;
  const marker = item.marker ?? "dot";
  const isSelected = !!item.id && item.id === selectedId;
  const expanded = resolveExpanded(path, depth, defaultCollapsedDepth, collapsedOverrides);
  const showChildren = hasChildren && expanded;

  return (
    <React.Fragment>
      {item.groupLabel && (
        <li
          role="presentation"
          className="text-[11.5px] font-semibold text-fg-2 uppercase tracking-[0.08em] mb-[14px]"
        >
          {item.groupLabel}
        </li>
      )}
      <li className={rowGridFor(depth, timeGutter)}>
        {depth === 0 && timeGutter && (
          <div className="font-mono text-[11px] text-fg-3 text-end pe-3 pt-[2px] whitespace-nowrap">
            {item.time}
          </div>
        )}
        <div className="relative flex flex-col items-center">
          <span
            aria-hidden="true"
            className="absolute w-[2px] bg-[color:var(--line-2)]"
            style={lineStyle(isFirst, isLast)}
          />
          <Marker marker={marker} iconNode={item.iconNode} />
        </div>
        <div className={cn("ps-[14px]", isLast && !showChildren ? "pb-0" : "pb-5")}>
          <div className="flex items-start gap-1">
            {hasChildren && (
              <DisclosureToggle expanded={expanded} onToggle={() => onToggle(path)} />
            )}
            <button
              type="button"
              onClick={() => onItemClick?.(item)}
              aria-current={isSelected ? "true" : undefined}
              className={cn(
                "block w-full text-left bg-transparent border-0 p-1 -m-1 rounded-md cursor-pointer",
                "transition-colors hover:bg-[color:var(--bg-1)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
                isSelected && "bg-[color:var(--bg-1)]",
              )}
            >
              <div className="text-[13.5px] text-fg-1 leading-[1.45]">
                {item.avatar && (
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 rounded-full inline-flex items-center justify-center font-semibold text-[10px] text-[color:var(--silk-50)] align-middle me-1.5"
                    style={{ background: item.avatar.color }}
                  >
                    {item.avatar.initials}
                  </span>
                )}
                {item.title}
              </div>
              {item.description && (
                <div className="text-[12.5px] text-fg-3 leading-[1.5] mt-[2px]">
                  {item.description}
                </div>
              )}
            </button>
          </div>
          {showChildren && (
            <ul className="relative list-none p-0 m-0 ps-[var(--space-4)] mt-2">
              <TimelineRows
                items={item.children as TimelineItemData[]}
                depth={depth + 1}
                path={path}
                timeGutter={timeGutter}
                defaultCollapsedDepth={defaultCollapsedDepth}
                selectedId={selectedId}
                onItemClick={onItemClick}
                collapsedOverrides={collapsedOverrides}
                onToggle={onToggle}
              />
            </ul>
          )}
        </div>
      </li>
    </React.Fragment>
  );
}

interface TimelineRowsProps {
  items: TimelineItemData[];
  depth: number;
  path: string;
  timeGutter: boolean;
  defaultCollapsedDepth: number;
  selectedId?: string;
  onItemClick?: (item: TimelineItemData) => void;
  collapsedOverrides: Set<string>;
  onToggle: (path: string) => void;
}

function TimelineRows({ items, depth, path, ...rowProps }: TimelineRowsProps) {
  return (
    <>
      {items.map((item, index) => {
        const childPath = `${path}${path ? "." : ""}${item.id ?? index}`;
        return (
          <TimelineRow
            key={item.id ?? index}
            item={item}
            isFirst={index === 0}
            isLast={index === items.length - 1}
            depth={depth}
            path={childPath}
            {...rowProps}
          />
        );
      })}
    </>
  );
}

export const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  (
    {
      items,
      timeGutter = true,
      selectedId,
      onItemClick,
      defaultCollapsedDepth = 3,
      className,
      ...props
    },
    ref,
  ) => {
    const [collapsedOverrides, setCollapsedOverrides] = React.useState<Set<string>>(
      () => new Set(),
    );

    const onToggle = React.useCallback((path: string) => {
      setCollapsedOverrides((prev) => {
        const next = new Set(prev);
        if (next.has(path)) {
          next.delete(path);
        } else {
          next.add(path);
        }
        return next;
      });
    }, []);

    return (
      <ul ref={ref} className={cn("relative list-none p-0 m-0", className)} {...props}>
        <TimelineRows
          items={items}
          depth={0}
          path=""
          timeGutter={timeGutter}
          defaultCollapsedDepth={defaultCollapsedDepth}
          selectedId={selectedId}
          onItemClick={onItemClick}
          collapsedOverrides={collapsedOverrides}
          onToggle={onToggle}
        />
      </ul>
    );
  },
);

Timeline.displayName = "Timeline";
