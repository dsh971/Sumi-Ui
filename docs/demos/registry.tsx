"use client";

import type { ComponentType } from "react";
import ButtonVariants, { code as buttonVariantsCode } from "./button/variants";
import CardBasic, { code as cardBasicCode } from "./card/basic";
import SelectBasic, { code as selectBasicCode } from "./select/basic";

// Static registry, not a dynamic `import(`./${name}`)` — Next's static
// export needs every module reachable through ordinary, analyzable
// imports, not an arbitrary runtime path. One line per demo to register it.
export const demoRegistry: Record<string, { Component: ComponentType; code: string }> = {
  "button/variants": { Component: ButtonVariants, code: buttonVariantsCode },
  "card/basic": { Component: CardBasic, code: cardBasicCode },
  "select/basic": { Component: SelectBasic, code: selectBasicCode },
};
