import * as Popover from "@radix-ui/react-popover";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { popperTransition } from "../../lib/motion";
import type { DatePickerProps } from "./DatePicker.types";

function isoToDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 0, (m ?? 1) - 1, d ?? 1);
}

function dateToIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Same day-of-month `months` away, clamped to the target month's length. */
function addMonths(date: Date, months: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const daysInTarget = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(date.getDate(), daysInTarget));
  return target;
}

function formatDisplay(iso: string, locale: string | undefined): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(isoToDate(iso));
}

function formatMonthYear(year: number, month: number, locale: string | undefined): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
}

/** Sunday-first weekday names from Intl (4 Jan 1970 was a Sunday). */
function weekdayLabels(locale: string | undefined): { short: string; long: string }[] {
  const short = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const long = new Intl.DateTimeFormat(locale, { weekday: "long" });
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(1970, 0, 4 + i);
    return { short: short.format(day), long: long.format(day) };
  });
}

type GridCell = { date: Date; key: string } | { date: null; key: string };

function buildGrid(year: number, month: number): GridCell[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: GridCell[] = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push({ date: null, key: `${year}-${month}-lead-${i}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, key: dateToIso(date) });
  }
  let trail = 0;
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, key: `${year}-${month}-trail-${trail++}` });
  }
  return cells;
}

/**
 * Grid keyboard map per the WAI-ARIA date picker dialog pattern: arrows move by
 * day/week, Home/End to the week's edges, PageUp/PageDown by month (with Shift,
 * by year). Enter/Space are left to the day button's native click.
 */
const DAY_KEYS: Record<string, (date: Date, shift: boolean) => Date> = {
  ArrowLeft: (d) => addDays(d, -1),
  ArrowRight: (d) => addDays(d, 1),
  ArrowUp: (d) => addDays(d, -7),
  ArrowDown: (d) => addDays(d, 7),
  Home: (d) => addDays(d, -d.getDay()),
  End: (d) => addDays(d, 6 - d.getDay()),
  PageUp: (d, shift) => addMonths(d, shift ? -12 : -1),
  PageDown: (d, shift) => addMonths(d, shift ? 12 : 1),
};

// BUG-006 fix: plain sentence-case label
const labelClasses = "block text-xs font-medium text-fg-2 mb-1.5";
const helperClasses = "mt-1 mb-0 text-xs text-fg-3";
const errorClasses = "mt-1 mb-0 text-xs text-[color:var(--status-danger)]";

const monthNavClasses = cn(
  "flex items-center justify-center size-7 rounded-md",
  "text-fg-2 hover:bg-bg-sunken hover:text-fg-1",
  "transition-colors",
  "focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
);

interface DayCellProps {
  date: Date;
  iso: string;
  label: string;
  selected: boolean;
  today: boolean;
  unavailable: boolean;
  tabStop: boolean;
  onSelect: (iso: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>, date: Date) => void;
  onFocusDay: (iso: string) => void;
}

function DayCell({
  date,
  iso,
  label,
  selected,
  today,
  unavailable,
  tabStop,
  onSelect,
  onKeyDown,
  onFocusDay,
}: DayCellProps) {
  return (
    <td className="p-0" aria-selected={selected}>
      <button
        type="button"
        data-iso={iso}
        tabIndex={tabStop ? 0 : -1}
        onClick={() => onSelect(iso)}
        onKeyDown={(e) => onKeyDown(e, date)}
        onFocus={() => onFocusDay(iso)}
        // aria-disabled, not disabled: out-of-range days stay reachable by the
        // arrow keys but can't be chosen.
        aria-disabled={unavailable || undefined}
        aria-current={today ? "date" : undefined}
        aria-label={label}
        className={cn(
          "flex items-center justify-center size-8 rounded-md text-sm w-full",
          "transition-colors",
          "focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
          "aria-disabled:opacity-40 aria-disabled:cursor-not-allowed",
          selected
            ? "bg-accent text-[color:var(--fg-on-malachite)] font-medium"
            : today
              ? "border border-[color:var(--accent)] text-fg-1"
              : "text-fg-1 hover:bg-bg-sunken",
        )}
      >
        {date.getDate()}
      </button>
    </td>
  );
}

// C-4 fix: forwardRef so form libraries can attach ref to the trigger button
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    value,
    onChange,
    placeholder = "Pick a date",
    disabled = false,
    id,
    label,
    helperText,
    errorText,
    min,
    max,
    locale,
  },
  ref,
) {
  const todayIso = dateToIso(new Date());
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => isoToDate(value ?? todayIso).getFullYear());
  const [viewMonth, setViewMonth] = useState(() => isoToDate(value ?? todayIso).getMonth());
  // The day that holds the grid's single tab stop (roving tabindex).
  const [focusedIso, setFocusedIso] = useState(value ?? todayIso);
  const gridRef = useRef<HTMLTableElement>(null);
  // Set when a key press moves focus, so the effect below follows it after render.
  const focusPending = useRef(false);

  // useId, not a label slug: two fields with the same label (or none) must
  // still get unique ids for label/aria-describedby wiring.
  const autoId = React.useId();
  const triggerId = id ?? `datepicker-${autoId}`;
  const hasError = Boolean(errorText);
  const grid = useMemo(() => buildGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const weekdays = useMemo(() => weekdayLabels(locale), [locale]);
  const dayLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric" }),
    [locale],
  );

  const showMonthOf = useCallback((date: Date) => {
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  }, []);

  // Opening always shows the current value's month (or today's), even if the
  // value changed from outside while the picker was closed.
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next) {
        const anchor = value ?? todayIso;
        showMonthOf(isoToDate(anchor));
        setFocusedIso(anchor);
      }
      setOpen(next);
    },
    [value, todayIso, showMonthOf],
  );

  const prevMonth = useCallback(
    () => showMonthOf(new Date(viewYear, viewMonth - 1, 1)),
    [viewYear, viewMonth, showMonthOf],
  );
  const nextMonth = useCallback(
    () => showMonthOf(new Date(viewYear, viewMonth + 1, 1)),
    [viewYear, viewMonth, showMonthOf],
  );

  const isDisabledDay = useCallback(
    (iso: string): boolean => Boolean((min && iso < min) || (max && iso > max)),
    [min, max],
  );

  const selectDay = useCallback(
    (iso: string) => {
      if (isDisabledDay(iso)) return;
      onChange?.(iso);
      setOpen(false);
    },
    [onChange, isDisabledDay],
  );

  const focusDay = useCallback((iso: string) => {
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-iso="${iso}"]`)?.focus();
  }, []);

  const handleDayKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, date: Date) => {
    const move = DAY_KEYS[e.key];
    if (!move) return;
    e.preventDefault();
    const next = move(date, e.shiftKey);
    focusPending.current = true;
    setFocusedIso(dateToIso(next));
    if (next.getMonth() !== viewMonth || next.getFullYear() !== viewYear) showMonthOf(next);
  };

  useEffect(() => {
    if (open && focusPending.current) {
      focusPending.current = false;
      focusDay(focusedIso);
    }
  }, [open, focusedIso, focusDay]);

  // When the month buttons move the view away from the focused day, the first
  // of the shown month carries the tab stop so the grid stays reachable.
  const tabStopIso = grid.some((c) => c.key === focusedIso)
    ? focusedIso
    : dateToIso(new Date(viewYear, viewMonth, 1));

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={triggerId} className={labelClasses}>
          {label}
        </label>
      )}
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <button
            ref={ref}
            id={triggerId}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-invalid={hasError || undefined}
            aria-describedby={
              errorText ? `${triggerId}-error` : helperText ? `${triggerId}-helper` : undefined
            }
            className={cn(
              "flex w-full items-center justify-between",
              "bg-bg-page text-fg-1",
              "border border-[color:var(--line-2)] rounded-md",
              "px-3 py-2 text-sm",
              "transition-colors",
              "focus:outline-none focus-visible:border-[color:var(--accent)] focus-visible:ring-1 focus-visible:ring-[color:var(--accent)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              !value && "text-fg-3",
            )}
          >
            <span>{value ? formatDisplay(value, locale) : placeholder}</span>
            <CalendarDays size={14} className="text-fg-3 flex-shrink-0 ms-2" aria-hidden="true" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={4}
            align="start"
            role="dialog"
            aria-label="Date picker"
            // Land on the selected day (or today), not the first focusable button.
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              focusDay(focusedIso);
            }}
            className={cn(
              "z-50 p-3 w-[280px]",
              "bg-bg-card rounded-lg",
              "border border-[color:var(--line-1)]",
              "[box-shadow:var(--shadow-md)]",
              "origin-[--radix-popover-content-transform-origin]",
              popperTransition,
            )}
          >
            {/* Month navigation header */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                className={monthNavClasses}
              >
                <ChevronLeft size={14} aria-hidden="true" />
              </button>
              <span aria-live="polite" className="text-sm font-medium text-fg-1">
                {formatMonthYear(viewYear, viewMonth, locale)}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className={monthNavClasses}
              >
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Calendar grid — a table with grid semantics; one day holds the tab stop */}
            <table
              ref={gridRef}
              role="grid"
              aria-label={formatMonthYear(viewYear, viewMonth, locale)}
              // table-fixed: seven equal columns whatever the locale's weekday names.
              className="w-full table-fixed border-collapse"
            >
              <thead>
                <tr>
                  {weekdays.map((d) => (
                    <th
                      key={d.long}
                      scope="col"
                      abbr={d.long}
                      className="text-xs font-medium text-fg-3 h-7 text-center"
                    >
                      {d.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: grid.length / 7 }, (_, week) => {
                  const weekCells = grid.slice(week * 7, week * 7 + 7);
                  const firstCell = weekCells.find((c) => c.date !== null);
                  const rowKey = firstCell?.key ?? `trail-${viewYear}-${viewMonth}-${week}`;
                  return (
                    <tr key={rowKey}>
                      {weekCells.map(({ date, key: cellKey }) => {
                        if (!date) {
                          return <td key={cellKey} aria-hidden="true" />;
                        }
                        const iso = cellKey; // cellKey IS the ISO string for date cells
                        return (
                          <DayCell
                            key={cellKey}
                            date={date}
                            iso={iso}
                            label={dayLabel.format(date)}
                            selected={value === iso}
                            today={todayIso === iso}
                            unavailable={isDisabledDay(iso)}
                            tabStop={iso === tabStopIso}
                            onSelect={selectDay}
                            onKeyDown={handleDayKeyDown}
                            onFocusDay={setFocusedIso}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {errorText && (
        <p id={`${triggerId}-error`} role="alert" className={errorClasses}>
          {errorText}
        </p>
      )}
      {!errorText && helperText && (
        <p id={`${triggerId}-helper`} className={helperClasses}>
          {helperText}
        </p>
      )}
    </div>
  );
});
DatePicker.displayName = "DatePicker";
