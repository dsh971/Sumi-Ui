"use client";

import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@sumiui/react";

export default function SheetVariants() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <div style={{ padding: "24px" }}>
          <SheetTitle>Move card</SheetTitle>
          <SheetDescription>
            Resize the browser below 640px to see this collapse into a bottom sheet.
          </SheetDescription>
          <div style={{ marginTop: "16px" }}>
            <SheetClose asChild>
              <Button variant="ghost" size="sm">
                Close
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export const code = `import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@sumiui/react";

export function SheetVariants() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <div style={{ padding: "24px" }}>
          <SheetTitle>Move card</SheetTitle>
          <SheetDescription>
            Resize the browser below 640px to see this collapse into a bottom sheet.
          </SheetDescription>
          <div style={{ marginTop: "16px" }}>
            <SheetClose asChild>
              <Button variant="ghost" size="sm">Close</Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}`;
