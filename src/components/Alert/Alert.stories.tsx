import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Alert } from "./index";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "danger"],
    },
    title: { control: { type: "text" } },
    children: { control: { type: "text" } },
    // onDismiss is a function — rendered via render stories below
  },
  args: {
    variant: "info",
    children: "Your account has been updated.",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { variant: "info", children: "Your account has been updated." },
};

export const Success: Story = {
  args: { variant: "success", children: "Changes saved successfully." },
};

export const Warning: Story = {
  args: { variant: "warning", children: "This action cannot be undone." },
};

/**
 * Danger uses an inverse cinnabar fill (dark cinnabar-600 background, silk-50 text)
 * with a lighter cinnabar-200 left accent bar — the highest severity level in the system.
 */
export const Danger: Story = {
  args: { variant: "danger", children: "An error occurred. Please try again." },
};

export const WithTitle: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "24px",
        maxWidth: "560px",
      }}
    >
      <Alert variant="info" title="Scheduled maintenance">
        The service will be unavailable on Saturday from 02:00 to 04:00 UTC.
      </Alert>
      <Alert variant="success" title="Deployment complete">
        Version 1.0.0 was deployed to production 3 minutes ago.
      </Alert>
      <Alert variant="warning" title="Storage almost full">
        You&apos;re using 92% of your storage. Upgrade to avoid service interruption.
      </Alert>
      {/* Danger: cinnabar-600 bg (dark fill) + silk-50 text — most assertive variant */}
      <Alert variant="danger" title="Payment failed">
        We couldn&apos;t charge your card ending in 4242. Update your billing details.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState({
      info: true,
      success: true,
      warning: true,
      danger: true,
    });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "24px",
          maxWidth: "560px",
        }}
      >
        {visible.info && (
          <Alert
            variant="info"
            title="Tip"
            onDismiss={() => setVisible((s) => ({ ...s, info: false }))}
          >
            You can use keyboard shortcuts to navigate between items.
          </Alert>
        )}
        {visible.success && (
          <Alert variant="success" onDismiss={() => setVisible((s) => ({ ...s, success: false }))}>
            Your export is ready. Download it from the Files tab.
          </Alert>
        )}
        {visible.warning && (
          <Alert
            variant="warning"
            title="Unsaved changes"
            onDismiss={() => setVisible((s) => ({ ...s, warning: false }))}
          >
            You have unsaved changes. Save before leaving this page.
          </Alert>
        )}
        {visible.danger && (
          <Alert
            variant="danger"
            title="Session expired"
            onDismiss={() => setVisible((s) => ({ ...s, danger: false }))}
          >
            Your session has expired. Sign in again to continue.
          </Alert>
        )}
        {Object.values(visible).every((v) => !v) && (
          <p style={{ fontSize: "14px", color: "var(--fg-3)" }}>All alerts dismissed.</p>
        )}
      </div>
    );
  },
};
