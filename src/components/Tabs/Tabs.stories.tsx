import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Tabs have one look: an ink underline under the active label
export const Underline: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
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

export const ManyTabs: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Tabs defaultValue="all">
        <TabsList>
          {["All", "Drafts", "Published", "Archived", "Scheduled"].map((t) => (
            <TabsTrigger key={t} value={t.toLowerCase()}>
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
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team" disabled>
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
