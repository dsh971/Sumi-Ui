"use client";

import type { ComponentType } from "react";
import AlertVariants, { code as alertVariantsCode } from "./alert/variants";
import AvatarVariants, { code as avatarVariantsCode } from "./avatar/variants";
import BadgeVariants, { code as badgeVariantsCode } from "./badge/variants";
import BreadcrumbVariants, { code as breadcrumbVariantsCode } from "./breadcrumb/variants";
import ButtonVariants, { code as buttonVariantsCode } from "./button/variants";
import CardBasic, { code as cardBasicCode } from "./card/basic";
import CheckboxVariants, { code as checkboxVariantsCode } from "./checkbox/variants";
import ComboboxVariants, { code as comboboxVariantsCode } from "./combobox/variants";
import CommandPaletteVariants, {
  code as commandPaletteVariantsCode,
} from "./command-palette/variants";
import ContainerVariants, { code as containerVariantsCode } from "./container/variants";
import DatePickerVariants, { code as datePickerVariantsCode } from "./date-picker/variants";
import DialogVariants, { code as dialogVariantsCode } from "./dialog/variants";
import DropdownMenuVariants, { code as dropdownMenuVariantsCode } from "./dropdown-menu/variants";
import EmptyStateVariants, { code as emptyStateVariantsCode } from "./empty-state/variants";
import FileUploadVariants, { code as fileUploadVariantsCode } from "./file-upload/variants";
import GridVariants, { code as gridVariantsCode } from "./grid/variants";
import InputVariants, { code as inputVariantsCode } from "./input/variants";
import LogoVariants, { code as logoVariantsCode } from "./logo/variants";
import PaginationVariants, { code as paginationVariantsCode } from "./pagination/variants";
import RadioVariants, { code as radioVariantsCode } from "./radio/variants";
import SealVariants, { code as sealVariantsCode } from "./seal/variants";
import SelectBasic, { code as selectBasicCode } from "./select/basic";
import SkeletonVariants, { code as skeletonVariantsCode } from "./skeleton/variants";
import StepperVariants, { code as stepperVariantsCode } from "./stepper/variants";
import SwitchVariants, { code as switchVariantsCode } from "./switch/variants";
import TableVariants, { code as tableVariantsCode } from "./table/variants";
import TabsVariants, { code as tabsVariantsCode } from "./tabs/variants";
import TimelineVariants, { code as timelineVariantsCode } from "./timeline/variants";
import ToastVariants, { code as toastVariantsCode } from "./toast/variants";
import TooltipVariants, { code as tooltipVariantsCode } from "./tooltip/variants";

// Static registry, not a dynamic `import(`./${name}`)` — Next's static
// export needs every module reachable through ordinary, analyzable
// imports, not an arbitrary runtime path. One line per demo to register it.
export const demoRegistry: Record<string, { Component: ComponentType; code: string }> = {
  "alert/variants": { Component: AlertVariants, code: alertVariantsCode },
  "avatar/variants": { Component: AvatarVariants, code: avatarVariantsCode },
  "badge/variants": { Component: BadgeVariants, code: badgeVariantsCode },
  "breadcrumb/variants": { Component: BreadcrumbVariants, code: breadcrumbVariantsCode },
  "button/variants": { Component: ButtonVariants, code: buttonVariantsCode },
  "card/basic": { Component: CardBasic, code: cardBasicCode },
  "checkbox/variants": { Component: CheckboxVariants, code: checkboxVariantsCode },
  "combobox/variants": { Component: ComboboxVariants, code: comboboxVariantsCode },
  "command-palette/variants": {
    Component: CommandPaletteVariants,
    code: commandPaletteVariantsCode,
  },
  "container/variants": { Component: ContainerVariants, code: containerVariantsCode },
  "date-picker/variants": { Component: DatePickerVariants, code: datePickerVariantsCode },
  "dialog/variants": { Component: DialogVariants, code: dialogVariantsCode },
  "dropdown-menu/variants": { Component: DropdownMenuVariants, code: dropdownMenuVariantsCode },
  "empty-state/variants": { Component: EmptyStateVariants, code: emptyStateVariantsCode },
  "file-upload/variants": { Component: FileUploadVariants, code: fileUploadVariantsCode },
  "grid/variants": { Component: GridVariants, code: gridVariantsCode },
  "input/variants": { Component: InputVariants, code: inputVariantsCode },
  "logo/variants": { Component: LogoVariants, code: logoVariantsCode },
  "pagination/variants": { Component: PaginationVariants, code: paginationVariantsCode },
  "radio/variants": { Component: RadioVariants, code: radioVariantsCode },
  "seal/variants": { Component: SealVariants, code: sealVariantsCode },
  "select/basic": { Component: SelectBasic, code: selectBasicCode },
  "skeleton/variants": { Component: SkeletonVariants, code: skeletonVariantsCode },
  "stepper/variants": { Component: StepperVariants, code: stepperVariantsCode },
  "switch/variants": { Component: SwitchVariants, code: switchVariantsCode },
  "table/variants": { Component: TableVariants, code: tableVariantsCode },
  "tabs/variants": { Component: TabsVariants, code: tabsVariantsCode },
  "timeline/variants": { Component: TimelineVariants, code: timelineVariantsCode },
  "toast/variants": { Component: ToastVariants, code: toastVariantsCode },
  "tooltip/variants": { Component: TooltipVariants, code: tooltipVariantsCode },
};
