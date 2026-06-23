"use client";

import { Button, Card, CardBody, CardHeader } from "@sumiui/react";

export default function CardBasic() {
  return (
    <Card>
      <CardHeader>
        <h3 style={{ margin: 0 }}>A quiet place to write.</h3>
      </CardHeader>
      <CardBody style={{ display: "flex", gap: "8px" }}>
        <Button variant="primary">Start a draft</Button>
        <Button variant="ghost">Browse</Button>
      </CardBody>
    </Card>
  );
}

export const code = `import { Button, Card, CardBody, CardHeader } from "@sumiui/react";

export function CardBasic() {
  return (
    <Card>
      <CardHeader>
        <h3>A quiet place to write.</h3>
      </CardHeader>
      <CardBody style={{ display: "flex", gap: "8px" }}>
        <Button variant="primary">Start a draft</Button>
        <Button variant="ghost">Browse</Button>
      </CardBody>
    </Card>
  );
}`;
