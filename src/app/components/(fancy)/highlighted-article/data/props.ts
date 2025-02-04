export const propDefinitions = [
  {
    prop: "color",
    type: "string",
    default: "#4f46e5",
    description: "Primary color for the highlight effect",
  },
  {
    prop: "glowColor",
    type: "string",
    default: "#818cf8",
    description: "Secondary color for the glow effect",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes to apply to the component",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The content to be rendered inside the highlighted article",
    required: true,
  },
  {
    prop: "ref",
    type: "React.Ref<HTMLDivElement>",
    description: "Forward ref to the underlying div element",
  }
];
