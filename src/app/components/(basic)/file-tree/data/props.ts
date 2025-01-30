import { PropsDefinition } from "@/components/docs/types";

export const fileTreeProps: PropsDefinition[] = [
  {
    prop: "files",
    type: "FileNode[]",
    default: "-",
    description: "Array of file and folder nodes to display in the tree",
  },
  {
    prop: "activeSelect",
    type: "string",
    default: "-",
    description: "Currently selected file/folder path",
  },
  {
    prop: "onSelect",
    type: "(path: string) => void",
    default: "-",
    description: "Callback fired when a file or folder is selected",
  },
  {
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes for the root element",
  },
];

export const fileNodeProps: PropsDefinition[] = [
  {
    prop: "name",
    type: "string",
    default: "-",
    description: "Name of the file or folder",
  },
  {
    prop: "type",
    type: '"file" | "folder"',
    default: "-",
    description: "Type of the node (file or folder)",
  },
  {
    prop: "children",
    type: "FileNode[]",
    description: "Child nodes for folders",
    default: "[]",
  },
  {
    prop: "icon",
    type: "string",
    default: "-",
    description: "Optional custom icon for the node",
  },
];

export const treeNodeProps: PropsDefinition[] = [
  {
    prop: "node",
    type: "FileNode",
    description: "File/folder node data",
    default: "-",
  },
  {
    prop: "level",
    type: "number",
    default: "0",
    description: "Indentation level of the node",
  },
  {
    prop: "basePath",
    type: "string",
    default: "-",
    description: "Full path to the current node",
  },
  {
    prop: "selectedPath",
    type: "string",
    default: "-",
    description: "Currently selected path in the tree",
  },
  {
    prop: "onSelect",
    type: "(path: string) => void",
    description: "Selection callback function",
    default: "-",
  },
];
