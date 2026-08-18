import type * as RadixRadio from "@radix-ui/react-radio-group";
import type React from "react";

export type SegmentedControlProps = React.ComponentPropsWithoutRef<typeof RadixRadio.Root>;

export interface SegmentedControlItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadio.Item> {
  label: string;
}
