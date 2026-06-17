import React from "react";
import { cn } from "../../lib/cn";
import type { TimelineMarker, TimelineProps } from "./Timeline.types";

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

export const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  ({ items, timeGutter = true, className, ...props }, ref) => {
    const rowGrid = timeGutter ? "grid grid-cols-[64px_24px_1fr]" : "grid grid-cols-[24px_1fr]";

    return (
      <ul ref={ref} className={cn("relative list-none p-0 m-0", className)} {...props}>
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          const marker = item.marker ?? "dot";
          const key = item.id ?? index;

          return (
            <React.Fragment key={key}>
              {item.groupLabel && (
                <li
                  role="presentation"
                  className="text-[11.5px] font-semibold text-fg-2 uppercase tracking-[0.08em] mb-[14px]"
                >
                  {item.groupLabel}
                </li>
              )}
              <li className={rowGrid}>
                {timeGutter && (
                  <div className="font-mono text-[11px] text-fg-3 text-right pr-3 pt-[2px] whitespace-nowrap">
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
                <div className={cn("pl-[14px]", isLast ? "pb-0" : "pb-5")}>
                  <div className="text-[13.5px] text-fg-1 leading-[1.45]">
                    {item.avatar && (
                      <span
                        aria-hidden="true"
                        className="w-6 h-6 rounded-full inline-flex items-center justify-center font-semibold text-[10px] text-[color:var(--silk-50)] align-middle mr-1.5"
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
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    );
  },
);

Timeline.displayName = "Timeline";
