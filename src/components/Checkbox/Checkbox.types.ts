import type * as RadixCheckbox from "@radix-ui/react-checkbox";
import type React from "react";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
  helperText?: string;
  errorText?: string;
}
