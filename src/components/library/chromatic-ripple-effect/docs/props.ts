import { PropsDefinition } from "@/components/docs/types";

export const textAndMouseRippleEffectProps: PropsDefinition[] = [
  {
    prop: "children",
    type: "React.ReactNode | string",
    description: "Content to display with the ripple and text hover effect",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for styling",
  },
  {
    prop: "rippleColor",
    type: "string",
    default: "#3b82f6",
    description: "Color of the ripple effect",
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
    description: "Duration of the ripple effect in seconds",
  },
];

export const mouseRippleEffectProps: PropsDefinition[] = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Content to display inside the ripple effect container",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for styling",
  },
  {
    prop: "rippleColor",
    type: "string",
    default: "#3b82f6",
    description: "Color of the ripple effect",
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
    description: "Duration of the ripple effect in seconds",
  },
];

export const textHoverEffectProps: PropsDefinition[] = [
  {
    prop: "children",
    type: "string",
    description: "Text content to apply the hover effect",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for styling",
  },
];