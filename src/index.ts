// Styles — side-effect import; produces dist/sumi.css in the build output
import "./styles/index.css";

// Utility
export { cn } from "./lib/cn";

// Phase 2 — Foundation components
export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button/Button.types";

export { Input, TextArea } from "./components/Input";
export type { InputProps, TextAreaProps } from "./components/Input/Input.types";

export { Card, CardHeader, CardBody, CardFooter } from "./components/Card";
export type {
  CardProps,
  CardVariant,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from "./components/Card/Card.types";

export { Badge } from "./components/Badge";
export type { BadgeProps, BadgeVariant } from "./components/Badge/Badge.types";

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/Dialog";
export type {
  DialogProps,
  DialogTriggerProps,
  DialogCloseProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from "./components/Dialog/Dialog.types";

// Phase 3 — Form & Input components
export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./components/Select";
export type {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
} from "./components/Select/Select.types";

export { Checkbox } from "./components/Checkbox";
export type { CheckboxProps } from "./components/Checkbox/Checkbox.types";

export { RadioGroup, RadioItem } from "./components/Radio";
export type { RadioGroupProps, RadioItemProps } from "./components/Radio/Radio.types";

export { Switch } from "./components/Switch";
export type { SwitchProps } from "./components/Switch/Switch.types";

export { DatePicker } from "./components/DatePicker";
export type { DatePickerProps } from "./components/DatePicker/DatePicker.types";

export { FileUpload } from "./components/FileUpload";
export type { FileUploadProps } from "./components/FileUpload/FileUpload.types";

export { Combobox } from "./components/Combobox";
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxGroup,
  ComboboxSingleProps,
  ComboboxMultiProps,
} from "./components/Combobox/Combobox.types";

// Phase 4 — Navigation components
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./components/Tabs/Tabs.types";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/Breadcrumb";
export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
} from "./components/Breadcrumb/Breadcrumb.types";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./components/DropdownMenu";
export type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
} from "./components/DropdownMenu/DropdownMenu.types";

export { Pagination } from "./components/Pagination";
export type { PaginationProps } from "./components/Pagination/Pagination.types";

export { Stepper } from "./components/Stepper";
export type { StepperProps, StepperStep } from "./components/Stepper/Stepper.types";

// Phase 5 — Feedback & Status components
export { Alert } from "./components/Alert";
export type { AlertProps, AlertVariant } from "./components/Alert/Alert.types";

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./components/Tooltip";
export type {
  TooltipProviderProps,
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
} from "./components/Tooltip/Tooltip.types";

export { Skeleton } from "./components/Skeleton";
export type { SkeletonProps, SkeletonVariant } from "./components/Skeleton/Skeleton.types";

export { EmptyState } from "./components/EmptyState";
export type { EmptyStateProps } from "./components/EmptyState/EmptyState.types";

export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from "./components/Toast";
export type {
  ToastProps,
  ToastVariant,
  ToastProviderProps,
  ToastViewportProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
} from "./components/Toast/Toast.types";

// Phase 6 — Data components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableSelectHead,
  TableSelectCell,
} from "./components/Table";
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
  TableSelectHeadProps,
  TableSelectCellProps,
  SortDirection,
  TableDensity,
} from "./components/Table/Table.types";

export { Timeline } from "./components/Timeline";
export type {
  TimelineProps,
  TimelineItem,
  TimelineItemData,
  TimelineMarker,
} from "./components/Timeline/Timeline.types";

// Phase 7 — Brand & Identity components
export { Avatar, AvatarSeal } from "./components/Avatar";
export type { AvatarProps, AvatarSealProps, AvatarSize } from "./components/Avatar/Avatar.types";

export { Logo } from "./components/Logo";
export type { LogoProps, LogoVariant } from "./components/Logo/Logo.types";

export { Seal } from "./components/Seal";
export type { SealProps, SealSize } from "./components/Seal/Seal.types";

// Layout primitives
export { Container } from "./components/Container";
export type { ContainerProps, ContainerSize } from "./components/Container/Container.types";

export { Grid } from "./components/Grid";
export type { GridProps } from "./components/Grid/Grid.types";

// Command & overlays
export { CommandPalette } from "./components/CommandPalette";
export type {
  CommandPaletteProps,
  CommandItem,
  CommandGroup,
} from "./components/CommandPalette/CommandPalette.types";
