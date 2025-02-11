import globalConfig from "@/config";
import manual from "../../../../../public/registry/auth-form.json";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/auth-form.json`,
  },
  manual,
};
