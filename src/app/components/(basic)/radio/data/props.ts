export const propDefinitions = [
  {
    prop: "items",
    type: "RadioItem[]",
    default: "[]",
    description: "Array of radio items to display",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "The default selected value",
  },
  {
    prop: "name",
    type: "string",
    description: "The name of the radio group",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"vertical"',
    description: "The orientation of the radio group",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Callback when selection changes",
  },
  {
    prop: "error",
    type: "boolean",
    default: "false",
    description: "Whether the radio group has an error",
  },
  {
    prop: "helperText",
    type: "string",
    description: "Helper text to display below the radio group",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Whether the radio group is required",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
];
