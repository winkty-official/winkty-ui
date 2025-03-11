import globalConfig from "@/config";
import manual from "../../../../../public/registry/tilt-card.json";
// import manual from "../../../../../public/registry/floating-car";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/tilt-card.json`,
  },
  manual,
};
