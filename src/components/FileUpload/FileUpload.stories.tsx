import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FileUpload } from "./index";

const meta: Meta<typeof FileUpload> = {
  title: "Forms/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    helperText: { control: { type: "text" } },
    errorText: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    multiple: { control: { type: "boolean" } },
    accept: { control: { type: "text" } },
    maxSize: { control: { type: "number" } },
  },
  args: {
    disabled: false,
    multiple: false,
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: { helperText: "Upload any file type." },
};

export const WithLabel: Story = {
  args: {
    label: "Attachments",
    helperText: "PDF, PNG or JPG only.",
    accept: ".pdf,.png,.jpg",
  },
};

export const WithMaxSize: Story = {
  args: {
    label: "Profile photo",
    accept: "image/*",
    maxSize: 2 * 1024 * 1024,
    helperText: "Max 2MB. JPG or PNG.",
  },
};

export const Multiple: Story = {
  args: {
    label: "Documents",
    multiple: true,
    helperText: "Select multiple files. Each max 10MB.",
    maxSize: 10 * 1024 * 1024,
  },
};

export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "24px",
          maxWidth: "480px",
        }}
      >
        <FileUpload
          label="Import data"
          files={files}
          onFilesChange={setFiles}
          accept=".csv,.json"
          helperText={`${files.length} file(s) selected.`}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    label: "ID document",
    errorText: "A valid ID is required.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Submission closed",
    disabled: true,
    helperText: "Upload period has ended.",
  },
};
