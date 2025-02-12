import { PropsDefinition } from "@/components/docs/types";

export const asyncAutocompleteProps: PropsDefinition[] = [
  {
    prop: "loadOptions",
    type: "(query: string) => Promise<Option[]>",
    description: "Async function to fetch options based on search query",
  },
  {
    prop: "options",
    type: "Option[]",
    description: "List of options for synchronous loading",
  },
  {
    prop: "value",
    type: "Option | Option[] | null",
    description: "Currently selected option(s)",
  },
  {
    prop: "onChange",
    type: "(option: Option | Option[] | null) => void",
    description: "Callback fired when selection changes",
  },
  {
    prop: "placeholder",
    type: "string",
    default: "Select...",
    description: "Placeholder text for the input",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the autocomplete is disabled",
  },
  {
    prop: "loading",
    type: "boolean",
    description: "External loading state",
  },
  {
    prop: "error",
    type: "string",
    description: "Error message to display",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the autocomplete input",
  },
  {
    prop: "clearable",
    type: "boolean",
    default: "true",
    description: "Whether to show clear button",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
  {
    prop: "multiSelect",
    type: "boolean",
    default: "false",
    description: "Enable multi-select mode",
  },
  {
    prop: "renderOption",
    type: "(option: Option) => React.ReactNode",
    description: "Custom render function for options",
  },
  {
    prop: "filterOption",
    type: "(option: Option, inputValue: string) => boolean",
    description: "Custom filter function for options",
  },
  {
    prop: "name",
    type: "string",
    description: "Name attribute for form submission",
  },
  {
    prop: "onBlur",
    type: "() => void",
    description: "Blur event handler",
  },
  {
    prop: "any",
    type: "boolean",
    default: "false",
    description: "Allow custom values not in options",
  },
];
