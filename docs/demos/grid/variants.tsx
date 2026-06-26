"use client";

import { Card, CardBody, CardHeader, Grid } from "@sumiui/react";

export default function GridVariants() {
  return (
    <Grid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {["One", "Two", "Three"].map((label) => (
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

export const code = `import { Card, CardBody, CardHeader, Grid } from "@sumiui/react";

export function GridVariants() {
  return (
    <Grid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {["One", "Two", "Three"].map((label) => (
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
}`;
