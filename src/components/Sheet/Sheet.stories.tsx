import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./index";

const meta: Meta<typeof Sheet> = {
  title: "Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Sheet>
        <SheetTrigger>Open sheet</SheetTrigger>
        <SheetContent>
          <div style={{ padding: "24px" }}>
            <SheetTitle>Move card</SheetTitle>
            <SheetDescription>
              Resize the browser below 640px to see this collapse into a bottom sheet.
            </SheetDescription>
            <div style={{ marginTop: "16px" }}>
              <SheetClose>Close</SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ),
};

export const NoScrimDismiss: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Sheet>
        <SheetTrigger>Open (scrim click disabled)</SheetTrigger>
        <SheetContent closeOnScrim={false}>
          <div style={{ padding: "24px" }}>
            <SheetTitle>Confirm required</SheetTitle>
            <SheetDescription>Clicking outside will not dismiss this sheet.</SheetDescription>
            <div style={{ marginTop: "16px" }}>
              <SheetClose>Close</SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ),
};
