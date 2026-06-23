import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardBody, CardHeader } from "../Card";
import { Grid } from "./index";

const meta: Meta<typeof Grid> = {
  title: "Foundation/Grid",
  component: Grid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Pins a story to a narrow viewport so desktop/mobile pairs can be compared
// side by side in the sidebar instead of manually resizing the canvas.
const mobileViewport = { viewport: { defaultViewport: "mobile1" } };

const block = (label: string) => (
  <div
    style={{
      background: "var(--bg-2)",
      border: "1px dashed var(--line-2)",
      borderRadius: "6px",
      padding: "12px",
      textAlign: "center",
      fontSize: "13px",
      color: "var(--fg-2)",
    }}
  >
    {label}
  </div>
);

// `Grid`'s `cols` prop sets `grid-template-columns` via inline style, which
// always wins over classes regardless of breakpoint — so it can't itself be
// "responsive". The pattern for going desktop → mobile is: leave `cols`
// unset on `Grid`, and put literal (not dynamically built) responsive
// Tailwind classes on the grid itself (`grid-cols-1 md:grid-cols-12`) and on
// each *child* (`md:col-span-6`).
//
// Don't also give children a base `col-span-12`: a `span` greater than the
// grid's current explicit track count (1, below `md`) creates implicit
// tracks to satisfy it, and `gap` still applies *between* those implicit
// tracks even though they hold no content — 11 implicit gaps at
// --grid-gutter (24px) is 264px the item must additionally claim, which
// overflows a narrow mobile container. Leaving the base span unset lets the
// item fall into the single real column with no implicit tracks at all.
function TwelveColumnDemo() {
  return (
    <Grid className="grid-cols-1 md:grid-cols-12">
      <div className="md:col-span-12">{block("md:col-span-12")}</div>
      <div className="md:col-span-6">{block("md:col-span-6")}</div>
      <div className="md:col-span-6">{block("md:col-span-6")}</div>
      <div className="md:col-span-4">{block("md:col-span-4")}</div>
      <div className="md:col-span-4">{block("md:col-span-4")}</div>
      <div className="md:col-span-4">{block("md:col-span-4")}</div>
    </Grid>
  );
}

export const TwelveColumn: Story = {
  name: "Twelve column (desktop)",
  render: () => <TwelveColumnDemo />,
};

export const TwelveColumnMobile: Story = {
  name: "Twelve column (mobile)",
  parameters: mobileViewport,
  render: () => <TwelveColumnDemo />,
};

// Here `cols` is left unset entirely, and the whole responsive column
// count lives in `className` — the "3 → 2 → 1 across xl → md → sm" pattern
// from the README.
function ResponsiveCardGridDemo() {
  return (
    <Grid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {["One", "Two", "Three", "Four", "Five", "Six"].map((label) => (
        <Card key={label}>
          <CardHeader>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 500 }}>Card {label}</h3>
          </CardHeader>
          <CardBody>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--fg-2)" }}>
              3 columns at xl, 2 at md, 1 below that.
            </p>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}

export const ResponsiveCardGrid: Story = {
  name: "Responsive card grid (desktop)",
  render: () => <ResponsiveCardGridDemo />,
};

export const ResponsiveCardGridMobile: Story = {
  name: "Responsive card grid (mobile)",
  parameters: mobileViewport,
  render: () => <ResponsiveCardGridDemo />,
};

// Same idea applied to the asymmetric two-column pattern: the desktop
// `1.4fr 1fr` split only applies from `md` up. Below that it collapses to
// a single stacked column — an asymmetric split has no good mobile
// equivalent, so it should stack rather than just shrink.
function AsymmetricDemo() {
  return (
    <Grid className="grid-cols-1 md:grid-cols-[1.4fr_1fr]">
      <div>{block("Content column — 1.4fr (full width below md)")}</div>
      <div>{block("Whitespace / anchor column — 1fr (stacks below md)")}</div>
    </Grid>
  );
}

export const Asymmetric: Story = {
  name: "Asymmetric (desktop)",
  render: () => <AsymmetricDemo />,
};

export const AsymmetricMobile: Story = {
  name: "Asymmetric (mobile)",
  parameters: mobileViewport,
  render: () => <AsymmetricDemo />,
};

export const CustomGap: Story = {
  render: () => (
    <Grid cols={3} gap="var(--space-3)">
      <div>{block("gap = --space-3")}</div>
      <div>{block("gap = --space-3")}</div>
      <div>{block("gap = --space-3")}</div>
    </Grid>
  ),
};
