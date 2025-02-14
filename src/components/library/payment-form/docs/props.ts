import { PropsDefinition } from "@/components/docs/types";

export const propDefinitions: PropsDefinition[] = [
  {
    prop: "onSubmit",
    type: "(data: PaymentFormData) => void | Promise<void>",
    description: "Callback function when form is submitted",
  },
  {
    prop: "onSuccess",
    type: "(response: any) => void",
    description: "Callback function on successful payment",
  },
  {
    prop: "onError",
    type: "(error: Error) => void",
    description: "Callback function on payment error",
  },
  {
    prop: "paymentMethods",
    type: "string[]",
    default: "['credit-card']",
    description: "List of available payment methods",
  },
  {
    prop: "cardTypes",
    type: "string[]",
    default: "['visa', 'mastercard', 'amex']",
    description: "Supported credit card types",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes",
  },
  {
    prop: "billingAddress",
    type: "boolean",
    default: "true",
    description: "Whether to show billing address fields",
  },
]; 