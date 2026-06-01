import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarSeal } from "./index";

const meta: Meta<typeof Avatar> = {
  title: "Brand/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    src: { control: { type: "text" } },
    fallback: { control: { type: "text" } },
    alt: { control: { type: "text" } },
  },
  args: {
    size: "md",
    fallback: "LF",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "24px" }}>
      <Avatar size="sm" fallback="LF" />
      <Avatar size="md" fallback="LF" />
      <Avatar size="lg" fallback="LF" />
      <Avatar size="xl" fallback="LF" />
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "24px" }}>
      <Avatar size="md" src="https://i.pravatar.cc/150?img=1" alt="Lin Feng" />
      <Avatar size="md" src="https://i.pravatar.cc/150?img=5" alt="Kira Solberg" />
      {/* Broken URL falls back to initials gracefully */}
      <Avatar size="md" src="https://broken-url.invalid/img.jpg" fallback="TS" alt="Thomas Smith" />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        padding: "24px",
        flexWrap: "wrap",
      }}
    >
      {["Lin Feng", "Kira Solberg", "Marcus Webb", "Priya Nair"].map((name) => (
        <Avatar
          key={name}
          size="md"
          fallback={name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        />
      ))}
      {/* no fallback prop → shows "?" */}
      <Avatar size="md" />
    </div>
  ),
};

export const AvatarSealStory: Story = {
  name: "AvatarSeal",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <AvatarSeal size="sm" fallback="LF" />
        <AvatarSeal size="md" fallback="LF" />
        <AvatarSeal size="lg" fallback="LF" />
        <AvatarSeal size="xl" fallback="LF" />
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <AvatarSeal size="xl" fallback="LF" sealGlyph="印" />
        <AvatarSeal size="xl" fallback="KS" sealGlyph="墨" />
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
      {[
        { name: "Lin Feng", role: "Lead designer", initials: "LF" },
        { name: "Kira Solberg", role: "Frontend engineer", initials: "KS" },
        { name: "Marcus Webb", role: "Product manager", initials: "MW" },
      ].map(({ name, role, initials }) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar size="md" fallback={initials} />
          <div>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--fg-1)", fontWeight: 500 }}>
              {name}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "var(--fg-3)" }}>{role}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};
