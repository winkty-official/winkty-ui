import { PropsDefinition } from "@/components/docs/types";

export const radioGroupProps: PropsDefinition[] = [
  {
    prop: "defaultValue",
    type: "string",
    description: "The initial value selected in the radio group",
  },
  {
    prop: "name",
    type: "string",
    description: "Name attribute for the radio group form field",
  },
  {
    prop: "error",
    type: "boolean",
    default: "false",
    description: "Whether the radio group is in an error state",
  },
  {
    prop: "helperText",
    type: "string",
    description: "Helper text displayed below the radio group",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Whether the radio group selection is required",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Callback fired when the radio selection changes",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for styling",
  },
];

export const radioItemProps: PropsDefinition[] = [
  {
    prop: "value",
    type: "string",
    description: "The value associated with this radio item",
  },
  {
    prop: "children",
    type: "ReactNode",
    description: "Content to be rendered within the radio item",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether this radio item is disabled",
  },
  {
    prop: "indicatorType",
    type: "'border' | 'check' | 'radio'",
    default: "'radio'",
    description: "The type of selection indicator to display",
  },
  {
    prop: "radioPosition",
    type: "'left' | 'right'",
    default: "'left'",
    description: "Position of the radio indicator",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for the radio item",
  },
];
