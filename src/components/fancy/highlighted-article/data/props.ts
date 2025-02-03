import { PropsDefinition } from "@/components/docs/types";

export const propDefinitions: PropsDefinition[] = [
  {
    prop: "title",
    type: "string",
    description: "Title of the article",
  },
  {
    prop: "description",
    type: "string",
    description: "Brief description or excerpt of the article",
  },
  {
    prop: "color",
    type: "string",
    default: "#4f46e5",
    description: "Primary color for the article highlight effect",
  },
  {
    prop: "glowColor",
    type: "string",
    default: "#818cf8",
    description: "Color of the glow/shadow effect",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
];
