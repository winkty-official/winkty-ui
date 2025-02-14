import { RegistryType } from "@/types/registry";
import manual from "../../../../../public/registry/payment-form.json";

export const packageInfo: {
  cli: {
    command: string;
  };
  manual: RegistryType;
} = {
  cli: {
    command: "npm install @ui-components/payment-form",
  },
  manual: manual,
};
