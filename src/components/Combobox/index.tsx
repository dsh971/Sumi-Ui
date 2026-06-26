import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, Search, X } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import type { ComboboxGroup, ComboboxOption, ComboboxProps } from "./Combobox.types";

const labelClasses = "block text-xs font-medium text-fg-2 mb-1.5";

function isGroups(options: ComboboxOption[] | ComboboxGroup[]): options is ComboboxGroup[] {
  const first = options[0];
  return first !== undefined && "options" in first;
}

function flatten(options: ComboboxOption[] | ComboboxGroup[]): ComboboxOption[] {
  return isGroups(options) ? options.flatMap((g) => g.options) : options;
}

function matches(option: ComboboxOption, query: string): boolean {
  return option.label.toLowerCase().includes(query.toLowerCase());
}

function filterGroups(options: ComboboxOption[] | ComboboxGroup[], query: string): ComboboxGroup[] {
  if (!isGroups(options)) {
    return [{ label: "", options: options.filter((o) => matches(o, query)) }];
  }
  return options
    .map((g) => ({ ...g, options: g.options.filter((o) => matches(o, query)) }))
    .filter((g) => g.options.length > 0);
}

function HighlightedLabel({ label, query }: { label: string; query: string }) {
  if (!query) return <span>{label}</span>;
  const idx = label.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{label}</span>;
  return (
    <span>
      {label.slice(0, idx)}
      <b className="font-semibold text-fg-1">{label.slice(idx, idx + query.length)}</b>
      {label.slice(idx + query.length)}
    </span>
  );
}

