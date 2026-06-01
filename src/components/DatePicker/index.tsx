import * as Popover from "@radix-ui/react-popover";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import type { DatePickerProps } from "./DatePicker.types";

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

function formatDisplay(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(isoToDate(iso));
}

function formatMonthYear(year: number, month: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
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

// BUG-006 fix: plain sentence-case label
const labelClasses = "block text-xs font-medium text-fg-2 mb-1.5";
const helperClasses = "mt-1 text-xs text-fg-3";
const errorClasses = "mt-1 text-xs text-[color:var(--status-danger)]";

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
  },
  _ref,
) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(
    value ? isoToDate(value).getFullYear() : today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    value ? isoToDate(value).getMonth() : today.getMonth(),
  );

  const triggerId =
    id ?? (label ? `datepicker-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const hasError = Boolean(errorText);
  const grid = useMemo(() => buildGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const prevMonth = useCallback(() => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [viewMonth]);

  const selectDay = useCallback(
    (date: Date) => {
      const iso = dateToIso(date);
      onChange?.(iso);
      setOpen(false);
    },
    [onChange],
  );

  const isDisabledDay = useCallback(
    (date: Date): boolean => {
      const iso = dateToIso(date);
      if (min && iso < min) return true;
      if (max && iso > max) return true;
      return false;
    },
    [min, max],
  );

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={triggerId} className={labelClasses}>
          {label}
        </label>
      )}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
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
              "bg-bg-card text-fg-1",
              "border border-[color:var(--line-2)] rounded-md",
              "px-3 py-2 text-sm",
              "transition-colors",
              "focus:outline-none focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              !value && "text-fg-3",
            )}
          >
            <span>{value ? formatDisplay(value) : placeholder}</span>
            <CalendarDays size={14} className="text-fg-3 flex-shrink-0 ml-2" aria-hidden="true" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={4}
            align="start"
            role="dialog"
            aria-label="Date picker"
            className={cn(
              "z-50 p-3 w-[280px]",
              "bg-bg-card rounded-lg",
              "border border-[color:var(--line-1)]",
              "[box-shadow:var(--shadow-md)]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2",
            )}
          >
            {/* Month navigation header */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                className={cn(
                  "flex items-center justify-center size-7 rounded-md",
                  "text-fg-2 hover:bg-bg-sunken hover:text-fg-1",
                  "transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
                )}
              >
                <ChevronLeft size={14} aria-hidden="true" />
              </button>
              <span className="text-sm font-medium text-fg-1">
                {formatMonthYear(viewYear, viewMonth)}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className={cn(
                  "flex items-center justify-center size-7 rounded-md",
                  "text-fg-2 hover:bg-bg-sunken hover:text-fg-1",
                  "transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
                )}
              >
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Calendar grid — native table for proper grid semantics */}
            <table
              aria-label={formatMonthYear(viewYear, viewMonth)}
              className="w-full border-collapse"
            >
              <thead>
                <tr>
                  {DAY_LABELS.map((d) => (
                    <th
                      key={d}
                      scope="col"
                      aria-label={d}
                      className="text-xs font-medium text-fg-3 h-7 text-center"
                    >
                      {d}
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
                        const isSelected = value === iso;
                        const isToday = dateToIso(today) === iso;
                        const dayDisabled = isDisabledDay(date);

                        return (
                          <td key={cellKey} className="p-0">
                            <button
                              type="button"
                              onClick={() => !dayDisabled && selectDay(date)}
                              disabled={dayDisabled}
                              aria-selected={isSelected}
                              aria-label={new Intl.DateTimeFormat("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                              }).format(date)}
                              className={cn(
                                "flex items-center justify-center size-8 rounded-md text-sm w-full",
                                "transition-colors",
                                "focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
                                "disabled:opacity-40 disabled:cursor-not-allowed",
                                isSelected
                                  ? "bg-accent text-[color:var(--fg-on-malachite)] font-medium"
                                  : isToday
                                    ? "border border-[color:var(--accent)] text-fg-1"
                                    : "text-fg-1 hover:bg-bg-sunken",
                              )}
                            >
                              {date.getDate()}
                            </button>
                          </td>
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
