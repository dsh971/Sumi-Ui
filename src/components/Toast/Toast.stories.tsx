import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import type { ToastVariant } from "./Toast.types";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./index";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

const wrap = (variant: ToastVariant, body: React.ReactNode) => (
  <ToastProvider duration={Number.POSITIVE_INFINITY}>
    <Toast open variant={variant}>
      {body}
      <ToastClose />
    </Toast>
    <ToastViewport />
  </ToastProvider>
);

export const Success: Story = {
  render: () =>
    wrap(
      "success",
      <>
        <ToastTitle>Draft published</ToastTitle>
        <ToastDescription>"On restraint" is now live on your journal.</ToastDescription>
        <ToastAction altText="View the published post">View post</ToastAction>
      </>,
    ),
};

export const Info: Story = {
  render: () => wrap("info", <ToastTitle>A new version is available.</ToastTitle>),
};

export const Warning: Story = {
  render: () =>
    wrap(
      "warning",
      <>
        <ToastTitle>Connection is slow</ToastTitle>
        <ToastDescription>Saving locally for now.</ToastDescription>
      </>,
    ),
};

export const Danger: Story = {
  render: () =>
    wrap(
      "danger",
      <>
        <ToastTitle>Couldn't save changes</ToastTitle>
        <ToastDescription>We'll keep retrying in the background.</ToastDescription>
        <ToastAction altText="Retry saving now">Retry now</ToastAction>
      </>,
    ),
};

export const WithAction: Story = {
  render: () =>
    wrap(
      "info",
      <>
        <ToastTitle>A new version is available.</ToastTitle>
        <ToastAction altText="Reload the page to update">Reload</ToastAction>
      </>,
    ),
};

export const WithDescription: Story = {
  render: () =>
    wrap(
      "success",
      <>
        <ToastTitle>Copied to clipboard</ToastTitle>
        <ToastDescription>The snippet is ready to paste anywhere.</ToastDescription>
      </>,
    ),
};
