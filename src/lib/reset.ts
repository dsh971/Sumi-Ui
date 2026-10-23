/**
 * The Tailwind preflight rules for buttons and form fields, as utilities.
 *
 * @sumiui/react/styles/core ships without preflight, so native controls would
 * otherwise come back with browser borders, padding, backgrounds and fonts.
 * Under @sumiui/react/styles these repeat what preflight already sets.
 *
 * Put it first in cn(): tailwind-merge drops each reset class that a
 * component's own classes override (a later `bg-*`, `text-sm`, `rounded-md`…).
 * The typed arbitrary values (`family-name:`, `length:`, `number:`) keep
 * tailwind-merge sorting them into the right groups.
 */
export const controlReset =
  "m-0 p-0 border-0 border-solid rounded-none bg-transparent text-inherit font-[family-name:inherit] font-[number:inherit] text-[length:inherit] leading-[inherit] tracking-[inherit]";
