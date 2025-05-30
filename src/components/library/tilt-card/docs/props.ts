export const propDefinitions = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS classes for the outer container",
  },
  {
    prop: "gradient",
    type: "string",
    default: "from-primary/20 via-primary/10 to-transparent",
    description: "Gradient background class in Tailwind format",
  },
  {
    prop: "delay",
    type: "number",
    default: "0",
    description: "Animation delay in seconds",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interactions and animations",
  },
  {
    prop: "ariaLabel",
    type: "string",
    default: "undefined",
    description: "Custom ARIA label for accessibility",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Custom content to render inside the card",
    required: true,
  },
  {
    prop: "ref",
    type: "React.Ref<HTMLDivElement>",
    description: "Forward ref to the underlying div element",
  },
];
