export interface ComboboxOption {
  value: string;
  label: string;
  avatar?: { initials: string; color: string };
  subLabel?: string;
}

export interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}

interface ComboboxBaseProps {
  options: ComboboxOption[] | ComboboxGroup[];
  placeholder?: string;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface ComboboxMultiProps extends ComboboxBaseProps {
  multiple: true;
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps;
