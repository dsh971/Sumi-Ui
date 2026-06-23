"use client";

import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { demoRegistry } from "../demos/registry";

interface ComponentDemoProps {
  name: keyof typeof demoRegistry;
}

export function ComponentDemo({ name }: ComponentDemoProps) {
  const demo = demoRegistry[name];
  if (!demo) {
    throw new Error(`No demo registered for "${name}" — check docs/demos/registry.tsx`);
  }

  const { Component, code } = demo;

  return (
    <Tabs items={["Preview", "Code"]}>
      <Tab value="Preview">
        <div
          style={{
            border: "1px solid var(--color-fd-border)",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <Component />
        </div>
      </Tab>
      <Tab value="Code">
        <pre
          style={{
            border: "1px solid var(--color-fd-border)",
            borderRadius: "8px",
            padding: "16px",
            overflowX: "auto",
            fontSize: "13px",
          }}
        >
          <code>{code}</code>
        </pre>
      </Tab>
    </Tabs>
  );
}
