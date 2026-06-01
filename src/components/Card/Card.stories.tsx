import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Card, CardBody, CardFooter, CardHeader } from "./index";

const meta: Meta<typeof Card> = {
  title: "Foundation/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "24px", maxWidth: "360px" }}>
      <Card>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 500 }}>Default card</h3>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--fg-2)" }}>
            A quiet surface for content.
          </p>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--fg-2)" }}>
            Sumi cards are border-led, not shadow-led. Border at rest, light shadow on hover.
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

export const Elevated: Story = {
  render: () => (
    <div style={{ padding: "24px", maxWidth: "360px" }}>
      <Card variant="elevated">
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 500 }}>Elevated card</h3>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--fg-2)" }}>
            Shadow-md — used for detached surfaces like menus and popovers.
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

export const WithFooterActions: Story = {
  render: () => (
    <div style={{ padding: "24px", maxWidth: "360px" }}>
      <Card>
        <CardHeader>
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 500 }}>Draft</h3>
            <Badge variant="warning" dot>
              In progress
            </Badge>
          </div>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--fg-3)" }}>
            Last edited 2 hours ago
          </p>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "var(--fg-2)" }}>
            A quiet place to write. Your drafts stay here until you publish.
          </p>
        </CardBody>
        <CardFooter style={{ gap: "8px" }}>
          <Button variant="primary" size="sm">
            Publish
          </Button>
          <Button variant="ghost" size="sm">
            Preview
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
