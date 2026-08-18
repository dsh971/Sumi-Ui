import * as RadixDialog from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";
import { modalTransition, scrimTransition } from "../../lib/motion";
import type { CommandGroup, CommandItem, CommandPaletteProps } from "./CommandPalette.types";

function matches(item: CommandItem, query: string): boolean {
  return item.label.toLowerCase().includes(query.toLowerCase());
}

function filterGroups(groups: CommandGroup[], query: string): CommandGroup[] {
  return groups
    .map((g) => ({ ...g, items: g.items.filter((it) => matches(it, query)) }))
    .filter((g) => g.items.length > 0);
}

export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  function CommandPalette(
    {
      open,
      onOpenChange,
      groups,
      onSelect,
      placeholder = "Type a command, or search…",
      emptyMessage = "No matches",
    },
    ref,
  ) {
    const [query, setQuery] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listboxId = React.useId();

    React.useEffect(() => {
      if (open) {
        setQuery("");
        setActiveIndex(0);
      }
    }, [open]);

    const filteredGroups = React.useMemo(() => filterGroups(groups, query), [groups, query]);
    const visibleItems = React.useMemo(
      () => filteredGroups.flatMap((g) => g.items),
      [filteredGroups],
    );

    const moveActive = (dir: 1 | -1) => {
      setActiveIndex((i) =>
        visibleItems.length === 0 ? 0 : (i + dir + visibleItems.length) % visibleItems.length,
      );
    };

    const commit = (item: CommandItem) => {
      if (item.disabled) return;
      onSelect(item);
      onOpenChange(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          const item = visibleItems[activeIndex];
          if (item) commit(item);
          break;
        }
        case "Escape":
          e.preventDefault();
          onOpenChange(false);
          break;
        default:
          break;
      }
    };

    return (
      <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay
            className={cn(
              "fixed inset-0 z-50",
              "bg-[color:var(--bg-scrim)]",
              "backdrop-blur-[var(--dialog-backdrop-blur)]",
              scrimTransition,
            )}
          />
          <RadixDialog.Content
            ref={ref}
            aria-describedby={undefined}
            className={cn(
              "fixed left-1/2 top-[15%] z-50",
              "-translate-x-1/2",
              "w-[calc(100vw-2rem)] max-w-lg",
              "bg-bg-card rounded-xl",
              "border border-[color:var(--line-1)]",
              "[box-shadow:var(--shadow-lg)]",
              "overflow-hidden",
              modalTransition,
            )}
          >
            <RadixDialog.Title className="sr-only">Command palette</RadixDialog.Title>
            <div className="flex items-center gap-2 border-b border-[color:var(--line-1)] px-4 py-3">
              <Search size={16} className="flex-none text-fg-3" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder={placeholder}
                role="combobox"
                aria-expanded
                aria-controls={listboxId}
                className="min-w-0 flex-1 bg-transparent text-sm text-fg-1 placeholder:text-fg-3 focus:outline-none"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
              <kbd className="rounded-[4px] border border-[color:var(--line-2)] bg-bg-sunken px-1.5 py-0.5 font-mono text-[11px] text-fg-3">
                esc
              </kbd>
            </div>
            <div id={listboxId} role="listbox" className="max-h-80 overflow-y-auto p-2">
              {visibleItems.length === 0 ? (
                <div className="px-3 py-6 text-center text-sm text-fg-3">{emptyMessage}</div>
              ) : (
                (() => {
                  let itemIndex = -1;
                  return filteredGroups.map((group) => (
                    <div key={group.label}>
                      <div className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
                        {group.label}
                      </div>
                      {group.items.map((item) => {
                        itemIndex += 1;
                        const active = itemIndex === activeIndex;
                        return (
                          <div
                            key={item.id}
                            role="option"
                            aria-selected={active}
                            aria-disabled={item.disabled}
                            className={cn(
                              "flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 text-sm text-fg-1",
                              active && "bg-bg-sunken",
                              item.disabled && "pointer-events-none opacity-50",
                            )}
                            onMouseEnter={() => setActiveIndex(itemIndex)}
                            onClick={() => commit(item)}
                          >
                            <span>{item.label}</span>
                            {item.hint && (
                              <kbd className="rounded-[4px] border border-[color:var(--line-2)] bg-bg-sunken px-1.5 py-0.5 font-mono text-[11px] text-fg-3">
                                {item.hint}
                              </kbd>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ));
                })()
              )}
            </div>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  },
);
CommandPalette.displayName = "CommandPalette";
