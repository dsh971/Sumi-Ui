import type React from "react";

export interface InputBaseProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  id?: string;
}

export interface InputProps
  extends InputBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
}

export interface TextAreaProps
  extends InputBaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}
