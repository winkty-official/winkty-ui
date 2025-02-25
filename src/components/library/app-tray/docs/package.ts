import globalConfig from "@/config";
import manual from "../../../../../public/registry/app-tray.json";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/app-tray.json`,
  },
  manual,
};
