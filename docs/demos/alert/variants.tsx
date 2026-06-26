"use client";

import { Alert } from "@sumiui/react";

export default function AlertVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Alert variant="info" title="Scheduled maintenance">
        The service will be unavailable on Saturday from 02:00 to 04:00 UTC.
      </Alert>
      <Alert variant="success" title="Deployment complete">
        Version 1.0.0 was deployed to production 3 minutes ago.
      </Alert>
      <Alert variant="warning" title="Storage almost full">
        You're using 92% of your storage. Upgrade to avoid service interruption.
      </Alert>
      <Alert variant="danger" title="Payment failed">
        We couldn't charge your card ending in 4242. Update your billing details.
      </Alert>
    </div>
  );
}

export const code = `import { Alert } from "@sumiui/react";

export function AlertVariants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Alert variant="info" title="Scheduled maintenance">
        The service will be unavailable on Saturday from 02:00 to 04:00 UTC.
      </Alert>
      <Alert variant="success" title="Deployment complete">
        Version 1.0.0 was deployed to production 3 minutes ago.
      </Alert>
      <Alert variant="warning" title="Storage almost full">
        You're using 92% of your storage. Upgrade to avoid service interruption.
      </Alert>
      <Alert variant="danger" title="Payment failed">
        We couldn't charge your card ending in 4242. Update your billing details.
      </Alert>
    </div>
  );
}`;
