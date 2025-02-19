import { BASE_URI } from "./base-uri";
import { LIBRARY_COMPONENTS } from "./library-components";

const globalConfig = {
  BASE_URI: BASE_URI,
  LIBRARY_COMPONENTS,
} as const;

export default globalConfig;
