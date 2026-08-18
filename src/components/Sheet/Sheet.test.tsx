import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./index";

function mockMatchMediaMatches(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => {
  vi.restoreAllMocks();
});

function TestSheet({
  open,
  defaultOpen,
  onOpenChange,
  showHandle,
  closeOnScrim,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showHandle?: boolean;
  closeOnScrim?: boolean;
}) {
  return (
    <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <SheetTrigger>Open sheet</SheetTrigger>
      <SheetContent showHandle={showHandle} closeOnScrim={closeOnScrim}>
        <SheetTitle>Sheet title</SheetTitle>
        <SheetClose>Close</SheetClose>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("renders as a centered modal by default", () => {
    mockMatchMediaMatches(false);
    render(<TestSheet open />);
    const content = screen.getByRole("dialog");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("aria-modal", "true");
    expect(content.className).not.toMatch(/animate-sumi-sheet/);
  });

  it("switches to bottom-sheet layout below the breakpoint", () => {
    mockMatchMediaMatches(true);
    render(<TestSheet open />);
    const content = screen.getByRole("dialog");
    expect(content.className).toMatch(/animate-sumi-sheet/);
    expect(content.className).toMatch(/rounded-t-\[18px\]/);
  });

  it("shows the drag handle on mobile by default", () => {
    mockMatchMediaMatches(true);
    render(<TestSheet open />);
    // SheetContent renders via a Radix Portal — query the full document,
    // not just the render() wrapper, which portaled content lives outside of.
    expect(document.querySelector('[aria-hidden="true"] > div')).toBeInTheDocument();
  });

  it("omits the drag handle when showHandle=false", () => {
    mockMatchMediaMatches(true);
    render(<TestSheet open showHandle={false} />);
    const content = screen.getByRole("dialog");
    expect(content.querySelector(".rounded-full")).not.toBeInTheDocument();
  });

  it("does not close on scrim click when closeOnScrim=false", async () => {
    mockMatchMediaMatches(false);
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<TestSheet defaultOpen closeOnScrim={false} onOpenChange={onOpenChange} />);
    // Portaled content — query the full document, not the render() wrapper.
    const overlay = document.querySelector('[class*="bg-[color:var(--bg-scrim)]"]');
    expect(overlay).toBeInTheDocument();
    if (overlay) await user.click(overlay);
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it("closes on Escape", async () => {
    mockMatchMediaMatches(false);
    const user = userEvent.setup();
    render(<TestSheet defaultOpen />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("restores body scroll after closing", async () => {
    mockMatchMediaMatches(false);
    const user = userEvent.setup();
    render(<TestSheet defaultOpen />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});

describe("Sheet accessibility", () => {
  it("has no violations when open", async () => {
    mockMatchMediaMatches(false);
    const { container } = render(<TestSheet defaultOpen />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
