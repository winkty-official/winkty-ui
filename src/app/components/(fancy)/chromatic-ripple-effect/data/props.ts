import { PropsDefinition } from "@/components/docs/types";

export const propDefinitions: PropsDefinition[] = [
  {
    prop: "children",
    type: "React.ReactNode | string",
    description: "Content to display with the ripple effect",
  },
  {
    prop: "rippleColor",
    type: "string",
    default: "#3b82f6",
    description: "Color of the ripple animation",
  },
  {
    prop: "rippleSize",
    type: "number",
    default: "100",
    description: "Size of the ripple effect in pixels",
  },
  {
    prop: "rippleDuration",
    type: "number",
    default: "0.5",
    description: "Duration of the ripple animation in seconds",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
];
