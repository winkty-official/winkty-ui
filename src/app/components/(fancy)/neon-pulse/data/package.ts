import globalConfig from "@/config";
import manual from "../../../../../../public/registry/neon-pulse.json";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/neon-pulse.json`,
  },
  manual,
};
