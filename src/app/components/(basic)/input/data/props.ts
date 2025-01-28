const propDefinitions = [
  {
    prop: "label",
    type: "string",
    default: "-",
    description: "The label text displayed above the input",
  },
  {
    prop: "helperText",
    type: "string",
    default: "-",
    description: "Helper text displayed below the input",
  },
  {
    prop: "error",
    type: "boolean",
    default: "false",
    description: "Whether the input is in an error state",
  },
  {
    prop: "success",
    type: "boolean",
    default: "false",
    description: "Whether the input is in a success state",
  },
  {
    prop: "inputSize",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: "Controls the size of the input field",
  },
  {
    prop: "variant",
    type: '"default" | "outline" | "ghost"',
    default: '"default"',
    description: "The visual style variant of the input",
  },
  {
    prop: "wrapperClassName",
    type: "string",
    default: "-",
    description: "Additional classes for the input wrapper element",
  },
  {
    prop: "inputClassName",
    type: "string",
    default: "-",
    description: "Additional classes for the input element",
  },
  {
    prop: "InputProps",
    type: "object",
    default: "-",
    description: "Configuration object for input decorations",
  },
  {
    prop: "InputProps.startAdornment",
    type: "ReactNode",
    default: "-",
    description: "Element to display at the start of the input",
  },
  {
    prop: "InputProps.endAdornment",
    type: "ReactNode",
    default: "-",
    description: "Element to display at the end of the input",
  },
  {
    prop: "InputProps.style",
    type: "CSSProperties",
    default: "-",
    description: "Custom styles for the input element",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the input is disabled",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Whether the input is required",
  },
];


export default propDefinitions;