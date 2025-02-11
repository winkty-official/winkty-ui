import { PropsDefinition } from "@/components/docs/types";

export const propDefinitions: PropsDefinition[] = [
  {
    prop: "variant",
    type: "'signin' | 'signup' | 'forgot-password'",
    default: "'signin'",
    description: "The type of authentication form to display",
  },
  {
    prop: "onSubmit",
    type: "(data: AuthFormData) => void | Promise<void>",
    description: "Callback function when form is submitted",
  },
  {
    prop: "onSuccess",
    type: "(response: any) => void",
    description: "Callback function on successful authentication",
  },
  {
    prop: "onError",
    type: "(error: Error) => void",
    description: "Callback function on authentication error",
  },
  {
    prop: "providers",
    type: "AuthProvider[]",
    description: "List of OAuth providers to enable",
  },
  {
    prop: "redirectUrl",
    type: "string",
    description: "URL to redirect after successful authentication",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
];
