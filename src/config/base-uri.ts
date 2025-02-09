export const BASE_URI =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_BASE_URI
    : process.env.BASE_URI;
