import { PropsDefinition } from "@/components/docs/types";

export const asyncAutocompleteProps: PropsDefinition[] = [
  {
    prop: "loadOptions",
    type: "(query: string) => Promise<Option[]>",
    description: "Async function to fetch options based on search query",
  },
  {
    prop: "value",
    type: "Option | null",
    description: "Currently selected option",
  },
  {
    prop: "onChange",
    type: "(option: Option | null) => void",
    description: "Callback fired when selection changes",
  },
  {
    prop: "placeholder",
    type: "string",
    default: "Search...",
    description: "Placeholder text for the input",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the autocomplete is disabled",
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
    prop: "debounceMs",
    type: "number",
    default: "300",
    description: "Debounce delay for search queries in milliseconds",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
];
