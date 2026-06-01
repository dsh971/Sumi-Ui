import type * as RadixRadio from "@radix-ui/react-radio-group";
import type React from "react";

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadixRadio.Root>;

export interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadixRadio.Item> {
  label?: string;
}
