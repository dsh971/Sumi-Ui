import type { Meta, StoryObj } from "@storybook/react";
import { Search, Users } from "lucide-react";
import { Button } from "../Button";
import { EmptyState } from "./index";

const meta: Meta<typeof EmptyState> = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    title: { control: { type: "text" } },
    description: { control: { type: "text" } },
    closingBeat: { control: { type: "text" } },
    // icon accepts a ReactNode — not controllable via args panel
  },
  args: {
    title: "Nothing here yet",
    description: "Your content will appear here once you get started.",
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/**
 * The title uses Cormorant Garamond (font-display) at 20px per design spec.
 * This is intentional — the display serif creates contrast against body text.
 */
export const Default: Story = {
  args: {
    title: "Nothing here yet",
    description: "Your drafts will appear here once you start writing.",
    closingBeat: "No fuss.",
  },
};

export const TitleOnly: Story = {
  args: { title: "Nothing here yet" },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <EmptyState
        icon={<Search size={32} />}
        title="No results found"
        description="Try different keywords or check your spelling."
        action={
          <Button variant="ghost" size="sm">
            Clear search
          </Button>
        }
      />
    </div>
  ),
};

export const SearchNoResults: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <EmptyState
        icon={<Search size={32} />}
        title="No results found"
        description="Try different keywords or check your spelling."
        action={
          <Button variant="ghost" size="sm">
            Clear search
          </Button>
        }
      />
    </div>
  ),
};

export const NoPermission: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <EmptyState
        icon={<Users size={32} />}
        title="Access restricted"
        description="Ask an admin to invite you to this workspace."
      />
    </div>
  ),
};
