import globalConfig from "@/config";
import manual from "../../../../../public/registry/highlighted-article.json";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/highlighted-article.json`,
  },
  manual,
};
