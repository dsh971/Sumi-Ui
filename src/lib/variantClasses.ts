import type { ClassValue } from "clsx";

/**
 * Shared typed shape for the variant/size -> class-string maps that were
 * previously reinvented independently (as untyped or ad hoc Record<V, string>
 * literals) across Alert, Avatar, Badge, Button, Input, Skeleton, and Toast.
 * Not a cva-style variant engine — BUILD.md's stack table only lists clsx +
 * tailwind-merge for component utilities, and the actual duplication here is
 * boilerplate typing/lookup, not composition logic, so a bigger dependency
 * isn't warranted.
 */
export type VariantClassMap<V extends string> = Record<V, ClassValue>;

/** Look up a variant's class value from a typed map. */
export function variantClass<V extends string>(map: VariantClassMap<V>, variant: V): ClassValue {
  return map[variant];
}
