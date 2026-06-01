import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./index";

const meta: Meta<typeof Dialog> = {
  title: "Foundation/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription>
              This will permanently delete the file. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Open dialog (no X)</Button>
        </DialogTrigger>
        <DialogContent showClose={false}>
          <DialogHeader>
            <DialogTitle>Session expiring</DialogTitle>
            <DialogDescription>
              Your session will expire in 2 minutes. Save your work to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="primary" size="sm">
                Stay signed in
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">Read terms</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terms of service</DialogTitle>
            <DialogDescription>Last updated 2026-05-29</DialogDescription>
          </DialogHeader>
          <div style={{ padding: "0 24px 16px", maxHeight: "40vh", overflowY: "auto" }}>
            {Array.from({ length: 6 }, (_, i) => (
              <p
                key={`para-${i + 1}`}
                style={{
                  fontSize: "14px",
                  color: "var(--fg-2)",
                  lineHeight: 1.7,
                  marginBottom: "12px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                Decline
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="primary" size="sm">
                Accept
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
