import globalConfig from "@/config";
import manual from "../../../../../../public/registry/particle-field.json";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/particle-field.json`,
  },
  manual,
};
