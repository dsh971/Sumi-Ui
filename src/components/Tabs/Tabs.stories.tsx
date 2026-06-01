import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// "underline" is the spec primary (default) variant
export const Underline: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Tabs defaultValue="overview">
        <TabsList variant="underline">
          <TabsTrigger value="overview" variant="underline">
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" variant="underline">
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings" variant="underline">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p style={{ fontSize: "14px", color: "var(--fg-2)", lineHeight: 1.7 }}>
            Overview content — summary of the project, recent activity, and key metrics.
          </p>
        </TabsContent>
        <TabsContent value="activity">
          <p style={{ fontSize: "14px", color: "var(--fg-2)", lineHeight: 1.7 }}>
            Activity feed — commits, comments, and events from the last 30 days.
          </p>
        </TabsContent>
        <TabsContent value="settings">
          <p style={{ fontSize: "14px", color: "var(--fg-2)", lineHeight: 1.7 }}>
            Project settings — name, visibility, collaborators, and integrations.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const Segmented: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Tabs defaultValue="day">
        <TabsList variant="segmented">
          <TabsTrigger value="day" variant="segmented">
            Day
          </TabsTrigger>
          <TabsTrigger value="week" variant="segmented">
            Week
          </TabsTrigger>
          <TabsTrigger value="month" variant="segmented">
            Month
          </TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>Daily view.</p>
        </TabsContent>
        <TabsContent value="week">
          <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>Weekly view.</p>
        </TabsContent>
        <TabsContent value="month">
          <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>Monthly view.</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Tabs defaultValue="all">
        <TabsList variant="underline">
          {["All", "Drafts", "Published", "Archived", "Scheduled"].map((t) => (
            <TabsTrigger key={t} value={t.toLowerCase()} variant="underline">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        {["All", "Drafts", "Published", "Archived", "Scheduled"].map((t) => (
          <TabsContent key={t} value={t.toLowerCase()}>
            <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>
              Showing {t.toLowerCase()} items.
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Tabs defaultValue="account">
        <TabsList variant="underline">
          <TabsTrigger value="account" variant="underline">
            Account
          </TabsTrigger>
          <TabsTrigger value="billing" variant="underline">
            Billing
          </TabsTrigger>
          <TabsTrigger value="team" variant="underline" disabled>
            Team (Pro only)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>Account settings.</p>
        </TabsContent>
        <TabsContent value="billing">
          <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>Billing and invoices.</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