function AvatarBadge({ avatar }: { avatar: NonNullable<ComboboxOption["avatar"]> }) {
  return (
    <span
      className="flex size-[22px] flex-none items-center justify-center rounded-full text-[10.5px] font-semibold text-[color:var(--silk-50)]"
      style={{ background: avatar.color }}
      aria-hidden="true"
    >
      {avatar.initials}
    </span>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface MultiTriggerProps {
  selectedValues: string[];
  allOptions: ComboboxOption[];
  query: string;
  disabled: boolean;
  open: boolean;
  placeholder: string;
  labelId: string | undefined;
  listboxId: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQueryChange: (q: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveChip: (value: string) => void;
}

function MultiTrigger({
  selectedValues,
  allOptions,
  query,
  disabled,
  open,
  placeholder,
  labelId,
  listboxId,
  inputRef,
  onQueryChange,
  onKeyDown,
  onRemoveChip,
}: MultiTriggerProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[5px]">
      {selectedValues.map((value) => {
        const opt = allOptions.find((o) => o.value === value);
        return (
          <span
            key={value}
            className="inline-flex items-center gap-[5px] rounded-[6px] border border-[color:var(--line-1)] bg-[color:var(--bg-2)] py-[3px] pl-[8px] pr-[5px] text-[12.5px] text-fg-1"
          >
            {opt?.label ?? value}
            <button
              type="button"
              aria-label={`Remove ${opt?.label ?? value}`}
              className="flex rounded-[3px] p-[1px] text-fg-3 hover:bg-[color:var(--line-1)] hover:text-fg-1"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveChip(value);
              }}
            >
              <X size={11} aria-hidden="true" />
            </button>
          </span>
        );
      })}
      <input
        ref={inputRef}
        type="text"
        value={query}
        disabled={disabled}
        {...(labelId ? { "aria-labelledby": labelId } : { "aria-label": placeholder })}
        aria-expanded={open}
        role="combobox"
        aria-controls={listboxId}
        placeholder={selectedValues.length === 0 ? placeholder : ""}
        className="min-w-[60px] flex-1 bg-transparent text-fg-1 placeholder:text-fg-3 focus:outline-none"
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

interface SingleTriggerProps {
  selectedSingle: ComboboxOption | undefined;
  query: string;
  disabled: boolean;
  open: boolean;
  placeholder: string;
  labelId: string | undefined;
  listboxId: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQueryChange: (q: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SingleTrigger({
  selectedSingle,
  query,
  disabled,
  open,
  placeholder,
  labelId,
  listboxId,
  inputRef,
  onQueryChange,
  onKeyDown,
}: SingleTriggerProps) {
  return (
    <>
      {selectedSingle?.avatar ? (
        <AvatarBadge avatar={selectedSingle.avatar} />
      ) : (
        <Search size={16} className="flex-none text-fg-3" aria-hidden="true" />
      )}
      <input
        ref={inputRef}
        type="text"
        value={query}
        disabled={disabled}
        {...(labelId ? { "aria-labelledby": labelId } : { "aria-label": placeholder })}
        aria-expanded={open}
        role="combobox"
        aria-controls={listboxId}
        placeholder={selectedSingle ? selectedSingle.label : placeholder}
        className={cn(
          "min-w-0 flex-1 bg-transparent focus:outline-none",
          selectedSingle && !query
            ? "text-fg-1 placeholder:text-fg-1"
            : "text-fg-1 placeholder:text-fg-3",
        )}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </>
  );
}

interface OptionListProps {
  groups: ComboboxGroup[];
  visibleOptions: ComboboxOption[];
  loading: boolean;
  query: string;
  activeIndex: number;
  listboxId: string;
  isSelected: (value: string) => boolean;
  onHover: (index: number) => void;
  onCommit: (option: ComboboxOption) => void;
}

function OptionList({
  groups,
  visibleOptions,
  loading,
  query,
  activeIndex,
  listboxId,
  isSelected,
  onHover,
  onCommit,
}: OptionListProps) {
  let optionIndex = -1;
  return (
    <div id={listboxId} role="listbox">
      {loading ? (
        <div className="px-3 py-[18px] text-center text-sm text-fg-3">
          <span
            className="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-[color:var(--line-2)] border-t-[color:var(--accent)] align-[-3px]"
            aria-hidden="true"
          />
          Searching…
        </div>
      ) : visibleOptions.length === 0 ? (
        <div className="px-3 py-[18px] text-center text-sm text-fg-3">
          No matches for &quot;{query}&quot;.
        </div>
      ) : (
        groups.map((group, gi) => (
          <div key={group.label || `group-${gi}`}>
            {group.label && (
              <div className="px-[9px] pb-1 pt-[7px] font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
                {group.label}
              </div>
            )}
            {group.options.map((option) => {
              optionIndex += 1;
              const itemIndex = optionIndex;
              const active = itemIndex === activeIndex;
              const selected = isSelected(option.value);
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "flex cursor-pointer items-center gap-[10px] rounded-md px-[9px] py-2 text-sm text-fg-1",
                    active && "bg-[color:var(--bg-2)]",
                    selected && "text-[color:var(--accent)]",
                  )}
                  onMouseEnter={() => onHover(itemIndex)}
                  onClick={() => onCommit(option)}
                >
                  {option.avatar && <AvatarBadge avatar={option.avatar} />}
                  <span>
                    <HighlightedLabel label={option.label} query={query} />
                    {option.subLabel && (
                      <span className="ml-1 text-xs text-fg-3">{option.subLabel}</span>
                    )}
                  </span>
                  {selected && (
                    <Check
                      size={15}
                      className="ml-auto flex-none text-[color:var(--accent)]"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  function Combobox(props, ref) {
    const {
      options,
      placeholder = "Search…",
      label,
      loading = false,
      disabled = false,
      className,
    } = props;
    const multiple = props.multiple === true;

    const [query, setQuery] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listboxId = React.useId();

    const allOptions = React.useMemo(() => flatten(options), [options]);
    const groups = React.useMemo(() => filterGroups(options, query), [options, query]);
    const visibleOptions = React.useMemo(() => groups.flatMap((g) => g.options), [groups]);

    const labelId = label ? `${listboxId}-label` : undefined;

    const selectedValues: string[] = multiple
      ? ((props.value as string[] | undefined) ?? [])
      : props.value
        ? [props.value as string]
        : [];

    const selectedSingle = !multiple
      ? allOptions.find((o) => o.value === (props.value as string | undefined))
      : undefined;

    const isSelected = (value: string) => selectedValues.includes(value);

    const commit = (option: ComboboxOption) => {
      if (multiple) {
        const next = isSelected(option.value)
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];
        props.onValueChange?.(next);
        setQuery("");
        inputRef.current?.focus();
      } else {
        (props.onValueChange as ((v: string) => void) | undefined)?.(option.value);
        setQuery("");
        setOpen(false);
      }
    };

    const removeChip = (value: string) => {
      if (!multiple) return;
      props.onValueChange?.(selectedValues.filter((v) => v !== value));
      inputRef.current?.focus();
    };

    const clearSingle = () => {
      (props.onValueChange as ((v: string) => void) | undefined)?.("");
    };

    const handleQueryChange = (next: string) => {
      setQuery(next);
      setActiveIndex(0);
      setOpen(true);
    };

    const moveActive = (dir: 1 | -1) => {
      if (!open) setOpen(true);
      setActiveIndex((i) =>
        visibleOptions.length === 0 ? 0 : (i + dir + visibleOptions.length) % visibleOptions.length,
      );
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          moveActive(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          moveActive(-1);
          break;
        case "Enter": {
          e.preventDefault();
          const option = visibleOptions[activeIndex];
          if (option) commit(option);
          break;
        }
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
        case "Backspace": {
          const last = selectedValues[selectedValues.length - 1];
          if (query === "" && multiple && last !== undefined) removeChip(last);
          break;
        }
        default:
          break;
      }
    };

    const showClear = !multiple && Boolean(selectedSingle);

    return (
      <div ref={ref} className={cn("relative w-full", className)}>
        {label && (
          <span id={labelId} className={labelClasses}>
            {label}
          </span>
        )}
        <Popover.Root open={open && !disabled} onOpenChange={setOpen}>
          <Popover.Anchor asChild>
            <div
              className={cn(
                "flex w-full items-center gap-2",
                "bg-[color:var(--bg-0)] border border-[color:var(--line-2)] rounded-md",
                "px-3 py-[9px] text-sm text-fg-1 transition-colors",
                open && "border-[color:var(--accent)] shadow-[0_0_0_3px_var(--accent-soft)]",
                disabled && "opacity-50 cursor-not-allowed",
              )}
              onClick={() => {
                if (!disabled) {
                  setOpen(true);
                  inputRef.current?.focus();
                }
              }}
            >
              {multiple ? (
                <MultiTrigger
                  selectedValues={selectedValues}
                  allOptions={allOptions}
                  query={query}
                  disabled={disabled}
                  open={open}
                  placeholder={placeholder}
                  labelId={labelId}
                  listboxId={listboxId}
                  inputRef={inputRef}
                  onQueryChange={handleQueryChange}
                  onKeyDown={handleKeyDown}
                  onRemoveChip={removeChip}
                />
              ) : (
                <SingleTrigger
                  selectedSingle={selectedSingle}
                  query={query}
                  disabled={disabled}
                  open={open}
                  placeholder={placeholder}
                  labelId={labelId}
                  listboxId={listboxId}
                  inputRef={inputRef}
                  onQueryChange={handleQueryChange}
                  onKeyDown={handleKeyDown}
                />
              )}
              {showClear && (
                <button
                  type="button"
                  aria-label="Clear selection"
                  className="flex flex-none text-fg-3 hover:text-fg-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSingle();
                  }}
                >
                  <X size={15} aria-hidden="true" />
                </button>
              )}
              <ChevronDown size={15} className="flex-none text-fg-3" aria-hidden="true" />
            </div>
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={6}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cn(
                "z-50 w-[var(--radix-popover-anchor-width)]",
                "bg-[color:var(--bg-1)] border border-[color:var(--line-1)] rounded-lg",
                "[box-shadow:var(--shadow-lg)] p-[5px]",
              )}
            >
              <OptionList
                groups={groups}
                visibleOptions={visibleOptions}
                loading={loading}
                query={query}
                activeIndex={activeIndex}
                listboxId={listboxId}
                isSelected={isSelected}
                onHover={setActiveIndex}
                onCommit={commit}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  },
);
Combobox.displayName = "Combobox";
