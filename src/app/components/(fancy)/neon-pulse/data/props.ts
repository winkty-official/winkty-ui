import { PropsDefinition } from "@/components/docs/types";

export const propDefinitions: PropsDefinition[] = [
  {
    prop: "text",
    type: "string",
    description: "The text to display with neon effect",
  },
  {
    prop: "color",
    type: "string",
    default: "#ff00ff",
    description: "Primary color of the text",
  },
  {
    prop: "glowColor",
    type: "string",
    default: "#ff00ff",
    description: "Color of the neon glow effect",
  },
  {
    prop: "fontSize",
    type: "string",
    default: "4rem",
    description: "Size of the text",
  },
  {
    prop: "pulseDuration",
    type: "number",
    default: "1500",
    description: "Duration of one pulse cycle in milliseconds",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
];
