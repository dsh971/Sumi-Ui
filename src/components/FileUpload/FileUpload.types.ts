export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
  /** Controlled file list */
  files?: File[];
}
