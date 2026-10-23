import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

// @sumiui/react/styles/core ships without Tailwind's preflight, so native
// controls and lists only get their reset from the `sumi-control` /
// `sumi-list` classes (globals.css). Storybook loads preflight and can't show
// a missing one; this check reads the markup instead.

const CONTROLS = new Set([
  "button",
  "input",
  "textarea",
  "select",
  // Radix parts that render a <button>
  "RadixCheckbox.Root",
  "RadixSwitch.Root",
  "RadixRadio.Item",
  "RadixTabs.Trigger",
  "RadixSelect.Trigger",
  "RadixDialog.Trigger",
  "RadixDialog.Close",
  "RadixPopover.Trigger",
  "RadixPopover.Close",
  "RadixDropdown.Trigger",
  "RadixTooltip.Trigger",
  "RadixToast.Action",
  "RadixToast.Close",
]);
const LISTS = new Set(["ul", "ol"]);

type Element = { file: string; line: number; tag: string; className: string };

/** The classes a JSX attribute contributes: `className`, or a `{...props}`
 * spread. `{x}` / `{...x}` resolve to what x was initialised to. */
function classesOf(prop: ts.JsxAttributeLike, constants: Map<string, string>): string {
  if (ts.isJsxAttribute(prop) && prop.name.getText() !== "className") return "";
  const expression = ts.isJsxSpreadAttribute(prop)
    ? prop.expression
    : prop.initializer && ts.isJsxExpression(prop.initializer)
      ? prop.initializer.expression
      : undefined;
  const resolved =
    expression && ts.isIdentifier(expression) ? constants.get(expression.text) : undefined;
  return resolved ?? prop.getText();
}

/** Every native control, Radix button part and list a component renders. */
function styledElements(file: string): Element[] {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf-8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  // `const x = …` initializers anywhere in the file, so `className={x}` and
  // `{...sharedProps}` resolve to the classes they carry.
  const constants = new Map<string, string>();
  const collect = (node: ts.Node) => {
    if (ts.isVariableDeclaration(node) && node.initializer) {
      constants.set(node.name.getText(), node.initializer.getText());
    }
    ts.forEachChild(node, collect);
  };
  collect(source);
  const found: Element[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const classes = node.attributes.properties
        .map((prop) => classesOf(prop, constants))
        .join(" ");
      const tag = node.tagName.getText();
      if (CONTROLS.has(tag) || LISTS.has(tag)) {
        found.push({
          file: file.split("/src/")[1] ?? file,
          line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1,
          tag,
          className: classes,
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

const componentsDir = resolve(__dirname);
const elements = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) => {
    try {
      return styledElements(resolve(componentsDir, entry.name, "index.tsx"));
    } catch {
      return [];
    }
  });

const describeEl = ({ file, line, tag }: Element) => `${file}:${line} <${tag}>`;

describe("preflight-free markup", () => {
  it("finds the components' controls and lists", () => {
    expect(elements.filter(({ tag }) => CONTROLS.has(tag)).length).toBeGreaterThan(20);
    expect(elements.filter(({ tag }) => LISTS.has(tag)).length).toBeGreaterThan(3);
  });

  it("puts sumi-control on every native control", () => {
    const missing = elements.filter(
      ({ tag, className }) => CONTROLS.has(tag) && !className.includes("sumi-control"),
    );
    expect(missing.map(describeEl)).toEqual([]);
  });

  it("resets every list's markers, margin and padding", () => {
    const missing = elements.filter(
      ({ tag, className }) =>
        LISTS.has(tag) && !/sumi-list|list-none[^"]*\bp-0\b[^"]*\bm-0\b/.test(className),
    );
    expect(missing.map(describeEl)).toEqual([]);
  });
});
