export const propDefinitions = [
  {
    prop: "title",
    type: "string",
    description: "The title of the article card",
  },
  {
    prop: "description",
    type: "string",
    description: "The description text for the article",
  },
  {
    prop: "color",
    type: "string",
    default: "#4f46e5",
    description: "Primary color for the card's highlight effects",
  },
  {
    prop: "glowColor",
    type: "string",
    default: "#818cf8",
    description: "Color for the glow effect on hover",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes to apply to the component",
  },
];
