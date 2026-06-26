import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
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

function TestDialog({
  open,
  defaultOpen,
}: {
  open?: boolean;
  defaultOpen?: boolean;
}) {
  return (
    <Dialog open={open} defaultOpen={defaultOpen}>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("does not render content when closed", () => {
    render(<TestDialog />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders content when open=true", () => {
    render(<TestDialog open />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("opens when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText("Open dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestDialog defaultOpen />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Close"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(<TestDialog defaultOpen />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has accessible title", () => {
    render(<TestDialog open />);
    expect(screen.getByRole("dialog", { name: "Confirm action" })).toBeInTheDocument();
  });
});

describe("Dialog accessibility", () => {
  it("has no violations when open", async () => {
    render(<TestDialog defaultOpen />);
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
