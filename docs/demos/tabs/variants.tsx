"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sumiui/react";

export default function TabsVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
          <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>
            Overview content — summary of the project, recent activity, and key metrics.
          </p>
        </TabsContent>
        <TabsContent value="activity">
          <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>
            Activity feed — commits, comments, and events from the last 30 days.
          </p>
        </TabsContent>
        <TabsContent value="settings">
          <p style={{ fontSize: "14px", color: "var(--fg-2)" }}>
            Project settings — name, visibility, collaborators, and integrations.
          </p>
        </TabsContent>
      </Tabs>

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
  );
}

export const code = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sumiui/react";

export function TabsVariants() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="underline">
        <TabsTrigger value="overview" variant="underline">Overview</TabsTrigger>
        <TabsTrigger value="activity" variant="underline">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content…</TabsContent>
      <TabsContent value="activity">Activity feed…</TabsContent>
    </Tabs>
  );
}`;
