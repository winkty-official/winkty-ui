export const packageInfo = {
  pkg: {
    name: "@yourlibrary/area-radio-group",
    dependencies: [
      "@radix-ui/react-radio-group",
      "class-variance-authority",
      "framer-motion",
    ],
  },
  cli: {
    command:
      "npx shadcn-ui@latest add https://your-domain.com/registry/area-radio-group.json",
  },
  manual: {
    files: [
      {
        name: "area-radio-group.tsx",
        code: `"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// ... rest of the component code`,
      },
      {
        name: "index.tsx",
        code: `export { AreaRadioGroup } from "./area-radio-group";
export type { RadioItem, AreaRadioGroupProps } from "./area-radio-group";`,
      },
    ],
  },
};
