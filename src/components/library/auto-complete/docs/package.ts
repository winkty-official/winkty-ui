import globalConfig from "@/config";
import manual from "../../../../../public/registry/auto-complete.json";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/auto-complete.json`,
  },
  manual,
};
