"use client";

import { FileUpload } from "@sumiui/react";

export default function FileUploadVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "420px" }}>
      <FileUpload helperText="Upload any file type." />
      <FileUpload label="Attachments" accept=".pdf,.png,.jpg" helperText="PDF, PNG or JPG only." />
      <FileUpload
        label="Documents"
        multiple
        maxSize={10 * 1024 * 1024}
        helperText="Select multiple files. Each max 10MB."
      />
      <FileUpload label="ID document" errorText="A valid ID is required." />
      <FileUpload label="Submission closed" disabled helperText="Upload period has ended." />
    </div>
  );
}

export const code = `import { FileUpload } from "@sumiui/react";

export function FileUploadVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <FileUpload helperText="Upload any file type." />
      <FileUpload
        label="Attachments"
        accept=".pdf,.png,.jpg"
        helperText="PDF, PNG or JPG only."
      />
      <FileUpload
        label="Documents"
        multiple
        maxSize={10 * 1024 * 1024}
        helperText="Select multiple files. Each max 10MB."
      />
      <FileUpload label="ID document" errorText="A valid ID is required." />
      <FileUpload label="Submission closed" disabled helperText="Upload period has ended." />
    </div>
  );
}`;
