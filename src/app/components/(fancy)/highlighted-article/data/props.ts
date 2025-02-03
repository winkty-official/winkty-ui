import { PropsDefinition } from "@/components/docs/types";

export const propDefinitions: PropsDefinition[] = [
  {
    prop: "title",
    type: "string",
    description: "Title of the article",
  },
  {
    prop: "description",
    type: "string",
    description: "Brief description or excerpt of the article",
  },
  {
    prop: "image",
    type: "string",
    description: "URL of the article's featured image",
  },
  {
    prop: "date",
    type: "string",
    description: "Publication date of the article",
  },
  {
    prop: "author",
    type: "{ name: string; avatar?: string }",
    description: "Author information including name and optional avatar",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
];
