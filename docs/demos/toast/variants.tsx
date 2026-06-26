"use client";

import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  type ToastVariant,
  ToastViewport,
} from "@sumiui/react";
import { useState } from "react";

export default function ToastVariants() {
  const [open, setOpen] = useState<Record<ToastVariant, boolean>>({
    success: false,
    info: false,
    warning: false,
    danger: false,
  });

  return (
    <ToastProvider>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen((s) => ({ ...s, success: true }))}
        >
          Show success toast
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen((s) => ({ ...s, danger: true }))}
        >
          Show danger toast
        </Button>
      </div>

      <Toast
        open={open.success}
        onOpenChange={(v) => setOpen((s) => ({ ...s, success: v }))}
        variant="success"
      >
        <ToastTitle>Draft published</ToastTitle>
        <ToastDescription>"On restraint" is now live on your journal.</ToastDescription>
        <ToastAction altText="View the published post">View post</ToastAction>
        <ToastClose />
      </Toast>
      <Toast
        open={open.danger}
        onOpenChange={(v) => setOpen((s) => ({ ...s, danger: v }))}
        variant="danger"
      >
        <ToastTitle>Couldn't save changes</ToastTitle>
        <ToastDescription>We'll keep retrying in the background.</ToastDescription>
        <ToastAction altText="Retry saving now">Retry now</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const code = `import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@sumiui/react";
import { useState } from "react";

export function ToastVariants() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast open={open} onOpenChange={setOpen} variant="success">
        <ToastTitle>Draft published</ToastTitle>
        <ToastDescription>"On restraint" is now live on your journal.</ToastDescription>
        <ToastAction altText="View the published post">View post</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}`;
