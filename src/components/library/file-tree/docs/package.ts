import globalConfig from "@/config";
import manual from "../../../../../public/registry/file-tree.json";

export const packageInfo = {
  cli: {
    command: `${globalConfig.BASE_URI}/registry/file-tree.json`,
  },
  manual,
};
