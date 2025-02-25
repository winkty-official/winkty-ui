import { PropsDefinition } from "@/components/docs/types";

export const appTrayProps: PropsDefinition[] = [
  {
    prop: "children",
    type: "React.ReactNode",
    default: "-",
    description: "The app tray icons to render inside the tray",
  },
  {
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes for the app tray container",
  },
];

export const appTrayIconProps: PropsDefinition[] = [
  {
    prop: "id",
    type: "string",
    default: "-",
    description: "Unique identifier for the app",
  },
  {
    prop: "name",
    type: "string",
    default: "-",
    description: "Name of the app (displayed in tooltip)",
  },
  {
    prop: "icon",
    type: "React.ReactNode",
    default: "-",
    description: "Optional icon to display for the app",
  },
  {
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes for the app tray icon",
  },
];

// app/components/app-tray/props.js

// AppWindow Props
export const appWindowProps = [
  {
    prop: "title",
    type: "string",
    required: true,
    default: "-",
    description: "The title of the application window displayed in the header.",
  },
  {
    prop: "appId",
    type: "string",
    required: true,
    default: "-",
    description: "Unique identifier for the application, used for state management.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    required: true,
    default: "-",
    description: "Content to be rendered inside the application window.",
  },
  {
    prop: "className",
    type: "string",
    required: false,
    default: "-",
    description: "Additional CSS classes for custom styling of the window.",
  },
  {
    prop: "containerRef",
    type: "React.RefObject<HTMLDivElement | null>",
    required: false,
    default: "-",
    description: "Optional ref to an external container for drag constraints.",
  },
];

// AppWindowContainer Props
export const appWindowContainerProps = [
  {
    prop: "top",
    type: "number | string",
    required: false,
    default: '"74px"',
    description: "The top position of the container, in pixels or CSS string.",
  },
  {
    prop: "bottom",
    type: "number | string",
    required: false,
    default: '"74px"',
    description: "The bottom position of the container, in pixels or CSS string.",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    required: false,
    default: "-",
    description: "Custom styles to override the default container styling.",
  },
  {
    prop: "className",
    type: "string",
    required: false,
    default: "-",
    description: "Additional CSS classes for custom styling of the container.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    required: true,
    default: "-",
    description: "The AppWindow components to be rendered within the container.",
  },
];