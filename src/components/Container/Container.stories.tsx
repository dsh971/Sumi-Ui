import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardBody, CardHeader } from "../Card";
import { Grid } from "../Grid";
import { Container } from "./index";

const meta: Meta<typeof Container> = {
  title: "Foundation/Container",
  component: Container,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Container>;

const swatch = (label: string, token: string) => (
  <div
    style={{
      background: "var(--bg-2)",
      border: "1px dashed var(--line-2)",
      borderRadius: "6px",
      padding: "16px",
      fontSize: "13px",
      color: "var(--fg-2)",
    }}
  >
    {label} — <code>{token}</code>
  </div>
);

export const Sm: Story = {
  render: () => (
    <Container size="sm">{swatch('size="sm"', "--sumi-container-sm (640px)")}</Container>
  ),
};

export const Md: Story = {
  render: () => (
    <Container size="md">{swatch('size="md"', "--sumi-container-md (768px)")}</Container>
  ),
};

export const Lg: Story = {
  render: () => (
    <Container size="lg">{swatch('size="lg"', "--sumi-container-lg (1024px)")}</Container>
  ),
};

export const Xl: Story = {
  render: () => (
    <Container size="xl">{swatch('size="xl"', "--sumi-container-xl (1200px)")}</Container>
  ),
};

export const TwoXl: Story = {
  render: () => (
    <Container size="2xl">{swatch('size="2xl"', "--sumi-container-2xl (1440px)")}</Container>
  ),
};

export const Read: Story = {
  render: () => (
    <Container size="read">{swatch('size="read"', "--measure-read (680px, long-form)")}</Container>
  ),
};

export const App: Story = {
  render: () => (
    <Container size="app">
      {swatch('size="app" (default)', "--measure-app (1200px, app-shell)")}
    </Container>
  ),
};

export const WithoutGutter: Story = {
  render: () => (
    <div style={{ background: "var(--bg-0)" }}>
      <Container size="lg" gutter={false}>
        {swatch(
          "gutter={false}",
          "no responsive side padding — edge-to-edge at the container width",
        )}
      </Container>
    </div>
  ),
};

export const PageComposition: Story = {
  render: () => (
    <div style={{ background: "var(--bg-0)" }}>
      <Container size="app">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-9)" }}>
          <div>
            <h1 style={{ margin: "0 0 8px", fontSize: "32px", fontWeight: 500 }}>Page heading</h1>
            <p style={{ margin: 0, color: "var(--fg-2)" }}>
              Content column — asymmetric two-column layout per the README's layout rules.
            </p>
          </div>
          <div />
        </div>
        <Grid
          cols={undefined}
          className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          style={{ marginTop: "var(--space-9)" }}
        >
          {["One", "Two", "Three"].map((label) => (
            <Card key={label}>
              <CardHeader>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 500 }}>Card {label}</h3>
              </CardHeader>
              <CardBody>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--fg-2)" }}>
                  Steps 3 → 2 → 1 columns from xl → md → sm.
                </p>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Container>
    </div>
  ),
};
