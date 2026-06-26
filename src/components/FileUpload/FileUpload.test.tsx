import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../test-setup";
import { FileUpload } from "./index";

describe("FileUpload", () => {
  it("renders drop zone with accessible role", () => {
    render(<FileUpload />);
    expect(screen.getByRole("button", { name: /upload files/i })).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(<FileUpload label="Attachments" />);
    expect(screen.getByText("Attachments")).toBeInTheDocument();
  });

  it("shows helper text", () => {
    render(<FileUpload helperText="PDF or PNG only." />);
    expect(screen.getByText("PDF or PNG only.")).toBeInTheDocument();
  });

  it("shows error text with role=alert", () => {
    render(<FileUpload errorText="File required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("File required");
  });

  it("renders max size hint when maxSize is set", () => {
    render(<FileUpload maxSize={5 * 1024 * 1024} />);
    expect(screen.getByText(/5\.0 MB/)).toBeInTheDocument();
  });

  it("is disabled when disabled=true", () => {
    render(<FileUpload disabled />);
    expect(screen.getByRole("button", { name: /upload files/i })).toBeDisabled();
  });

  it("accepts files via input and shows them in the list", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    render(<FileUpload onFilesChange={onFilesChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["content"], "report.pdf", { type: "application/pdf" });
    await user.upload(input, file);

    expect(onFilesChange).toHaveBeenCalledOnce();
    expect(onFilesChange.mock.calls[0]?.[0]).toHaveLength(1);
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
  });

  it("removes a file when its remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["x"], "note.txt", { type: "text/plain" });
    await user.upload(input, file);
    expect(screen.getByText("note.txt")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /remove note\.txt/i }));
    expect(screen.queryByText("note.txt")).not.toBeInTheDocument();
  });

  it("shows size error when file exceeds maxSize", async () => {
    const user = userEvent.setup();
    render(<FileUpload maxSize={10} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = new File(["x".repeat(100)], "big.txt", { type: "text/plain" });
    await user.upload(input, bigFile);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders controlled file list", () => {
    const files = [new File(["x"], "controlled.txt", { type: "text/plain" })];
    render(<FileUpload files={files} />);
    expect(screen.getByText("controlled.txt")).toBeInTheDocument();
  });
});

describe("FileUpload accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<FileUpload />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
