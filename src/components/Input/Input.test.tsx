import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
import { Input, TextArea } from "./index";

describe("Input", () => {
  it("renders without label", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with label and associates via htmlFor", () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
  });

  it("shows helper text", () => {
    render(<Input label="Email" helperText="We'll never share your email." />);
    expect(screen.getByText("We'll never share your email.")).toBeInTheDocument();
  });

  it("shows error text and hides helper text when both supplied", () => {
    render(<Input label="Email" helperText="Helper" errorText="Required field" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
  });

  it("sets aria-invalid when errorText is present", () => {
    render(<Input label="Email" errorText="Invalid" />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

describe("TextArea", () => {
  it("renders with default rows", () => {
    render(<TextArea label="Notes" />);
    const textarea = screen.getByLabelText(/notes/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it("shows error text with role=alert", () => {
    render(<TextArea label="Notes" errorText="Too short" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Too short");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<TextArea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});

describe("Input accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Input label="Email address" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
