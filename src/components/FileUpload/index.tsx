import { Paperclip, Upload, X } from "lucide-react";
import React, { useCallback, useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import type { FileUploadProps } from "./FileUpload.types";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// BUG-006 fix: plain sentence-case label, consistent with Input/Select
const labelClasses = "block text-xs font-medium text-fg-2 mb-1.5";
const helperClasses = "mt-1 text-xs text-fg-3";
const errorClasses = "mt-1 text-xs text-[color:var(--status-danger)]";

// C-3 fix: forwardRef so form libraries can attach ref to the drop-zone button
export const FileUpload = React.forwardRef<HTMLButtonElement, FileUploadProps>(function FileUpload(
  {
    accept,
    multiple = false,
    maxSize,
    onFilesChange,
    disabled = false,
    label,
    helperText,
    errorText,
    files: controlledFiles,
  },
  ref,
) {
  const autoId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const files = controlledFiles ?? internalFiles;

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      if (maxSize) {
        const oversized = list.filter((f) => f.size > maxSize);
        if (oversized.length > 0) {
          setSizeError(
            `${oversized.length > 1 ? "Some files exceed" : `"${oversized[0]?.name}" exceeds`} the ${formatBytes(maxSize)} limit.`,
          );
          return;
        }
      }
      setSizeError(null);
      const next = multiple ? [...files, ...list] : list.slice(0, 1);
      if (!controlledFiles) setInternalFiles(next);
      onFilesChange?.(next);
    },
    [files, multiple, maxSize, controlledFiles, onFilesChange],
  );

  const removeFile = useCallback(
    (index: number) => {
      const next = files.filter((_, i) => i !== index);
      if (!controlledFiles) setInternalFiles(next);
      onFilesChange?.(next);
    },
    [files, controlledFiles, onFilesChange],
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) addFiles(e.target.files);
      // Reset so same file can be re-selected
      e.target.value = "";
    },
    [addFiles],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragOver(false), []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (!disabled && e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [disabled, addFiles],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled],
  );

  const displayError = errorText ?? sizeError;

  const buttonId = `file-upload-${autoId}`;

  return (
    <div className="flex flex-col">
      {/* M-5 fix: <label htmlFor> properly associates with the drop-zone button */}
      {label && (
        <label htmlFor={buttonId} className={labelClasses}>
          {label}
        </label>
      )}

      {/* Hidden file input — sibling of button so button doesn't contain an input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onInputChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Drop zone — native button for semantics; drag events still work on buttons */}
      <button
        ref={ref}
        id={buttonId}
        type="button"
        disabled={disabled}
        aria-label="Upload files — click or drag and drop"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={onKeyDown}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2",
          "rounded-lg border-2 border-dashed border-[color:var(--line-2)]",
          "bg-bg-card px-6 py-8 w-full",
          "cursor-pointer transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
          isDragOver && "border-[color:var(--accent)] bg-[color:var(--accent-soft)]",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <Upload
          size={20}
          className={cn("text-fg-3", isDragOver && "text-accent")}
          aria-hidden="true"
        />
        <div className="text-center">
          <span className="text-sm font-medium text-fg-1">Drop files here</span>
          <span className="text-sm text-fg-3"> or </span>
          <span className="text-sm font-medium text-accent">browse</span>
        </div>
        {maxSize && <p className="text-xs text-fg-3">Max {formatBytes(maxSize)} per file</p>}
      </button>

      {/* Error / helper */}
      {displayError && (
        <p role="alert" className={errorClasses}>
          {displayError}
        </p>
      )}
      {!displayError && helperText && <p className={helperClasses}>{helperText}</p>}

      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2" aria-label="Selected files">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}-${i}`}
              className={cn(
                "flex items-center gap-2 rounded-md",
                "bg-bg-sunken px-3 py-2",
                "border border-[color:var(--line-1)]",
              )}
            >
              <Paperclip size={14} className="text-fg-3 flex-shrink-0" aria-hidden="true" />
              <span className="flex-1 min-w-0 text-sm text-fg-1 truncate">{file.name}</span>
              <span className="text-xs text-fg-3 flex-shrink-0">{formatBytes(file.size)}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className={cn(
                  "flex-shrink-0 rounded p-0.5",
                  "text-fg-3 hover:text-fg-1 hover:bg-bg-pressed",
                  "transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
                )}
              >
                <X size={12} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
FileUpload.displayName = "FileUpload";
