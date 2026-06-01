import type * as RadixSelect from "@radix-ui/react-select";
import type React from "react";

export interface SelectProps extends RadixSelect.SelectProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  placeholder?: string;
  id?: string;
  /** Applied to the trigger button */
  triggerClassName?: string;
}

export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>;
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Content>;
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Item>;
export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Group>;
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Label>;
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>;
