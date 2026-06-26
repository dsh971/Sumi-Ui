import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../../test-setup";
import { Grid } from "./index";

describe("Grid", () => {
  it("renders children", () => {
    render(<Grid>Content</Grid>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("defaults gap to the grid-gutter token", () => {
    render(<Grid>Content</Grid>);
    expect(screen.getByText("Content")).toHaveStyle({ gap: "var(--grid-gutter)" });
  });

  it("does not set gridTemplateColumns when cols is omitted", () => {
    render(<Grid>Content</Grid>);
    expect(screen.getByText("Content").style.gridTemplateColumns).toBe("");
  });

  it("builds repeat(N, 1fr) from a numeric cols", () => {
    render(<Grid cols={12}>Content</Grid>);
    expect(screen.getByText("Content")).toHaveStyle({ gridTemplateColumns: "repeat(12, 1fr)" });
  });

  it("passes a string cols through verbatim", () => {
    render(<Grid cols="1.4fr 1fr">Content</Grid>);
    expect(screen.getByText("Content")).toHaveStyle({ gridTemplateColumns: "1.4fr 1fr" });
  });

  it("accepts a custom gap", () => {
    render(<Grid gap="8px">Content</Grid>);
    expect(screen.getByText("Content")).toHaveStyle({ gap: "8px" });
  });

  it("accepts additional className", () => {
    render(<Grid className="custom">Content</Grid>);
    expect(screen.getByText("Content")).toHaveClass("custom", "grid");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Grid ref={ref}>Content</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("Grid accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(
      <Grid cols={2}>
        <div>A</div>
        <div>B</div>
      </Grid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
