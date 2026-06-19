export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroup[];
  onSelect: (item: CommandItem) => void;
  placeholder?: string;
  emptyMessage?: string;
}
