"use client";

import { Select, SelectContent, SelectItem } from "@sumiui/react";

export default function SelectBasic() {
  return (
    <Select label="Country" placeholder="Choose a country">
      <SelectContent>
        <SelectItem value="cn">China</SelectItem>
        <SelectItem value="jp">Japan</SelectItem>
        <SelectItem value="kr">South Korea</SelectItem>
        <SelectItem value="us">United States</SelectItem>
      </SelectContent>
    </Select>
  );
}

export const code = `import { Select, SelectContent, SelectItem } from "@sumiui/react";

export function SelectBasic() {
  return (
    <Select label="Country" placeholder="Choose a country">
      <SelectContent>
        <SelectItem value="cn">China</SelectItem>
        <SelectItem value="jp">Japan</SelectItem>
        <SelectItem value="kr">South Korea</SelectItem>
        <SelectItem value="us">United States</SelectItem>
      </SelectContent>
    </Select>
  );
}`;
