import type * as RadixSwitch from "@radix-ui/react-switch";
import type React from "react";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: string;
  helperText?: string;
  /** M-4 fix: error state for form validation (matches Input/Checkbox API) */
  errorText?: string;
}
