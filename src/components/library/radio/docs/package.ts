import globalConfig from "@/config";
import manual from "../../../../../public/registry/area-radio.json";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/area-radio-group.json`,
  },
  manual,
};
