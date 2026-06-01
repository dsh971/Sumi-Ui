import type * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import type React from "react";

export type DropdownMenuProps = RadixDropdown.DropdownMenuProps;
export type DropdownMenuTriggerProps = RadixDropdown.DropdownMenuTriggerProps;

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof RadixDropdown.Content>;
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof RadixDropdown.Item>;
export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdown.Separator
>;
export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof RadixDropdown.Label>;
export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdown.CheckboxItem
>;
export type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdown.RadioGroup
>;
export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdown.RadioItem
>;
export type DropdownMenuSubProps = RadixDropdown.DropdownMenuSubProps;
export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdown.SubTrigger
>;
export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdown.SubContent
>;
