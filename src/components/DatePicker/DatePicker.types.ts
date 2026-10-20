export interface DatePickerProps {
  /** ISO date string "YYYY-MM-DD" or undefined */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  /** Minimum selectable date as "YYYY-MM-DD" */
  min?: string;
  /** Maximum selectable date as "YYYY-MM-DD" */
  max?: string;
  /**
   * BCP 47 locale for the trigger text, month title, weekday headers and day
   * labels (e.g. "zh-CN"). Defaults to the runtime's locale.
   */
  locale?: string;
}
